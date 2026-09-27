"use client";

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

export default function ProfilePage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [userId, setUserId] = useState("");
  const [fullName, setFullName] = useState("Learner");
  const [email, setEmail] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [billingLoading, setBillingLoading] = useState(false);
  const [planId, setPlanId] = useState("explore");
  const [planName, setPlanName] = useState("Early Access");
  const [cancelAtPeriodEnd, setCancelAtPeriodEnd] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const initials = useMemo(() => getInitials(fullName), [fullName]);
  const avatarColor = useMemo(() => getInitialColor(fullName), [fullName]);

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

      const subscriptionResponse = await fetch("/api/subscription/current");

      if (subscriptionResponse.ok) {
        const subscription = await subscriptionResponse.json();
        setPlanId(subscription.planId || "explore");
        setPlanName(subscription.entitlements?.name || "Early Access");
        setCancelAtPeriodEnd(Boolean(subscription.cancelAtPeriodEnd));
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name, avatar_url, email")
        .eq("id", user.id)
        .maybeSingle();

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
        });

        setFullName(fallbackName);
        setAvatarUrl("");
        setLoading(false);
        return;
      }

      setFullName(profile.full_name || fallbackName);
      setAvatarUrl(profile.avatar_url || "");
      setLoading(false);
    }

    loadProfile();
  }, [router]);

  async function handleSaveName() {
    setSaving(true);
    setError("");
    setMessage("");

    const cleanName = fullName.trim();

    if (!cleanName) {
      setSaving(false);
      setError("Name cannot be empty.");
      return;
    }

    const { error: updateError } = await supabase
      .from("profiles")
      .update({ full_name: cleanName })
      .eq("id", userId);

    setSaving(false);

    if (updateError) {
      setError(updateError.message);
      return;
    }

    setMessage("Profile updated.");
  }

  async function handleManageSubscription() {
    setBillingLoading(true);
    setError("");

    try {
      const response = await fetch("/api/stripe/portal", {
        method: "POST",
      });

      const data = await response.json();

      if (!response.ok || !data.url) {
        setError(data.error || "Could not open subscription management.");
        setBillingLoading(false);
        return;
      }

      window.location.href = data.url;
    } catch {
      setError("Could not open subscription management.");
      setBillingLoading(false);
    }
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (!file || !userId) return;

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
      <main className="min-h-screen bg-white p-10 text-[#061633]">
        <p className="font-black">Loading profile...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white px-8 py-10 text-[#061633] lg:[zoom:0.85] xl:[zoom:0.75] 2xl:[zoom:0.85]">
      <div className="mx-auto max-w-3xl">
        <Link href="/dashboard" className="text-lg font-black text-blue-600">
          ← Back to Dashboard
        </Link>

        <h1 className="mt-10 text-5xl font-black">Edit Profile</h1>
        <p className="mt-4 text-xl text-slate-600">
          Update your name and profile image.
        </p>

        <section className="mt-12 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-center">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt="Profile"
                onError={() => setAvatarUrl("")}
                className="h-32 w-32 rounded-full object-cover"
              />
            ) : (
              <div
                className={`grid h-32 w-32 place-items-center rounded-full ${avatarColor} text-4xl font-black text-white`}
              >
                {initials}
              </div>
            )}

            <div>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="rounded-2xl bg-[#071f4d] px-8 py-4 text-lg font-black text-white"
              >
                Change Image
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />

              <p className="mt-3 text-sm text-slate-500">
                If no image is uploaded, your initials will show automatically.
              </p>
            </div>
          </div>

          <div className="mt-10">
            <label className="text-sm font-black uppercase tracking-[0.14em] text-slate-500">
              Full Name
            </label>

            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="mt-3 w-full rounded-2xl border border-slate-200 px-5 py-4 text-lg outline-none focus:border-blue-500"
            />
          </div>

          <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm font-black uppercase tracking-[0.14em] text-slate-500">
              Current Plan
            </p>
            <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xl font-black text-[#061633]">{planName}</p>
                <p className="mt-1 text-sm text-slate-600">
                  {cancelAtPeriodEnd
                    ? "Your paid plan remains active until the end of the current billing period."
                    : planId === "explore"
                      ? "Free during the GAHN AI early-access period."
                      : "Your dashboard and feature access follow this subscription automatically."}
                </p>
              </div>

              {planId !== "explore" ? (
                <button
                  type="button"
                  onClick={handleManageSubscription}
                  disabled={billingLoading}
                  className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-black text-[#061633] disabled:opacity-60"
                >
                  {billingLoading ? "Opening..." : "Manage Subscription"}
                </button>
              ) : (
                <Link
                  href="/pricing"
                  className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-center text-sm font-black text-[#061633]"
                >
                  View Plan
                </Link>
              )}
            </div>
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
            onClick={handleSaveName}
            disabled={saving}
            className="mt-8 rounded-2xl bg-blue-600 px-8 py-4 text-lg font-black text-white disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save Profile"}
          </button>
        </section>
      </div>
    </main>
  );
}