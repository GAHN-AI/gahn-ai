// Run with GAHN_PGLITE_MODULE=/absolute/path/to/@electric-sql/pglite/dist/index.js
// This creates an isolated in-memory PostgreSQL database, never a hosted project.
import assert from "node:assert/strict";
import fs from "node:fs";
import { pathToFileURL } from "node:url";
if (!process.env.GAHN_PGLITE_MODULE)
  throw new Error(
    "Set GAHN_PGLITE_MODULE to an installed @electric-sql/pglite module. See docs/authentication-review.md.",
  );
const { PGlite } = await import(pathToFileURL(process.env.GAHN_PGLITE_MODULE));
const db = new PGlite();
const a = "00000000-0000-0000-0000-000000000001";
const b = "00000000-0000-0000-0000-000000000002";
const c = "00000000-0000-0000-0000-000000000003";
await db.exec(`create role anon; create role authenticated; create role service_role bypassrls;
create schema auth; create table auth.users(id uuid primary key, email text);
create function auth.uid() returns uuid language sql stable as $$select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid$$;
grant usage on schema auth to authenticated;
create table public.profiles(id uuid primary key, full_name text);
insert into auth.users values('${a}','existing-a@example.test'),('${b}','existing-b@example.test');
insert into profiles values('${a}','Preserved name');`);
await db.exec(
  fs.readFileSync(
    "supabase/migrations/20261026202929_auth_registration_completion.sql",
    "utf8",
  ),
);
assert.equal(
  (await db.query("select * from account_registrations")).rows.length,
  2,
);
assert.equal((await db.query("select * from auth.users")).rows.length, 2);
assert.equal(
  (await db.query("select full_name from profiles")).rows[0].full_name,
  "Preserved name",
);
await db.exec(`set role authenticated; set request.jwt.claim.sub='${a}';`);
assert.deepEqual(
  (await db.query("select id from account_registrations")).rows,
  [{ id: a }],
);
await assert.rejects(
  db.query(
    `insert into account_registrations(id,method) values('${c}','google')`,
  ),
  /permission denied/,
);
await assert.rejects(
  db.query(`update account_registrations set method='google'`),
  /permission denied/,
);
await assert.rejects(
  db.query("delete from account_registrations"),
  /permission denied/,
);
await db.exec("reset role; set role anon;");
await assert.rejects(
  db.query("select * from account_registrations"),
  /permission denied/,
);
await db.exec(
  `reset role; insert into auth.users values('${c}','new@example.test'); set role service_role;`,
);
await db.query(
  `insert into account_registrations(id,method) values('${c}','google') on conflict(id) do nothing`,
);
await db.query(
  `insert into account_registrations(id,method) values('${c}','google') on conflict(id) do nothing`,
);
assert.equal(
  (await db.query("select * from account_registrations")).rows.length,
  3,
);
await assert.rejects(
  db.query(
    `insert into account_registrations(id,method) values('00000000-0000-0000-0000-000000000004','google')`,
  ),
  /foreign key/,
);
await db.close();
console.log(
  "Auth migration: 10 preservation, RLS, permissions, uniqueness and foreign-key checks passed in isolated PostgreSQL.",
);
