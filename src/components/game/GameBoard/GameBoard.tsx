//Tablero Principal del Juego

// 🧩 Tablero principal del juego de verbos


import { useEffect } from "react";
import Card from "./Card/Card";
import DefeatModal from "./DefeatModal";
import VictoryModal from "./VictoryModal";
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
  difficulty = "easy",
}: GameBoardProps) {
     
  // 🔹 Mapa de límites según la dificultad
  const limitByDifficulty = {
  easy: { verbs: 4, maxMoves: 12 },   // 4 verbos → 12 cartas, 12 intentos
  medium: { verbs: 6, maxMoves: 8 },  // 6 verbos → 18 cartas, 8 intentos
  hard: { verbs: 8, maxMoves: 6 },    // 8 verbos → 24 cartas, 6 intentos
  } as const;

// 🔹 Extraemos los valores según la dificultad actual
const { verbs:limit, maxMoves } =
  limitByDifficulty[difficulty] ?? limitByDifficulty.medium;


  const { deck, score, moves, phase, selectCard, resetGame } = useMatchGame(verbs,limit,maxMoves);

  function saveGameResult(
    scoreValue: number,
    resultValue: "finished" | "lost",
    difficultyValue: typeof difficulty
  ) {
    const newEntry = {
      score: scoreValue,
      result: resultValue,
      difficulty: difficultyValue,
      date: new Date().toISOString(),
    };
    const existingRaw = localStorage.getItem("gameHistory");
    let existing: any[] = [];
    try {
      existing = existingRaw ? JSON.parse(existingRaw) : [];
      if (!Array.isArray(existing)) existing = [];
    } catch {
      existing = [];
    }
    existing.push(newEntry);
    localStorage.setItem("gameHistory", JSON.stringify(existing));
  }

  // Guardar resultado al finalizar (finished o lost)
  useEffect(() => {
    if (phase === "finished" || phase === "lost") {
      const payload = {
        score,
        result: phase,
        difficulty,
        date: new Date().toISOString(),
      };
      // Almacenamos la última puntuación en localStorage
      localStorage.setItem("lastGameResult", JSON.stringify(payload));
      // Agregamos al historial local
      saveGameResult(score, phase, difficulty);
    }
  }, [phase, score, difficulty]);

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
    grid gap-4 justify-center
    grid-cols-[repeat(auto-fit,minmax(100px,1fr))] 
    w-full max-w-6xl mx-auto px-4
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
          <VictoryModal score={score} onPlayAgain={resetGame} />
        )}
        {phase === "lost" && (
          <DefeatModal score={score} onRetry={resetGame} />
        )}

        
      </div>
    </div>
  );
}
