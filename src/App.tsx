import { useEffect, useState } from "react";
import "./App.css";
import GameBoard from "./components/game/GameBoard/GameBoard";
import StudyMode from "./components/game/Study/StudyMode";
import type { Verb, GameDifficulty } from "./components/game/GameBoard/GameBoard.types"; //  tipo del verbo
import GameLayout from "./layouts/GameLayout";
import { getVerbs } from "./services/verbs.service"; //  tu servicio que llama al backend

function App() {
  const [verbs, setVerbs] = useState<Verb[]>([]); // estado para guardar los verbos
  const [loading, setLoading] = useState(true);   // estado para saber si está cargando
  const [error, setError] = useState<string | null>(null); // si algo falla
  const [selectedDifficulty, setSelectedDifficulty] = useState<GameDifficulty | null>(null);
  const [started, setStarted] = useState(false);
  const [mode, setMode] = useState<"match" | "study">("match");

  // Efecto para traer los verbos desde el backend
  useEffect(() => {
    (async () => {
      try {
        const data = await getVerbs();  // llama a tu servicio
        setVerbs(data);                 // guarda los verbos en el estado
      } catch (e: any) {
        setError(e?.message ?? "Error al cargar los verbos");
      } finally {
        setLoading(false);              // deja de mostrar el “Cargando…”
      }
    })();
  }, []);

  return (
    <GameLayout mode={mode} onSelectMode={(m) => setMode(m)}>
      {loading && (
        <div className="py-10 text-center text-slate-600 text-lg">
          Cargando verbos desde el servidor...
        </div>
      )}

      {!loading && error && (
        <div className="py-10 text-center text-red-600 text-lg">
          ❌ Error: {error}
        </div>
      )}

      {/* Pantalla de selección solo para modo Match */}
      {!loading && !error && mode === "match" && !started && (
        <div className="py-12 flex flex-col items-center gap-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-800">Selecciona la dificultad</h2>
            <p className="text-slate-500 mt-1">Elige un modo para ajustar intentos y cantidad de verbos</p>
          </div>

          {/* Opciones de dificultad como tarjetas */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-4xl px-4">
            {/* Fácil */}
            <button
              onClick={() => setSelectedDifficulty("easy")}
              className={`text-left rounded-2xl border p-5 transition-all shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 ${
                selectedDifficulty === "easy"
                  ? "bg-indigo-600 text-white border-indigo-600 ring-2 ring-indigo-400"
                  : "bg-white text-slate-800 border-slate-200 hover:border-slate-300 hover:shadow"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold ${selectedDifficulty === "easy" ? "bg-white/20" : "bg-green-100 text-green-700"}`}>E</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Fácil</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${selectedDifficulty === "easy" ? "bg-white/20" : "bg-green-50 text-green-700"}`}>4 verbos</span>
                  </div>
                  <p className={`mt-1 text-sm ${selectedDifficulty === "easy" ? "text-white/90" : "text-slate-500"}`}>12 intentos • ideal para empezar</p>
                </div>
              </div>
            </button>

            {/* Medio */}
            <button
              onClick={() => setSelectedDifficulty("medium")}
              className={`text-left rounded-2xl border p-5 transition-all shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 ${
                selectedDifficulty === "medium"
                  ? "bg-indigo-600 text-white border-indigo-600 ring-2 ring-indigo-400"
                  : "bg-white text-slate-800 border-slate-200 hover:border-slate-300 hover:shadow"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold ${selectedDifficulty === "medium" ? "bg-white/20" : "bg-amber-100 text-amber-700"}`}>M</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Medio</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${selectedDifficulty === "medium" ? "bg-white/20" : "bg-amber-50 text-amber-700"}`}>6 verbos</span>
                  </div>
                  <p className={`mt-1 text-sm ${selectedDifficulty === "medium" ? "text-white/90" : "text-slate-500"}`}>8 intentos • para retarte</p>
                </div>
              </div>
            </button>

            {/* Difícil */}
            <button
              onClick={() => setSelectedDifficulty("hard")}
              className={`text-left rounded-2xl border p-5 transition-all shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 ${
                selectedDifficulty === "hard"
                  ? "bg-indigo-600 text-white border-indigo-600 ring-2 ring-indigo-400"
                  : "bg-white text-slate-800 border-slate-200 hover:border-slate-300 hover:shadow"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold ${selectedDifficulty === "hard" ? "bg-white/20" : "bg-red-100 text-red-700"}`}>D</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Difícil</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${selectedDifficulty === "hard" ? "bg-white/20" : "bg-red-50 text-red-700"}`}>8 verbos</span>
                  </div>
                  <p className={`mt-1 text-sm ${selectedDifficulty === "hard" ? "text-white/90" : "text-slate-500"}`}>6 intentos • máxima dificultad</p>
                </div>
              </div>
            </button>
          </div>

          <button
            onClick={() => selectedDifficulty && setStarted(true)}
            disabled={!selectedDifficulty}
            className={`px-6 py-2.5 rounded-xl shadow-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400 ${
              selectedDifficulty
                ? "bg-green-600 text-white hover:bg-green-700"
                : "bg-slate-300 text-slate-600 cursor-not-allowed"
            }`}
          >
            Comenzar
          </button>
        </div>
      )}

      {!loading && !error && mode === "match" && started && selectedDifficulty && (
        <GameBoard verbs={verbs} difficulty={selectedDifficulty} />
      )}

      {/* Modo Study: muestra listado de verbos para repasar */}
      {!loading && !error && mode === "study" && (
        <StudyMode verbs={verbs} />
      )}
    </GameLayout>
  );
}

export default App;

