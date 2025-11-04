export default function Keyboard({ letters, guessedLetters, status, onGuess }) {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-6">
      {letters.map((l) => (
        <button
          key={l}
          onClick={() => onGuess(l)}
          disabled={guessedLetters.includes(l) || status !== 'playing'}
          className={`p-2 rounded-md text-sm border transition-all duration-200 w-9 h-9 flex items-center justify-center text-center uppercase ${
            guessedLetters.includes(l)
              ? 'bg-gray-700 text-gray-500 border-gray-700'
              : 'bg-black border-gray-500 hover:bg-white hover:text-black'
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}