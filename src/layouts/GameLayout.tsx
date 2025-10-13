import type { ReactNode } from "react";

export default function GameLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh bg-[radial-gradient(60%_60%_at_50%_0%,rgba(99,102,241,0.20),rgba(236,72,153,0.10)_50%,transparent_80%)]">
      <header className="mx-auto max-w-6xl px-6 py-5">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold tracking-tight text-slate-800">
            Verb Cards
          </h1>
          <nav className="flex gap-2 text-sm text-slate-600">
            <button className="rounded-full bg-white/70 px-3 py-1 shadow hover:bg-white">
              Study
            </button>
            <button className="rounded-full bg-white/70 px-3 py-1 shadow hover:bg-white">
              Match
            </button>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 pb-10">{children}</main>

      <footer className="mx-auto max-w-6xl px-6 pb-6 text-xs text-slate-500">
        © 2025 Verb Cards
      </footer>
    </div>
  );
}
