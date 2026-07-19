"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const shellClass = "mx-auto w-full max-w-[820px] px-5 sm:px-8";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-[#E3E6EC] py-8 last:border-0">
      <h2 className="text-xl font-bold text-[#0A1628]">{title}</h2>
      <div className="mt-3 space-y-3 text-base leading-7 text-[#5B6472]">
        {children}
      </div>
    </div>
  );
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white font-sans text-[#0A1628]">
      <header className="border-b border-[#E3E6EC]">
        <div className={`${shellClass} flex items-center justify-between py-5`}>
          <Link href="/" className="flex items-center gap-3">
            <img
              src="/logo/favicon.png"
              alt="GAHN AI"
              className="h-10 w-10 rounded-full object-cover"
            />
            <p className="text-xl font-extrabold tracking-[-0.025em]">GAHN AI</p>
          </Link>

          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-semibold text-[#5B6472] transition hover:text-[#2952A3]"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={1.75} />
            Back to home
          </Link>
        </div>
      </header>

      <section className={`${shellClass} py-14 sm:py-16`}>
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#2952A3]">
          Legal
        </p>
        <h1 className="mt-3 text-4xl font-extrabold tracking-[-0.03em]">
          Privacy Policy
        </h1>
        <p className="mt-3 text-sm text-[#5B6472]">Last updated: 7/18/2026</p>

        <div className="mt-8 rounded-2xl border border-[#E3E6EC] bg-[#F7F8FA] p-6 text-sm leading-6 text-[#5B6472]">
          This is a starter draft written to match GAHN AI&apos;s current
          product. It is not legal advice. Because GAHN AI is intended for
          students of varying ages, review this with a lawyer before
          launch — especially the children&apos;s privacy section — to make
          sure it satisfies COPPA (US), GDPR-K (EU), and any other
          regulations that apply to your users.
        </div>

        <div className="mt-6">
          <Section title="1. Who we are">
            <p>
              GAHN AI (&quot;GAHN AI,&quot; &quot;we,&quot; &quot;us&quot;) operates the
              website and platform at gahnai.com. This policy explains what
              information we collect, how we use it, and the choices you
              have.
            </p>
          </Section>

          <Section title="2. Information we collect">
            <p>When you create an account or use GAHN AI, we may collect:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Account information: name, email address, and password (or Google account details if you sign in with Google).</li>
              <li>Profile information: profile picture and any details you add to your profile.</li>
              <li>Learning activity: lessons started or completed, notes you save, progress, streaks, and AI instructor session history.</li>
              <li>Technical information: device and browser type, IP address, and general usage data collected automatically.</li>
              <li>Payment information, if you subscribe to a paid plan (processed securely by our payment provider — we do not store your full card details ourselves).</li>
            </ul>
          </Section>

          <Section title="3. How we use your information">
            <ul className="list-disc space-y-1 pl-5">
              <li>To create and maintain your account.</li>
              <li>To run and personalize AI instructor lessons, track your progress, and save your notes.</li>
              <li>To communicate with you about your account, updates, or support requests.</li>
              <li>To improve the platform, fix bugs, and understand how features are used.</li>
              <li>To process payments for paid subscription plans.</li>
              <li>To keep the platform secure and prevent abuse.</li>
            </ul>
          </Section>

          <Section title="4. Children's privacy">
            <p>
              GAHN AI is designed to be usable by learners of many ages,
              including students under 13. [Placeholder — this section needs
              a real, legally reviewed policy before launch.] In general,
              services that knowingly collect data from children under 13
              must comply with COPPA in the United States, which typically
              requires verifiable parental consent, limits on data collection
              and use, and a parent&apos;s right to review or delete their
              child&apos;s data. Do not treat the placeholder language here as
              compliant — replace this section with lawyer-reviewed language
              before accepting signups from minors.
            </p>
          </Section>

          <Section title="5. How we store and protect your data">
            <p>
              Account and learning data is stored using our database and
              authentication provider (Supabase) with access-controlled,
              encrypted infrastructure. We take reasonable technical and
              organizational measures to protect your information, but no
              method of storage or transmission is 100% secure.
            </p>
          </Section>

          <Section title="6. Sharing your information">
            <p>
              We do not sell your personal information. We may share data
              with:
            </p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Service providers who help us run the platform (e.g. hosting, database, payment processing, email).</li>
              <li>Authorities, if required by law or to protect the rights, safety, or security of GAHN AI or its users.</li>
              <li>A successor entity, if GAHN AI is involved in a merger, acquisition, or sale of assets.</li>
            </ul>
          </Section>

          <Section title="7. Your choices and rights">
            <ul className="list-disc space-y-1 pl-5">
              <li>You can review and update your profile information at any time from your account settings.</li>
              <li>You can request a copy of your data or request that we delete your account by contacting us.</li>
              <li>Depending on where you live, you may have additional rights under laws like GDPR or CCPA.</li>
            </ul>
          </Section>

          <Section title="8. Cookies">
            <p>
              We use cookies and similar technologies to keep you signed in,
              remember preferences, and understand how the platform is used.
              You can control cookies through your browser settings.
            </p>
          </Section>

          <Section title="9. Changes to this policy">
            <p>
              We may update this policy as GAHN AI grows. We&apos;ll update
              the &quot;Last updated&quot; date above when we do, and post
              meaningful changes in a visible way.
            </p>
          </Section>

          <Section title="10. Contact us">
            <p>
              Questions about this policy or your data? Email{" "}
              <a href="mailto:hello@gahnai.com" className="font-semibold text-[#2952A3]">
                hello@gahnai.com
              </a>
              .
            </p>
          </Section>
        </div>
      </section>
    </main>
  );
}