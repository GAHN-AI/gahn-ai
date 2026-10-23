"use client";

import Image from "next/image";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

function getInitials(name: string) {
  return (
    String(name)
      .split(" ")
      .filter(Boolean)
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "AI"
  );
}

function getInitialColor(name: string) {
  const colors = [
    "bg-[#071f4d]",
    "bg-blue-700",
    "bg-violet-700",
    "bg-indigo-700",
    "bg-sky-700",
    "bg-cyan-700",
  ];

  const total = String(name)
    .split("")
    .reduce((sum, char) => sum + char.charCodeAt(0), 0);

  return colors[total % colors.length];
}

type ProfileDraft = { fullName: string };

type PendingNavigation =
  | { type: "link"; href: string }
  | { type: "back" };

export default function ProfilePage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const hasHistoryGuardRef = useRef(false);
  const allowBackNavigationRef = useRef(false);

  const [userId, setUserId] = useState("");
  const [fullName, setFullName] = useState("Learner");
  const [email, setEmail] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [savedProfile, setSavedProfile] = useState<ProfileDraft | null>(null);
  const [pendingNavigation, setPendingNavigation] =
    useState<PendingNavigation | null>(null);

  const initials = useMemo(() => getInitials(fullName), [fullName]);
  const avatarColor = useMemo(() => getInitialColor(fullName), [fullName]);
  const hasUnsavedChanges =
    savedProfile !== null &&
    fullName !== savedProfile.fullName;

  useEffect(() => {
    async function loadProfile() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      setUserId(user.id);
      setEmail(user.email || "");

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("full_name, avatar_url, email")
        .eq("id", user.id)
        .maybeSingle();

      if (profileError) { setError("Your profile could not be loaded. Please refresh and try again."); setLoading(false); return; }

      const fallbackName =
        user.user_metadata?.full_name ||
        user.user_metadata?.name ||
        user.email?.split("@")[0] ||
        "Learner";

      if (!profile) {
        await supabase.from("profiles").insert({
          id: user.id,
          full_name: fallbackName,
          avatar_url: "",
          email: user.email,
          learner_role: "student",
          learning_pace: "steady",
          explanation_style: "balanced",
        });

        setFullName(fallbackName);
        setAvatarUrl("");
        setSavedProfile({ fullName: fallbackName });
        setLoading(false);
        return;
      }

      const loadedProfile: ProfileDraft = { fullName: profile.full_name || fallbackName };

      setFullName(loadedProfile.fullName);
      setAvatarUrl(profile.avatar_url || "");
      setSavedProfile(loadedProfile);
      setLoading(false);
    }

    loadProfile();
  }, [router]);

  // Browser refreshes and tab closes use the browser's native leave warning.
  useEffect(() => {
    if (!hasUnsavedChanges) return;

    const warnBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", warnBeforeUnload);
    return () => window.removeEventListener("beforeunload", warnBeforeUnload);
  }, [hasUnsavedChanges]);

  // Add one same-page history entry to catch the browser Back button before
  // Next.js navigates away and destroys the unsaved form.
  useEffect(() => {
    if (!hasUnsavedChanges || hasHistoryGuardRef.current) return;

    window.history.pushState(
      { ...window.history.state, __gahnProfileGuard: true },
      "",
      window.location.href
    );
    hasHistoryGuardRef.current = true;
  }, [hasUnsavedChanges]);

  useEffect(() => {
    const handleBack = () => {
      if (!hasHistoryGuardRef.current || allowBackNavigationRef.current) return;
      hasHistoryGuardRef.current = false;

      if (hasUnsavedChanges) {
        window.history.pushState(
          { ...window.history.state, __gahnProfileGuard: true },
          "",
          window.location.href
        );
        hasHistoryGuardRef.current = true;
        setPendingNavigation({ type: "back" });
      } else {
        // After a successful save or reset, skip our extra history entry.
        window.history.back();
      }
    };

    window.addEventListener("popstate", handleBack);
    return () => window.removeEventListener("popstate", handleBack);
  }, [hasUnsavedChanges]);

  useEffect(() => {
    if (!pendingNavigation) return;
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setPendingNavigation(null);
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [pendingNavigation]);

  function handleResetChanges() {
    if (!savedProfile) return;
    setFullName(savedProfile.fullName);
    setError("");
    setMessage("");
  }

  function handleProfileLink(
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) {
    if (
      !hasUnsavedChanges ||
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    event.preventDefault();
    setPendingNavigation({ type: "link", href });
  }

  function leaveProfile(navigation: PendingNavigation) {
    setPendingNavigation(null);
    if (navigation.type === "back") {
      allowBackNavigationRef.current = true;
      window.history.go(-2);
    } else {
      router.push(navigation.href);
    }
  }

  async function handleSaveAndLeave() {
    if (!pendingNavigation) return;
    const navigation = pendingNavigation;
    if (await handleSaveName()) leaveProfile(navigation);
  }

  async function handleSaveName(): Promise<boolean> {
    if (saving || !userId) return false;
    setSaving(true);
    setError("");
    setMessage("");

    const cleanName = fullName.trim();

    if (!cleanName) {
      setSaving(false);
      setError("Name cannot be empty.");
      return false;
    }

    const savedValues: ProfileDraft = { fullName: cleanName };

    const { error: updateError } = await supabase
      .from("profiles")
      .update({ full_name: cleanName })
      .eq("id", userId);

    setSaving(false);

    if (updateError) {
      setError(updateError.message);
      return false;
    }

    setFullName(cleanName);
    setSavedProfile(savedValues);
    setMessage("Profile updated.");
    return true;
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (!file || !userId) return;
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type) || file.size > 5 * 1024 * 1024) {
      setError("Choose a JPEG, PNG, or WebP image smaller than 5 MB.");
      return;
    }

    setSaving(true);
    setError("");
    setMessage("");

    const fileExt = file.name.split(".").pop();
    const filePath = `${userId}/avatar.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, file, {
        upsert: true,
      });

    if (uploadError) {
      setSaving(false);
      setError(uploadError.message);
      return;
    }

    const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);
    const publicUrl = `${data.publicUrl}?t=${Date.now()}`;

    const { error: updateError } = await supabase
      .from("profiles")
      .update({ avatar_url: publicUrl })
      .eq("id", userId);

    setSaving(false);

    if (updateError) {
      setError(updateError.message);
      return;
    }

    setAvatarUrl(publicUrl);
    setMessage("Profile image updated.");
  }

  if (loading) {
    return (
      <main id="main-content" className="min-h-screen bg-white p-10 text-[#061633]">
        <p className="font-semibold">Loading profile...</p>
      </main>
    );
  }

  return (
    <>
    <main id="main-content" className="min-h-screen bg-[#F6F8FB] px-5 py-8 text-[#142B47] sm:px-8 sm:py-10">
      <div className="mx-auto max-w-3xl">
        <Link href="/dashboard" onClick={(event) => handleProfileLink(event, "/dashboard")} className="text-lg font-semibold text-blue-600">
          ← Back to Dashboard
        </Link>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Edit Profile</h1>
          <Link href="/settings" onClick={(event) => handleProfileLink(event, "/settings")} className="rounded-xl border border-[#D7E3F2] bg-[#F8FBFF] px-4 py-2.5 text-sm font-semibold text-[#071F4D]">Settings</Link>
        </div>
        <p className="mt-3 text-base text-[#53657D]">
          Update your name and profile image.
        </p>

        <section className="mt-8 rounded-2xl border border-[#DCE3EC] bg-white p-5 shadow-sm sm:p-8">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-center">
            {avatarUrl ? (
              <Image unoptimized width={1200} height={800}
                src={avatarUrl}
                alt="Profile"
                onError={() => setAvatarUrl("")}
                className="h-32 w-32 rounded-full object-cover"
              />
            ) : (
              <div
                className={`grid h-32 w-32 place-items-center rounded-full ${avatarColor} text-4xl font-semibold text-white`}
              >
                {initials}
              </div>
            )}

            <div>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="rounded-2xl bg-[#071f4d] px-8 py-4 text-lg font-semibold text-white"
              >
                Change Image
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleImageUpload}
                className="hidden"
              />

              <p className="mt-3 text-sm text-black">
                If no image is uploaded, your initials will show automatically.
              </p>
            </div>
          </div>

          <div className="mt-10">
            <label htmlFor="profile-full-name" className="text-sm font-semibold uppercase tracking-[0.14em] text-black">
              Full Name
            </label>

            <input
              id="profile-full-name"
              maxLength={100}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="mt-3 w-full rounded-2xl border border-slate-200 px-5 py-4 text-lg outline-none focus:border-blue-500"
            />
          </div>

          <div className="mt-7">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-black">Email address</p>
            <p className="mt-3 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-base text-slate-600">{email || "Not available"}</p>
          </div>

          {error && (
            <p className="mt-6 rounded-xl bg-red-50 p-4 text-red-600">
              {error}
            </p>
          )}

          {message && (
            <p className="mt-6 rounded-xl bg-green-50 p-4 text-green-700">
              {message}
            </p>
          )}

          <button
            type="button"
            onClick={() => void handleSaveName()}
            disabled={saving}
            className="mt-8 rounded-2xl bg-blue-600 px-8 py-4 text-lg font-semibold text-white disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save Profile"}
          </button>
        </section>
      </div>
    </main>

    {hasUnsavedChanges && (
      <div className="fixed inset-x-4 bottom-4 z-50 mx-auto flex max-w-3xl flex-col gap-3 rounded-2xl border border-[#1C3666] bg-[#071F4D] px-5 py-4 text-white shadow-[0_18px_50px_rgba(7,31,77,0.28)] sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-base font-bold">You have unsaved changes</p>
          <p className="mt-1 text-sm text-white/80">Save your profile before leaving this page.</p>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <button
            type="button"
            onClick={handleResetChanges}
            disabled={saving}
            className="rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10 disabled:opacity-50"
          >
            Reset
          </button>
          <button
            type="button"
            onClick={() => void handleSaveName()}
            disabled={saving}
            className="rounded-lg bg-white px-5 py-2.5 text-sm font-bold text-[#071F4D] transition hover:bg-[#E8F0FF] disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    )}

    {pendingNavigation && (
      <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 px-4">
        <div
          role="alertdialog"
          aria-modal="true"
          aria-labelledby="unsaved-profile-title"
          aria-describedby="unsaved-profile-description"
          className="w-full max-w-md rounded-2xl bg-white p-6 text-[#061633] shadow-2xl"
        >
          <h2 id="unsaved-profile-title" className="text-xl font-semibold">
            Save changes before leaving?
          </h2>
          <p id="unsaved-profile-description" className="mt-3 text-sm leading-6 text-slate-600">
            Your new profile settings have not been saved. Leaving now will discard them.
          </p>
          {error && <p className="mt-3 text-sm font-medium text-red-600">{error}</p>}
          <div className="mt-6 flex flex-wrap justify-end gap-2">
            <button
              type="button"
              autoFocus
              onClick={() => setPendingNavigation(null)}
              className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-[#061633]"
            >
              Keep Editing
            </button>
            <button
              type="button"
              onClick={() => leaveProfile(pendingNavigation)}
              className="rounded-lg border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-700"
            >
              Discard Changes
            </button>
            <button
              type="button"
              onClick={() => void handleSaveAndLeave()}
              disabled={saving}
              className="rounded-lg bg-[#0B5CFF] px-4 py-2.5 text-sm font-bold text-white disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save & Leave"}
            </button>
          </div>
        </div>
      </div>
    )}
    </>
  );
}