import type { ReactNode } from "react";
//Marco de la aplicacion

// Envolver el Juego, el Marco no maneja lógica, solo diseño
export default function GameLayout({ children, mode = "match", onSelectMode }: { children: ReactNode; mode?: "match" | "study"; onSelectMode?: (m: "match" | "study") => void; }) {
  return (
    <div className="relative min-h-dvh flex flex-col bg-[radial-gradient(60%_60%_at_50%_0%,rgba(99,102,241,0.25),rgba(236,72,153,0.15)_50%,transparent_80%)]">
      {/* Overlay sutil para dar más profundidad */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-white/40 backdrop-blur-2xl -z-10"></div>

      {/* Header */}
      <header className="sticky top-0 z-20 bg-white/40 backdrop-blur-md shadow-sm">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight text-indigo-700">
            Verb Cards
          </h1>
          <nav className="flex gap-3 text-sm font-medium text-slate-700">
            <button
              onClick={() => onSelectMode && onSelectMode("study")}
              className={`rounded-full px-4 py-1.5 transition ${mode === "study" ? "bg-indigo-600 text-white" : "bg-indigo-100 hover:bg-indigo-200"}`}
            >
              Study
            </button>
            <button
              onClick={() => onSelectMode && onSelectMode("match")}
              className={`rounded-full px-4 py-1.5 transition ${mode === "match" ? "bg-pink-600 text-white" : "bg-pink-100 hover:bg-pink-200"}`}
            >
              Match
            </button>
          </nav>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 flex items-center justify-center mx-auto w-full max-w-6xl px-6 py-10">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white/50 backdrop-blur-md border-t border-white/30">
        <div className="mx-auto max-w-6xl px-6 py-4 text-center text-xs text-slate-500">
          © 2025 Verb Cards — built with React & Django
        </div>
      </footer>
    </div>
  );
}
