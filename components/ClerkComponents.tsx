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
            className="nav-link text-xs uppercase tracking-[0.05em] text-[#6B6560] hover:text-[#5C6B56] transition-colors"
          >
            Account
          </Link>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
        <SignedOut>
          <SignInButton mode="modal">
            <button className="px-4 py-2 text-sm bg-gradient-to-r from-[#8B9D83] to-[#5C6B56] hover:from-[#7A8C74] hover:to-[#4B5A47] text-white rounded-xl transition-all">
              Sign In
            </button>
          </SignInButton>
        </SignedOut>
      </>
    );
  }

  if (variant === 'main') {
    // Extract children: MyFields, RoomCards, FeaturePreview
    const childArray = Array.isArray(children) ? children : [children];
    const myFields = childArray[0];      // MyFields component
    const roomCards = childArray[1];      // RoomCards component
    const featurePreview = childArray[2]; // FeaturePreview component

    return (
      <>
        <SignedIn>
          {myFields}
          {roomCards}
          {featurePreview}
        </SignedIn>

        <SignedOut>
          <div className="bg-[#FFFCF7] rounded-3xl border border-[#8B9D83]/10 p-10 max-w-md mx-auto text-center">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{ background: 'linear-gradient(135deg, #C4D1BE, #8B9D83)' }}
            >
              <svg className="w-8 h-8 text-[#FFFCF7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2
              className="text-2xl font-medium text-[#3D3531] mb-3"
              style={{ fontFamily: 'var(--font-cormorant), Cormorant Garamond, serif' }}
            >
              Sign in to get started
            </h2>
            <p className="text-[#6B6560] mb-8 leading-relaxed">
              Create an account or sign in to start your relationship counselling session.
            </p>
            <SignInButton mode="modal">
              <button className="w-full py-3 bg-gradient-to-r from-[#8B9D83] to-[#5C6B56] hover:from-[#7A8C74] hover:to-[#4B5A47] text-white font-medium rounded-xl transition-all">
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
