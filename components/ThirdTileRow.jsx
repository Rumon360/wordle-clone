import { useState } from 'react';
import useKeypress from 'react-use-keypress';
import { alphabetData, fiveLetterWords } from '../data/data';

export const ThirdTileRow = ({
  triesEnterPress,
  setTriesEnterPress,
  todaysWord,
}) => {
  const [words, setWords] = useState([]);
  const [firstTries, setFirstTries] = useState([]);

  let todaysWordInArray = todaysWord?.split('');
  let submitWord = '';

  const checkWord = () => {
    if (
      submitWord.charAt(0).toUpperCase() + submitWord.slice(1) ===
      todaysWord
    ) {
      alert('Congratulations! You Won! Press Ok to Play Again');
      location.reload();
      setWords([]);
      submitWord = '';
    } else {
      for (let i = 0; i < 5; i++) {
        if (words[i].toUpperCase() === todaysWordInArray[i].toUpperCase()) {
          setFirstTries((old) => [...old, 'Correct']);
        } else if (todaysWordInArray.includes(words[i])) {
          setFirstTries((old) => [...old, 'Available']);
        } else if (todaysWordInArray.includes(words[i]) === false) {
          setFirstTries((old) => [...old, 'Incorrect']);
        }
      }
    }
  };

  useKeypress(alphabetData, (event) => {
    if (event.key === 'Enter' && words.length === 5 && triesEnterPress < 3) {
      words.forEach((letter) => {
        submitWord = submitWord + letter;
      });
      if (
        fiveLetterWords.includes(
          submitWord.charAt(0).toUpperCase() + submitWord.slice(1)
        )
      ) {
        setTriesEnterPress((p) => p + 1);
        // Check
        checkWord();
      } else {
        setWords([]);
        submitWord = '';
        setTriesEnterPress(2);
        alert('Please enter a valid word');
      }
    }
    if (
      event.key === 'Backspace' &&
      words.length >= 1 &&
      triesEnterPress === 2
    ) {
      setWords(words.slice(0, -1));
    }
    if (
      words.length < 5 &&
      triesEnterPress === 2 &&
      event.key != 'Backspace' &&
      event.key != 'Enter'
    ) {
      setWords([...words, event.key]);
    }
  });

  return (
    <div className="flex space-x-3">
      <div
        className={`flex ${
          words?.length >= 1 &&
          'border-gray-500 scale-110 transform transition ease-in-out'
        } ${firstTries?.[0] === 'Available' && 'bg-yellow-300'} ${
          firstTries?.[0] === 'Correct' && 'bg-green-600'
        } justify-center items-center border-2 border-gray-700/50 w-[55px] lg:w-[80px] h-[60px] lg:h-[80px]`}
      >
        <h1
          className={`text-2xl md:text-3xl lg:text-4xl text-white font-bold py-2`}
        >
          {words ? words[0] : ''}
        </h1>
      </div>
      <div
        className={`${
          words?.length >= 2 &&
          'border-gray-500 scale-110 transform transition ease-in-out'
        } ${firstTries?.[1] === 'Available' && 'bg-yellow-300'} ${
          firstTries?.[1] === 'Correct' && 'bg-green-600'
        } flex justify-center items-center border-2 border-gray-700/50 w-[55px] lg:w-[80px] h-[60px] lg:h-[80px]`}
      >
        <h1 className="text-2xl md:text-3xl lg:text-4xl text-white font-bold py-2">
          {words ? words[1] : ''}
        </h1>
      </div>
      <div
        className={`${
          words?.length >= 3 &&
          'border-gray-500 scale-110 transform transition ease-in-out'
        } ${firstTries?.[2] === 'Available' && 'bg-yellow-300'} ${
          firstTries?.[2] === 'Correct' && 'bg-green-600'
        } flex justify-center items-center border-2 border-gray-700/50 w-[55px] lg:w-[80px] h-[60px] lg:h-[80px]`}
      >
        <h1
          className={`text-2xl md:text-3xl lg:text-4xl text-white font-bold py-2`}
        >
          {words ? words[2] : ''}
        </h1>
      </div>
      <div
        className={`${
          words?.length >= 4 &&
          'border-gray-500 scale-110 transform transition ease-in-out'
        } ${firstTries?.[3] === 'Available' && 'bg-yellow-300'} ${
          firstTries?.[3] === 'Correct' && 'bg-green-600'
        } flex justify-center items-center border-2 border-gray-700/50 w-[55px] lg:w-[80px] h-[60px] lg:h-[80px]`}
      >
        <h1 className="text-2xl md:text-3xl lg:text-4xl text-white font-bold py-2">
          {words ? words[3] : ''}
        </h1>
      </div>
      <div
        className={`${
          words?.length >= 5 &&
          'border-gray-500 scale-110 transform transition ease-in-out'
        } ${firstTries?.[4] === 'Available' && 'bg-yellow-300'} ${
          firstTries?.[4] === 'Correct' && 'bg-green-600'
        } flex justify-center items-center border-2 border-gray-700/50 w-[55px] lg:w-[80px] h-[60px] lg:h-[80px]`}
      >
        <h1 className="text-2xl md:text-3xl lg:text-4xl text-white font-bold py-2">
          {words ? words[4] : ''}
        </h1>
      </div>
    </div>
  );
};
