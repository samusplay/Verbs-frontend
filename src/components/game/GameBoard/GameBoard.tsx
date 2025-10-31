//Tablero Principal del Juego

// 🧩 Tablero principal del juego de verbos


import Card from "./Card/Card";
import { useMatchGame } from "./GameBoard.hooks";
import type { GameBoardProps } from "./GameBoard.types";

/**
 * 🎮 Componente principal del tablero del juego
 *
 * - Conecta el hook `useMatchGame`
 * - Renderiza las cartas mediante el componente <Card />
 * - Muestra puntaje, intentos y controles
 */
export default function GameBoard({
  verbs,
  //luego podemos usar otro modo
  mode = "match",
  difficulty = "medium",
}: GameBoardProps) {
  const { deck, score, moves, phase, selectCard, resetGame } = useMatchGame(verbs);

  // 📦 Si aún no hay cartas cargadas (por ejemplo, la API todavía responde)
  if (!deck || deck.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-600">
        <p className="text-lg font-medium">Cargando verbos...</p>
      </div>
    );
  }

  // ✅ Render principal del tablero
  return (
    <div className="flex flex-col items-center justify-center">
      {/* Encabezado del tablero */}
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-indigo-600">Verb Match Game</h2>
        <p className="text-slate-500">
          Puntaje:{" "}
          <span className="font-semibold text-indigo-600">{score}</span> | Intentos:{" "}
          <span className="font-semibold">{moves}</span>
        </p>
        <p className="text-sm text-slate-400 mt-1">
          Estado: <span className="font-medium">{phase.toUpperCase()}</span>
        </p>
      </div>

      {/* Tablero de cartas */}
      <div
        className={`
          grid gap-3
          ${difficulty === "easy" ? "grid-cols-3" : ""}
          ${difficulty === "medium" ? "grid-cols-4" : ""}
          ${difficulty === "hard" ? "grid-cols-5" : ""}
          max-w-5xl
        `}
      >
        {deck.map((card) => (
          <Card
            key={card.id}
            card={card}
            onSelect={selectCard}
            disabled={card.isMatched || phase === "locked" || phase === "finished"}
          />
        ))}
      </div>

      {/* Controles */}
      <div className="mt-8 flex gap-4 items-center">
        <button
          onClick={resetGame}
          className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 shadow transition-colors"
        >
          Reiniciar
        </button>

        {phase === "finished" && (
          <span className="text-green-600 font-semibold"> ¡Completado!</span>
        )}
      </div>
    </div>
  );
}
