import { useEffect, useState } from "react";
import "./App.css";
import GameBoard from "./components/game/GameBoard/GameBoard";
import type { Verb } from "./components/game/GameBoard/GameBoard.types"; //  tipo del verbo
import GameLayout from "./layouts/GameLayout";
import { getVerbs } from "./services/verbs.service"; //  tu servicio que llama al backend

function App() {
  const [verbs, setVerbs] = useState<Verb[]>([]); // estado para guardar los verbos
  const [loading, setLoading] = useState(true);   // estado para saber si está cargando
  const [error, setError] = useState<string | null>(null); // si algo falla

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
    <GameLayout>
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

      {!loading && !error && (
        <GameBoard verbs={verbs} mode="match" difficulty="medium" />
      )}
    </GameLayout>
  );
}

export default App;

