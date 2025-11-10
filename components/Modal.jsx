import React from "react";

export default function Modal({ setModal, modal }) {
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center transition-all duration-300 ${
        modal
          ? "z-50 bg-black/60 backdrop-blur-sm opacity-100"
          : "z-0 opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`relative flex flex-col items-center text-center p-6 rounded-2xl max-w-md
          bg-white/10 border border-white/20 shadow-2xl backdrop-blur-lg
          transform transition-all duration-300 ease-out ${
            modal
              ? "translate-y-0 scale-100 opacity-100"
              : "translate-y-10 scale-95 opacity-0"
          }`}
      >
        <button
          onClick={() => setModal(false)}
          className="absolute top-3 right-4 text-white/80 hover:text-white transition-colors duration-200 text-xl"
          aria-label="Close modal"
        >
          ✕
        </button>

        <h1 className="text-white text-2xl font-semibold mb-4">How to Play</h1>
        <p className="text-white/90 text-base leading-relaxed">
          Guess the <span className="font-semibold text-yellow-300">WORD</span>{" "}
          in five tries. Each guess must be a valid five-letter word. Hit the{" "}
          <span className="font-semibold text-blue-300">Enter</span> key to
          submit. After each guess, the color of the tiles will change to show
          how close your guess was to the word.
        </p>

        <button
          onClick={() => setModal(false)}
          className="mt-6 px-6 py-2 rounded-full border border-white/30 text-white font-medium
                     hover:bg-white/10 hover:scale-105 transition-all duration-200"
        >
          Got it!
        </button>
      </div>
    </div>
  );
}
