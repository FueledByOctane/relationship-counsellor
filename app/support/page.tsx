'use client';

import Link from 'next/link';

export default function SupportPage() {
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
            <Link href="/support" className="text-sm text-[#5C6B56] font-medium nav-link">Support</Link>
          </nav>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-6 py-12 relative z-[1]">
        <h1
          className="text-4xl font-bold text-[#3D3531] mb-4"
          style={{ fontFamily: 'var(--font-cormorant), Cormorant Garamond, serif' }}
        >
          Support
        </h1>
        <p className="text-lg text-[#6B6560] mb-8">
          We're here to help. Choose the option that best fits your needs.
        </p>

        <div className="grid gap-6">
          {/* Email Support */}
          <div className="bg-[#FFFCF7] rounded-2xl shadow-sm p-8 border border-[#8B9D83]/15">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#E8EDE5] rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-[#8B9D83]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="flex-1">
                <h2
                  className="text-xl font-semibold text-[#3D3531] mb-2"
                  style={{ fontFamily: 'var(--font-cormorant), Cormorant Garamond, serif' }}
                >
                  Email Support
                </h2>
                <p className="text-[#6B6560] mb-4">
                  For general inquiries, technical issues, or feedback. We typically respond within 24 hours.
                </p>
                <a
                  href="mailto:support@meetinthefield.app"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-br from-[#8B9D83] to-[#5C6B56] text-white font-medium rounded-[20px] hover:from-[#7A8E75] hover:to-[#4D5C48] transition-all shadow-[0_4px_15px_-3px_rgba(92,107,86,0.4)]"
                >
                  support@meetinthefield.app
                </a>
              </div>
            </div>
          </div>

          {/* Billing Support */}
          <div className="bg-[#FFFCF7] rounded-2xl shadow-sm p-8 border border-[#8B9D83]/15">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#E8EDE5] rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-[#8B9D83]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <div className="flex-1">
                <h2
                  className="text-xl font-semibold text-[#3D3531] mb-2"
                  style={{ fontFamily: 'var(--font-cormorant), Cormorant Garamond, serif' }}
                >
                  Billing & Subscriptions
                </h2>
                <p className="text-[#6B6560] mb-4">
                  Manage your subscription, update payment methods, or view billing history through your account page.
                </p>
                <Link
                  href="/account"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#E8EDE5] hover:bg-[#C4D1BE] text-[#5C6B56] font-medium rounded-[20px] transition-all"
                >
                  Go to Account Settings
                </Link>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="bg-[#FFFCF7] rounded-2xl shadow-sm p-8 border border-[#8B9D83]/15">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#E8EDE5] rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-[#8B9D83]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="flex-1">
                <h2
                  className="text-xl font-semibold text-[#3D3531] mb-2"
                  style={{ fontFamily: 'var(--font-cormorant), Cormorant Garamond, serif' }}
                >
                  Frequently Asked Questions
                </h2>
                <p className="text-[#6B6560] mb-4">
                  Find quick answers to common questions about using Meet In The Field, subscriptions, and privacy.
                </p>
                <Link
                  href="/faq"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#E8EDE5] hover:bg-[#C4D1BE] text-[#5C6B56] font-medium rounded-[20px] transition-all"
                >
                  Browse FAQ
                </Link>
              </div>
            </div>
          </div>

          {/* Privacy & Data */}
          <div className="bg-[#FFFCF7] rounded-2xl shadow-sm p-8 border border-[#8B9D83]/15">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#E8EDE5] rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-[#8B9D83]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div className="flex-1">
                <h2
                  className="text-xl font-semibold text-[#3D3531] mb-2"
                  style={{ fontFamily: 'var(--font-cormorant), Cormorant Garamond, serif' }}
                >
                  Privacy & Data Requests
                </h2>
                <p className="text-[#6B6560] mb-4">
                  For data access requests, deletion requests, or privacy concerns, contact our privacy team.
                </p>
                <a
                  href="mailto:privacy@meetinthefield.app"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#E8EDE5] hover:bg-[#C4D1BE] text-[#5C6B56] font-medium rounded-[20px] transition-all"
                >
                  privacy@meetinthefield.app
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Crisis Resources */}
        <div className="mt-8 bg-[#C4A484]/10 rounded-2xl p-8 border border-[#C4A484]/30">
          <h2
            className="text-xl font-semibold text-[#3D3531] mb-3"
            style={{ fontFamily: 'var(--font-cormorant), Cormorant Garamond, serif' }}
          >
            Need Immediate Help?
          </h2>
          <p className="text-[#6B6560] mb-4">
            Meet In The Field is not a crisis service. If you or someone you know is in immediate danger or experiencing a mental health emergency, please contact:
          </p>
          <ul className="space-y-2 text-[#6B6560]">
            <li><strong className="text-[#3D3531]">Emergency Services:</strong> 999 (UK) / 911 (US) / 112 (EU)</li>
            <li><strong className="text-[#3D3531]">Samaritans (UK):</strong> 116 123</li>
            <li><strong className="text-[#3D3531]">National Suicide Prevention Lifeline (US):</strong> 988</li>
            <li><strong className="text-[#3D3531]">Crisis Text Line:</strong> Text HOME to 741741 (US) or 85258 (UK)</li>
          </ul>
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
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}
