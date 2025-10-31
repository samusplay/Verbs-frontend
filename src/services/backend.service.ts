import environment from "../environments/environment";
//
export class BackendService {
  private baseUrl = environment.API_BASE_URL;

  private getToken(): string | null {
    return localStorage.getItem("token");
  }

  private buildHeaders(isFile = false): HeadersInit {
    const token = this.getToken();
    const headers: HeadersInit = {};

    if (!isFile) {
      headers["Content-Type"] = "application/json";
    }

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    return headers;
  }

  /** 🔹 GET genérico */
  async get<T>(
    endpoint: string,
    params?: Record<string, string>
  ): Promise<T> {
    const url = new URL(`${this.baseUrl}${endpoint}`);
    if (params) {
      Object.keys(params).forEach((key) =>
        url.searchParams.append(key, params[key])
      );
    }

    const res = await fetch(url.toString(), {
      method: "GET",
      headers: this.buildHeaders(),
      //credentials: "include", // si manejas sesiones o cookies
    });

    if (!res.ok) throw new Error(`GET error: ${res.statusText}`);
    return res.json() as Promise<T>;
  }

  /** 🔹 POST genérico */
  async post<T>(endpoint: string, data: unknown): Promise<T> {
    const res = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "POST",
      headers: this.buildHeaders(),
      credentials: "include",
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error(`POST error: ${res.statusText}`);
    return res.json() as Promise<T>;
  }

  /** 🔹 PUT genérico */
  async put<T>(endpoint: string, data: unknown): Promise<T> {
    const res = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "PUT",
      headers: this.buildHeaders(),
      credentials: "include",
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error(`PUT error: ${res.statusText}`);
    return res.json() as Promise<T>;
  }

  /** 🔹 POST file (multipart/form-data) */
  async postFile<T>(endpoint: string, fileData: FormData): Promise<T> {
    const res = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "POST",
      headers: this.buildHeaders(true),
      body: fileData,
    });

    if (!res.ok) throw new Error(`File upload error: ${res.statusText}`);
    return res.json() as Promise<T>;
  }
}

// Exportamos una instancia única, como Angular hacía con @Injectable
export const backendService = new BackendService();
