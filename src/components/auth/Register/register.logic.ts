import { useState } from "react";
import { usersService } from "../users.service";
import type { RegisterDTO, User } from "../models/auth.models";

export interface RegisterState {
  email: string;
  password: string;
}

export function useRegister(onSuccess?: (user?: User) => void) {
  const [form, setForm] = useState<RegisterState>({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function update<K extends keyof RegisterState>(key: K, value: RegisterState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function submit() {
    setError(null);
    setLoading(true);
    try {
      const payload: RegisterDTO = { email: form.email.trim(), password: form.password };
      const res = await usersService.register(payload);
      onSuccess?.(res);
      return res;
    } catch (e: any) {
      setError(e?.message ?? "Error al registrar");
      throw e;
    } finally {
      setLoading(false);
    }
  }

  return { form, update, submit, loading, error, setError };
}
