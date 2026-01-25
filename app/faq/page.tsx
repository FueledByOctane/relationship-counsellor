'use client';

import { useState } from 'react';
import Link from 'next/link';

interface FAQItem {
  question: string;
  answer: string | React.ReactNode;
}

const faqs: FAQItem[] = [
  {
    question: "What is Meet In The Field?",
    answer: "Meet In The Field is an AI-powered communication tool designed to help couples have more productive, empathetic conversations. Our AI guide facilitates discussions by encouraging active listening, validating both perspectives, and helping partners find common ground—all in real-time."
  },
  {
    question: "Is this a replacement for couples therapy?",
    answer: "No. Meet In The Field is a communication support tool, not a substitute for professional therapy. While our AI draws from established therapeutic frameworks, it cannot diagnose conditions, provide medical advice, or replace the personalized care of a licensed therapist. We encourage couples dealing with serious issues to seek professional help."
  },
  {
    question: "How does the AI guidance work?",
    answer: "When both partners join a session, our AI guide observes your conversation and offers helpful prompts, reflections, and suggestions. It might ask clarifying questions, help reframe statements in more constructive ways, or suggest taking a pause when emotions run high. The AI remains neutral and never takes sides."
  },
  {
    question: "Is my conversation private?",
    answer: "Yes, absolutely. Your privacy is our top priority. Your conversations are encrypted, never shared with third parties, and are not used to train AI models. Only you and your partner can see what's discussed in your session. You can delete your conversation history at any time from your account settings."
  },
  {
    question: "Who can see my conversations?",
    answer: "Only you and your partner can see the contents of your sessions. Our team does not have access to read your conversations. We may access anonymized, aggregated data for improving our service, but this never includes identifiable conversation content."
  },
  {
    question: "What's the difference between Free and Premium?",
    answer: (
      <div>
        <p className="mb-3"><strong className="text-[#3D3531]">Free tier</strong> includes:</p>
        <ul className="list-disc list-inside mb-3 space-y-1">
          <li>5 AI-guided interactions per week</li>
          <li>Standard guidance mode</li>
          <li>Real-time sessions with your partner</li>
        </ul>
        <p className="mb-3"><strong className="text-[#3D3531]">Premium tier ($9.99/month)</strong> includes:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Unlimited AI-guided interactions</li>
          <li>Advanced guidance modes (Conflict Resolution, Intimacy Building, Future Planning)</li>
          <li>Session summary reports</li>
          <li>Priority support</li>
        </ul>
        <p className="mt-3 text-sm text-[#9C8B7A]">Note: If either partner has Premium, both partners benefit from Premium features during shared sessions.</p>
      </div>
    )
  },
  {
    question: "What are the different guidance modes?",
    answer: (
      <div>
        <ul className="space-y-3">
          <li><strong className="text-[#3D3531]">Standard:</strong> Balanced, general-purpose guidance for everyday conversations</li>
          <li><strong className="text-[#3D3531]">Conflict Resolution:</strong> Specialized support for working through disagreements constructively</li>
          <li><strong className="text-[#3D3531]">Intimacy Building:</strong> Focused on deepening emotional connection and vulnerability</li>
          <li><strong className="text-[#3D3531]">Future Planning:</strong> Helps align on goals, dreams, and major life decisions</li>
        </ul>
      </div>
    )
  },
  {
    question: "How do I start a session with my partner?",
    answer: "One partner creates a 'field' (session) and receives a unique 6-character code. Share this code with your partner, who can then join using the 'Join a Field' option. Once both partners are connected, the AI guide will help facilitate your conversation."
  },
  {
    question: "Can I use this on my phone?",
    answer: "Yes! Meet In The Field is fully responsive and works on smartphones, tablets, and desktop computers. Simply visit our website in your mobile browser—no app download required."
  },
  {
    question: "What if my partner and I are in different locations?",
    answer: "That's perfectly fine! Meet In The Field is designed for remote communication. As long as both partners have internet access, you can connect from anywhere in the world."
  },
  {
    question: "How do I cancel my subscription?",
    answer: "You can cancel your Premium subscription at any time from your Account page. After cancellation, you'll continue to have Premium access until the end of your current billing period, then your account will revert to the Free tier."
  },
  {
    question: "Is my payment information secure?",
    answer: "Yes. We use Stripe, a PCI-compliant payment processor trusted by millions of businesses worldwide. We never store your full credit card number on our servers. All payment data is encrypted and handled securely by Stripe."
  },
  {
    question: "What if the AI says something unhelpful?",
    answer: "While our AI is designed to be supportive and constructive, it's not perfect. If you receive guidance that doesn't feel right for your situation, you can simply ignore it and continue your conversation. The AI is a tool to facilitate discussion, not a directive you must follow. If you encounter consistently problematic responses, please contact our support team."
  },
  {
    question: "Can I use this for other relationships (not romantic)?",
    answer: "While Meet In The Field is designed primarily for romantic partners, the communication principles can apply to any close relationship—family members, close friends, or business partners. However, the AI guidance is optimized for couples' dynamics."
  },
  {
    question: "How do I delete my account and data?",
    answer: "You can delete your account and all associated data from the Account settings page. This action is permanent and will remove all your conversation history, profile information, and subscription data. If you have an active subscription, please cancel it first."
  }
];

function FAQAccordion({ item, isOpen, onToggle }: { item: FAQItem; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-[#8B9D83]/15 last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full py-5 flex items-center justify-between text-left hover:bg-[#F7F4EE] transition-colors px-2 -mx-2 rounded-lg"
      >
        <span className="font-medium text-[#3D3531] pr-4">{item.question}</span>
        <span className={`text-[#8B9D83] transition-transform ${isOpen ? 'rotate-180' : ''}`}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>
      {isOpen && (
        <div className="pb-5 text-[#6B6560] leading-relaxed">
          {item.answer}
        </div>
      )}
    </div>
  );
}

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

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
            <Link href="/faq" className="text-sm text-[#5C6B56] font-medium nav-link">FAQ</Link>
            <Link href="/privacy" className="text-sm text-[#6B6560] hover:text-[#5C6B56] nav-link">Privacy</Link>
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
          Frequently Asked Questions
        </h1>
        <p className="text-lg text-[#6B6560] mb-8">
          Find answers to common questions about Meet In The Field. Can't find what you're looking for?
          Contact us at <a href="mailto:support@meetinthefield.app" className="text-[#8B9D83] hover:text-[#5C6B56] underline">support@meetinthefield.app</a>
        </p>

        <div className="bg-[#FFFCF7] rounded-2xl shadow-sm overflow-hidden border border-[#8B9D83]/15">
          <div className="px-6">
            {faqs.map((faq, index) => (
              <FAQAccordion
                key={index}
                item={faq}
                isOpen={openIndex === index}
                onToggle={() => setOpenIndex(openIndex === index ? null : index)}
              />
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-12 bg-[#FFFCF7] rounded-2xl shadow-sm p-8 text-center border border-[#8B9D83]/15">
          <h2
            className="text-xl font-semibold text-[#3D3531] mb-3"
            style={{ fontFamily: 'var(--font-cormorant), Cormorant Garamond, serif' }}
          >
            Still have questions?
          </h2>
          <p className="text-[#6B6560] mb-4">
            We're here to help. Reach out to our support team and we'll get back to you as soon as possible.
          </p>
          <a
            href="mailto:support@meetinthefield.app"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-br from-[#8B9D83] to-[#5C6B56] text-white font-medium rounded-[20px] hover:from-[#7A8E75] hover:to-[#4D5C48] transition-all shadow-[0_4px_15px_-3px_rgba(92,107,86,0.4)]"
          >
            Contact Support
          </a>
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
