import React from 'react';

export default function Modal({ setModal, modal }) {
  return (
    <div
      className={`h-screen w-screen absolute ${modal ? 'z-50' : 'z-10'}  ${
        modal ? 'bg-black/70' : 'bg-none'
      } `}
    >
      <div
        className={`flex flex-col justify-center items-center mt-32 p-4 rounded-lg mx-auto w-4/5 md:w-2/4 border-2 border-white/50 ${
          modal ? 'translate-y-0' : ' -translate-y-[600px]'
        } transform transition-all duration-100`}
      >
        <h1 className="text-white text-center text-lg flex flex-col py-2">
          Guess the WORD in five tries. Each guess must be a valid five-letter
          word. Hit the enter button to submit. After each guess, the color of
          the tiles will change to show how close your guess was to the word.
          <span>
            *** Please Use Lowercase Letters, first letter can be uppercase ***
          </span>
        </h1>
        <button
          onClick={() => {
            setModal(false);
          }}
          className="text-white w-10 text-md border-2 rounded-full border-white px-3.5 py-1 hover:animate-pulse"
        >
          x
        </button>
      </div>
    </div>
  );
}
