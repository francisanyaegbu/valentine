/* eslint-disable react-hooks/purity */
'use client';

import { useState, useEffect } from "react";

export default function Home() {
  const [accepted, setAccepted] = useState(false);
  const [rejected, setRejected] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (submitted) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [submitted]);

  const sendResponse = async (response: string) => {
    try {
      await fetch('/api/send-response', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ response }),
      });
      setSubmitted(true);
    } catch (error) {
      console.error('Error sending response:', error);
    }
  };

  return (
    <div className="min-h-screen bg-pink-300 flex items-center justify-center overflow-hidden relative">
      {/* Falling flowers animation */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-fall"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              fontSize: `${20 + Math.random() * 20}px`,
            }}
          >
            🌸
          </div>
        ))}
      </div>

      {/* Main content */}
      {!accepted && !rejected ? (
        <div className="text-center z-10 animate-fadeIn">
          <h1 className="lg:text-8xl text-4xl font-bold text-pink-800 mb-8">
            Would you be my Valentine?
          </h1>
          <div className="flex gap-6 justify-center">
            <button
              onClick={() => {
                setAccepted(true);
                sendResponse('yes');
              }}
              className="px-8 py-4 bg-pink-500 text-white text-3xl font-bold rounded-lg hover:bg-pink-600 hover:scale-105 transition-transform duration-200 cursor-pointer"
              disabled={submitted}
            >
              Yes 💕
            </button>
            <button
              onClick={() => {
                setRejected(true);
                sendResponse('no');
              }}
              className="px-8 py-4 bg-gray-400 text-white text-3xl font-bold rounded-lg hover:bg-gray-500 hover:scale-105 transition-transform duration-200 cursor-pointer"
              disabled={submitted}
            >
              No
            </button>
          </div>
        </div>
      ) : accepted ? (
        <div className="text-center z-10 animate-fadeIn">
          <h1 className="text-9xl font-bold text-pink-800 mb-8">
            Yay! 🎉
          </h1>
          <p className="text-5xl text-pink-700 mb-8">
            I&apos;m so happy! 💕
          </p>
        </div>
      ) : (
        <div className="text-center z-10 animate-fadeIn">
          <h1 className="text-6xl font-bold text-gray-700 mb-8">
            Maybe next time! 😊
          </h1>
        </div>
      )}
    </div>
  );
}
