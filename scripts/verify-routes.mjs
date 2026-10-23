// Read-only HTTP acceptance checks against a local production build. No browser,
// signups, learner writes, payment sessions, or provider calls are performed.
import assert from "node:assert/strict";
import fs from "node:fs";
import { execFileSync, spawn } from "node:child_process";
import { setTimeout as delay } from "node:timers/promises";

execFileSync(process.execPath, ["scripts/verify-curriculum.mjs", "--manifest"], { stdio: "inherit" });
const routes = JSON.parse(fs.readFileSync("/tmp/gahn-route-manifest.json", "utf8"));
const base = "http://127.0.0.1:3147";
const server = spawn(process.execPath, ["node_modules/next/dist/bin/next", "start", "--hostname", "127.0.0.1", "--port", "3147"], { stdio: ["ignore", "ignore", "pipe"] });
let log = "";
server.stderr.on("data", chunk => { log = (log + chunk).slice(-2000); });

try {
  let ready = false;
  for (let attempt = 0; attempt < 80; attempt++) {
    try { await fetch(base, { signal: AbortSignal.timeout(1000) }); ready = true; break; }
    catch { await delay(250); }
  }
  assert(ready, `Local production server unavailable: ${log}`);
  const failures = [];
  let cursor = 0;
  await Promise.all(Array.from({ length: 6 }, async () => {
    while (cursor < routes.length) {
      const route = routes[cursor++];
      const response = await fetch(base + route, { signal: AbortSignal.timeout(20000) });
      const body = await response.text();
      if (response.status !== 200 || body.includes("Application error:") || body.includes("BrainWorldIcon Development")) failures.push({ route, status: response.status });
    }
  }));
  assert.deepEqual(failures, [], "Public routes or assets failed");

  const accountRoutes = ["/dashboard", "/profile", "/settings", "/notes", "/study-guides", "/progress", "/assigned-homework", "/feedback"];
  for (const route of accountRoutes) {
    const response = await fetch(base + route, { redirect: "manual" });
    assert.equal(response.status, 307, `Missing signed-out redirect: ${route}`);
    assert(response.headers.get("location")?.includes("/login?error=session_expired"));
  }
  const pausedRoutes = ["/api/instructor", "/api/homework/analyze", "/api/liveavatar/session"];
  for (const route of pausedRoutes) {
    const response = await fetch(base + route, { method: "POST", body: "{}", headers: { "Content-Type": "application/json" } });
    assert.equal(response.status, 503);
    assert.equal((await response.json()).code, "LESSONS_NOT_LAUNCHED");
  }
  for (const route of ["/learn/career-skills/retired-nurse", "/lesson/custom?world=career-skills&section=software-developer-engineer&lesson=not-real", "/learn/constructor/test/test", "/learn/not-a-world"]) {
    const response = await fetch(base + route);
    assert.equal(response.status, 404, `Invalid preview route must return 404: ${route}`);
  }
  console.log(JSON.stringify({ publicRoutesAndAssets: routes.length, signedOutRedirects: accountRoutes.length, pausedApiRoutes: pausedRoutes.length, invalidRoutes: 4, status: "passed" }, null, 2));
} finally {
  server.kill("SIGTERM");
}
