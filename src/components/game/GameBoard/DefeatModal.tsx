
interface DefeatModalProps {
  onRetry: () => void;
}

export default function DefeatModal({ onRetry }: DefeatModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative bg-white w-full max-w-sm mx-4 rounded-2xl shadow-xl p-6 text-center animate-fade-in">
        <div className="mx-auto mb-3 h-12 w-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-2xl">💀</div>
        <h2 className="text-2xl font-bold text-red-600 mb-2">¡Has perdido!</h2>
        <p className="text-slate-600 mb-5">Se acabaron tus intentos. ¿Quieres reintentar?</p>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={onRetry}
            className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 shadow transition-colors"
          >
            Reintentar
          </button>
        </div>
      </div>
    </div>
  );
}
