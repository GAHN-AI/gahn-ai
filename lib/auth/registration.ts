import type { SupabaseClient, User } from "@supabase/supabase-js";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { isEmailSignup } from "./policy";

export async function registrationStatus(client: SupabaseClient, id: string) {
  const { data, error } = await client
    .from("account_registrations")
    .select("id")
    .eq("id", id)
    .maybeSingle();
  if (error) throw new Error("registration_unavailable");
  return Boolean(data);
}
export async function completeRegistration(
  user: User,
  explicitSignup: boolean,
) {
  if (!user.email_confirmed_at || user.is_anonymous)
    throw new Error("verification_required");
  const registered = await registrationStatus(supabaseAdmin, user.id);
  // Never treat an automatically confirmed email/password account as proof
  // that its owner clicked a verification link. Only an Auth callback can
  // complete the first email registration. Existing registrations are unaffected.
  if (!registered && !explicitSignup) return false;
  // The existing database trigger normally creates this. Ignore duplicate IDs
  // to avoid replacing names, avatars, or other saved profile data.
  const { error: profileError } = await supabaseAdmin.from("profiles").upsert(
    {
      id: user.id,
      email: user.email ?? null,
      full_name:
        typeof user.user_metadata.full_name === "string"
          ? user.user_metadata.full_name
          : "Learner",
    },
    { onConflict: "id", ignoreDuplicates: true },
  );
  if (profileError) throw new Error("profile_setup_failed");
  if (!registered) {
    const { error } = await supabaseAdmin.from("account_registrations").upsert(
      {
        id: user.id,
        method: isEmailSignup(user) ? "email" : "google",
      },
      { onConflict: "id", ignoreDuplicates: true },
    );
    if (error) throw new Error("registration_unavailable");
  }
  return true;
}
