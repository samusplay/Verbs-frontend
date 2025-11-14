import type { ReactNode } from "react";

interface RegisterLayoutProps {
  title?: string;
  subtitle?: string;
  children: ReactNode;
}

export default function RegisterLayout({ title = "Crear cuenta", subtitle = "Únete para guardar tu progreso y retos.", children }: RegisterLayoutProps) {
  return (
    <div className="w-full px-4">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Lado visual/branding */}
        <div className="hidden md:flex flex-col justify-center rounded-2xl bg-gradient-to-br from-indigo-500 via-fuchsia-500 to-pink-500 p-8 text-white shadow-lg">
          <h2 className="text-3xl font-bold drop-shadow-sm">Verb Cards</h2>
          <p className="mt-2 text-white/90">Memoriza verbos, practica y mejora tu puntaje.</p>
          <ul className="mt-6 space-y-2 text-sm text-white/90">
            <li>• Practica en modo Match</li>
            <li>• Repasa en modo Study</li>
            <li>• Guarda tu progreso</li>
          </ul>
        </div>

        {/* Panel de formulario */}
        <div className="bg-white rounded-2xl shadow p-6 md:p-8">
          <h1 className="text-2xl font-bold text-indigo-600">{title}</h1>
          {subtitle && <p className="text-slate-500 mt-1">{subtitle}</p>}
          <div className="mt-6">{children}</div>
        </div>
      </div>
    </div>
  );
}
