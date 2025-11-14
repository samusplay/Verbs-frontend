// Servicio de usuarios (auth) basado en backend.service.ts
// No modifica backend.service; solo lo utiliza.

import { backendService } from "../../services/backend.service";
import type { RegisterDTO, LoginDTO, User, AuthResponse } from "./models/auth.models";

function extractToken(payload: Partial<AuthResponse> | null | undefined): string | null {
  if (!payload) return null;
  if (typeof payload.token === "string" && payload.token) return payload.token;
  if (typeof payload.access === "string" && payload.access) return payload.access;
  if (typeof payload.accessToken === "string" && payload.accessToken) return payload.accessToken;
  return null;
}

export const usersService = {
  async register(data: RegisterDTO) {
    // Ajusta el endpoint si tu backend usa otro path
    return backendService.post<User>("users/register/", data);
  },

  async login(data: LoginDTO) {
    // Si tu backend entrega el token en cookies, igualmente funcionará
    // porque backendService.post usa credentials: "include".
    const resp = await backendService.post<AuthResponse>("users/login/", data);
    const token = extractToken(resp);
    if (token) {
      localStorage.setItem("token", token);
    }
    return resp;
  },

  async profile() {
    // Ajusta el endpoint si es "users/me/" o similar en tu API
    return backendService.get<User>("users/profile/");
  },

  logout() {
    localStorage.removeItem("token");
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem("token");
  },

  getToken(): string | null {
    return localStorage.getItem("token");
  },
};
