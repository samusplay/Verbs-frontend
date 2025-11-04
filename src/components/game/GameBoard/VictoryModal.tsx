interface VictoryModalProps {
  onPlayAgain: () => void;
  score: number;
}

export default function VictoryModal({ onPlayAgain, score }: VictoryModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative bg-white w-full max-w-sm mx-4 rounded-2xl shadow-xl p-6 text-center animate-fade-in">
        <div className="mx-auto mb-3 h-12 w-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-2xl">🏆</div>
        <h2 className="text-2xl font-bold text-green-600 mb-2">¡Completado!</h2>
        <p className="text-slate-600">Has emparejado todas las cartas.</p>
        <p className="text-slate-800 font-semibold mt-1">Puntuación: <span className="text-indigo-600">{score}</span></p>
        <div className="flex items-center justify-center gap-3 mt-5">
          <button
            onClick={onPlayAgain}
            className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 shadow transition-colors"
          >
            Jugar de nuevo
          </button>
        </div>
      </div>
    </div>
  );
}
