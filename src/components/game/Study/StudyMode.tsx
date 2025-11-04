import type { Verb } from "../GameBoard/GameBoard.types";

interface StudyModeProps {
  verbs: Verb[];
}

export default function StudyMode({ verbs }: StudyModeProps) {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-slate-800 mb-4">Study Mode</h2>
      <p className="text-slate-600 mb-6">Repasa las tres formas de cada verbo.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {verbs.map((v) => (
          <div key={v.infinitive} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="text-sm text-slate-500">Infinitive</div>
            <div className="text-lg font-semibold text-slate-800">{v.infinitive}</div>
            <div className="mt-2 text-sm text-slate-500">Past Simple</div>
            <div className="text-lg font-semibold text-slate-800">{v.past_simple}</div>
            <div className="mt-2 text-sm text-slate-500">Past Participle</div>
            <div className="text-lg font-semibold text-slate-800">{v.past_participle}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
