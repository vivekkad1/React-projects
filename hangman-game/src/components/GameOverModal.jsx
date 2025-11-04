export default function GameOverModal({ status, word, onRestart }) {
  if (status === "playing") return null;
  return (
    <div className="text-center mt-4">
      <p className="mb-3 text-gray-300">
        {status === "won" ? "You won! 🎉" : `You lost! The word was ${word}`}
      </p>
      <button
        onClick={onRestart}
        className="px-4 py-2 border border-gray-500 rounded-md hover:bg-white hover:text-black transition"
      >
        New Game
      </button>
    </div>
  );
}
