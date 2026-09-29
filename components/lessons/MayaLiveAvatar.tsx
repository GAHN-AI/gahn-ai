"use client";

import { useEffect, useRef, useState } from "react";
import {
  LiveAvatarSession,
  SessionEvent,
  SessionState,
} from "@heygen/liveavatar-web-sdk";

type MayaLiveAvatarProps = {
  worldSlug: string;
  sectionSlug?: string | null;
  topicSlug?: string | null;
  topic: string;
  lessonId: string;
  lessonTitle: string;
  language: string;
};

type UsageStatus = {
  allowed: boolean;
  exhausted?: boolean;
  upgradeRequired?: boolean;
  planId: string;
  planName: string;
  limitSeconds: number;
  usedSeconds: number;
  remainingSeconds: number;
  resetAt: string;
};

function minutesLabel(seconds: number) {
  if (seconds <= 0) return "0 minutes";

  const minutes = Math.ceil(seconds / 60);

  return `${minutes} minute${minutes === 1 ? "" : "s"}`;
}

export default function MayaLiveAvatar({
  worldSlug,
  sectionSlug,
  topicSlug,
  topic,
  lessonId,
  lessonTitle,
  language,
}: MayaLiveAvatarProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sessionRef = useRef<LiveAvatarSession | null>(null);
  const usageEventIdRef = useRef<string | null>(null);
  const sessionTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const finalizingRef = useRef(false);
  const activityRecordedRef = useRef(false);

  const [status, setStatus] = useState("Checking access...");
  const [error, setError] = useState<string | null>(null);
  const [usage, setUsage] = useState<UsageStatus | null>(null);
  const [usageLoading, setUsageLoading] = useState(true);
  const [isStarting, setIsStarting] = useState(false);
  const [isEnding, setIsEnding] = useState(false);
  const [sessionLimitSeconds, setSessionLimitSeconds] = useState(0);

  function clearSessionTimer() {
    if (sessionTimeoutRef.current) {
      clearTimeout(sessionTimeoutRef.current);
      sessionTimeoutRef.current = null;
    }
  }

  async function loadUsage() {
    try {
      setUsageLoading(true);

      const response = await fetch("/api/liveavatar/usage", {
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok) {
        setUsage(null);
        setStatus(response.status === 401 ? "Sign in required" : "Unavailable");
        setError(data.error || "Could not check Maya access.");
        return;
      }

      setUsage(data);
      setError(null);

      if (data.allowed) {
        setStatus("Ready");
      } else if (data.upgradeRequired) {
        setStatus("Learner Plus");
      } else if (data.exhausted) {
        setStatus("Monthly limit reached");
      } else {
        setStatus("Unavailable");
      }
    } catch (err) {
      console.error(err);
      setUsage(null);
      setStatus("Unavailable");
      setError("Could not check Maya access.");
    } finally {
      setUsageLoading(false);
    }
  }

  async function finalizeUsage() {
    const usageEventId = usageEventIdRef.current;

    if (!usageEventId || finalizingRef.current) {
      return;
    }

    finalizingRef.current = true;
    usageEventIdRef.current = null;
    clearSessionTimer();

    try {
      const response = await fetch("/api/liveavatar/session/end", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ usageEventId }),
      });

      const data = await response.json();

      if (response.ok) {
        setUsage((current) =>
          current
            ? {
                ...current,
                limitSeconds: data.limitSeconds,
                usedSeconds: data.usedSeconds,
                remainingSeconds: data.remainingSeconds,
                resetAt: data.resetAt,
                allowed: data.remainingSeconds > 0,
                exhausted: data.remainingSeconds <= 0,
              }
            : current
        );
      }
    } catch (err) {
      console.error("Could not finalize Maya usage:", err);
    } finally {
      finalizingRef.current = false;
    }
  }

  async function endSession() {
    if (isEnding) return;

    setIsEnding(true);

    try {
      if (sessionRef.current) {
        await sessionRef.current.stop();
        sessionRef.current = null;
      }

      await finalizeUsage();
      setSessionLimitSeconds(0);
      activityRecordedRef.current = false;
      setStatus("Session ended");
    } catch (err) {
      console.error(err);
      setError("Maya stopped, but the session cleanup needs to retry.");
    } finally {
      setIsEnding(false);
    }
  }

  async function recordConnectedLesson(
    usageEventId: string,
    providerSessionId: string | null
  ) {
    if (activityRecordedRef.current) return;

    activityRecordedRef.current = true;

    try {
      const response = await fetch("/api/liveavatar/session/started", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          usageEventId,
          providerSessionId,
          lessonContext: {
            worldSlug,
            sectionSlug: sectionSlug || null,
            topicSlug: topicSlug || null,
            topic,
            lessonId,
            lessonTitle,
            language,
          },
        }),
      });

      if (!response.ok) {
        activityRecordedRef.current = false;
      }
    } catch (err) {
      activityRecordedRef.current = false;
      console.error("Could not record Maya lesson activity:", err);
    }
  }

  async function startSession() {
    if (isStarting || sessionRef.current) {
      return;
    }

    try {
      setIsStarting(true);
      setError(null);
      setStatus("Connecting...");

      const response = await fetch("/api/liveavatar/session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lessonContext: {
            worldSlug,
            sectionSlug: sectionSlug || null,
            topicSlug: topicSlug || null,
            topic,
            lessonId,
            lessonTitle,
            language,
          },
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (
          typeof data.remainingSeconds === "number" &&
          typeof data.limitSeconds === "number"
        ) {
          setUsage((current) =>
            current
              ? {
                  ...current,
                  remainingSeconds: data.remainingSeconds,
                  usedSeconds: data.usedSeconds ?? current.usedSeconds,
                  limitSeconds: data.limitSeconds,
                  resetAt: data.resetAt ?? current.resetAt,
                  allowed: false,
                  exhausted: data.code === "MAYA_LIMIT_REACHED",
                  upgradeRequired: data.code === "UPGRADE_REQUIRED",
                }
              : current
          );
        }

        throw new Error(data.error || "Could not create LiveAvatar session.");
      }

      usageEventIdRef.current = data.usageEventId;
      activityRecordedRef.current = false;
      setSessionLimitSeconds(data.sessionLimitSeconds || 0);

      const session = new LiveAvatarSession(data.sessionToken, {
        autoKeepAlive: true,
      });

      sessionRef.current = session;

      session.on(SessionEvent.SESSION_STREAM_READY, () => {
        if (videoRef.current) {
          session.attach(videoRef.current);
        }
      });

      session.on(SessionEvent.SESSION_STATE_CHANGED, (state) => {
        if (state === SessionState.CONNECTED) {
          setStatus("Maya is live");
          void recordConnectedLesson(
            data.usageEventId,
            data.sessionId || null
          );
        }

        if (state === SessionState.CONNECTING) {
          setStatus("Connecting...");
        }

        if (state === SessionState.DISCONNECTED) {
          sessionRef.current = null;
          setStatus("Session ended");
          void finalizeUsage();
        }
      });

      session.on(SessionEvent.SESSION_DISCONNECTED, () => {
        sessionRef.current = null;
        setStatus("Session ended");
        void finalizeUsage();
      });

      if (data.sessionLimitSeconds > 0) {
        sessionTimeoutRef.current = setTimeout(() => {
          void endSession();
        }, data.sessionLimitSeconds * 1000);
      }

      await session.start();
    } catch (err) {
      console.error(err);

      if (usageEventIdRef.current) {
        await finalizeUsage();
      }

      sessionRef.current = null;
      clearSessionTimer();
      setSessionLimitSeconds(0);
      setStatus("Connection failed");
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong starting Maya."
      );
    } finally {
      setIsStarting(false);
    }
  }

  useEffect(() => {
    void loadUsage();
  }, []);

  useEffect(() => {
    function closeUsageOnPageExit() {
      const usageEventId = usageEventIdRef.current;

      if (!usageEventId) return;

      usageEventIdRef.current = null;

      void fetch("/api/liveavatar/session/end", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ usageEventId }),
        keepalive: true,
      });
    }

    window.addEventListener("pagehide", closeUsageOnPageExit);

    return () => {
      window.removeEventListener("pagehide", closeUsageOnPageExit);
      clearSessionTimer();

      if (sessionRef.current) {
        sessionRef.current.stop().catch(() => {});
        sessionRef.current = null;
      }

      closeUsageOnPageExit();
    };
  }, []);

  const canStart =
    Boolean(usage?.allowed) &&
    !usageLoading &&
    !isStarting &&
    !sessionRef.current;

  return (
    <div className="flex min-h-[540px] flex-col">
      <div className="relative flex-1 overflow-hidden bg-black">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="h-full min-h-[460px] w-full object-cover"
        />

        <div className="absolute left-4 top-4 rounded-full bg-black/60 px-3 py-1.5 text-xs font-bold text-white">
          {status}
        </div>
      </div>

      <div className="border-t border-white/15 bg-[#07162F] p-4">
        {usageLoading ? (
          <p className="mb-3 text-sm font-bold text-white/80">
            Checking your Maya plan...
          </p>
        ) : usage?.upgradeRequired ? (
          <div className="mb-3 rounded-xl border border-white/20 bg-white/10 p-3">
            <p className="text-sm font-black text-white">
              Maya is a Learner Plus feature.
            </p>
            <p className="mt-1 text-xs font-medium leading-5 text-white/80">
              Explore stays free without paid avatar usage. Learner Plus includes
              60 Maya minutes per billing period.
            </p>
          </div>
        ) : usage?.exhausted ? (
          <div className="mb-3 rounded-xl border border-white/20 bg-white/10 p-3">
            <p className="text-sm font-black text-white">
              You have used your Maya time for this billing period.
            </p>
            <p className="mt-1 text-xs font-medium text-white/80">
              Your allowance resets automatically at the next usage period.
            </p>
          </div>
        ) : usage ? (
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-white/15 bg-white/5 px-3 py-2">
            <p className="text-xs font-bold text-white/85">
              {usage.planName}
            </p>
            <p className="text-xs font-black text-white">
              {minutesLabel(usage.remainingSeconds)} remaining
            </p>
          </div>
        ) : null}

        {sessionLimitSeconds > 0 && (
          <p className="mb-3 text-xs font-bold text-white/70">
            This session can run for up to {minutesLabel(sessionLimitSeconds)}.
          </p>
        )}

        {error && (
          <p className="mb-3 text-sm font-bold text-red-300">
            {error}
          </p>
        )}

        <div className="flex gap-3">
          {usage?.upgradeRequired ? (
            <a
              href="/pricing"
              className="flex-1 rounded-xl bg-white px-4 py-3 text-center text-sm font-black text-[#07162F]"
            >
              View Learner Plus
            </a>
          ) : (
            <button
              type="button"
              onClick={startSession}
              disabled={!canStart}
              className="flex-1 rounded-xl bg-white px-4 py-3 text-sm font-black text-[#07162F] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isStarting ? "Starting Maya..." : "Start Maya"}
            </button>
          )}

          <button
            type="button"
            onClick={endSession}
            disabled={!sessionRef.current || isEnding}
            className="rounded-xl border border-white/25 px-4 py-3 text-sm font-black text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            {isEnding ? "Ending..." : "End"}
          </button>
        </div>
      </div>
    </div>
  );
}
