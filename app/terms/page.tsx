'use client';

import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <header className="px-6 py-4 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-xl font-semibold text-gray-900 hover:text-gray-700">
            Meet In The Field
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/about" className="text-sm text-gray-600 hover:text-gray-900">About</Link>
            <Link href="/faq" className="text-sm text-gray-600 hover:text-gray-900">FAQ</Link>
            <Link href="/privacy" className="text-sm text-gray-600 hover:text-gray-900">Privacy</Link>
            <Link href="/terms" className="text-sm text-blue-600 font-medium">Terms</Link>
          </nav>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms and Conditions</h1>
        <p className="text-sm text-gray-500 mb-8">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>

        <div className="bg-white rounded-2xl shadow-sm p-8 space-y-8">
          {/* Introduction */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Introduction</h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              Welcome to Meet In The Field, a service operated by Octane Limited, a company registered
              in Jersey, Channel Islands ("we," "our," or "us"). These Terms and Conditions ("Terms")
              govern your use of our website and services (collectively, the "Service"). By accessing
              or using our Service, you agree to be bound by these Terms.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Please read these Terms carefully before using our Service. If you do not agree with
              any part of these Terms, you may not use our Service.
            </p>
          </section>

          {/* Service Description */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Service Description</h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              Meet In The Field provides an AI-powered communication platform designed to help couples
              have more productive conversations. Our Service includes:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-1 mb-3">
              <li>Real-time messaging between partners</li>
              <li>AI-generated guidance and conversation facilitation</li>
              <li>Session history and optional summary features</li>
            </ul>
            <p className="text-gray-600 leading-relaxed font-medium">
              Important: Our Service is not a substitute for professional mental health treatment,
              couples therapy, or medical advice. If you are experiencing a mental health crisis,
              domestic violence, or any emergency situation, please contact appropriate emergency
              services or qualified professionals immediately.
            </p>
          </section>

          {/* Eligibility */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Eligibility</h2>
            <p className="text-gray-600 leading-relaxed">
              You must be at least 18 years old to use our Service. By using our Service, you
              represent and warrant that you are at least 18 years old and have the legal capacity
              to enter into these Terms.
            </p>
          </section>

          {/* Account Registration */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Account Registration</h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              To access certain features of our Service, you may need to create an account. When
              creating an account, you agree to:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Provide accurate, current, and complete information</li>
              <li>Maintain and promptly update your account information</li>
              <li>Keep your login credentials secure and confidential</li>
              <li>Accept responsibility for all activities under your account</li>
              <li>Notify us immediately of any unauthorized use of your account</li>
            </ul>
          </section>

          {/* Acceptable Use */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Acceptable Use</h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              You agree to use our Service only for lawful purposes and in accordance with these
              Terms. You agree not to:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Use the Service for any illegal or unauthorized purpose</li>
              <li>Harass, abuse, or harm another person through the Service</li>
              <li>Impersonate any person or entity</li>
              <li>Interfere with or disrupt the Service or its servers</li>
              <li>Attempt to gain unauthorized access to any part of the Service</li>
              <li>Use the Service to transmit malware or other harmful code</li>
              <li>Collect or harvest any information from the Service without authorization</li>
              <li>Use the Service in any way that could damage our reputation</li>
            </ul>
          </section>

          {/* Privacy and Data */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Privacy and Data Protection</h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              Your privacy is important to us. Our data practices include:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 mb-3">
              <li><strong>Conversation Privacy:</strong> Your conversations are encrypted and private
                to you and your partner. We do not read, share, or sell your conversation content.</li>
              <li><strong>No AI Training:</strong> Your conversations are not used to train AI models.</li>
              <li><strong>Data Security:</strong> We implement industry-standard security measures
                to protect your information.</li>
              <li><strong>Third-Party Services:</strong> We use trusted third-party services (such as
                Clerk for authentication and Stripe for payments) that have their own privacy policies.</li>
              <li><strong>Data Deletion:</strong> You may request deletion of your account and
                associated data at any time through your account settings.</li>
            </ul>
            <p className="text-gray-600 leading-relaxed">
              By using our Service, you consent to the collection and use of information as described
              in these Terms.
            </p>
          </section>

          {/* Subscription and Payments */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Subscription and Payments</h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              We offer both free and paid subscription tiers:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 mb-3">
              <li><strong>Free Tier:</strong> Limited features available at no cost</li>
              <li><strong>Premium Tier:</strong> Enhanced features for a monthly subscription fee</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mb-3">
              For paid subscriptions:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Payment is processed securely through Stripe</li>
              <li>Subscriptions automatically renew unless cancelled</li>
              <li>You may cancel at any time; access continues until the end of the billing period</li>
              <li>Refunds are provided at our discretion and in accordance with applicable law</li>
              <li>We reserve the right to change pricing with reasonable notice</li>
            </ul>
          </section>

          {/* AI-Generated Content */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">8. AI-Generated Content</h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              Our Service uses artificial intelligence to generate guidance and suggestions. You
              acknowledge and agree that:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>AI-generated content is for informational purposes only</li>
              <li>AI responses may not always be accurate, complete, or appropriate for your situation</li>
              <li>You are responsible for evaluating and deciding whether to follow any AI suggestions</li>
              <li>AI guidance is not professional therapy, counseling, or medical advice</li>
              <li>We do not guarantee any specific outcomes from using our Service</li>
            </ul>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Intellectual Property</h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              The Service, including its original content, features, and functionality, is owned
              by Meet In The Field and is protected by copyright, trademark, and other intellectual
              property laws.
            </p>
            <p className="text-gray-600 leading-relaxed">
              You retain ownership of any content you create within the Service. By using the Service,
              you grant us a limited license to process and display your content solely for the
              purpose of providing the Service to you.
            </p>
          </section>

          {/* Disclaimers */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">10. Disclaimers</h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND,
              EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-1 mb-3">
              <li>Warranties of merchantability or fitness for a particular purpose</li>
              <li>Warranties that the Service will be uninterrupted, secure, or error-free</li>
              <li>Warranties regarding the accuracy or reliability of AI-generated content</li>
            </ul>
            <p className="text-gray-600 leading-relaxed">
              You use the Service at your own risk. We are not responsible for any decisions you
              make based on information provided through the Service.
            </p>
          </section>

          {/* Limitation of Liability */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">11. Limitation of Liability</h2>
            <p className="text-gray-600 leading-relaxed">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, OCTANE LIMITED SHALL NOT BE LIABLE FOR
              ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS
              OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA,
              USE, GOODWILL, OR OTHER INTANGIBLE LOSSES RESULTING FROM YOUR USE OF THE SERVICE.
            </p>
          </section>

          {/* Indemnification */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">12. Indemnification</h2>
            <p className="text-gray-600 leading-relaxed">
              You agree to indemnify and hold harmless Octane Limited and its officers, directors,
              employees, and agents from any claims, damages, losses, liabilities, costs, or expenses
              (including reasonable attorneys' fees) arising out of your use of the Service or
              violation of these Terms.
            </p>
          </section>

          {/* Termination */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">13. Termination</h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              We may terminate or suspend your account and access to the Service immediately, without
              prior notice, for any reason, including if you breach these Terms.
            </p>
            <p className="text-gray-600 leading-relaxed">
              You may terminate your account at any time by deleting it through your account settings.
              Upon termination, your right to use the Service will immediately cease.
            </p>
          </section>

          {/* Changes to Terms */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">14. Changes to Terms</h2>
            <p className="text-gray-600 leading-relaxed">
              We reserve the right to modify these Terms at any time. We will provide notice of
              significant changes by posting the updated Terms on this page and updating the
              "Last updated" date. Your continued use of the Service after any changes constitutes
              acceptance of the new Terms.
            </p>
          </section>

          {/* Governing Law */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">15. Governing Law</h2>
            <p className="text-gray-600 leading-relaxed">
              These Terms shall be governed by and construed in accordance with the laws of Jersey,
              Channel Islands, without regard to conflict of law principles. Any disputes arising
              from these Terms or your use of the Service shall be subject to the exclusive
              jurisdiction of the courts of Jersey.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">16. Contact Us</h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              If you have any questions about these Terms, please contact us:
            </p>
            <div className="bg-gray-50 rounded-lg p-4 text-gray-600">
              <p className="font-medium">Octane Limited</p>
              <p>Registered in Jersey, Channel Islands</p>
              <p className="mt-2">
                Email: <a href="mailto:legal@meetinthefield.app" className="text-blue-600 hover:underline">legal@meetinthefield.app</a>
              </p>
            </div>
          </section>
        </div>

        {/* Back to Home */}
        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            <span>&larr;</span> Back to Home
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white/80 backdrop-blur-sm mt-12">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} Octane Limited. All rights reserved.
            </p>
            <nav className="flex items-center gap-6">
              <Link href="/about" className="text-sm text-gray-500 hover:text-gray-700">About</Link>
              <Link href="/faq" className="text-sm text-gray-500 hover:text-gray-700">FAQ</Link>
              <Link href="/privacy" className="text-sm text-gray-500 hover:text-gray-700">Privacy</Link>
              <Link href="/terms" className="text-sm text-gray-500 hover:text-gray-700">Terms</Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}
