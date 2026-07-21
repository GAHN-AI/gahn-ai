"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const shellClass = "mx-auto w-full max-w-[820px] px-5 sm:px-8";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
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
            <p className="text-xl font-extrabold tracking-[-0.025em]">
              GAHN AI
            </p>
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

        <p className="mt-3 text-sm text-[#5B6472]">
          Last updated: July 18, 2026
        </p>

        <div className="mt-6">
          <Section title="1. Who we are">
            <p>
              GAHN AI (&quot;GAHN AI,&quot; &quot;we,&quot; &quot;us,&quot;
              or &quot;our&quot;) operates the GAHN AI website, applications,
              and learning platform available through gahnai.com.
            </p>

            <p>
              This Privacy Policy explains what information we collect, how we
              use and share it, how long we retain it, and the choices available
              to you.
            </p>
          </Section>

          <Section title="2. Information we collect">
            <p>
              We may collect the following categories of information when you
              create an account, subscribe, contact us, or use the platform:
            </p>

            <ul className="list-disc space-y-2 pl-5">
              <li>
                <strong>Account information:</strong> your name, email address,
                account identifier, login credentials, and authentication
                information.
              </li>

              <li>
                <strong>Profile information:</strong> your profile image,
                learning interests, selected learning worlds, goals, and other
                information you choose to add.
              </li>

              <li>
                <strong>Learning information:</strong> lesson activity,
                responses, practice attempts, mistakes, retries, notes,
                instructor interactions, recommendations, progress, streaks,
                completion records, and learning history.
              </li>

              <li>
                <strong>Communications:</strong> messages, support requests,
                feedback, and other information you send to us.
              </li>

              <li>
                <strong>Subscription information:</strong> plan type,
                subscription status, billing history, transaction identifiers,
                and limited payment details provided by our payment processor.
                We do not directly store full payment-card numbers.
              </li>

              <li>
                <strong>Device and usage information:</strong> IP address,
                browser type, device type, operating system, pages viewed,
                buttons clicked, session activity, referring pages, and
                approximate location derived from an IP address.
              </li>

              <li>
                <strong>Security and diagnostic information:</strong> login
                attempts, error reports, performance data, fraud signals, and
                activity used to protect the platform.
              </li>
            </ul>
          </Section>

          <Section title="3. How we use your information">
            <p>We use information to:</p>

            <ul className="list-disc space-y-2 pl-5">
              <li>Create, authenticate, maintain, and secure your account.</li>

              <li>
                Provide AI-guided lessons, practice exercises, corrections,
                recommendations, notes, recaps, and progress tracking.
              </li>

              <li>
                Personalize lesson difficulty, pacing, content, and instructor
                responses based on your activity.
              </li>

              <li>
                Process subscriptions, payments, cancellations, and billing
                records.
              </li>

              <li>
                Send account notices, security alerts, receipts, service
                updates, and responses to support requests.
              </li>

              <li>
                Analyze platform usage, improve features, test performance, fix
                technical problems, and develop new services.
              </li>

              <li>
                Detect fraud, abuse, unauthorized access, harmful activity, and
                violations of our Terms of Service.
              </li>

              <li>
                Comply with legal obligations and protect our users, rights,
                property, and platform.
              </li>
            </ul>
          </Section>

          <Section title="4. AI processing">
            <p>
              Information you submit during lessons may be processed by
              automated systems to generate explanations, feedback, practice
              questions, recommendations, and lesson adjustments.
            </p>

            <p>
              AI-generated responses may be based on your lesson history,
              previous answers, saved preferences, and progress information so
              the platform can provide a more personalized learning experience.
            </p>

            <p>
              Do not submit highly sensitive personal information, financial
              account credentials, government identification numbers, medical
              records, or other confidential information through AI lesson
              inputs or notes.
            </p>
          </Section>

          <Section title="5. Age requirements and children's privacy">
            <p>
              GAHN AI is not intended for children under 13 years old. We do not
              knowingly permit children under 13 to create accounts or provide
              personal information through the platform.
            </p>

            <p>
              Users who are at least 13 but have not reached the legal age to
              enter a binding agreement in their location may use GAHN AI only
              with permission from a parent or legal guardian.
            </p>

            <p>
              If we learn that personal information was collected from a child
              under 13, we will take reasonable steps to delete the information
              and close the related account.
            </p>

            <p>
              A parent or guardian who believes a child under 13 has provided
              information to us may contact support@gahnai.com.
            </p>
          </Section>

          <Section title="6. How we share information">
            <p>
              We do not sell your personal information. We may share
              information in the following circumstances:
            </p>

            <ul className="list-disc space-y-2 pl-5">
              <li>
                <strong>Service providers:</strong> companies that provide
                hosting, authentication, databases, payments, analytics, email,
                security, error monitoring, and AI-processing services.
              </li>

              <li>
                <strong>Legal and safety reasons:</strong> when disclosure is
                reasonably necessary to comply with law, respond to lawful
                requests, investigate fraud, enforce our terms, or protect
                users and the platform.
              </li>

              <li>
                <strong>Business transfers:</strong> in connection with a
                merger, financing, acquisition, reorganization, bankruptcy, or
                sale of all or part of the business.
              </li>

              <li>
                <strong>With your direction:</strong> when you ask us to share
                information or authorize an integration or service.
              </li>
            </ul>
          </Section>

          <Section title="7. Service providers">
            <p>
              GAHN AI may use third-party providers to operate the platform,
              including services for hosting, databases, authentication,
              payment processing, email delivery, analytics, error monitoring,
              and security.
            </p>

            <p>
              These providers may process information only as needed to perform
              services for us and are subject to their own security and privacy
              obligations.
            </p>
          </Section>

          <Section title="8. Cookies and similar technologies">
            <p>
              We use cookies, local storage, and similar technologies to keep
              users signed in, remember preferences, maintain security, measure
              usage, diagnose problems, and improve the platform.
            </p>

            <p>
              You may restrict cookies through your browser settings. Blocking
              necessary cookies may prevent login, account management, or other
              platform features from working correctly.
            </p>
          </Section>

          <Section title="9. Data retention">
            <p>
              We retain personal information for as long as reasonably
              necessary to provide the platform, maintain your account, comply
              with legal and financial obligations, resolve disputes, enforce
              agreements, and protect the platform.
            </p>

            <p>
              When you request account deletion, we will delete or anonymize
              information that is no longer required, subject to legal,
              security, fraud-prevention, backup, and recordkeeping
              requirements.
            </p>
          </Section>

          <Section title="10. Data security">
            <p>
              We use reasonable administrative, technical, and organizational
              safeguards designed to protect personal information from
              unauthorized access, alteration, disclosure, loss, or misuse.
            </p>

            <p>
              These measures may include encrypted connections, access
              controls, authentication protections, monitoring, backups, and
              restricted administrative access.
            </p>

            <p>
              No system, storage method, or internet transmission can be
              guaranteed to be completely secure.
            </p>
          </Section>

          <Section title="11. Your privacy choices and rights">
            <p>
              Depending on your location and applicable law, you may have the
              right to:
            </p>

            <ul className="list-disc space-y-2 pl-5">
              <li>Access personal information we maintain about you.</li>
              <li>Correct inaccurate or incomplete information.</li>
              <li>Request deletion of certain personal information.</li>
              <li>Request a portable copy of certain information.</li>
              <li>Object to or restrict certain processing.</li>
              <li>Withdraw consent where processing is based on consent.</li>
              <li>
                Opt out of certain sales, sharing, or targeted advertising where
                applicable.
              </li>
              <li>
                Appeal a decision concerning a privacy request where required.
              </li>
            </ul>

            <p>
              We may need to verify your identity before completing a request.
              Some rights are subject to exceptions under applicable law.
            </p>

            <p>
              To submit a privacy request, email support@gahnai.com with the
              subject line &quot;Privacy Request.&quot;
            </p>
          </Section>

          <Section title="12. International data processing">
            <p>
              Your information may be processed and stored in the United States
              or other countries where GAHN AI or its service providers
              operate.
            </p>

            <p>
              Those locations may have privacy laws different from the laws in
              your location. Where required, we use appropriate safeguards for
              international transfers.
            </p>
          </Section>

          <Section title="13. Third-party links">
            <p>
              The platform may contain links to websites or services operated
              by other companies. Their privacy practices are governed by their
              own policies, and GAHN AI is not responsible for their content or
              privacy practices.
            </p>
          </Section>

          <Section title="14. Changes to this policy">
            <p>
              We may update this Privacy Policy to reflect changes to the
              platform, our practices, or legal requirements.
            </p>

            <p>
              We will update the &quot;Last updated&quot; date and may provide
              additional notice when a change materially affects how we handle
              personal information.
            </p>
          </Section>

          <Section title="15. Contact us">
            <p>
              For questions, account-deletion requests, or privacy requests,
              email{" "}
              <a
                href="mailto:support@gahnai.com"
                className="font-semibold text-[#2952A3]"
              >
                support@gahnai.com
              </a>
              .
            </p>
          </Section>
        </div>
      </section>
    </main>
  );
}