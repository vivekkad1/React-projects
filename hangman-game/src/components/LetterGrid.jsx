export default function LetterGrid({ word, guessedLetters }) {
  return (
    <div className="flex justify-center mb-6 flex-wrap gap-3">
      {word.split("").map((ch, i) => (
        <span key={i} className="text-2xl tracking-wider">
          {guessedLetters.includes(ch) ? ch : "_"}
        </span>
      ))}
    </div>
  );
}
