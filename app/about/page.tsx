'use client';

import Link from 'next/link';

export default function AboutPage() {
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
            <Link href="/about" className="text-sm text-[#5C6B56] font-medium nav-link">About</Link>
            <Link href="/faq" className="text-sm text-[#6B6560] hover:text-[#5C6B56] nav-link">FAQ</Link>
            <Link href="/privacy" className="text-sm text-[#6B6560] hover:text-[#5C6B56] nav-link">Privacy</Link>
            <Link href="/support" className="text-sm text-[#6B6560] hover:text-[#5C6B56] nav-link">Support</Link>
          </nav>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-6 py-12 relative z-[1]">
        <h1
          className="text-4xl font-bold text-[#3D3531] mb-8"
          style={{ fontFamily: 'var(--font-cormorant), Cormorant Garamond, serif' }}
        >
          About Us
        </h1>

        <section className="space-y-6">
          <div className="bg-[#FFFCF7] rounded-2xl shadow-sm p-8 border border-[#8B9D83]/15">
            <h2
              className="text-2xl font-semibold text-[#3D3531] mb-4"
              style={{ fontFamily: 'var(--font-cormorant), Cormorant Garamond, serif' }}
            >
              Our Mission
            </h2>
            <p className="text-[#6B6560] leading-relaxed mb-4">
              Meet In The Field was created with a simple belief: every couple deserves access to
              thoughtful, compassionate guidance when navigating difficult conversations. Inspired
              by the Rumi poem that gives us our name, we provide a neutral space where partners
              can come together—beyond judgment, beyond blame—to truly hear each other.
            </p>
            <blockquote className="border-l-4 border-[#8B9D83] pl-4 italic text-[#6B6560] my-6">
              "Out beyond ideas of wrongdoing and rightdoing there is a field. I'll meet you there."
              <span className="block text-sm mt-1 not-italic text-[#9C8B7A]">— Rumi</span>
            </blockquote>
          </div>

          <div className="bg-[#FFFCF7] rounded-2xl shadow-sm p-8 border border-[#8B9D83]/15">
            <h2
              className="text-2xl font-semibold text-[#3D3531] mb-4"
              style={{ fontFamily: 'var(--font-cormorant), Cormorant Garamond, serif' }}
            >
              What We Offer
            </h2>
            <p className="text-[#6B6560] leading-relaxed mb-4">
              Our AI-powered guidance draws from established therapeutic frameworks and
              communication techniques used by relationship experts worldwide. While we're not
              a replacement for professional therapy, we offer an accessible first step for
              couples who want to:
            </p>
            <ul className="list-disc list-inside text-[#6B6560] space-y-2 mb-4">
              <li>Practice healthier communication patterns</li>
              <li>Navigate everyday disagreements with more empathy</li>
              <li>Build stronger emotional connections</li>
              <li>Explore difficult topics in a structured, supportive environment</li>
              <li>Develop skills they can use in all their relationships</li>
            </ul>
          </div>

          <div className="bg-[#FFFCF7] rounded-2xl shadow-sm p-8 border border-[#8B9D83]/15">
            <h2
              className="text-2xl font-semibold text-[#3D3531] mb-4"
              style={{ fontFamily: 'var(--font-cormorant), Cormorant Garamond, serif' }}
            >
              Our Approach
            </h2>
            <p className="text-[#6B6560] leading-relaxed mb-4">
              We believe that good communication isn't about winning arguments—it's about
              understanding. Our AI guide helps facilitate conversations by:
            </p>
            <ul className="list-disc list-inside text-[#6B6560] space-y-2 mb-4">
              <li><strong className="text-[#3D3531]">Staying neutral:</strong> We never take sides. Both partners' perspectives are equally valued.</li>
              <li><strong className="text-[#3D3531]">Encouraging reflection:</strong> Before reacting, we help you pause and consider your partner's point of view.</li>
              <li><strong className="text-[#3D3531]">Focusing on feelings:</strong> We help translate complaints into the underlying needs and emotions.</li>
              <li><strong className="text-[#3D3531]">Building bridges:</strong> We look for common ground and shared goals, even in disagreement.</li>
            </ul>
          </div>

          <div className="bg-[#FFFCF7] rounded-2xl shadow-sm p-8 border border-[#8B9D83]/15">
            <h2
              className="text-2xl font-semibold text-[#3D3531] mb-4"
              style={{ fontFamily: 'var(--font-cormorant), Cormorant Garamond, serif' }}
            >
              Your Privacy Matters
            </h2>
            <p className="text-[#6B6560] leading-relaxed mb-4">
              We understand that the conversations you have here are deeply personal. That's why
              we've built privacy into the foundation of Meet In The Field:
            </p>
            <ul className="list-disc list-inside text-[#6B6560] space-y-2 mb-4">
              <li>Your conversations are not used to train AI models</li>
              <li>We don't sell or share your data with third parties</li>
              <li>Session data is encrypted and stored securely</li>
              <li>You can delete your data at any time</li>
            </ul>
            <p className="text-[#6B6560] leading-relaxed">
              For complete details, please review our <Link href="/privacy" className="text-[#8B9D83] hover:text-[#5C6B56] underline">Privacy Policy</Link>.
            </p>
          </div>

          <div className="bg-[#FFFCF7] rounded-2xl shadow-sm p-8 border border-[#8B9D83]/15">
            <h2
              className="text-2xl font-semibold text-[#3D3531] mb-4"
              style={{ fontFamily: 'var(--font-cormorant), Cormorant Garamond, serif' }}
            >
              A Note on Professional Help
            </h2>
            <p className="text-[#6B6560] leading-relaxed mb-4">
              Meet In The Field is designed to support healthy communication, but it's not a
              substitute for professional mental health services. If you or your partner are
              experiencing:
            </p>
            <ul className="list-disc list-inside text-[#6B6560] space-y-2 mb-4">
              <li>Domestic violence or abuse</li>
              <li>Severe depression or anxiety</li>
              <li>Thoughts of self-harm</li>
              <li>Substance abuse issues</li>
            </ul>
            <p className="text-[#6B6560] leading-relaxed">
              Please seek help from qualified professionals. In an emergency, contact your local
              emergency services or a crisis helpline.
            </p>
          </div>
        </section>

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
