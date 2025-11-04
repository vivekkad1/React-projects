export default function Scoreboard({ score, wrongGuesses, wordLength }) {
  return (
    <>
      <p className="text-gray-400 mb-2">Score: {score}</p>
      <p className="text-gray-400 mb-6">Wrong guesses: {wrongGuesses} / {wordLength}</p>
    </>
  );
}
