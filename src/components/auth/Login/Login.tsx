import { useLogin } from "./login.logic";

interface LoginProps {
  onSuccess?: () => void; // continuar después de login exitoso
}

export default function Login({ onSuccess }: LoginProps) {
  const { form, update, submit, loading, error, setError } = useLogin(() => {
    onSuccess?.();
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await submit();
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-sm bg-white rounded-xl shadow p-6">
        <h1 className="text-xl font-bold text-indigo-600 mb-4">Iniciar sesión</h1>

        {error && (
          <div className="mb-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded p-2">
            {error}
            <button
              type="button"
              className="ml-2 text-red-700 underline"
              onClick={() => setError(null)}
            >
              cerrar
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-slate-600 mb-1">Email</label>
            <input
              type="email"
              className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-600 mb-1">Password</label>
            <input
              type="password"
              className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
              value={form.password}
              onChange={(e) => update("password", e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Ingresando..." : "Entrar"}
          </button>
        </form>

        <p className="text-xs text-slate-400 mt-4">
          ¿Olvidaste tu contraseña? Próximamente.
        </p>
      </div>
    </div>
  );
}
