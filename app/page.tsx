'use client';

import { Suspense, useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import FieldIllustration from '@/components/FieldIllustration';

const CreateRoomForm = dynamic(() => import('@/components/CreateRoomForm'), {
  ssr: false,
  loading: () => <div className="h-12 animate-pulse bg-[#C4D1BE]/30 rounded-lg" />,
});

const JoinRoomForm = dynamic(() => import('@/components/JoinRoomForm'), {
  ssr: false,
  loading: () => <div className="h-12 animate-pulse bg-[#C4D1BE]/30 rounded-lg" />,
});

const ClerkComponents = dynamic(
  () => import('@/components/ClerkComponents').then(mod => mod.ClerkComponents),
  { ssr: false, loading: () => null }
);

const MyFields = dynamic(() => import('@/components/MyFields'), {
  ssr: false,
  loading: () => null,
});

function MobileMenu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onClose();
  };

  const handleLinkClick = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] md:hidden">
      <button
        type="button"
        className="fixed inset-0 bg-black/20 backdrop-blur-sm w-full h-full cursor-default"
        onClick={handleOverlayClick}
        onTouchEnd={handleOverlayClick}
        aria-label="Close menu"
      />
      <div className="fixed top-0 right-0 h-full w-72 bg-[#F7F4EE] shadow-xl p-6 z-[101]">
        <button
          type="button"
          onClick={onClose}
          onTouchEnd={(e) => { e.preventDefault(); onClose(); }}
          className="absolute top-6 right-6 p-2 text-[#6B6560] hover:text-[#5C6B56]"
          aria-label="Close menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <nav className="mt-12 space-y-6">
          <Link href="/how-it-works" className="block text-lg text-[#3D3531] hover:text-[#5C6B56] transition-colors" onClick={handleLinkClick}>
            How It Works
          </Link>
          <Link href="/pricing" className="block text-lg text-[#3D3531] hover:text-[#5C6B56] transition-colors" onClick={handleLinkClick}>
            Pricing
          </Link>
          <Link href="/testimonials" className="block text-lg text-[#3D3531] hover:text-[#5C6B56] transition-colors" onClick={handleLinkClick}>
            Success Stories
          </Link>
          <Link href="/about" className="block text-lg text-[#3D3531] hover:text-[#5C6B56] transition-colors" onClick={handleLinkClick}>
            About
          </Link>
          <Link href="/faq" className="block text-lg text-[#3D3531] hover:text-[#5C6B56] transition-colors" onClick={handleLinkClick}>
            FAQ
          </Link>
          <Link href="/support" className="block text-lg text-[#3D3531] hover:text-[#5C6B56] transition-colors" onClick={handleLinkClick}>
            Support
          </Link>
          <div className="pt-6 border-t border-[#8B9D83]/20">
            <Link
              href="/start-free-trial"
              className="block w-full py-3 bg-gradient-to-br from-[#8B9D83] to-[#5C6B56] text-white text-center font-medium rounded-xl"
              onClick={handleLinkClick}
            >
              Start Free Trial
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
}

function SocialProof() {
  return (
    <div
      className="flex flex-wrap justify-center items-center gap-6 md:gap-10 py-4"
      style={{ animation: 'fadeIn 1s ease-out 1s backwards' }}
    >
      <div className="flex items-center gap-2">
        <div className="flex -space-x-2">
          <div className="w-8 h-8 rounded-full bg-[#C4D1BE] border-2 border-[#F7F4EE]" />
          <div className="w-8 h-8 rounded-full bg-[#9C8B7A] border-2 border-[#F7F4EE]" />
          <div className="w-8 h-8 rounded-full bg-[#8B9D83] border-2 border-[#F7F4EE]" />
        </div>
        <span className="text-sm text-[#6B6560]"><strong className="text-[#3D3531]">500+</strong> couples helped</span>
      </div>
      <div className="hidden sm:flex items-center gap-2">
        <div className="flex gap-0.5">
          {[...Array(5)].map((_, i) => (
            <svg key={i} className="w-4 h-4 text-[#C4A484] fill-current" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        <span className="text-sm text-[#6B6560]"><strong className="text-[#3D3531]">4.9</strong> rating</span>
      </div>
      <div className="text-sm text-[#6B6560] italic">&ldquo;It saved our marriage&rdquo;</div>
    </div>
  );
}

function ProductDemo() {
  return (
    <div className="bg-[#FFFCF7] rounded-2xl border border-[#8B9D83]/15 p-4 md:p-6 shadow-lg max-w-md mx-auto">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#8B9D83]/10">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#8B9D83]" />
          <span className="text-xs text-[#6B6560]">Both partners connected</span>
        </div>
        <span className="text-xs font-mono bg-[#E8EDE5] px-2 py-0.5 rounded text-[#5C6B56]">FIELD-7A85</span>
      </div>
      <div className="space-y-3">
        {/* Partner A message */}
        <div className="flex justify-end">
          <div className="bg-[#9C8B7A] text-white rounded-2xl rounded-tr-md px-4 py-2.5 max-w-[85%] text-sm">
            <div className="text-[10px] opacity-75 mb-1">Alex</div>
            I feel like we haven&apos;t been connecting lately...
          </div>
        </div>
        {/* Counsellor response */}
        <div className="flex justify-start">
          <div className="bg-[#E8EDE5] text-[#3D3531] rounded-2xl rounded-tl-md px-4 py-2.5 max-w-[90%] text-sm">
            <div className="text-[10px] text-[#5C6B56] mb-1 flex items-center gap-1">
              <span className="text-[#8B9D83]">&#x1F33F;</span> Counsellor
            </div>
            <p className="italic">Alex, thank you for sharing that. Jordan, what do you hear in what Alex is saying?</p>
          </div>
        </div>
        {/* Partner B message */}
        <div className="flex justify-end">
          <div className="bg-[#C4A484] text-white rounded-2xl rounded-tr-md px-4 py-2.5 max-w-[85%] text-sm">
            <div className="text-[10px] opacity-75 mb-1">Jordan</div>
            I hear that you&apos;ve been feeling distant from me...
          </div>
        </div>
        {/* Counsellor insight */}
        <div className="flex justify-start">
          <div className="bg-[#E8EDE5] text-[#3D3531] rounded-2xl rounded-tl-md px-4 py-2.5 max-w-[90%] text-sm">
            <div className="text-[10px] text-[#5C6B56] mb-1 flex items-center gap-1">
              <span className="text-[#8B9D83]">&#x1F33F;</span> Counsellor
            </div>
            <p className="italic">Beautiful reflection, Jordan. Alex, how does it feel to be heard like that?</p>
          </div>
        </div>
      </div>
      <div className="mt-4 pt-3 border-t border-[#8B9D83]/10">
        <div className="flex items-center gap-2 bg-[#F7F4EE] rounded-xl px-3 py-2">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 bg-transparent text-sm text-[#6B6560] placeholder-[#9C8B7A] outline-none"
            disabled
          />
          <button className="p-1.5 rounded-lg bg-[#8B9D83] text-white" disabled>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

function HowItWorksSection() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const steps = [
    {
      number: '1',
      title: 'Create a Private Field',
      description: 'Start a session and get a unique code to share with your partner.',
      icon: (
        <svg className="w-6 h-6 text-[#5C6B56]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" strokeWidth={1.5} />
          <line x1="12" y1="8" x2="12" y2="16" strokeWidth={1.5} />
          <line x1="8" y1="12" x2="16" y2="12" strokeWidth={1.5} />
        </svg>
      ),
    },
    {
      number: '2',
      title: 'Both Partners Join',
      description: 'Your partner enters the code from any device to join the session.',
      icon: (
        <svg className="w-6 h-6 text-[#5C6B56]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      number: '3',
      title: 'Talk With AI Guidance',
      description: 'Chat naturally while the AI counsellor guides you toward understanding.',
      icon: (
        <svg className="w-6 h-6 text-[#5C6B56]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
    },
  ];

  return (
    <section ref={ref} className="px-4 md:px-8 py-16 md:py-24 bg-[#FFFCF7] relative z-10">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2
            className={`text-3xl md:text-4xl font-normal text-[#3D3531] mb-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ fontFamily: 'var(--font-cormorant), Cormorant Garamond, serif' }}
          >
            How It Works
          </h2>
          <p className={`text-[#6B6560] max-w-xl mx-auto transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Start a guided conversation in under a minute. No appointments, no waiting rooms.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className={`text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${(index + 2) * 100}ms` }}
            >
              <div className="w-16 h-16 rounded-full bg-[#E8EDE5] flex items-center justify-center mx-auto mb-4">
                {step.icon}
              </div>
              <div className="text-sm font-medium text-[#8B9D83] mb-2">Step {step.number}</div>
              <h3 className="text-xl font-medium text-[#3D3531] mb-2" style={{ fontFamily: 'var(--font-cormorant), Cormorant Garamond, serif' }}>
                {step.title}
              </h3>
              <p className="text-sm text-[#6B6560]">{step.description}</p>
            </div>
          ))}
        </div>

        <div className={`text-center mt-10 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <Link href="/how-it-works" className="text-[#5C6B56] font-medium hover:underline">
            Learn more about the process &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}

function TestimonialHighlight() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="px-4 md:px-8 py-16 relative z-10">
      <div className="max-w-4xl mx-auto">
        <div className={`grid md:grid-cols-2 gap-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-[#FFFCF7] rounded-2xl border border-[#8B9D83]/15 p-6">
            <div className="flex gap-0.5 mb-3">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-4 h-4 text-[#C4A484] fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <blockquote className="text-[#3D3531] leading-relaxed mb-4">
              &ldquo;We used Meet In The Field for three months before starting couples therapy. When we finally met with our therapist, she was impressed by how articulate we were about our issues.&rdquo;
            </blockquote>
            <p className="text-sm text-[#6B6560]">
              <span className="font-medium text-[#3D3531]">Priya & Raj</span> — Engaged, preparing for marriage
            </p>
          </div>

          <div className={`bg-[#FFFCF7] rounded-2xl border border-[#8B9D83]/15 p-6 transition-all duration-700 delay-150 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="flex gap-0.5 mb-3">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-4 h-4 text-[#C4A484] fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <blockquote className="text-[#3D3531] leading-relaxed mb-4">
              &ldquo;We&apos;re both doctors with insane schedules. Having access to guided conversations at 11pm after our shifts changed everything.&rdquo;
            </blockquote>
            <p className="text-sm text-[#6B6560]">
              <span className="font-medium text-[#3D3531]">Dr. Lisa & Dr. Ahmed</span> — Dual-physician couple
            </p>
          </div>
        </div>

        <div className={`text-center mt-8 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <Link href="/testimonials" className="text-[#5C6B56] font-medium hover:underline">
            Read more success stories &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}

function ActionCard({
  icon,
  title,
  description,
  children,
  delay = 0
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
  delay?: number;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  return (
    <article
      ref={cardRef}
      className={`action-card bg-[#FFFCF7] rounded-3xl p-8 md:p-12 border border-[#8B9D83]/10
        transition-all duration-500 cursor-pointer hover:-translate-y-2 hover:shadow-[0_30px_60px_-20px_rgba(92,107,86,0.2)]
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
    >
      <div
        className="w-14 h-14 rounded-full flex items-center justify-center mb-6 transition-transform duration-500 hover:scale-110 hover:rotate-[5deg]"
        style={{ background: 'linear-gradient(135deg, #C4D1BE, #8B9D83)' }}
      >
        {icon}
      </div>
      <h3
        className="text-2xl md:text-[1.75rem] font-medium mb-3 text-[#3D3531]"
        style={{ fontFamily: 'var(--font-cormorant), Cormorant Garamond, serif' }}
      >
        {title}
      </h3>
      <p className="text-[0.95rem] text-[#6B6560] leading-relaxed mb-6">
        {description}
      </p>
      {children}
    </article>
  );
}

function HomeContent() {
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Texture overlay */}
      <div className="texture-overlay" />

      {/* Mobile Menu */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 md:px-12 py-4 md:py-6 flex justify-between items-center animate-fade-down"
        style={{ background: 'linear-gradient(to bottom, #F7F4EE 0%, transparent 100%)' }}
      >
        <Link
          href="/"
          className="text-xl font-medium text-[#5C6B56] tracking-wide"
          style={{ fontFamily: 'var(--font-cormorant), Cormorant Garamond, serif' }}
        >
          Meet In The Field
        </Link>
        <div className="flex items-center gap-6 md:gap-10">
          <div className="hidden md:flex items-center gap-8">
            <Link href="/how-it-works" className="nav-link text-xs uppercase tracking-[0.05em] text-[#6B6560] hover:text-[#5C6B56] transition-colors">
              How It Works
            </Link>
            <Link href="/pricing" className="nav-link text-xs uppercase tracking-[0.05em] text-[#6B6560] hover:text-[#5C6B56] transition-colors">
              Pricing
            </Link>
            <Link href="/testimonials" className="nav-link text-xs uppercase tracking-[0.05em] text-[#6B6560] hover:text-[#5C6B56] transition-colors">
              Success Stories
            </Link>
            <Link href="/faq" className="nav-link text-xs uppercase tracking-[0.05em] text-[#6B6560] hover:text-[#5C6B56] transition-colors">
              FAQ
            </Link>
          </div>
          {mounted && <ClerkComponents variant="header" />}
          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden p-2 text-[#6B6560] hover:text-[#5C6B56]"
            aria-label="Open menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-4 md:px-8 pt-20 pb-8 relative z-10">
        {/* Floating shapes */}
        <div className="shape shape-1" />
        <div className="shape shape-2" />
        <div className="shape shape-3" />

        <FieldIllustration />

        <p
          className="text-xs uppercase tracking-[0.25em] text-[#5C6B56] mb-4"
          style={{ animation: 'fadeIn 1s ease-out 0.3s backwards' }}
        >
          AI-Guided Relationship Support
        </p>

        <h1
          className="text-4xl md:text-6xl lg:text-7xl font-normal leading-[1.1] mb-6"
          style={{
            fontFamily: 'var(--font-cormorant), Cormorant Garamond, serif',
            animation: 'fadeIn 1s ease-out 0.5s backwards'
          }}
        >
          <span className="block">Have Tough Conversations</span>
          <span className="block italic text-[#5C6B56]">Together</span>
        </h1>

        <p
          className="text-lg md:text-xl text-[#6B6560] max-w-[550px] leading-[1.7] mb-6"
          style={{ animation: 'fadeIn 1s ease-out 0.7s backwards' }}
        >
          Guided by AI trained on proven therapy methods from Gottman, Esther Perel, and more. No appointments needed. Available 24/7.
        </p>

        {/* Social Proof */}
        <SocialProof />

        {/* Start Free Trial Button */}
        <div
          className="mt-6 mb-8"
          style={{ animation: 'fadeIn 1s ease-out 1.1s backwards' }}
        >
          <Link
            href="/start-free-trial"
            className="inline-block px-8 py-4 bg-gradient-to-br from-[#8B9D83] to-[#5C6B56] hover:from-[#7A8E75] hover:to-[#4D5C48] text-white text-lg font-medium rounded-2xl transition-all shadow-[0_4px_20px_-5px_rgba(92,107,86,0.4)] hover:-translate-y-1 hover:shadow-[0_8px_30px_-5px_rgba(92,107,86,0.5)]"
          >
            Start Free Trial
          </Link>
          <p className="text-sm text-[#9C8B7A] mt-3">No credit card required</p>
        </div>

        {/* Scroll indicator */}
        <div
          className="flex flex-col items-center gap-2 mt-auto"
          style={{ animation: 'fadeIn 1s ease-out 1.2s backwards' }}
        >
          <span className="text-[0.7rem] uppercase tracking-[0.15em] text-[#6B6560]">See how it works</span>
          <div className="scroll-line w-px h-8 bg-gradient-to-b from-[#8B9D83] to-transparent" />
        </div>
      </section>

      {/* Product Demo Section */}
      <section className="px-4 md:px-8 py-12 md:py-16 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <h2
                className="text-3xl md:text-4xl font-normal text-[#3D3531] mb-4"
                style={{ fontFamily: 'var(--font-cormorant), Cormorant Garamond, serif' }}
              >
                See a Session in Action
              </h2>
              <p className="text-[#6B6560] leading-relaxed mb-6">
                Both partners chat in real-time while our AI counsellor guides the conversation. It asks reflective questions, helps you understand each other&apos;s perspective, and keeps discussions productive.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#8B9D83] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-[#6B6560]">Responds after each message with thoughtful guidance</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#8B9D83] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-[#6B6560]">Helps translate accusations into underlying needs</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#8B9D83] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-[#6B6560]">Identifies patterns and gently names them</span>
                </li>
              </ul>
            </div>
            <div>
              <ProductDemo />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <HowItWorksSection />

      {/* Testimonials Highlight */}
      <TestimonialHighlight />

      {/* Actions Section */}
      <section className="px-4 md:px-8 py-8 md:py-12 relative z-10">
        <div className="max-w-[900px] mx-auto">
          <div className="text-center mb-10">
            <h2
              className="text-3xl md:text-4xl font-normal text-[#3D3531] mb-4"
              style={{ fontFamily: 'var(--font-cormorant), Cormorant Garamond, serif' }}
            >
              Ready to Begin?
            </h2>
            <p className="text-[#6B6560]">Create a field or join your partner&apos;s session.</p>
          </div>
          {mounted ? (
            <ClerkComponents variant="main">
              <MyFields />
              <div className="grid md:grid-cols-2 gap-8">
                <ActionCard
                  icon={
                    <svg className="w-6 h-6 stroke-[#FFFCF7] stroke-2 fill-none" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10"/>
                      <line x1="12" y1="8" x2="12" y2="16"/>
                      <line x1="8" y1="12" x2="16" y2="12"/>
                    </svg>
                  }
                  title="Create a Field"
                  description="Begin a new session and receive a unique code to share with your partner. Your field awaits."
                  delay={0}
                >
                  <CreateRoomForm />
                </ActionCard>

                <ActionCard
                  icon={
                    <svg className="w-6 h-6 stroke-[#FFFCF7] stroke-2 fill-none" viewBox="0 0 24 24">
                      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
                      <polyline points="10 17 15 12 10 7"/>
                      <line x1="15" y1="12" x2="3" y2="12"/>
                    </svg>
                  }
                  title="Join a Field"
                  description="Enter the code your partner shared to step into your shared space together."
                  delay={150}
                >
                  <JoinRoomForm />
                </ActionCard>
              </div>
            </ClerkComponents>
          ) : (
            <>
              <div className="grid md:grid-cols-2 gap-8 opacity-50">
                <ActionCard
                  icon={
                    <svg className="w-6 h-6 stroke-[#FFFCF7] stroke-2 fill-none" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10"/>
                      <line x1="12" y1="8" x2="12" y2="16"/>
                      <line x1="8" y1="12" x2="16" y2="12"/>
                    </svg>
                  }
                  title="Create a Field"
                  description="Begin a new session and receive a unique code to share with your partner. Your field awaits."
                >
                  <div className="h-12 animate-pulse bg-[#C4D1BE]/30 rounded-lg" />
                </ActionCard>

                <ActionCard
                  icon={
                    <svg className="w-6 h-6 stroke-[#FFFCF7] stroke-2 fill-none" viewBox="0 0 24 24">
                      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
                      <polyline points="10 17 15 12 10 7"/>
                      <line x1="15" y1="12" x2="3" y2="12"/>
                    </svg>
                  }
                  title="Join a Field"
                  description="Enter the code your partner shared to step into your shared space together."
                >
                  <div className="h-12 animate-pulse bg-[#C4D1BE]/30 rounded-lg" />
                </ActionCard>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 md:px-8 py-12 relative z-10 border-t border-[#8B9D83]/15 mt-auto">
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

export default function Home() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#F7F4EE] flex items-center justify-center">
        <div className="text-[#6B6560]">Loading...</div>
      </div>
    }>
      <HomeContent />
    </Suspense>
  );
}
