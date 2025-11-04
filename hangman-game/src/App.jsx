import { useState, useEffect } from "react"
import { words } from "./data/words.js";
import LetterGrid from "./components/LetterGrid";
import Keyboard from "./components/Keyboard";
import Scoreboard from "./components/Scoreboard";
import GameOverModal from "./components/GameOverModal";

export default function App() {
  const [word, setWord] = useState("");
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [score, setScore] = useState(0);
  const [status, setStatus] = useState("playing");

  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  const startNewGame = () => {
    const newWord =
      words[Math.floor(Math.random() * words.length)].toUpperCase();
    setWord(newWord);
    setGuessedLetters([]);
    setWrongGuesses(0);
    setStatus("playing");
  };

  useEffect(() => {
    startNewGame();
  }, []);

  const guessLetter = (letter) => {
    const l = letter.toUpperCase();
    if (status !== "playing" || guessedLetters.includes(l)) return;

    const newGuessed = [...guessedLetters, l];
    setGuessedLetters(newGuessed);

    const isWrong = !word.includes(l);
    const newWrongCount = isWrong ? wrongGuesses + 1 : wrongGuesses;
    if (isWrong) setWrongGuesses(newWrongCount);

    const allGuessed = word.split("").every((ch) => newGuessed.includes(ch));
    if (allGuessed) {
      setStatus("won");
      setScore((prev) => prev + 1);
    } else if (newWrongCount >= word.length) {
      setStatus("lost");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white font-[Inter] p-4">
      <div className="max-w-md w-full text-center border border-gray-700 bg-[#111] rounded-2xl shadow-xl p-6">
        <h1 className="text-3xl mb-4 tracking-wide text-gray-100">
          Hangman Game
        </h1>
        <p className="text-xl mb-2 text-gray-100">Guess the Tech Word!</p>
        <Scoreboard score={score} wrongGuesses={wrongGuesses} wordLength={word.length}/>
        <LetterGrid word={word} guessedLetters={guessedLetters} />
        <Keyboard
          letters={letters}
          guessedLetters={guessedLetters}
          status={status}
          onGuess={guessLetter}
        />
        <GameOverModal status={status} word={word} onRestart={startNewGame} />
      </div>
    </div>
  );
}
