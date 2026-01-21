'use client';

import { ClerkProvider } from '@clerk/nextjs';
import { ReactNode } from 'react';

export function Providers({ children }: { children: ReactNode }) {
  // Check if we're in a build environment without Clerk keys
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

  // If no key is available, render children without Clerk wrapper
  // This allows the build to succeed
  if (!publishableKey) {
    return <>{children}</>;
  }

  return <ClerkProvider>{children}</ClerkProvider>;
}
