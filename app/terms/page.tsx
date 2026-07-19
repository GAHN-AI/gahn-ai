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

export default function TermsPage() {
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
          Terms of Service
        </h1>
        <p className="mt-3 text-sm text-[#5B6472]">Last updated: 7/18/2026</p>

        <div className="mt-8 rounded-2xl border border-[#E3E6EC] bg-[#F7F8FA] p-6 text-sm leading-6 text-[#5B6472]">
          This is a starter draft written to match GAHN AI&apos;s current
          product. It is not legal advice. Have a lawyer review it before
          launch — particularly the age-eligibility, subscription, and
          liability sections — given that GAHN AI is intended for students of
          varying ages.
        </div>

        <div className="mt-8">
          <Section title="1. Agreement to these terms">
            <p>
              By creating an account or using GAHN AI, you agree to these
              Terms of Service. If you do not agree, please do not use the
              platform.
            </p>
          </Section>

          <Section title="2. Who can use GAHN AI">
            <p>
              GAHN AI is designed to be usable by learners of many ages.
              [Placeholder — define your actual minimum age and any
              parental-consent requirement for younger users here, in line
              with your Privacy Policy and applicable law, before launch.] If
              you are under the age required in your region to agree to
              these terms on your own, a parent or guardian must review and
              accept these terms on your behalf.
            </p>
          </Section>

          <Section title="3. Your account">
            <ul className="list-disc space-y-1 pl-5">
              <li>You're responsible for keeping your account credentials secure.</li>
              <li>You're responsible for activity that happens under your account.</li>
              <li>Provide accurate information when creating your account and keep it up to date.</li>
              <li>Contact us right away if you believe your account has been accessed without authorization.</li>
            </ul>
          </Section>

          <Section title="4. Acceptable use">
            <p>You agree not to:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Use GAHN AI for anything illegal or harmful.</li>
              <li>Harass, abuse, or spam other users or AI instructors.</li>
              <li>Attempt to bypass, disrupt, or interfere with the platform's security or normal operation.</li>
              <li>Copy, resell, or redistribute GAHN AI's content or platform without permission.</li>
              <li>Submit inappropriate content through lessons, notes, or any other feature.</li>
            </ul>
            <p>
              Violations may result in a warning, temporary suspension, or
              permanent account termination, depending on severity.
            </p>
          </Section>

          <Section title="5. AI instructors and learning content">
            <p>
              GAHN AI's AI instructors are designed to teach, check
              understanding, and support learning. They are not human
              teachers, licensed educators, or a substitute for professional
              educational, medical, financial, or legal advice presented in
              lesson content. Use judgment, and consult a qualified
              professional for decisions that depend on it.
            </p>
          </Section>

          <Section title="6. Subscriptions and payments">
            <ul className="list-disc space-y-1 pl-5">
              <li>Some features require a paid subscription plan, billed on a recurring basis until canceled.</li>
              <li>You can cancel at any time from your account settings; access continues until the end of the current billing period.</li>
              <li>[Placeholder — add your actual refund policy here.]</li>
              <li>Prices and plans may change; we'll provide notice before changes affecting your subscription take effect.</li>
            </ul>
          </Section>

          <Section title="7. Your content">
            <p>
              You retain ownership of notes and content you create on GAHN
              AI. By using the platform, you give us permission to store and
              process that content in order to provide the service to you
              (for example, saving your notes and tracking your progress).
            </p>
          </Section>

          <Section title="8. Termination">
            <p>
              You may stop using GAHN AI and delete your account at any time.
              We may suspend or terminate accounts that violate these terms
              or that we reasonably believe pose a risk to the platform or
              other users.
            </p>
          </Section>

          <Section title="9. Disclaimers and limitation of liability">
            <p>
              GAHN AI is provided &quot;as is.&quot; We work to keep the
              platform accurate, available, and secure, but we don&apos;t
              guarantee it will be error-free or uninterrupted. [Placeholder —
              have a lawyer draft the specific liability-limitation language
              appropriate for your jurisdiction and business structure.]
            </p>
          </Section>

          <Section title="10. Changes to these terms">
            <p>
              We may update these terms as GAHN AI grows. We&apos;ll update
              the &quot;Last updated&quot; date above and post meaningful
              changes in a visible way.
            </p>
          </Section>

          <Section title="11. Contact us">
            <p>
              Questions about these terms? Email{" "}
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