"use client";

import { useEffect, useRef, useState } from "react";
import {
  LiveAvatarSession,
  SessionEvent,
  SessionState,
} from "@heygen/liveavatar-web-sdk";

export default function MayaLiveAvatar() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sessionRef = useRef<LiveAvatarSession | null>(null);

  const [status, setStatus] = useState("Ready");
  const [error, setError] = useState<string | null>(null);

  async function startSession() {
    try {
      setError(null);
      setStatus("Connecting...");

      const response = await fetch("/api/liveavatar/session", {
        method: "POST",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Could not create LiveAvatar session.");
      }

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
        }

        if (state === SessionState.CONNECTING) {
          setStatus("Connecting...");
        }

        if (state === SessionState.DISCONNECTED) {
          setStatus("Session ended");
        }
      });

      session.on(SessionEvent.SESSION_DISCONNECTED, () => {
        setStatus("Session ended");
      });

      await session.start();
    } catch (err) {
      console.error(err);

      setStatus("Connection failed");
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong starting Maya."
      );
    }
  }

  async function endSession() {
    try {
      if (sessionRef.current) {
        await sessionRef.current.stop();
        sessionRef.current = null;
      }

      setStatus("Session ended");
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    return () => {
      if (sessionRef.current) {
        sessionRef.current.stop().catch(() => {});
        sessionRef.current = null;
      }
    };
  }, []);

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
        {error && (
          <p className="mb-3 text-sm font-bold text-red-300">
            {error}
          </p>
        )}

        <div className="flex gap-3">
          <button
            type="button"
            onClick={startSession}
            className="flex-1 rounded-xl bg-white px-4 py-3 text-sm font-black text-[#07162F]"
          >
            Start Maya
          </button>

          <button
            type="button"
            onClick={endSession}
            className="rounded-xl border border-white/25 px-4 py-3 text-sm font-black text-white"
          >
            End
          </button>
        </div>
      </div>
    </div>
  );
}