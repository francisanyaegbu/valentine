/* eslint-disable react-hooks/purity */
'use client';

import { useState } from "react";

const confirmationMessages = [
  "Are you sure?",
  "Are you EXTREMELY sure?",
  "Really really sure?",
  "Like 100% sure?",
  "Absolutely positively sure?",
  "No take-backsies sure?",
];

export default function Home() {
  const [state, setState] = useState("main");
  const [confirmationLevel, setConfirmationLevel] = useState(0);

  const handleNo = () => {
    if (state === "main") {
      setState("confirmation");
    } else if (confirmationLevel < confirmationMessages.length - 1) {
      setConfirmationLevel(confirmationLevel + 1);
    } else {
      setState("yay");
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
      {state === "main" ? (
        <div className="text-center z-10 animate-fadeIn">
          <h1 className="text-8xl font-bold text-pink-800 mb-8">
            Would you be my Valentine?
          </h1>
          <div className="flex gap-6 justify-center">
            <button
              onClick={() => setState("yay")}
              className="px-8 py-4 bg-pink-500 text-white text-3xl font-bold rounded-lg hover:bg-pink-600 hover:scale-105 transition-transform duration-200 cursor-pointer"
            >
              Yes 💕
            </button>
            <button
              onClick={handleNo}
              className="px-8 py-4 bg-gray-400 text-white text-3xl font-bold rounded-lg hover:bg-gray-500 hover:scale-105 transition-transform duration-200 cursor-pointer"
            >
              No
            </button>
          </div>
        </div>
      ) : state === "confirmation" ? (
        <div className="text-center z-10 animate-fadeIn">
          <h1 className="text-7xl font-bold text-pink-800 mb-8">
            {confirmationMessages[confirmationLevel]}
          </h1>
          <div className="flex gap-6 justify-center">
            <button
              onClick={() => setState("yay")}
              className="px-8 py-4 bg-pink-500 text-white text-3xl font-bold rounded-lg hover:bg-pink-600 hover:scale-105 transition-transform duration-200 cursor-pointer"
            >
              Yes 💕
            </button>
            <button
              onClick={handleNo}
              className="px-8 py-4 bg-gray-400 text-white text-3xl font-bold rounded-lg hover:bg-gray-500 hover:scale-105 transition-transform duration-200 cursor-pointer"
            >
              No
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center z-10 animate-fadeIn">
          <h1 className="text-9xl font-bold text-pink-800 mb-8">
            Yay! 🎉
          </h1>
          <p className="text-5xl text-pink-700 mb-8">
            I&apos;m so happy! 💕
          </p>
        </div>
      )}
    </div>
  );
}
