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

function ActionCard({
  icon,
  title,
  description,
  actionText,
  children,
  delay = 0
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  actionText: string;
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

function FeaturesHint() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), 300);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const features = [
    'Private & secure',
    'AI-guided dialogue',
    'No judgment',
    'Always available',
  ];

  return (
    <div
      ref={ref}
      className={`text-center mt-16 pt-16 border-t border-[#8B9D83]/20 transition-all duration-800
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
    >
      <h4
        className="text-2xl font-normal text-[#3D3531] mb-4"
        style={{ fontFamily: 'var(--font-cormorant), Cormorant Garamond, serif' }}
      >
        Communication, reimagined
      </h4>
      <div className="flex justify-center flex-wrap gap-8 mt-6">
        {features.map((feature) => (
          <div key={feature} className="flex items-center gap-2 text-[0.9rem] text-[#6B6560]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8B9D83]" />
            {feature}
          </div>
        ))}
      </div>
    </div>
  );
}

function HomeContent() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Texture overlay */}
      <div className="texture-overlay" />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-6 flex justify-between items-center animate-fade-down"
        style={{ background: 'linear-gradient(to bottom, #F7F4EE 0%, transparent 100%)' }}
      >
        <Link
          href="/"
          className="text-xl font-medium text-[#5C6B56] tracking-wide"
          style={{ fontFamily: 'var(--font-cormorant), Cormorant Garamond, serif' }}
        >
          Meet In The Field
        </Link>
        <div className="flex items-center gap-10">
          <div className="hidden sm:flex items-center gap-10">
            <Link href="/about" className="nav-link text-xs uppercase tracking-[0.05em] text-[#6B6560] hover:text-[#5C6B56] transition-colors">
              About
            </Link>
            <Link href="/faq" className="nav-link text-xs uppercase tracking-[0.05em] text-[#6B6560] hover:text-[#5C6B56] transition-colors">
              FAQ
            </Link>
            <Link href="/privacy" className="nav-link text-xs uppercase tracking-[0.05em] text-[#6B6560] hover:text-[#5C6B56] transition-colors">
              Privacy
            </Link>
            <Link href="/support" className="nav-link text-xs uppercase tracking-[0.05em] text-[#6B6560] hover:text-[#5C6B56] transition-colors">
              Support
            </Link>
          </div>
          {mounted && <ClerkComponents variant="header" />}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-4 md:px-8 pt-24 pb-16 relative z-10">
        {/* Floating shapes */}
        <div className="shape shape-1" />
        <div className="shape shape-2" />
        <div className="shape shape-3" />

        <FieldIllustration />

        <p
          className="text-xs uppercase tracking-[0.25em] text-[#5C6B56] mb-6"
          style={{ animation: 'fadeIn 1s ease-out 0.3s backwards' }}
        >
          A space for connection
        </p>

        <h1
          className="text-5xl md:text-7xl lg:text-[5.5rem] font-normal leading-[1.1] mb-8"
          style={{
            fontFamily: 'var(--font-cormorant), Cormorant Garamond, serif',
            animation: 'fadeIn 1s ease-out 0.5s backwards'
          }}
        >
          <span className="block">Meet In</span>
          <span className="block italic text-[#5C6B56]">The Field</span>
        </h1>

        <div
          className="max-w-[500px] mx-auto mb-12"
          style={{ animation: 'fadeIn 1s ease-out 0.7s backwards' }}
        >
          <p
            className="text-xl md:text-[1.25rem] italic text-[#6B6560] leading-relaxed mb-3"
            style={{ fontFamily: 'var(--font-cormorant), Cormorant Garamond, serif' }}
          >
            &ldquo;Out beyond ideas of wrongdoing and rightdoing there is a field. I&apos;ll meet you there.&rdquo;
          </p>
          <cite className="text-xs uppercase tracking-[0.1em] text-[#9C8B7A] not-italic">
            — Rumi
          </cite>
        </div>

        <p
          className="text-[1.1rem] text-[#6B6560] max-w-[420px] leading-[1.7] mb-8"
          style={{ animation: 'fadeIn 1s ease-out 0.9s backwards' }}
        >
          A safe, gentle space where couples can communicate openly—guided by AI that listens without judgment.
        </p>

        {/* Start Free Trial Button */}
        <div
          className="mb-20"
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
          className="flex flex-col items-center gap-2"
          style={{ animation: 'fadeIn 1s ease-out 1.2s backwards' }}
        >
          <span className="text-[0.7rem] uppercase tracking-[0.15em] text-[#6B6560]">Begin</span>
          <div className="scroll-line w-px h-8 bg-gradient-to-b from-[#8B9D83] to-transparent" />
        </div>
      </section>

      {/* Actions Section */}
      <section className="px-4 md:px-8 py-8 md:py-12 relative z-10">
        <div className="max-w-[900px] mx-auto">
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
                  actionText="Start Session"
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
                  actionText="Enter Code"
                  delay={150}
                >
                  <JoinRoomForm />
                </ActionCard>
              </div>
              <FeaturesHint />
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
                  actionText="Start Session"
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
                  actionText="Enter Code"
                >
                  <div className="h-12 animate-pulse bg-[#C4D1BE]/30 rounded-lg" />
                </ActionCard>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 md:px-8 py-12 text-center relative z-10 border-t border-[#8B9D83]/15 mt-auto">
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
          <Link href="/support" className="text-xs uppercase tracking-[0.05em] text-[#6B6560] hover:text-[#5C6B56] transition-colors">
            Support
          </Link>
        </div>
        <p className="text-xs text-[#9C8B7A] tracking-wide">
          &copy; {new Date().getFullYear()} Octane Limited. All rights reserved.
        </p>
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
