export const AUTH_INTENT_COOKIE = "gahn-auth-intent";
export const AUTH_CALLBACK_PATH = "/auth/callback";
export const ACCOUNT_PATHS = [
  "/dashboard",
  "/profile",
  "/settings",
  "/feedback",
  "/notes",
  "/study-guides",
  "/progress",
  "/assigned-homework",
  "/learn",
  "/lesson",
];
export function isAccountPath(path: string) {
  return ACCOUNT_PATHS.some(
    (prefix) => path === prefix || path.startsWith(`${prefix}/`),
  );
}
export function authOrigin(url: URL) {
  const hosts = new Set(["gahnai.com", "www.gahnai.com"]);
  for (const value of [
    process.env.VERCEL_URL,
    process.env.VERCEL_BRANCH_URL,
    process.env.NEXT_PUBLIC_SITE_URL,
  ]) {
    if (value) {
      try {
        hosts.add(
          new URL(value.includes("://") ? value : `https://${value}`).host,
        );
      } catch {}
    }
  }
  if (
    (url.protocol === "https:" && hosts.has(url.host)) ||
    (process.env.VERCEL !== "1" &&
      ["localhost", "127.0.0.1"].includes(url.hostname))
  )
    return url.origin;
  return "https://www.gahnai.com";
}
export function authRequestOrigin(request: Request) {
  const url = new URL(request.url);
  const host = request.headers.get("host");
  if (host) {
    try {
      const candidate = new URL(`${url.protocol}//${host}`);
      if (!["localhost", "127.0.0.1"].includes(candidate.hostname)) candidate.protocol = "https:";
      // Host is only used after checking the exact production/deployment allowlist.
      if (authOrigin(candidate) === candidate.origin) return candidate.origin;
    } catch { /* Use the validated request URL below. */ }
  }
  return authOrigin(url);
}
export function sameOriginPost(request: Request) {
  return request.headers.get("origin") === authRequestOrigin(request);
}
export function callbackAtRoot(url: URL) {
  return (
    url.pathname === "/" &&
    ["code", "token_hash", "error", "error_code"].some((key) =>
      url.searchParams.has(key),
    )
  );
}
export function isEmailSignup(user: { app_metadata: { provider?: string } }) {
  // Auth-owned original provider, never user-editable metadata or the presence
  // of a later linked password identity.
  return user.app_metadata.provider === "email";
}
