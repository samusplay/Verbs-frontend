// Modelos/Interfaces para el módulo de autenticación

export interface RegisterDTO {
  email: string;
  password: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface User {
  id?: string;
  email: string;
}

// Respuesta flexible para distintos backends
export interface AuthResponse {
  token?: string;       // "token" genérico
  access?: string;      // JWT access
  accessToken?: string; // nombre alternativo
  refresh?: string;     // opcional
  user?: User;          // opcional
  [k: string]: any;     // permitir campos adicionales
}
