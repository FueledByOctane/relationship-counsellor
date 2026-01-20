'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';

const CreateRoomForm = dynamic(() => import('@/components/CreateRoomForm'), {
  ssr: false,
  loading: () => <div className="h-32 animate-pulse bg-gray-100 rounded-lg" />,
});

const JoinRoomForm = dynamic(() => import('@/components/JoinRoomForm'), {
  ssr: false,
  loading: () => <div className="h-40 animate-pulse bg-gray-100 rounded-lg" />,
});

function HomeContent() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Relationship Counsellor
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A safe space for couples to communicate with AI-powered guidance.
            Create a room to start a session, or join an existing one with a room code.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Create Room */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 text-xl">+</span>
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Create a Room</h2>
            </div>
            <p className="text-gray-600 mb-6">
              Start a new counselling session and invite your partner with a unique room code.
            </p>
            <CreateRoomForm />
          </div>

          {/* Join Room */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 text-xl">&#8594;</span>
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Join a Room</h2>
            </div>
            <p className="text-gray-600 mb-6">
              Enter the room code shared by your partner to join an existing session.
            </p>
            <JoinRoomForm />
          </div>
        </div>

        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>
            Your conversations are private and secure. The AI therapist guides your conversation.
          </p>
        </div>
      </div>
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
