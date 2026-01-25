'use client';

import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#F7F4EE]">
      {/* Texture overlay */}
      <div className="texture-overlay" />

      {/* Header */}
      <header className="px-6 py-4 border-b border-[#8B9D83]/15 bg-[#FFFCF7]/80 backdrop-blur-sm relative z-10">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="text-xl font-medium text-[#3D3531] hover:text-[#5C6B56] transition-colors"
            style={{ fontFamily: 'var(--font-cormorant), Cormorant Garamond, serif' }}
          >
            Meet In The Field
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/about" className="text-sm text-[#6B6560] hover:text-[#5C6B56] nav-link">About</Link>
            <Link href="/faq" className="text-sm text-[#6B6560] hover:text-[#5C6B56] nav-link">FAQ</Link>
            <Link href="/privacy" className="text-sm text-[#5C6B56] font-medium nav-link">Privacy</Link>
            <Link href="/support" className="text-sm text-[#6B6560] hover:text-[#5C6B56] nav-link">Support</Link>
          </nav>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-6 py-12 relative z-[1]">
        <h1
          className="text-4xl font-bold text-[#3D3531] mb-4"
          style={{ fontFamily: 'var(--font-cormorant), Cormorant Garamond, serif' }}
        >
          Privacy Policy
        </h1>
        <p className="text-sm text-[#9C8B7A] mb-8">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>

        <div className="bg-[#FFFCF7] rounded-2xl shadow-sm p-8 space-y-8 border border-[#8B9D83]/15">
          {/* Introduction */}
          <section>
            <h2 className="text-xl font-semibold text-[#3D3531] mb-3" style={{ fontFamily: 'var(--font-cormorant), Cormorant Garamond, serif' }}>1. Introduction</h2>
            <p className="text-[#6B6560] leading-relaxed mb-3">
              This Privacy Policy explains how Octane Limited ("we," "our," or "us"), a company
              registered in Jersey (Channel Islands), collects, uses, discloses, and protects your
              personal data when you use our Meet In The Field service (the "Service").
            </p>
            <p className="text-[#6B6560] leading-relaxed mb-3">
              We are committed to protecting your privacy and ensuring that your personal data is
              handled in accordance with the Data Protection (Jersey) Law 2018 and, where applicable,
              the General Data Protection Regulation (EU GDPR) and UK GDPR.
            </p>
            <p className="text-[#6B6560] leading-relaxed">
              By using our Service, you acknowledge that you have read and understood this Privacy Policy.
            </p>
          </section>

          {/* Data Controller */}
          <section>
            <h2 className="text-xl font-semibold text-[#3D3531] mb-3" style={{ fontFamily: 'var(--font-cormorant), Cormorant Garamond, serif' }}>2. Data Controller</h2>
            <p className="text-[#6B6560] leading-relaxed mb-3">
              The data controller responsible for your personal data is:
            </p>
            <div className="bg-[#F7F4EE] rounded-lg p-4 text-[#6B6560] border border-[#8B9D83]/15">
              <p className="font-medium text-[#3D3531]">Octane Limited</p>
              <p>Registered in Jersey, Channel Islands</p>
              <p className="mt-2">
                Email: <a href="mailto:privacy@meetinthefield.app" className="text-[#8B9D83] hover:text-[#5C6B56] underline">privacy@meetinthefield.app</a>
              </p>
            </div>
          </section>

          {/* Data We Collect */}
          <section>
            <h2 className="text-xl font-semibold text-[#3D3531] mb-3" style={{ fontFamily: 'var(--font-cormorant), Cormorant Garamond, serif' }}>3. Personal Data We Collect</h2>
            <p className="text-[#6B6560] leading-relaxed mb-3">
              We collect and process the following categories of personal data:
            </p>

            <h3 className="font-medium text-[#3D3531] mt-4 mb-2">3.1 Information You Provide</h3>
            <ul className="list-disc list-inside text-[#6B6560] space-y-1 mb-4">
              <li><strong className="text-[#3D3531]">Account Information:</strong> Name, email address, and authentication credentials when you create an account</li>
              <li><strong className="text-[#3D3531]">Profile Information:</strong> Any additional information you choose to add to your profile</li>
              <li><strong className="text-[#3D3531]">Communication Content:</strong> Messages exchanged during sessions with your partner</li>
              <li><strong className="text-[#3D3531]">Payment Information:</strong> Billing details processed through our payment provider (Stripe)</li>
              <li><strong className="text-[#3D3531]">Support Communications:</strong> Information you provide when contacting our support team</li>
            </ul>

            <h3 className="font-medium text-[#3D3531] mt-4 mb-2">3.2 Information Collected Automatically</h3>
            <ul className="list-disc list-inside text-[#6B6560] space-y-1 mb-4">
              <li><strong className="text-[#3D3531]">Usage Data:</strong> Information about how you use our Service, including session frequency and feature usage</li>
              <li><strong className="text-[#3D3531]">Device Information:</strong> Device type, operating system, browser type, and unique device identifiers</li>
              <li><strong className="text-[#3D3531]">Log Data:</strong> IP address, access times, pages viewed, and referring URLs</li>
              <li><strong className="text-[#3D3531]">Cookies and Similar Technologies:</strong> Information collected through cookies, pixels, and similar technologies</li>
            </ul>

            <h3 className="font-medium text-[#3D3531] mt-4 mb-2">3.3 Special Category Data</h3>
            <p className="text-[#6B6560] leading-relaxed">
              The nature of our Service means that your communications may contain sensitive personal
              data relating to your relationships, emotions, or personal life. We treat all conversation
              content with the highest level of confidentiality and security.
            </p>
          </section>

          {/* Legal Basis */}
          <section>
            <h2 className="text-xl font-semibold text-[#3D3531] mb-3" style={{ fontFamily: 'var(--font-cormorant), Cormorant Garamond, serif' }}>4. Legal Basis for Processing</h2>
            <p className="text-[#6B6560] leading-relaxed mb-3">
              We process your personal data on the following legal bases:
            </p>
            <ul className="list-disc list-inside text-[#6B6560] space-y-2">
              <li><strong className="text-[#3D3531]">Contract Performance:</strong> Processing necessary to provide you with our Service and fulfil our contractual obligations</li>
              <li><strong className="text-[#3D3531]">Legitimate Interests:</strong> Processing necessary for our legitimate interests, such as improving our Service, preventing fraud, and ensuring security</li>
              <li><strong className="text-[#3D3531]">Consent:</strong> Where you have given explicit consent for specific processing activities</li>
              <li><strong className="text-[#3D3531]">Legal Obligation:</strong> Processing necessary to comply with legal requirements</li>
            </ul>
          </section>

          {/* How We Use Data */}
          <section>
            <h2 className="text-xl font-semibold text-[#3D3531] mb-3" style={{ fontFamily: 'var(--font-cormorant), Cormorant Garamond, serif' }}>5. How We Use Your Personal Data</h2>
            <p className="text-[#6B6560] leading-relaxed mb-3">
              We use your personal data for the following purposes:
            </p>
            <ul className="list-disc list-inside text-[#6B6560] space-y-1">
              <li>To provide, maintain, and improve our Service</li>
              <li>To process your transactions and manage your subscription</li>
              <li>To communicate with you about your account, updates, and support requests</li>
              <li>To personalise your experience and provide relevant features</li>
              <li>To ensure the security and integrity of our Service</li>
              <li>To analyse usage patterns and improve our Service (using anonymised data)</li>
              <li>To comply with legal obligations</li>
            </ul>
            <p className="text-[#6B6560] leading-relaxed mt-4 font-medium">
              Important: We do NOT use your conversation content to train AI models or for any purpose
              other than providing you with the Service.
            </p>
          </section>

          {/* Data Sharing */}
          <section>
            <h2 className="text-xl font-semibold text-[#3D3531] mb-3" style={{ fontFamily: 'var(--font-cormorant), Cormorant Garamond, serif' }}>6. Data Sharing and Disclosure</h2>
            <p className="text-[#6B6560] leading-relaxed mb-3">
              We may share your personal data with the following categories of recipients:
            </p>
            <ul className="list-disc list-inside text-[#6B6560] space-y-2 mb-4">
              <li><strong className="text-[#3D3531]">Service Providers:</strong> Third-party companies that help us operate our Service, including:
                <ul className="list-disc list-inside ml-6 mt-1 space-y-1">
                  <li>Clerk (authentication services)</li>
                  <li>Stripe (payment processing)</li>
                  <li>Supabase (database hosting)</li>
                  <li>OpenAI (AI processing - conversation context only, not stored)</li>
                  <li>Pusher (real-time communication)</li>
                </ul>
              </li>
              <li><strong className="text-[#3D3531]">Legal Requirements:</strong> When required by law, regulation, or legal process</li>
              <li><strong className="text-[#3D3531]">Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
              <li><strong className="text-[#3D3531]">With Your Consent:</strong> When you have given us permission to share your data</li>
            </ul>
            <p className="text-[#6B6560] leading-relaxed font-medium">
              We never sell your personal data to third parties.
            </p>
          </section>

          {/* International Transfers */}
          <section>
            <h2 className="text-xl font-semibold text-[#3D3531] mb-3" style={{ fontFamily: 'var(--font-cormorant), Cormorant Garamond, serif' }}>7. International Data Transfers</h2>
            <p className="text-[#6B6560] leading-relaxed mb-3">
              Your personal data may be transferred to and processed in countries outside Jersey,
              the European Economic Area (EEA), and the United Kingdom. When we transfer data
              internationally, we ensure appropriate safeguards are in place, including:
            </p>
            <ul className="list-disc list-inside text-[#6B6560] space-y-1">
              <li>Standard Contractual Clauses approved by the European Commission</li>
              <li>Transfers to countries with adequacy decisions</li>
              <li>Other legally approved transfer mechanisms</li>
            </ul>
          </section>

          {/* Data Retention */}
          <section>
            <h2 className="text-xl font-semibold text-[#3D3531] mb-3" style={{ fontFamily: 'var(--font-cormorant), Cormorant Garamond, serif' }}>8. Data Retention</h2>
            <p className="text-[#6B6560] leading-relaxed mb-3">
              We retain your personal data for as long as necessary to fulfil the purposes for which
              it was collected, including:
            </p>
            <ul className="list-disc list-inside text-[#6B6560] space-y-1 mb-4">
              <li><strong className="text-[#3D3531]">Account Data:</strong> Retained while your account is active and for a reasonable period thereafter</li>
              <li><strong className="text-[#3D3531]">Conversation Data:</strong> Retained according to your preferences; you can delete at any time</li>
              <li><strong className="text-[#3D3531]">Payment Records:</strong> Retained as required by financial regulations (typically 7 years)</li>
              <li><strong className="text-[#3D3531]">Log Data:</strong> Typically retained for 90 days</li>
            </ul>
            <p className="text-[#6B6560] leading-relaxed">
              When you delete your account, we will delete or anonymise your personal data within
              30 days, except where retention is required by law.
            </p>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="text-xl font-semibold text-[#3D3531] mb-3" style={{ fontFamily: 'var(--font-cormorant), Cormorant Garamond, serif' }}>9. Your Rights</h2>
            <p className="text-[#6B6560] leading-relaxed mb-3">
              Under applicable data protection laws, you have the following rights:
            </p>
            <ul className="list-disc list-inside text-[#6B6560] space-y-2">
              <li><strong className="text-[#3D3531]">Right of Access:</strong> Request a copy of the personal data we hold about you</li>
              <li><strong className="text-[#3D3531]">Right to Rectification:</strong> Request correction of inaccurate or incomplete data</li>
              <li><strong className="text-[#3D3531]">Right to Erasure:</strong> Request deletion of your personal data ("right to be forgotten")</li>
              <li><strong className="text-[#3D3531]">Right to Restrict Processing:</strong> Request limitation of how we process your data</li>
              <li><strong className="text-[#3D3531]">Right to Data Portability:</strong> Receive your data in a structured, machine-readable format</li>
              <li><strong className="text-[#3D3531]">Right to Object:</strong> Object to processing based on legitimate interests or for direct marketing</li>
              <li><strong className="text-[#3D3531]">Right to Withdraw Consent:</strong> Withdraw consent at any time where processing is based on consent</li>
              <li><strong className="text-[#3D3531]">Right to Lodge a Complaint:</strong> Lodge a complaint with the Jersey Office of the Information Commissioner or other relevant supervisory authority</li>
            </ul>
            <p className="text-[#6B6560] leading-relaxed mt-4">
              To exercise any of these rights, please contact us at{' '}
              <a href="mailto:privacy@meetinthefield.app" className="text-[#8B9D83] hover:text-[#5C6B56] underline">privacy@meetinthefield.app</a>.
              We will respond to your request within one month.
            </p>
          </section>

          {/* Security */}
          <section>
            <h2 className="text-xl font-semibold text-[#3D3531] mb-3" style={{ fontFamily: 'var(--font-cormorant), Cormorant Garamond, serif' }}>10. Data Security</h2>
            <p className="text-[#6B6560] leading-relaxed mb-3">
              We implement appropriate technical and organisational measures to protect your personal
              data against unauthorised access, alteration, disclosure, or destruction. These measures include:
            </p>
            <ul className="list-disc list-inside text-[#6B6560] space-y-1">
              <li>Encryption of data in transit and at rest</li>
              <li>Secure authentication mechanisms</li>
              <li>Regular security assessments and updates</li>
              <li>Access controls limiting who can access personal data</li>
              <li>Employee training on data protection</li>
            </ul>
            <p className="text-[#6B6560] leading-relaxed mt-4">
              While we strive to protect your personal data, no method of transmission over the
              internet is 100% secure. We cannot guarantee absolute security.
            </p>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-xl font-semibold text-[#3D3531] mb-3" style={{ fontFamily: 'var(--font-cormorant), Cormorant Garamond, serif' }}>11. Cookies and Tracking Technologies</h2>
            <p className="text-[#6B6560] leading-relaxed mb-3">
              We use cookies and similar technologies to:
            </p>
            <ul className="list-disc list-inside text-[#6B6560] space-y-1 mb-4">
              <li><strong className="text-[#3D3531]">Essential Cookies:</strong> Required for the Service to function (e.g., authentication)</li>
              <li><strong className="text-[#3D3531]">Functional Cookies:</strong> Remember your preferences and settings</li>
              <li><strong className="text-[#3D3531]">Analytics Cookies:</strong> Help us understand how you use our Service</li>
            </ul>
            <p className="text-[#6B6560] leading-relaxed">
              You can control cookies through your browser settings. Note that disabling certain
              cookies may affect the functionality of our Service.
            </p>
          </section>

          {/* Children */}
          <section>
            <h2 className="text-xl font-semibold text-[#3D3531] mb-3" style={{ fontFamily: 'var(--font-cormorant), Cormorant Garamond, serif' }}>12. Children's Privacy</h2>
            <p className="text-[#6B6560] leading-relaxed">
              Our Service is not intended for individuals under the age of 18. We do not knowingly
              collect personal data from children. If you believe we have inadvertently collected
              data from a child, please contact us immediately and we will take steps to delete
              such information.
            </p>
          </section>

          {/* Changes */}
          <section>
            <h2 className="text-xl font-semibold text-[#3D3531] mb-3" style={{ fontFamily: 'var(--font-cormorant), Cormorant Garamond, serif' }}>13. Changes to This Policy</h2>
            <p className="text-[#6B6560] leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any
              significant changes by posting the new policy on this page and updating the "Last
              updated" date. We encourage you to review this Privacy Policy periodically.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-xl font-semibold text-[#3D3531] mb-3" style={{ fontFamily: 'var(--font-cormorant), Cormorant Garamond, serif' }}>14. Contact Us</h2>
            <p className="text-[#6B6560] leading-relaxed mb-3">
              If you have any questions about this Privacy Policy or our data practices, or if you
              wish to exercise your rights, please contact us:
            </p>
            <div className="bg-[#F7F4EE] rounded-lg p-4 text-[#6B6560] border border-[#8B9D83]/15">
              <p className="font-medium text-[#3D3531]">Octane Limited</p>
              <p className="mt-2">
                Email: <a href="mailto:privacy@meetinthefield.app" className="text-[#8B9D83] hover:text-[#5C6B56] underline">privacy@meetinthefield.app</a>
              </p>
              <p className="mt-4 text-sm">
                You may also contact the Jersey Office of the Information Commissioner if you have
                concerns about how we handle your personal data:{' '}
                <a href="https://jerseyoic.org" target="_blank" rel="noopener noreferrer" className="text-[#8B9D83] hover:text-[#5C6B56] underline">
                  jerseyoic.org
                </a>
              </p>
            </div>
          </section>
        </div>

        {/* Back to Home */}
        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#8B9D83] hover:text-[#5C6B56] font-medium transition-colors"
          >
            <span>&larr;</span> Back to Home
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#8B9D83]/15 bg-[#FFFCF7]/80 backdrop-blur-sm mt-12 relative z-10">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-[#6B6560]">
              &copy; {new Date().getFullYear()} Octane Limited. All rights reserved.
            </p>
            <nav className="flex items-center gap-6">
              <Link href="/about" className="text-sm text-[#6B6560] hover:text-[#5C6B56]">About</Link>
              <Link href="/faq" className="text-sm text-[#6B6560] hover:text-[#5C6B56]">FAQ</Link>
              <Link href="/privacy" className="text-sm text-[#6B6560] hover:text-[#5C6B56]">Privacy</Link>
              <Link href="/terms" className="text-sm text-[#6B6560] hover:text-[#5C6B56]">Terms</Link>
              <Link href="/support" className="text-sm text-[#6B6560] hover:text-[#5C6B56]">Support</Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}
