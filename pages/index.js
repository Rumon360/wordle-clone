import Head from "next/head";
import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import Modal from "../components/Modal";
import { TileRow } from "../components/TileRow";

export default function Home({ todaysWord }) {
  const ROW_COUNT = 5;
  const [rows, setRows] = useState(() =>
    Array.from({ length: ROW_COUNT }, () => ({ letters: [], results: [] }))
  );
  const [currentRow, setCurrentRow] = useState(0);
  const [gameStatus, setGameStatus] = useState(null);
  const [modal, setModal] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [message, setMessage] = useState("");

  const hiddenInputRef = useRef(null);
  const rowsRef = useRef(rows);
  const currentRowRef = useRef(currentRow);
  const messageTimer = useRef(null);

  const todaysWordUpper = useMemo(() => todaysWord.toUpperCase(), [todaysWord]);

  // Keep refs in sync
  useEffect(() => {
    rowsRef.current = rows;
  }, [rows]);
  useEffect(() => {
    currentRowRef.current = currentRow;
  }, [currentRow]);

  // Detect mobile
  useEffect(() => {
    setIsMobile(/Android|iPhone|iPad|iPod/i.test(navigator.userAgent));
  }, []);

  // Focus input on click/tap
  const focusInput = useCallback(() => {
    if (isMobile && hiddenInputRef.current) {
      hiddenInputRef.current.focus({ preventScroll: true });
    }
  }, [isMobile]);

  // Show in-game message
  const showMessage = useCallback((text, duration = 2000) => {
    clearTimeout(messageTimer.current);
    setMessage(text);
    messageTimer.current = setTimeout(() => setMessage(""), duration);
  }, []);

  // Shake row animation
  const shakeRow = useCallback(() => {
    const row = document.querySelector(".active-row");
    if (row) {
      row.animate(
        [
          { transform: "translateX(0)" },
          { transform: "translateX(-10px)" },
          { transform: "translateX(10px)" },
          { transform: "translateX(0)" },
        ],
        { duration: 250 }
      );
    }
  }, []);

  // Validate word using dictionary API
  const validateWord = async (word) => {
    try {
      const res = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );
      return res.ok;
    } catch {
      return false;
    }
  };

  // Check word correctness
  const checkWord = (word, target) => {
    const w = word.toUpperCase().split("");
    const t = target.split("");
    return w.map((ch, i) =>
      ch === t[i] ? "Correct" : t.includes(ch) ? "Available" : "Incorrect"
    );
  };

  // Reset game
  const resetGame = useCallback(() => {
    setRows(
      Array.from({ length: ROW_COUNT }, () => ({ letters: [], results: [] }))
    );
    setCurrentRow(0);
    setGameStatus(null);
  }, []);

  // Handle key press
  const handleKeyPress = useCallback(
    async (key) => {
      if (gameStatus) return;

      key = key.length === 1 ? key.toLowerCase() : key;

      // Handle letters/backspace immediately
      if (key === "Backspace" || /^[a-zA-Z]$/.test(key)) {
        setRows((prevRows) => {
          const newRows = [...prevRows];
          const currIndex = currentRowRef.current;
          const current = { ...newRows[currIndex] };

          if (key === "Backspace") {
            current.letters = current.letters.slice(0, -1);
          } else if (/^[a-zA-Z]$/.test(key) && current.letters.length < 5) {
            current.letters = [...current.letters, key];
          }

          newRows[currIndex] = current;
          return newRows;
        });
        return;
      }

      // Handle Enter key
      if (key === "Enter") {
        const currIndex = currentRowRef.current;
        const current = rowsRef.current[currIndex];
        if (!current) return;
        const word = current.letters.join("");
        if (word.length !== 5) {
          showMessage("Enter a 5-letter word");
          shakeRow();
          return;
        }

        const isValid = await validateWord(word);
        if (!isValid) {
          shakeRow();
          showMessage("❌ Invalid word");
          return;
        }

        const results = checkWord(word, todaysWordUpper);

        // Update row with results
        setRows((prev) => {
          const updated = [...prev];
          updated[currIndex] = { ...updated[currIndex], results };
          return updated;
        });

        // Check win/lose
        if (word.toUpperCase() === todaysWordUpper) {
          setGameStatus("win");
          showMessage("🎉 You Won!");
          setTimeout(resetGame, 1200);
          return;
        }

        if (currIndex === ROW_COUNT - 1) {
          setGameStatus("lose");
          showMessage(`💀 The word was ${todaysWordUpper}`);
          setTimeout(resetGame, 1500);
          return;
        }

        setCurrentRow((r) => r + 1);
      }
    },
    [gameStatus, showMessage, resetGame, todaysWordUpper, shakeRow]
  );

  // Desktop keyboard
  useEffect(() => {
    const listener = (e) => handleKeyPress(e.key);
    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, [handleKeyPress]);

  // Mobile input
  const handleMobileInput = useCallback(
    (e) => {
      const lastChar = e.target.value.slice(-1);
      if (lastChar) handleKeyPress(lastChar);
      e.target.value = "";
    },
    [handleKeyPress]
  );

  // Mobile touch focus
  useEffect(() => {
    if (!isMobile) return;
    const touchHandler = () => focusInput();
    window.addEventListener("touchstart", touchHandler);
    return () => window.removeEventListener("touchstart", touchHandler);
  }, [isMobile, focusInput]);

  return (
    <div>
      <Head>
        <title>Wordle Clone</title>
      </Head>

      <Modal setModal={setModal} modal={modal} />

      <main
        className="pb-8 h-screen flex flex-col items-center text-center justify-between"
        onClick={focusInput}
      >
        <nav className="w-full flex justify-center py-3 border-b-2 border-gray-700/50">
          <h1
            className="text-white font-bold text-2xl md:text-3xl cursor-pointer select-none"
            onClick={resetGame}
          >
            Wordle Clone
          </h1>
        </nav>

        <div className="flex flex-col space-y-3 pt-10 items-center">
          {rows.map((row, i) => (
            <TileRow
              key={i}
              letters={row.letters}
              results={row.results}
              active={i === currentRow}
            />
          ))}
        </div>

        {message && (
          <div className="fixed bottom-6 px-4 py-2 bg-black/70 text-white rounded-lg shadow-md text-sm md:text-base">
            {message}
          </div>
        )}

        {isMobile && (
          <input
            ref={hiddenInputRef}
            type="text"
            inputMode="text"
            autoCapitalize="none"
            autoCorrect="off"
            onChange={handleMobileInput}
            onBlur={() => setTimeout(focusInput, 100)}
            className="absolute w-[1px] h-[1px] opacity-0 top-1/2 left-1/2"
          />
        )}

        <footer className="flex justify-center items-center mt-6">
          <h1 className="text-gray-400 text-sm lg:text-lg">
            Developed by{" "}
            <a
              href="https://hmk360.netlify.app/"
              target="_blank"
              rel="noreferrer"
              className="hover:underline"
            >
              Rumon
            </a>
          </h1>
        </footer>
      </main>
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch(
    "https://random-word-api.herokuapp.com/word?length=5"
  );
  const [todaysWord] = await res.json();
  return { props: { todaysWord } };
}
