'use client';

import Link from 'next/link';
import { SignUpButton } from '@clerk/nextjs';

export default function StartFreeTrial() {
  return (
    <div className="min-h-screen bg-[#F7F4EE]">
      {/* Texture overlay */}
      <div className="texture-overlay" />

      {/* Navigation */}
      <nav className="px-6 md:px-12 py-6 flex justify-between items-center relative z-10">
        <Link
          href="/"
          className="text-xl font-medium text-[#5C6B56] tracking-wide"
          style={{ fontFamily: 'var(--font-cormorant), Cormorant Garamond, serif' }}
        >
          Meet In The Field
        </Link>
        <Link
          href="/"
          className="text-sm text-[#6B6560] hover:text-[#5C6B56] transition-colors"
        >
          Back to Home
        </Link>
      </nav>

      {/* Main Content */}
      <main className="px-4 md:px-8 py-12 relative z-10">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div
              className="inline-block px-4 py-2 bg-[#E8EDE5] text-[#5C6B56] text-sm font-medium rounded-full mb-6"
            >
              100% Free to Start
            </div>
            <h1
              className="text-4xl md:text-5xl font-normal text-[#3D3531] mb-6"
              style={{ fontFamily: 'var(--font-cormorant), Cormorant Garamond, serif' }}
            >
              Start Your Free Trial
            </h1>
            <p className="text-lg text-[#6B6560] leading-relaxed">
              Begin your relationship counselling journey today. No credit card required, no strings attached.
            </p>
          </div>

          {/* Free Tier Benefits */}
          <div className="bg-[#FFFCF7] rounded-3xl border border-[#8B9D83]/15 p-8 md:p-10 mb-8">
            <h2
              className="text-2xl font-medium text-[#3D3531] mb-6"
              style={{ fontFamily: 'var(--font-cormorant), Cormorant Garamond, serif' }}
            >
              What You Get for Free
            </h2>

            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#E8EDE5] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-[#5C6B56]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <span className="font-medium text-[#3D3531]">5 counsellor interactions per week</span>
                  <p className="text-sm text-[#6B6560] mt-1">Enough to have meaningful conversations and see real progress</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#E8EDE5] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-[#5C6B56]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <span className="font-medium text-[#3D3531]">Standard Guidance mode</span>
                  <p className="text-sm text-[#6B6560] mt-1">Expert guidance drawing from Esther Perel, the Gottman Institute, and Julie Menanno</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#E8EDE5] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-[#5C6B56]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <span className="font-medium text-[#3D3531]">Private & secure conversations</span>
                  <p className="text-sm text-[#6B6560] mt-1">Your conversations are encrypted and never shared</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#E8EDE5] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-[#5C6B56]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <span className="font-medium text-[#3D3531]">Create unlimited sessions</span>
                  <p className="text-sm text-[#6B6560] mt-1">Start as many conversation fields as you need</p>
                </div>
              </li>
            </ul>

            {/* No Credit Card Notice */}
            <div className="bg-[#E8EDE5]/50 rounded-2xl p-6 mb-8">
              <div className="flex items-center gap-3 mb-3">
                <svg className="w-6 h-6 text-[#5C6B56]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                <span className="font-medium text-[#3D3531]">No Credit Card Required</span>
              </div>
              <p className="text-sm text-[#6B6560]">
                We will never ask for your payment details to start your free trial. Simply create an account with your email and you&apos;re ready to go. Upgrade only if and when you choose to.
              </p>
            </div>

            {/* Sign Up Button */}
            <SignUpButton mode="modal">
              <button className="w-full py-4 bg-gradient-to-br from-[#8B9D83] to-[#5C6B56] hover:from-[#7A8E75] hover:to-[#4D5C48] text-white text-lg font-medium rounded-2xl transition-all shadow-[0_4px_15px_-3px_rgba(92,107,86,0.4)]">
                Create Free Account
              </button>
            </SignUpButton>

            <p className="text-center text-sm text-[#6B6560] mt-4">
              Already have an account?{' '}
              <Link href="/sign-in" className="text-[#5C6B56] font-medium hover:underline">
                Sign in here
              </Link>
            </p>
          </div>

          {/* Premium Upsell */}
          <div className="bg-gradient-to-br from-[#E8EDE5] to-[#F7F4EE] rounded-3xl border border-[#C4D1BE] p-8 text-center">
            <h3
              className="text-xl font-medium text-[#3D3531] mb-3"
              style={{ fontFamily: 'var(--font-cormorant), Cormorant Garamond, serif' }}
            >
              Need More?
            </h3>
            <p className="text-[#6B6560] mb-4">
              Upgrade to Premium anytime for unlimited interactions, advanced guidance modes, and session summaries.
            </p>
            <p className="text-2xl font-bold text-[#3D3531]">
              Just $9.99<span className="text-base font-normal text-[#6B6560]">/month</span>
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-4 md:px-8 py-8 text-center relative z-10 border-t border-[#8B9D83]/15 mt-12">
        <p className="text-xs text-[#9C8B7A]">
          &copy; {new Date().getFullYear()} Octane Limited. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
