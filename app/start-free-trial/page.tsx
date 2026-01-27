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

      {/* Hero Section */}
      <section className="px-4 md:px-8 py-12 md:py-16 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block px-4 py-2 bg-[#E8EDE5] text-[#5C6B56] text-sm font-medium rounded-full mb-6">
            100% Free to Start
          </div>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-normal text-[#3D3531] mb-6"
            style={{ fontFamily: 'var(--font-cormorant), Cormorant Garamond, serif' }}
          >
            Start Your Free Trial
          </h1>
          <p className="text-lg md:text-xl text-[#6B6560] leading-relaxed max-w-2xl mx-auto">
            Experience AI-guided relationship counselling designed to help couples communicate better. No credit card required.
          </p>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="px-4 md:px-8 py-12 relative z-10">
        <div className="max-w-5xl mx-auto">
          <h2
            className="text-3xl md:text-4xl font-normal text-[#3D3531] text-center mb-12"
            style={{ fontFamily: 'var(--font-cormorant), Cormorant Garamond, serif' }}
          >
            How It Works
          </h2>

          {/* Step 1 */}
          <div className="grid md:grid-cols-2 gap-8 items-center mb-16">
            <div className="order-2 md:order-1">
              <div className="text-sm font-medium text-[#8B9D83] mb-2">Step 1</div>
              <h3
                className="text-2xl font-medium text-[#3D3531] mb-4"
                style={{ fontFamily: 'var(--font-cormorant), Cormorant Garamond, serif' }}
              >
                Create a Private Field
              </h3>
              <p className="text-[#6B6560] leading-relaxed">
                Start by creating a private conversation space. Give your session a name that feels meaningful to both of you - this becomes your shared &quot;field&quot; where you can meet and communicate openly.
              </p>
            </div>
            <div className="order-1 md:order-2">
              <div className="bg-[#FFFCF7] rounded-2xl border border-[#8B9D83]/15 p-6 shadow-lg">
                <div className="bg-[#F7F4EE] rounded-xl p-4">
                  <div className="text-sm text-[#6B6560] mb-3">Name your field (optional)</div>
                  <div className="bg-white rounded-lg p-3 border border-[#C4D1BE] text-[#3D3531]">
                    Sunday Evening Check-in
                  </div>
                  <div className="mt-4 bg-gradient-to-r from-[#8B9D83] to-[#5C6B56] text-white text-center py-3 rounded-xl font-medium">
                    Create Field
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="grid md:grid-cols-2 gap-8 items-center mb-16">
            <div>
              <div className="bg-[#FFFCF7] rounded-2xl border border-[#8B9D83]/15 p-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm text-[#6B6560]">Field: <span className="font-mono bg-[#E8EDE5] px-2 py-1 rounded">7A85EL</span></div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#C4A484] animate-pulse" />
                    <span className="text-sm text-[#6B6560]">Waiting for partner...</span>
                  </div>
                </div>
                <div className="bg-[#8B9D83] text-white text-center py-2 px-4 rounded-xl text-sm font-medium">
                  SHARE LINK
                </div>
              </div>
            </div>
            <div>
              <div className="text-sm font-medium text-[#8B9D83] mb-2">Step 2</div>
              <h3
                className="text-2xl font-medium text-[#3D3531] mb-4"
                style={{ fontFamily: 'var(--font-cormorant), Cormorant Garamond, serif' }}
              >
                Invite Your Partner
              </h3>
              <p className="text-[#6B6560] leading-relaxed">
                Share the unique link with your partner. They can join from any device - phone, tablet, or computer. Once they join, you&apos;re both ready to begin your session together.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="grid md:grid-cols-2 gap-8 items-center mb-16">
            <div className="order-2 md:order-1">
              <div className="text-sm font-medium text-[#8B9D83] mb-2">Step 3</div>
              <h3
                className="text-2xl font-medium text-[#3D3531] mb-4"
                style={{ fontFamily: 'var(--font-cormorant), Cormorant Garamond, serif' }}
              >
                Chat with AI-Guided Support
              </h3>
              <p className="text-[#6B6560] leading-relaxed mb-4">
                Have your conversation naturally. After each message, our AI counsellor provides gentle, thoughtful guidance - asking questions that help you both understand each other better.
              </p>
              <p className="text-[#6B6560] leading-relaxed">
                The counsellor draws from the wisdom of renowned therapists like Esther Perel and the Gottman Institute, helping you navigate conversations with care and insight.
              </p>
            </div>
            <div className="order-1 md:order-2">
              <div className="bg-[#FFFCF7] rounded-2xl border border-[#8B9D83]/15 p-6 shadow-lg">
                <div className="space-y-4">
                  {/* Partner A message */}
                  <div className="flex justify-end">
                    <div className="bg-[#9C8B7A] text-white rounded-2xl rounded-tr-md px-4 py-3 max-w-[80%]">
                      <div className="text-xs opacity-75 mb-1">Alex</div>
                      I feel like we haven&apos;t been connecting lately...
                    </div>
                  </div>
                  {/* Counsellor response */}
                  <div className="flex justify-start">
                    <div className="bg-[#E8EDE5] text-[#3D3531] rounded-2xl rounded-tl-md px-4 py-3 max-w-[85%]">
                      <div className="text-xs text-[#5C6B56] mb-1 flex items-center gap-1">
                        <span className="text-[#8B9D83]">&#x1F33F;</span> Counsellor
                      </div>
                      <p className="italic">Alex, thank you for sharing that. Jordan, what do you hear in what Alex is saying?</p>
                    </div>
                  </div>
                  {/* Partner B message */}
                  <div className="flex justify-end">
                    <div className="bg-[#C4A484] text-white rounded-2xl rounded-tr-md px-4 py-3 max-w-[80%]">
                      <div className="text-xs opacity-75 mb-1">Jordan</div>
                      I hear that you&apos;ve been feeling distant...
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 md:px-8 py-12 bg-[#FFFCF7] relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2
            className="text-3xl md:text-4xl font-normal text-[#3D3531] text-center mb-12"
            style={{ fontFamily: 'var(--font-cormorant), Cormorant Garamond, serif' }}
          >
            What You Get for Free
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-[#F7F4EE] rounded-2xl p-6">
              <div className="w-12 h-12 rounded-full bg-[#E8EDE5] flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[#5C6B56]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-[#3D3531] mb-2">5 Counsellor Interactions Per Week</h3>
              <p className="text-sm text-[#6B6560]">Enough for meaningful conversations and real progress in your relationship.</p>
            </div>

            <div className="bg-[#F7F4EE] rounded-2xl p-6">
              <div className="w-12 h-12 rounded-full bg-[#E8EDE5] flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[#5C6B56]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-[#3D3531] mb-2">Expert-Informed Guidance</h3>
              <p className="text-sm text-[#6B6560]">Drawing from Esther Perel, the Gottman Institute, and Julie Menanno&apos;s approaches.</p>
            </div>

            <div className="bg-[#F7F4EE] rounded-2xl p-6">
              <div className="w-12 h-12 rounded-full bg-[#E8EDE5] flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[#5C6B56]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-[#3D3531] mb-2">Private & Secure</h3>
              <p className="text-sm text-[#6B6560]">Your conversations are encrypted and never shared. Complete privacy for sensitive topics.</p>
            </div>

            <div className="bg-[#F7F4EE] rounded-2xl p-6">
              <div className="w-12 h-12 rounded-full bg-[#E8EDE5] flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[#5C6B56]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-[#3D3531] mb-2">Available 24/7</h3>
              <p className="text-sm text-[#6B6560]">Have conversations whenever works for both of you - no scheduling required.</p>
            </div>
          </div>
        </div>
      </section>

      {/* No Credit Card Section */}
      <section className="px-4 md:px-8 py-12 relative z-10">
        <div className="max-w-2xl mx-auto">
          <div className="bg-gradient-to-br from-[#E8EDE5] to-[#F7F4EE] rounded-3xl border border-[#C4D1BE] p-8 md:p-10 text-center">
            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mx-auto mb-6 shadow-sm">
              <svg className="w-8 h-8 text-[#5C6B56]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <h2
              className="text-2xl md:text-3xl font-medium text-[#3D3531] mb-4"
              style={{ fontFamily: 'var(--font-cormorant), Cormorant Garamond, serif' }}
            >
              No Credit Card Required
            </h2>
            <p className="text-[#6B6560] mb-8 leading-relaxed">
              We believe in letting you experience the value before asking for payment. Create your free account with just your email - no payment details needed. Upgrade to Premium only if and when you choose to.
            </p>

            <SignUpButton mode="modal">
              <button className="w-full max-w-md py-4 bg-gradient-to-br from-[#8B9D83] to-[#5C6B56] hover:from-[#7A8E75] hover:to-[#4D5C48] text-white text-lg font-medium rounded-2xl transition-all shadow-[0_4px_15px_-3px_rgba(92,107,86,0.4)]">
                Create Free Account
              </button>
            </SignUpButton>

            <p className="text-sm text-[#6B6560] mt-4">
              Already have an account?{' '}
              <Link href="/sign-in" className="text-[#5C6B56] font-medium hover:underline">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Premium Mention */}
      <section className="px-4 md:px-8 py-8 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-[#6B6560]">
            Want unlimited interactions and advanced features?{' '}
            <span className="text-[#3D3531] font-medium">Premium is just $9.99/month</span>
            {' '}- but try free first!
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 md:px-8 py-8 text-center relative z-10 border-t border-[#8B9D83]/15 mt-8">
        <p className="text-xs text-[#9C8B7A]">
          &copy; {new Date().getFullYear()} Octane Limited. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
