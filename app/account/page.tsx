'use client';

import { useEffect, useState, Suspense } from 'react';
import { useUser, UserButton } from '@clerk/nextjs';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

interface SubscriptionData {
  subscriptionStatus: string;
  subscriptionTier: string;
  weeklyUsageCount: number;
  weeklyUsageResetAt: string;
}

function AccountContent() {
  const { user, isLoaded } = useUser();
  const searchParams = useSearchParams();
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const success = searchParams.get('success');
  const canceled = searchParams.get('canceled');

  useEffect(() => {
    fetchSubscription();
  }, []);

  const fetchSubscription = async () => {
    try {
      const response = await fetch('/api/subscription');
      if (response.ok) {
        const data = await response.json();
        setSubscription(data);
      }
    } catch (error) {
      console.error('Error fetching subscription:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAction = async (action: 'checkout' | 'portal') => {
    setActionLoading(action);
    try {
      const response = await fetch('/api/subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action }),
      });

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Error:', error);
      setActionLoading(null);
    }
  };

  if (!isLoaded || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  const isPaid = subscription?.subscriptionTier === 'paid';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/"
            className="text-gray-600 hover:text-gray-900 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
          <UserButton afterSignOutUrl="/" />
        </div>

        {/* Success/Cancel Messages */}
        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-2 text-green-700">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">Welcome to Premium!</span>
            </div>
            <p className="text-green-600 text-sm mt-1">
              Your subscription is now active. Enjoy unlimited interactions!
            </p>
          </div>
        )}
        {canceled && (
          <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-amber-700">
              Checkout was canceled. You can try again anytime.
            </p>
          </div>
        )}

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Account Settings</h1>

          <div className="flex items-center gap-4 mb-6">
            {user?.imageUrl && (
              <img
                src={user.imageUrl}
                alt={user.fullName || 'Profile'}
                className="w-16 h-16 rounded-full"
              />
            )}
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {user?.fullName || user?.emailAddresses[0]?.emailAddress}
              </h2>
              <p className="text-gray-500">{user?.emailAddresses[0]?.emailAddress}</p>
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">
              Subscription
            </h3>

            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-semibold text-gray-900">
                    {isPaid ? 'Premium' : 'Free'}
                  </span>
                  <span
                    className={`px-2 py-0.5 text-xs rounded-full ${
                      isPaid
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {subscription?.subscriptionStatus || 'active'}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  {isPaid
                    ? 'Unlimited interactions, all guidance modes'
                    : '5 interactions per week, standard mode only'}
                </p>
              </div>

              {isPaid ? (
                <button
                  onClick={() => handleAction('portal')}
                  disabled={actionLoading === 'portal'}
                  className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition disabled:opacity-50"
                >
                  {actionLoading === 'portal' ? 'Loading...' : 'Manage Subscription'}
                </button>
              ) : (
                <button
                  onClick={() => handleAction('checkout')}
                  disabled={actionLoading === 'checkout'}
                  className="px-4 py-2 text-sm bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition disabled:opacity-50"
                >
                  {actionLoading === 'checkout' ? 'Loading...' : 'Upgrade to Premium'}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Usage Card */}
        {!isPaid && subscription && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">
              Weekly Usage
            </h3>

            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Interactions this week</span>
                <span className="text-sm font-medium text-gray-900">
                  {subscription.weeklyUsageCount} / 5
                </span>
              </div>
              <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${
                    subscription.weeklyUsageCount >= 5
                      ? 'bg-red-500'
                      : subscription.weeklyUsageCount >= 3
                      ? 'bg-amber-500'
                      : 'bg-blue-500'
                  }`}
                  style={{ width: `${(subscription.weeklyUsageCount / 5) * 100}%` }}
                />
              </div>
            </div>

            <p className="text-sm text-gray-500">
              Resets on{' '}
              {new Date(
                new Date(subscription.weeklyUsageResetAt).getTime() + 7 * 24 * 60 * 60 * 1000
              ).toLocaleDateString()}
            </p>
          </div>
        )}

        {/* Premium Features Card */}
        {!isPaid && (
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl shadow-lg p-6 mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Upgrade to Premium
            </h3>
            <p className="text-gray-600 mb-4">
              Get the most out of your relationship counselling sessions with unlimited access.
            </p>

            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-purple-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Unlimited counsellor interactions</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-purple-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Conflict Resolution mode</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-purple-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Intimacy Building mode</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-purple-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Future Planning mode</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-purple-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Session summary reports</span>
              </li>
            </ul>

            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-3xl font-bold text-gray-900">$9.99</span>
              <span className="text-gray-500">/month</span>
            </div>

            <button
              onClick={() => handleAction('checkout')}
              disabled={actionLoading === 'checkout'}
              className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition disabled:opacity-50"
            >
              {actionLoading === 'checkout' ? 'Loading...' : 'Get Premium'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AccountPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    }>
      <AccountContent />
    </Suspense>
  );
}
