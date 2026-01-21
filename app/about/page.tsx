'use client';

import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <header className="px-6 py-4 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-xl font-semibold text-gray-900 hover:text-gray-700">
            Meet In The Field
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/about" className="text-sm text-blue-600 font-medium">About</Link>
            <Link href="/faq" className="text-sm text-gray-600 hover:text-gray-900">FAQ</Link>
            <Link href="/privacy" className="text-sm text-gray-600 hover:text-gray-900">Privacy</Link>
            <Link href="/terms" className="text-sm text-gray-600 hover:text-gray-900">Terms</Link>
          </nav>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">About Us</h1>

        <section className="prose prose-lg max-w-none">
          <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Meet In The Field was created with a simple belief: every couple deserves access to
              thoughtful, compassionate guidance when navigating difficult conversations. Inspired
              by the Rumi poem that gives us our name, we provide a neutral space where partners
              can come together—beyond judgment, beyond blame—to truly hear each other.
            </p>
            <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-600 my-6">
              "Out beyond ideas of wrongdoing and rightdoing there is a field. I'll meet you there."
              <span className="block text-sm mt-1 not-italic text-gray-500">— Rumi</span>
            </blockquote>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">What We Offer</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Our AI-powered guidance draws from established therapeutic frameworks and
              communication techniques used by relationship experts worldwide. While we're not
              a replacement for professional therapy, we offer an accessible first step for
              couples who want to:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
              <li>Practice healthier communication patterns</li>
              <li>Navigate everyday disagreements with more empathy</li>
              <li>Build stronger emotional connections</li>
              <li>Explore difficult topics in a structured, supportive environment</li>
              <li>Develop skills they can use in all their relationships</li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Approach</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We believe that good communication isn't about winning arguments—it's about
              understanding. Our AI guide helps facilitate conversations by:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
              <li><strong>Staying neutral:</strong> We never take sides. Both partners' perspectives are equally valued.</li>
              <li><strong>Encouraging reflection:</strong> Before reacting, we help you pause and consider your partner's point of view.</li>
              <li><strong>Focusing on feelings:</strong> We help translate complaints into the underlying needs and emotions.</li>
              <li><strong>Building bridges:</strong> We look for common ground and shared goals, even in disagreement.</li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your Privacy Matters</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We understand that the conversations you have here are deeply personal. That's why
              we've built privacy into the foundation of Meet In The Field:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
              <li>Your conversations are not used to train AI models</li>
              <li>We don't sell or share your data with third parties</li>
              <li>Session data is encrypted and stored securely</li>
              <li>You can delete your data at any time</li>
            </ul>
            <p className="text-gray-600 leading-relaxed">
              For complete details, please review our <Link href="/terms" className="text-blue-600 hover:underline">Terms and Conditions</Link>.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">A Note on Professional Help</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Meet In The Field is designed to support healthy communication, but it's not a
              substitute for professional mental health services. If you or your partner are
              experiencing:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
              <li>Domestic violence or abuse</li>
              <li>Severe depression or anxiety</li>
              <li>Thoughts of self-harm</li>
              <li>Substance abuse issues</li>
            </ul>
            <p className="text-gray-600 leading-relaxed">
              Please seek help from qualified professionals. In an emergency, contact your local
              emergency services or a crisis helpline.
            </p>
          </div>
        </section>

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
