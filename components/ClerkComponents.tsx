'use client';

import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { ReactNode } from 'react';

interface ClerkComponentsProps {
  variant: 'header' | 'main';
  children?: ReactNode;
}

export function ClerkComponents({ variant, children }: ClerkComponentsProps) {
  if (variant === 'header') {
    return (
      <>
        <SignedIn>
          <Link
            href="/account"
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            Account
          </Link>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
        <SignedOut>
          <SignInButton mode="modal">
            <button className="px-4 py-2 text-sm bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition">
              Sign In
            </button>
          </SignInButton>
        </SignedOut>
      </>
    );
  }

  if (variant === 'main') {
    // Extract first and second child (RoomCards and FeaturePreview)
    const childArray = Array.isArray(children) ? children : [children];
    const roomCards = childArray[0];
    const featurePreview = childArray[1];

    return (
      <>
        <SignedIn>
          {roomCards}
        </SignedIn>

        <SignedOut>
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md mx-auto text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Sign in to get started
            </h2>
            <p className="text-gray-600 mb-6">
              Create an account or sign in to start your relationship counselling session.
            </p>
            <SignInButton mode="modal">
              <button className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition">
                Sign In
              </button>
            </SignInButton>
          </div>

          {featurePreview}
        </SignedOut>
      </>
    );
  }

  return null;
}
