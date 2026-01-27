'use client';

import Link from 'next/link';

interface TestimonialProps {
  quote: string;
  names: string;
  situation: string;
  duration: string;
  highlight?: string;
}

function Testimonial({ quote, names, situation, duration, highlight }: TestimonialProps) {
  return (
    <div className="bg-[#FFFCF7] rounded-2xl border border-[#8B9D83]/15 p-6 md:p-8">
      {highlight && (
        <div className="inline-block px-3 py-1 bg-[#E8EDE5] text-[#5C6B56] text-xs font-medium rounded-full mb-4">
          {highlight}
        </div>
      )}
      <blockquote className="text-[#3D3531] leading-relaxed mb-6">
        &ldquo;{quote}&rdquo;
      </blockquote>
      <div className="flex items-center justify-between">
        <div>
          <p className="font-medium text-[#3D3531]">{names}</p>
          <p className="text-sm text-[#6B6560]">{situation}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-[#9C8B7A]">Using MITF for</p>
          <p className="text-sm font-medium text-[#5C6B56]">{duration}</p>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const testimonials: TestimonialProps[] = [
    {
      quote: "We'd been married for 12 years and somewhere along the way, we stopped really talking. Meet In The Field gave us a space to reconnect without the pressure of sitting in a therapist's office. The AI asks questions we'd never think to ask each other. Last week, we talked about our dreams for the first time in years.",
      names: "Sarah & Michael",
      situation: "Married 12 years, two children",
      duration: "4 months",
      highlight: "Reconnected after years"
    },
    {
      quote: "As a same-sex couple, we were nervous about finding a counsellor who truly understood us. The AI doesn't judge - it just helps us communicate better. It's helped us navigate conversations about starting a family that we'd been avoiding for months.",
      names: "James & David",
      situation: "Together 5 years",
      duration: "6 months"
    },
    {
      quote: "We used Meet In The Field for three months before starting couples therapy. It was like training wheels - we learned to express ourselves better and identify our patterns. When we finally met with our therapist, she was impressed by how articulate we were about our issues. It made therapy so much more productive.",
      names: "Priya & Raj",
      situation: "Engaged, preparing for marriage",
      duration: "3 months",
      highlight: "Preparation for therapy"
    },
    {
      quote: "Long distance nearly broke us. With different time zones, we couldn't do regular therapy. Meet In The Field let us have guided conversations at 6am my time and 10pm his. It kept us connected through 18 months apart. We're finally in the same city now, and we're stronger than ever.",
      names: "Emma & Carlos",
      situation: "Long-distance relationship",
      duration: "18 months",
      highlight: "Long distance success"
    },
    {
      quote: "I'm not good with words. Never have been. But the way the counsellor guides the conversation and asks me to reflect on what my wife said... it's helped me become a better listener. She says I've changed more in 6 months than in 20 years of marriage. I just needed the right tools.",
      names: "Tom",
      situation: "Married 20 years",
      duration: "6 months"
    },
    {
      quote: "We're both doctors with insane schedules. Traditional therapy was impossible - we'd cancel more sessions than we'd attend. Having access to guided conversations at 11pm after our shifts changed everything. We've worked through resentments about our careers that had been building for years.",
      names: "Dr. Lisa & Dr. Ahmed",
      situation: "Dual-physician couple",
      duration: "8 months",
      highlight: "Busy professionals"
    },
    {
      quote: "After his affair, I didn't know if we could make it. A friend suggested Meet In The Field as a first step - less intimidating than facing a therapist. Those early conversations were painful but necessary. The AI helped us talk without screaming. We're now in intensive therapy, but MITF started our healing.",
      names: "Anonymous",
      situation: "Recovering from infidelity",
      duration: "2 months",
      highlight: "Bridge to intensive therapy"
    },
    {
      quote: "We're in our 60s and thought we were too old for this sort of thing. But our adult children encouraged us to try. It's been wonderful - like rediscovering each other. We talk about things we assumed we knew about each other but never actually discussed.",
      names: "Margaret & Robert",
      situation: "Married 38 years, empty nesters",
      duration: "5 months"
    },
    {
      quote: "The conflict resolution mode saved us. We used to have the same fight over and over - about money, always about money. The AI helped us see we weren't really fighting about money at all. It was about security and feeling valued. Once we understood that, everything shifted.",
      names: "Nina & Chris",
      situation: "Newlyweds, first year of marriage",
      duration: "7 months",
      highlight: "Broke the cycle"
    },
    {
      quote: "English isn't my first language, and I always felt at a disadvantage in arguments. The slower pace of text-based conversation levels the playing field. I can take my time, think about what I want to say. My husband finally hears me properly.",
      names: "Yuki & Ben",
      situation: "Intercultural marriage",
      duration: "4 months"
    },
    {
      quote: "We started using MITF when we first noticed problems. I wish more couples did this - caught things early before they became crises. The weekly check-ins helped us address small issues before they became big resentments. It's like preventive care for your relationship.",
      names: "Jordan & Alex",
      situation: "Dating 2 years",
      duration: "10 months",
      highlight: "Early intervention"
    },
    {
      quote: "Blending families is hard. Really hard. Meet In The Field gave us a space to work through all the complicated feelings - jealousy about time with kids, different parenting styles, ex-spouse drama. The AI never took sides, just helped us understand each other's perspectives.",
      names: "Danielle & Marcus",
      situation: "Blended family, 4 children between them",
      duration: "9 months"
    }
  ];

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
            Success Stories
          </h1>
          <p className="text-lg md:text-xl text-[#6B6560] leading-relaxed max-w-2xl mx-auto">
            See how couples have used Meet In The Field to reconnect, communicate better, and strengthen their relationships.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-4 md:px-8 py-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-3 gap-4 md:gap-8">
            <div className="text-center">
              <p
                className="text-3xl md:text-4xl font-normal text-[#5C6B56] mb-1"
                style={{ fontFamily: 'var(--font-cormorant), Cormorant Garamond, serif' }}
              >
                89%
              </p>
              <p className="text-xs md:text-sm text-[#6B6560]">Report improved communication</p>
            </div>
            <div className="text-center">
              <p
                className="text-3xl md:text-4xl font-normal text-[#5C6B56] mb-1"
                style={{ fontFamily: 'var(--font-cormorant), Cormorant Garamond, serif' }}
              >
                76%
              </p>
              <p className="text-xs md:text-sm text-[#6B6560]">Feel closer to their partner</p>
            </div>
            <div className="text-center">
              <p
                className="text-3xl md:text-4xl font-normal text-[#5C6B56] mb-1"
                style={{ fontFamily: 'var(--font-cormorant), Cormorant Garamond, serif' }}
              >
                94%
              </p>
              <p className="text-xs md:text-sm text-[#6B6560]">Would recommend to others</p>
            </div>
          </div>
        </div>
      </section>

      {/* Note about testimonials */}
      <section className="px-4 md:px-8 py-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <p className="text-center text-sm text-[#9C8B7A] italic">
            Names have been changed to protect privacy. Stories shared with permission.
          </p>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="px-4 md:px-8 py-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.map((testimonial, index) => (
              <Testimonial key={index} {...testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* Therapy Bridge Section */}
      <section className="px-4 md:px-8 py-12 bg-[#FFFCF7] relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2
              className="text-3xl font-normal text-[#3D3531] mb-4"
              style={{ fontFamily: 'var(--font-cormorant), Cormorant Garamond, serif' }}
            >
              A Bridge to Professional Therapy
            </h2>
            <p className="text-[#6B6560] max-w-2xl mx-auto">
              Many couples use Meet In The Field as preparation for, or alongside, professional therapy. Here&apos;s what therapists say:
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-[#F7F4EE] rounded-2xl p-6">
              <blockquote className="text-[#3D3531] leading-relaxed mb-4 italic">
                &ldquo;Couples who&apos;ve used AI-guided conversation tools before coming to me often have better emotional vocabulary and are more prepared to do the deep work. It&apos;s like they&apos;ve already done the pre-reading.&rdquo;
              </blockquote>
              <p className="text-sm text-[#6B6560]">
                <span className="font-medium text-[#3D3531]">Dr. Sarah Chen</span>, Licensed Marriage and Family Therapist
              </p>
            </div>

            <div className="bg-[#F7F4EE] rounded-2xl p-6">
              <blockquote className="text-[#3D3531] leading-relaxed mb-4 italic">
                &ldquo;For couples hesitant about therapy, tools like this can be a valuable first step. It normalises talking about relationship issues and shows them that help is available.&rdquo;
              </blockquote>
              <p className="text-sm text-[#6B6560]">
                <span className="font-medium text-[#3D3531]">Mark Williams</span>, Couples Counsellor
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Important Note */}
      <section className="px-4 md:px-8 py-8 relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#F7F4EE] border border-[#8B9D83]/15 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#E8EDE5] flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-[#5C6B56]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-[#3D3531] mb-2">Important Note</h3>
                <p className="text-sm text-[#6B6560] leading-relaxed">
                  Meet In The Field is designed to support everyday communication and is not a replacement for professional therapy. If you&apos;re experiencing domestic abuse, severe mental health issues, or crisis situations, please seek help from qualified professionals or emergency services immediately.
                </p>
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
            Start Your Story
          </h2>
          <p className="text-[#6B6560] mb-8">
            Join thousands of couples who are communicating better. Start your free trial today.
          </p>
          <Link
            href="/start-free-trial"
            className="inline-block px-8 py-4 bg-gradient-to-br from-[#8B9D83] to-[#5C6B56] hover:from-[#7A8E75] hover:to-[#4D5C48] text-white text-lg font-medium rounded-2xl transition-all shadow-[0_4px_15px_-3px_rgba(92,107,86,0.4)]"
          >
            Start Free Trial
          </Link>
          <p className="text-sm text-[#9C8B7A] mt-3">No credit card required</p>
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
                <li><Link href="/testimonials" className="text-sm text-[#6B6560] hover:text-[#5C6B56] transition-colors">Success Stories</Link></li>
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
