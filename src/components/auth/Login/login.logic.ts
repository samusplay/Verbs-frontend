import { useState } from "react";
import { usersService } from "../users.service";
import type { LoginDTO, AuthResponse } from "../models/auth.models";

export interface LoginState {
  email: string;
  password: string;
}

export function useLogin(onSuccess?: (resp: AuthResponse) => void) {
  const [form, setForm] = useState<LoginState>({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function update<K extends keyof LoginState>(key: K, value: LoginState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function submit() {
    setError(null);
    setLoading(true);
    try {
      const payload: LoginDTO = { email: form.email.trim(), password: form.password };
      const resp = await usersService.login(payload);
      onSuccess?.(resp);
      return resp;
    } catch (e: any) {
      setError(e?.message ?? "Error al iniciar sesión");
      throw e;
    } finally {
      setLoading(false);
    }
  }

  return { form, update, submit, loading, error, setError };
}
