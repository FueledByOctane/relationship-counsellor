'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { SignUpButton } from '@clerk/nextjs';

export default function Pricing() {
  const [isUK, setIsUK] = useState(false);

  useEffect(() => {
    const browserLocale = navigator.language;
    setIsUK(browserLocale === 'en-GB');
  }, []);

  const currency = isUK ? '£' : '$';
  const price = '9.99';

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
        <div className="flex items-center gap-6">
          <Link
            href="/how-it-works"
            className="text-sm text-[#6B6560] hover:text-[#5C6B56] transition-colors"
          >
            How It Works
          </Link>
          <Link
            href="/"
            className="text-sm text-[#6B6560] hover:text-[#5C6B56] transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-4 md:px-8 py-12 md:py-16 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-normal text-[#3D3531] mb-6"
            style={{ fontFamily: 'var(--font-cormorant), Cormorant Garamond, serif' }}
          >
            Simple, Transparent Pricing
          </h1>
          <p className="text-lg md:text-xl text-[#6B6560] leading-relaxed max-w-2xl mx-auto">
            Start free, upgrade when you&apos;re ready. No hidden fees, no surprises.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="px-4 md:px-8 py-12 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Free Tier */}
            <div className="bg-[#FFFCF7] rounded-3xl border border-[#8B9D83]/15 p-8 md:p-10">
              <div className="mb-6">
                <h2
                  className="text-2xl font-medium text-[#3D3531] mb-2"
                  style={{ fontFamily: 'var(--font-cormorant), Cormorant Garamond, serif' }}
                >
                  Free
                </h2>
                <p className="text-[#6B6560]">Perfect for getting started</p>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline">
                  <span className="text-5xl font-bold text-[#3D3531]">{currency}0</span>
                  <span className="text-[#6B6560] ml-2">/month</span>
                </div>
                <p className="text-sm text-[#9C8B7A] mt-2">No credit card required</p>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#8B9D83] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-[#3D3531]">5 counsellor interactions per week</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#8B9D83] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-[#3D3531]">Standard Guidance mode</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#8B9D83] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-[#3D3531]">Create unlimited sessions</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#8B9D83] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-[#3D3531]">Private & encrypted conversations</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#8B9D83] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-[#3D3531]">Available 24/7</span>
                </li>
              </ul>

              <SignUpButton mode="modal">
                <button className="w-full py-4 bg-[#E8EDE5] hover:bg-[#C4D1BE] text-[#5C6B56] font-medium rounded-2xl transition-all">
                  Get Started Free
                </button>
              </SignUpButton>
            </div>

            {/* Premium Tier */}
            <div className="bg-gradient-to-br from-[#5C6B56] to-[#3D4A38] rounded-3xl p-8 md:p-10 text-white relative overflow-hidden">
              {/* Popular badge */}
              <div className="absolute top-6 right-6 bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-3 py-1 rounded-full">
                Most Popular
              </div>

              <div className="mb-6">
                <h2
                  className="text-2xl font-medium mb-2"
                  style={{ fontFamily: 'var(--font-cormorant), Cormorant Garamond, serif' }}
                >
                  Premium
                </h2>
                <p className="text-white/80">For deeper connection</p>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline">
                  <span className="text-5xl font-bold">{currency}{price}</span>
                  <span className="text-white/80 ml-2">/month</span>
                </div>
                <p className="text-sm text-white/60 mt-2">Cancel anytime</p>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#C4D1BE] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span><strong>Unlimited</strong> counsellor interactions</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#C4D1BE] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span><strong>All guidance modes</strong> including Conflict Resolution, Intimacy Building, and Future Planning</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#C4D1BE] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span><strong>Session summaries</strong> to track your progress</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#C4D1BE] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Everything in Free, plus more</span>
                </li>
              </ul>

              <SignUpButton mode="modal">
                <button className="w-full py-4 bg-white hover:bg-[#F7F4EE] text-[#5C6B56] font-medium rounded-2xl transition-all">
                  Start Free Trial
                </button>
              </SignUpButton>
              <p className="text-center text-sm text-white/60 mt-3">
                Try free first, upgrade anytime
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="px-4 md:px-8 py-12 relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2
            className="text-3xl font-normal text-[#3D3531] text-center mb-12"
            style={{ fontFamily: 'var(--font-cormorant), Cormorant Garamond, serif' }}
          >
            Compare Plans
          </h2>

          <div className="bg-[#FFFCF7] rounded-2xl border border-[#8B9D83]/15 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#8B9D83]/15">
                  <th className="text-left p-4 md:p-6 text-[#6B6560] font-medium">Feature</th>
                  <th className="p-4 md:p-6 text-center text-[#6B6560] font-medium">Free</th>
                  <th className="p-4 md:p-6 text-center text-[#5C6B56] font-medium bg-[#E8EDE5]/50">Premium</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[#8B9D83]/10">
                  <td className="p-4 md:p-6 text-[#3D3531]">Counsellor interactions</td>
                  <td className="p-4 md:p-6 text-center text-[#6B6560]">5 per week</td>
                  <td className="p-4 md:p-6 text-center text-[#5C6B56] font-medium bg-[#E8EDE5]/50">Unlimited</td>
                </tr>
                <tr className="border-b border-[#8B9D83]/10">
                  <td className="p-4 md:p-6 text-[#3D3531]">Standard Guidance</td>
                  <td className="p-4 md:p-6 text-center">
                    <svg className="w-5 h-5 text-[#8B9D83] mx-auto" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </td>
                  <td className="p-4 md:p-6 text-center bg-[#E8EDE5]/50">
                    <svg className="w-5 h-5 text-[#5C6B56] mx-auto" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </td>
                </tr>
                <tr className="border-b border-[#8B9D83]/10">
                  <td className="p-4 md:p-6 text-[#3D3531]">Conflict Resolution mode</td>
                  <td className="p-4 md:p-6 text-center">
                    <svg className="w-5 h-5 text-[#C4A484] mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </td>
                  <td className="p-4 md:p-6 text-center bg-[#E8EDE5]/50">
                    <svg className="w-5 h-5 text-[#5C6B56] mx-auto" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </td>
                </tr>
                <tr className="border-b border-[#8B9D83]/10">
                  <td className="p-4 md:p-6 text-[#3D3531]">Intimacy Building mode</td>
                  <td className="p-4 md:p-6 text-center">
                    <svg className="w-5 h-5 text-[#C4A484] mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </td>
                  <td className="p-4 md:p-6 text-center bg-[#E8EDE5]/50">
                    <svg className="w-5 h-5 text-[#5C6B56] mx-auto" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </td>
                </tr>
                <tr className="border-b border-[#8B9D83]/10">
                  <td className="p-4 md:p-6 text-[#3D3531]">Future Planning mode</td>
                  <td className="p-4 md:p-6 text-center">
                    <svg className="w-5 h-5 text-[#C4A484] mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </td>
                  <td className="p-4 md:p-6 text-center bg-[#E8EDE5]/50">
                    <svg className="w-5 h-5 text-[#5C6B56] mx-auto" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </td>
                </tr>
                <tr>
                  <td className="p-4 md:p-6 text-[#3D3531]">Session summaries</td>
                  <td className="p-4 md:p-6 text-center">
                    <svg className="w-5 h-5 text-[#C4A484] mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </td>
                  <td className="p-4 md:p-6 text-center bg-[#E8EDE5]/50">
                    <svg className="w-5 h-5 text-[#5C6B56] mx-auto" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 md:px-8 py-12 bg-[#FFFCF7] relative z-10">
        <div className="max-w-3xl mx-auto">
          <h2
            className="text-3xl font-normal text-[#3D3531] text-center mb-12"
            style={{ fontFamily: 'var(--font-cormorant), Cormorant Garamond, serif' }}
          >
            Common Questions
          </h2>

          <div className="space-y-6">
            <div className="bg-[#F7F4EE] rounded-xl p-6">
              <h3 className="font-medium text-[#3D3531] mb-2">Can I try before I pay?</h3>
              <p className="text-[#6B6560] text-sm">
                Absolutely! Start with our free plan - no credit card required. You get 5 counsellor interactions per week to experience the value before deciding to upgrade.
              </p>
            </div>

            <div className="bg-[#F7F4EE] rounded-xl p-6">
              <h3 className="font-medium text-[#3D3531] mb-2">What counts as an &quot;interaction&quot;?</h3>
              <p className="text-[#6B6560] text-sm">
                Each time you send a message and receive a response from the AI counsellor counts as one interaction. You and your partner can chat freely - the counsellor responds after each of your messages.
              </p>
            </div>

            <div className="bg-[#F7F4EE] rounded-xl p-6">
              <h3 className="font-medium text-[#3D3531] mb-2">Can I cancel anytime?</h3>
              <p className="text-[#6B6560] text-sm">
                Yes, Premium is month-to-month with no long-term commitment. Cancel anytime from your account settings and you won&apos;t be charged again.
              </p>
            </div>

            <div className="bg-[#F7F4EE] rounded-xl p-6">
              <h3 className="font-medium text-[#3D3531] mb-2">Does my partner need to pay too?</h3>
              <p className="text-[#6B6560] text-sm">
                No! If either partner has Premium, both partners in the session get access to all Premium features. Only one subscription is needed per couple.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 md:px-8 py-12 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <h2
            className="text-3xl font-normal text-[#3D3531] mb-4"
            style={{ fontFamily: 'var(--font-cormorant), Cormorant Garamond, serif' }}
          >
            Ready to Start?
          </h2>
          <p className="text-[#6B6560] mb-8">
            Begin with our free plan today. No credit card required.
          </p>
          <SignUpButton mode="modal">
            <button className="inline-block px-8 py-4 bg-gradient-to-br from-[#8B9D83] to-[#5C6B56] hover:from-[#7A8E75] hover:to-[#4D5C48] text-white text-lg font-medium rounded-2xl transition-all shadow-[0_4px_15px_-3px_rgba(92,107,86,0.4)]">
              Get Started Free
            </button>
          </SignUpButton>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 md:px-8 py-12 relative z-10 border-t border-[#8B9D83]/15 mt-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-sm font-medium text-[#3D3531] mb-4">Product</h4>
              <ul className="space-y-2">
                <li><Link href="/start-free-trial" className="text-sm text-[#6B6560] hover:text-[#5C6B56] transition-colors">Start Free Trial</Link></li>
                <li><Link href="/how-it-works" className="text-sm text-[#6B6560] hover:text-[#5C6B56] transition-colors">How It Works</Link></li>
                <li><Link href="/pricing" className="text-sm text-[#6B6560] hover:text-[#5C6B56] transition-colors">Pricing</Link></li>
                <li><Link href="/faq" className="text-sm text-[#6B6560] hover:text-[#5C6B56] transition-colors">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-medium text-[#3D3531] mb-4">Company</h4>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-sm text-[#6B6560] hover:text-[#5C6B56] transition-colors">About</Link></li>
                <li><Link href="/support" className="text-sm text-[#6B6560] hover:text-[#5C6B56] transition-colors">Support</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-medium text-[#3D3531] mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><Link href="/privacy" className="text-sm text-[#6B6560] hover:text-[#5C6B56] transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-sm text-[#6B6560] hover:text-[#5C6B56] transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-medium text-[#3D3531] mb-4">Get Started</h4>
              <ul className="space-y-2">
                <li><Link href="/sign-in" className="text-sm text-[#6B6560] hover:text-[#5C6B56] transition-colors">Sign In</Link></li>
                <li><Link href="/start-free-trial" className="text-sm text-[#6B6560] hover:text-[#5C6B56] transition-colors">Create Account</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-[#8B9D83]/10 text-center">
            <p className="text-xs text-[#9C8B7A]">
              &copy; {new Date().getFullYear()} Octane Limited. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
