'use client';

import Link from 'next/link';

export default function HowItWorks() {
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
            href="/start-free-trial"
            className="text-sm text-[#6B6560] hover:text-[#5C6B56] transition-colors"
          >
            Start Free Trial
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
            How It Works
          </h1>
          <p className="text-lg md:text-xl text-[#6B6560] leading-relaxed max-w-2xl mx-auto">
            Learn how AI guides your conversations with wisdom drawn from the world&apos;s leading relationship experts.
          </p>
        </div>
      </section>

      {/* The Approach Section */}
      <section className="px-4 md:px-8 py-12 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#FFFCF7] rounded-3xl border border-[#8B9D83]/15 p-8 md:p-12">
            <h2
              className="text-3xl font-normal text-[#3D3531] mb-6"
              style={{ fontFamily: 'var(--font-cormorant), Cormorant Garamond, serif' }}
            >
              A New Kind of Counselling
            </h2>
            <div className="prose prose-lg text-[#6B6560] space-y-4">
              <p>
                Meet In The Field provides AI-guided relationship counselling that helps couples communicate more effectively. Unlike traditional therapy, you can access it anytime, anywhere - whenever both partners are ready to talk.
              </p>
              <p>
                Our AI counsellor doesn&apos;t replace human therapists. Instead, it offers a gentle, always-available space for the everyday conversations that strengthen relationships - the check-ins, the difficult topics you&apos;ve been avoiding, or simply a guided space to reconnect.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Therapeutic Foundations */}
      <section className="px-4 md:px-8 py-12 bg-[#FFFCF7] relative z-10">
        <div className="max-w-5xl mx-auto">
          <h2
            className="text-3xl md:text-4xl font-normal text-[#3D3531] text-center mb-4"
            style={{ fontFamily: 'var(--font-cormorant), Cormorant Garamond, serif' }}
          >
            Built on Proven Foundations
          </h2>
          <p className="text-center text-[#6B6560] mb-12 max-w-2xl mx-auto">
            Our AI counsellor draws from three of the most respected approaches in modern relationship therapy.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Esther Perel */}
            <div className="bg-[#F7F4EE] rounded-2xl p-6">
              <div className="w-14 h-14 rounded-full bg-[#E8EDE5] flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-[#5C6B56]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-[#3D3531] mb-3">Esther Perel</h3>
              <p className="text-sm text-[#6B6560] leading-relaxed">
                Renowned for her work on desire and modern relationships, Esther Perel&apos;s approach helps couples explore the tension between security and adventure, asking provocative questions that shift perspectives and deepen understanding.
              </p>
            </div>

            {/* Gottman Institute */}
            <div className="bg-[#F7F4EE] rounded-2xl p-6">
              <div className="w-14 h-14 rounded-full bg-[#E8EDE5] flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-[#5C6B56]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-[#3D3531] mb-3">The Gottman Institute</h3>
              <p className="text-sm text-[#6B6560] leading-relaxed">
                Based on decades of research, the Gottman Method helps identify destructive patterns (the &quot;Four Horsemen&quot;) and builds the &quot;Sound Relationship House&quot; through friendship, fondness, and turning toward each other&apos;s bids for connection.
              </p>
            </div>

            {/* Julie Menanno */}
            <div className="bg-[#F7F4EE] rounded-2xl p-6">
              <div className="w-14 h-14 rounded-full bg-[#E8EDE5] flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-[#5C6B56]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-[#3D3531] mb-3">Julie Menanno</h3>
              <p className="text-sm text-[#6B6560] leading-relaxed">
                An attachment-informed approach that understands protest behaviors as unmet attachment needs. Helps partners become each other&apos;s &quot;safe haven&quot; and &quot;secure base,&quot; creating lasting security in the relationship.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How Conversations Flow */}
      <section className="px-4 md:px-8 py-12 relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2
            className="text-3xl md:text-4xl font-normal text-[#3D3531] text-center mb-12"
            style={{ fontFamily: 'var(--font-cormorant), Cormorant Garamond, serif' }}
          >
            How Conversations Flow
          </h2>

          <div className="space-y-8">
            {/* Opening */}
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#E8EDE5] flex items-center justify-center text-[#5C6B56] font-medium">
                1
              </div>
              <div>
                <h3 className="text-xl font-medium text-[#3D3531] mb-2">Opening</h3>
                <p className="text-[#6B6560] leading-relaxed">
                  The session begins by asking each partner what they hope to achieve. Getting a specific intention from each person helps focus the conversation and gives you both something to work toward together.
                </p>
              </div>
            </div>

            {/* Middle */}
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#E8EDE5] flex items-center justify-center text-[#5C6B56] font-medium">
                2
              </div>
              <div>
                <h3 className="text-xl font-medium text-[#3D3531] mb-2">Guided Dialogue</h3>
                <p className="text-[#6B6560] leading-relaxed mb-3">
                  As you talk, the AI counsellor gently guides the conversation. It addresses one partner at a time, often turning to the other to ask what they heard or how something landed. This creates space for both voices to be heard.
                </p>
                <div className="bg-[#FFFCF7] rounded-xl p-4 border border-[#8B9D83]/15">
                  <p className="text-sm text-[#6B6560] italic">
                    &quot;Alex, what do you hear in that?&quot; ... &quot;Jordan, how does that land for you?&quot; ... &quot;Tell each other directly what you need.&quot;
                  </p>
                </div>
              </div>
            </div>

            {/* Patterns */}
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#E8EDE5] flex items-center justify-center text-[#5C6B56] font-medium">
                3
              </div>
              <div>
                <h3 className="text-xl font-medium text-[#3D3531] mb-2">Naming Patterns</h3>
                <p className="text-[#6B6560] leading-relaxed">
                  The counsellor notices and gently names patterns - when criticism creeps in, when someone withdraws, or when a repair attempt is made. It reframes accusations as wishes and helps you see the underlying needs beneath the words.
                </p>
              </div>
            </div>

            {/* Closing */}
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#E8EDE5] flex items-center justify-center text-[#5C6B56] font-medium">
                4
              </div>
              <div>
                <h3 className="text-xl font-medium text-[#3D3531] mb-2">Closing</h3>
                <p className="text-[#6B6560] leading-relaxed">
                  Sessions close by summarizing progress, checking if both partners feel heard, and identifying one concrete takeaway or action. You leave with something practical to carry into your relationship.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Guidance Modes */}
      <section className="px-4 md:px-8 py-12 bg-[#FFFCF7] relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2
            className="text-3xl md:text-4xl font-normal text-[#3D3531] text-center mb-4"
            style={{ fontFamily: 'var(--font-cormorant), Cormorant Garamond, serif' }}
          >
            Guidance Modes
          </h2>
          <p className="text-center text-[#6B6560] mb-12 max-w-2xl mx-auto">
            Choose the focus that fits your conversation. Standard Guidance is free; specialized modes are available with Premium.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-[#F7F4EE] rounded-2xl p-6 border-2 border-[#8B9D83]">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-medium text-[#3D3531]">Standard Guidance</h3>
                <span className="text-xs bg-[#E8EDE5] text-[#5C6B56] px-2 py-1 rounded-full">Free</span>
              </div>
              <p className="text-sm text-[#6B6560]">
                Expert guidance drawing from all three therapeutic foundations. Perfect for general check-ins, everyday communication, and building connection.
              </p>
            </div>

            <div className="bg-[#F7F4EE] rounded-2xl p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-medium text-[#3D3531]">Conflict Resolution</h3>
                <span className="text-xs bg-[#C4A484]/20 text-[#9C8B7A] px-2 py-1 rounded-full">Premium</span>
              </div>
              <p className="text-sm text-[#6B6560]">
                Specialized in de-escalation and finding common ground. Helps identify the Four Horsemen and guides toward repair attempts.
              </p>
            </div>

            <div className="bg-[#F7F4EE] rounded-2xl p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-medium text-[#3D3531]">Intimacy Building</h3>
                <span className="text-xs bg-[#C4A484]/20 text-[#9C8B7A] px-2 py-1 rounded-full">Premium</span>
              </div>
              <p className="text-sm text-[#6B6560]">
                Focuses on emotional and physical connection. Builds Love Maps, encourages appreciation, and creates safety for vulnerability.
              </p>
            </div>

            <div className="bg-[#F7F4EE] rounded-2xl p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-medium text-[#3D3531]">Future Planning</h3>
                <span className="text-xs bg-[#C4A484]/20 text-[#9C8B7A] px-2 py-1 rounded-full">Premium</span>
              </div>
              <p className="text-sm text-[#6B6560]">
                For life transitions and shared goal-setting. Helps clarify individual and shared visions, surface unspoken assumptions, and align on decisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Section */}
      <section className="px-4 md:px-8 py-12 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-[#E8EDE5] to-[#F7F4EE] rounded-3xl border border-[#C4D1BE] p-8 md:p-10">
            <div className="flex items-start gap-6">
              <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-sm">
                <svg className="w-7 h-7 text-[#5C6B56]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div>
                <h2
                  className="text-2xl font-medium text-[#3D3531] mb-3"
                  style={{ fontFamily: 'var(--font-cormorant), Cormorant Garamond, serif' }}
                >
                  Your Privacy Matters
                </h2>
                <p className="text-[#6B6560] leading-relaxed mb-4">
                  We understand that relationship conversations are deeply personal. Your sessions are encrypted and private. We don&apos;t share your conversations or use them to train AI models. You&apos;re in control of your data.
                </p>
                <Link
                  href="/privacy"
                  className="text-[#5C6B56] font-medium hover:underline"
                >
                  Read our full Privacy Policy &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 md:px-8 py-12 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <h2
            className="text-3xl font-normal text-[#3D3531] mb-4"
            style={{ fontFamily: 'var(--font-cormorant), Cormorant Garamond, serif' }}
          >
            Ready to Begin?
          </h2>
          <p className="text-[#6B6560] mb-8">
            Start your free trial today. No credit card required.
          </p>
          <Link
            href="/start-free-trial"
            className="inline-block px-8 py-4 bg-gradient-to-br from-[#8B9D83] to-[#5C6B56] hover:from-[#7A8E75] hover:to-[#4D5C48] text-white text-lg font-medium rounded-2xl transition-all shadow-[0_4px_15px_-3px_rgba(92,107,86,0.4)]"
          >
            Start Free Trial
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 md:px-8 py-8 text-center relative z-10 border-t border-[#8B9D83]/15 mt-8">
        <div className="flex justify-center gap-8 mb-6">
          <Link href="/about" className="text-xs uppercase tracking-[0.05em] text-[#6B6560] hover:text-[#5C6B56] transition-colors">
            About
          </Link>
          <Link href="/faq" className="text-xs uppercase tracking-[0.05em] text-[#6B6560] hover:text-[#5C6B56] transition-colors">
            FAQ
          </Link>
          <Link href="/privacy" className="text-xs uppercase tracking-[0.05em] text-[#6B6560] hover:text-[#5C6B56] transition-colors">
            Privacy
          </Link>
          <Link href="/terms" className="text-xs uppercase tracking-[0.05em] text-[#6B6560] hover:text-[#5C6B56] transition-colors">
            Terms
          </Link>
        </div>
        <p className="text-xs text-[#9C8B7A]">
          &copy; {new Date().getFullYear()} Octane Limited. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
