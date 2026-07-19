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
          Terms of Service
        </h1>

        <p className="mt-3 text-sm text-[#5B6472]">
          Last updated: July 18, 2026
        </p>

        <div className="mt-8">
          <Section title="1. Agreement to these terms">
            <p>
              These Terms of Service govern your access to and use of the GAHN
              AI website, applications, AI instructors, lessons, subscriptions,
              and related services.
            </p>

            <p>
              By creating an account, purchasing a subscription, or using GAHN
              AI, you agree to these terms and our Privacy Policy. If you do not
              agree, you may not use the platform.
            </p>
          </Section>

          <Section title="2. Eligibility">
            <p>
              You must be at least 13 years old to create or use a GAHN AI
              account.
            </p>

            <p>
              If you are under the legal age of majority where you live, you
              represent that your parent or legal guardian has reviewed and
              agreed to these terms and permits you to use the platform.
            </p>

            <p>
              A parent or guardian who permits a minor to use GAHN AI is
              responsible for the minor&apos;s activity and compliance with
              these terms.
            </p>
          </Section>

          <Section title="3. Your account">
            <ul className="list-disc space-y-2 pl-5">
              <li>
                You must provide accurate and current account information.
              </li>

              <li>
                You are responsible for protecting your login credentials and
                restricting access to your account.
              </li>

              <li>
                You are responsible for activity performed through your account
                unless caused by our failure to use reasonable security
                measures.
              </li>

              <li>
                You may not sell, transfer, rent, share, or assign your account
                to another person.
              </li>

              <li>
                You must notify us promptly if you suspect unauthorized access
                or misuse of your account.
              </li>
            </ul>
          </Section>

          <Section title="4. Platform services">
            <p>
              GAHN AI provides AI-assisted educational tools, including guided
              lessons, explanations, exercises, feedback, mistake detection,
              retries, recommendations, notes, recaps, and progress tracking.
            </p>

            <p>
              Features, available learning worlds, lesson limits, instructors,
              and subscription benefits may vary by plan and may change as the
              platform develops.
            </p>
          </Section>

          <Section title="5. AI-generated content">
            <p>
              GAHN AI uses automated systems to generate educational content,
              explanations, questions, feedback, and recommendations.
            </p>

            <p>
              AI-generated content may contain errors, incomplete information,
              outdated information, or responses that do not fit your specific
              circumstances. You are responsible for reviewing and verifying
              information before relying on it.
            </p>

            <p>
              AI instructors are not human teachers, licensed professionals, or
              substitutes for professional educational, medical, mental-health,
              legal, financial, tax, or safety advice.
            </p>

            <p>
              Do not use GAHN AI to make emergency, medical, legal, investment,
              financial, or other high-risk decisions without consulting a
              qualified professional.
            </p>
          </Section>

          <Section title="6. Acceptable use">
            <p>You agree not to:</p>

            <ul className="list-disc space-y-2 pl-5">
              <li>Use the platform for unlawful, fraudulent, or harmful acts.</li>

              <li>
                Harass, threaten, exploit, impersonate, or abuse another person.
              </li>

              <li>
                Upload malware, malicious code, harmful files, or content
                designed to damage or disrupt systems.
              </li>

              <li>
                Attempt to bypass security, access restrictions, usage limits,
                payment requirements, or account controls.
              </li>

              <li>
                Probe, scan, reverse engineer, scrape, copy, or extract the
                platform, models, prompts, code, content, or data except where
                expressly permitted by law.
              </li>

              <li>
                Use automated tools to create excessive traffic or place an
                unreasonable burden on the platform.
              </li>

              <li>
                Use the service to create or distribute illegal, deceptive,
                abusive, sexually exploitative, or dangerous content.
              </li>

              <li>
                Infringe intellectual-property, privacy, publicity, or other
                rights.
              </li>

              <li>
                Resell, sublicense, redistribute, or commercially exploit the
                platform without written permission.
              </li>
            </ul>

            <p>
              We may investigate violations and restrict, suspend, or terminate
              access when reasonably necessary to protect users, the platform,
              or third parties.
            </p>
          </Section>

          <Section title="7. Subscriptions and billing">
            <ul className="list-disc space-y-2 pl-5">
              <li>
                Paid plans are billed in advance on a recurring basis at the
                price and billing interval shown during checkout.
              </li>

              <li>
                By subscribing, you authorize GAHN AI and its payment processor
                to charge your selected payment method for recurring
                subscription fees, applicable taxes, and authorized charges.
              </li>

              <li>
                Your subscription automatically renews until you cancel it.
              </li>

              <li>
                You must maintain a valid payment method and accurate billing
                information.
              </li>

              <li>
                Failed or declined payments may result in restricted access,
                suspension, or cancellation of paid features.
              </li>

              <li>
                Subscription limits and included features are described on the
                pricing page or during checkout.
              </li>
            </ul>
          </Section>

          <Section title="8. Cancellation">
            <p>
              You may cancel a subscription at any time through the available
              account or billing-management tools.
            </p>

            <p>
              Cancellation stops future renewals. Unless required otherwise by
              law, you will retain paid access until the end of the current
              billing period and will not receive a prorated refund for unused
              time.
            </p>

            <p>
              Deleting the application, leaving the platform, or stopping use
              does not automatically cancel an active subscription.
            </p>
          </Section>

          <Section title="9. Refund policy">
            <p>
              Subscription charges are generally nonrefundable after a billing
              period begins, except where required by law or where GAHN AI
              determines that a refund is appropriate because of a duplicate
              charge, billing error, unauthorized transaction, or material
              service failure.
            </p>

            <p>
              Refund requests must be submitted to hello@gahnai.com and include
              the account email address, payment date, and reason for the
              request.
            </p>

            <p>
              Approved refunds will be returned to the original payment method.
              Processing times may depend on the payment provider and financial
              institution.
            </p>
          </Section>

          <Section title="10. Price and plan changes">
            <p>
              We may change subscription prices, usage limits, or plan features.
              Price changes affecting an existing recurring subscription will
              apply no earlier than the next renewal following any notice
              required by applicable law.
            </p>

            <p>
              Continuing the subscription after a change becomes effective
              constitutes acceptance of the updated price or plan.
            </p>
          </Section>

          <Section title="11. Your content">
            <p>
              You retain ownership of notes, responses, files, and other content
              you submit to GAHN AI.
            </p>

            <p>
              You grant GAHN AI a limited, worldwide, non-exclusive license to
              host, store, reproduce, process, modify, transmit, and display
              your content only as reasonably necessary to operate, secure,
              improve, and provide the platform.
            </p>

            <p>
              You represent that you have the rights needed to submit your
              content and that it does not violate law or another person&apos;s
              rights.
            </p>
          </Section>

          <Section title="12. GAHN AI intellectual property">
            <p>
              The platform, branding, design, software, lesson structures,
              original content, graphics, interfaces, and related intellectual
              property are owned by GAHN AI or its licensors.
            </p>

            <p>
              These terms provide a limited, personal, revocable,
              non-transferable, and non-exclusive right to use the platform for
              lawful learning purposes. No ownership rights are transferred to
              you.
            </p>
          </Section>

          <Section title="13. Feedback">
            <p>
              If you provide suggestions, ideas, or feedback, you grant GAHN AI
              permission to use that feedback without restriction or payment,
              provided that we do not publicly identify you without permission.
            </p>
          </Section>

          <Section title="14. Third-party services">
            <p>
              GAHN AI may depend on or link to third-party services, including
              payment processors, authentication providers, hosting services,
              analytics providers, and AI systems.
            </p>

            <p>
              Third-party services are governed by their own terms and
              policies. We are not responsible for third-party services outside
              our reasonable control.
            </p>
          </Section>

          <Section title="15. Suspension and termination">
            <p>
              You may stop using GAHN AI at any time. You may also request
              account deletion, subject to required record retention.
            </p>

            <p>
              We may suspend, limit, or terminate access if you violate these
              terms, fail to pay required fees, create security or legal risk,
              misuse the platform, or engage in conduct that may harm GAHN AI,
              its users, or third parties.
            </p>

            <p>
              Provisions concerning intellectual property, payments already
              owed, disclaimers, liability, disputes, and other provisions that
              logically should survive will remain effective after
              termination.
            </p>
          </Section>

          <Section title="16. Service availability and changes">
            <p>
              We may add, modify, restrict, suspend, or discontinue parts of the
              platform. We may also perform maintenance or updates that
              temporarily affect availability.
            </p>

            <p>
              We do not guarantee that every feature, instructor, learning
              world, integration, or lesson will remain available permanently.
            </p>
          </Section>

          <Section title="17. Disclaimer of warranties">
            <p>
              To the fullest extent permitted by law, GAHN AI is provided
              &quot;as is&quot; and &quot;as available&quot; without warranties
              of any kind, whether express, implied, or statutory.
            </p>

            <p>
              We do not warrant that the platform will be uninterrupted,
              error-free, completely secure, accurate, suitable for every
              learning goal, or guaranteed to produce any particular academic,
              professional, financial, or personal result.
            </p>

            <p>
              Nothing in these terms excludes warranties or consumer rights
              that cannot legally be excluded.
            </p>
          </Section>

          <Section title="18. Limitation of liability">
            <p>
              To the fullest extent permitted by law, GAHN AI and its owners,
              employees, contractors, service providers, and affiliates will
              not be liable for indirect, incidental, special, consequential,
              exemplary, or punitive damages, or for lost profits, data,
              opportunities, reputation, or business interruption arising from
              or related to the platform.
            </p>

            <p>
              To the fullest extent permitted by law, GAHN AI&apos;s total
              liability for claims relating to the platform will not exceed the
              greater of the amount you paid to GAHN AI during the three months
              before the event giving rise to the claim or one hundred U.S.
              dollars.
            </p>

            <p>
              These limitations do not apply where liability cannot legally be
              limited or excluded.
            </p>
          </Section>

          <Section title="19. Indemnification">
            <p>
              To the extent permitted by law, you agree to defend, indemnify,
              and hold harmless GAHN AI and its owners, employees, contractors,
              and affiliates from claims, damages, losses, and expenses arising
              from your unlawful use of the platform, your content, or your
              violation of these terms or another person&apos;s rights.
            </p>
          </Section>

          <Section title="20. Governing law and disputes">
            <p>
              These terms are governed by the laws applicable in the state
              where GAHN AI is principally operated, without regard to
              conflict-of-law rules.
            </p>

            <p>
              Before filing a formal legal claim, you agree to contact
              hello@gahnai.com and attempt to resolve the dispute informally
              for at least 30 days.
            </p>

            <p>
              Nothing in this section limits rights or remedies that cannot be
              waived under applicable consumer law.
            </p>
          </Section>

          <Section title="21. Changes to these terms">
            <p>
              We may update these terms to reflect platform changes, business
              practices, security needs, or legal requirements.
            </p>

            <p>
              We will update the &quot;Last updated&quot; date and provide
              additional notice when required. Continued use after updated
              terms become effective means you accept the revised terms.
            </p>
          </Section>

          <Section title="22. General terms">
            <p>
              If any provision is found unenforceable, the remaining provisions
              will remain in effect. Our failure to enforce a provision is not
              a waiver of that provision.
            </p>

            <p>
              You may not transfer your rights or obligations under these terms
              without our permission. We may transfer these terms in connection
              with a business reorganization, financing, merger, acquisition,
              or sale.
            </p>

            <p>
              These terms and the Privacy Policy form the entire agreement
              between you and GAHN AI regarding the platform.
            </p>
          </Section>

          <Section title="23. Contact us">
            <p>
              Questions about these terms, subscriptions, cancellations, or
              refunds may be sent to{" "}
              <a
                href="mailto:hello@gahnai.com"
                className="font-semibold text-[#2952A3]"
              >
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