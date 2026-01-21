'use client';

import { Suspense, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';

const CreateRoomForm = dynamic(() => import('@/components/CreateRoomForm'), {
  ssr: false,
  loading: () => <div className="h-32 animate-pulse bg-gray-100 rounded-lg" />,
});

const JoinRoomForm = dynamic(() => import('@/components/JoinRoomForm'), {
  ssr: false,
  loading: () => <div className="h-40 animate-pulse bg-gray-100 rounded-lg" />,
});

// Dynamically import Clerk components to avoid build errors when keys aren't configured
const ClerkComponents = dynamic(
  () => import('@/components/ClerkComponents').then(mod => mod.ClerkComponents),
  { ssr: false, loading: () => null }
);

function RoomCards() {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* Create Field */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-blue-600 text-xl">+</span>
          </div>
          <h2 className="text-xl font-semibold text-gray-900">Create a Field</h2>
        </div>
        <p className="text-gray-600 mb-6">
          Start a new session and invite your partner with a unique field code.
        </p>
        <CreateRoomForm />
      </div>

      {/* Join Field */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
            <span className="text-green-600 text-xl">&#8594;</span>
          </div>
          <h2 className="text-xl font-semibold text-gray-900">Join a Field</h2>
        </div>
        <p className="text-gray-600 mb-6">
          Enter the field code shared by your partner to join an existing session.
        </p>
        <JoinRoomForm />
      </div>
    </div>
  );
}

function FeaturePreview() {
  return (
    <div className="mt-12 grid md:grid-cols-3 gap-6">
      <div className="text-center p-6">
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </div>
        <h3 className="font-semibold text-gray-900 mb-2">Real-time Sessions</h3>
        <p className="text-sm text-gray-600">
          Connect with your partner in real-time for guided conversations
        </p>
      </div>
      <div className="text-center p-6">
        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        <h3 className="font-semibold text-gray-900 mb-2">AI-Powered Guidance</h3>
        <p className="text-sm text-gray-600">
          Expert guidance in the style of renowned therapist Esther Perel
        </p>
      </div>
      <div className="text-center p-6">
        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <h3 className="font-semibold text-gray-900 mb-2">Private & Secure</h3>
        <p className="text-sm text-gray-600">
          Your conversations stay private with end-to-end encryption
        </p>
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex flex-col">
      {/* Header */}
      <header className="px-6 py-4 border-b border-gray-200/50 bg-white/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="text-xl font-semibold text-gray-900">
            Meet In The Field
          </div>
          <div className="flex items-center gap-6">
            <nav className="hidden sm:flex items-center gap-4">
              <Link href="/about" className="text-sm text-gray-600 hover:text-gray-900">About</Link>
              <Link href="/faq" className="text-sm text-gray-600 hover:text-gray-900">FAQ</Link>
              <Link href="/privacy" className="text-sm text-gray-600 hover:text-gray-900">Privacy</Link>
            </nav>
            {mounted && <ClerkComponents variant="header" />}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-4xl w-full">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Meet In The Field
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto italic mb-4">
              &ldquo;Out beyond ideas of wrongdoing and rightdoing there is a field. I&apos;ll meet you there.&rdquo;
              <span className="block text-sm mt-1 not-italic text-gray-500">— Rumi</span>
            </p>
            <p className="text-base text-gray-600 max-w-xl mx-auto">
              A safe space for couples to communicate with AI-powered guidance.
            </p>
          </div>

          {mounted ? (
            <ClerkComponents variant="main">
              <RoomCards />
              <FeaturePreview />
            </ClerkComponents>
          ) : (
            <div className="animate-pulse">
              <RoomCards />
            </div>
          )}

        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200/50 bg-white/50 backdrop-blur-sm mt-auto">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
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

export default function Home() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    }>
      <HomeContent />
    </Suspense>
  );
}
