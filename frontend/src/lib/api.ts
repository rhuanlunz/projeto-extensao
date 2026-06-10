import { showErrorMessage } from "@/wrappers/sonnerWrapper";

const BASE_URL = "http://localhost:8000/api/v1";

interface RequestOptions extends RequestInit {
  params?: Record<string, string>;
}

export async function apiFetch(endpoint: string, options: RequestOptions = {}) {
  const { params, headers, ...rest } = options;
  
  const url = new URL(`${BASE_URL}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`);
  if (params) {
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
  }

  const token = localStorage.getItem("access_token");
  
  const defaultHeaders: Record<string, string> = {
    "Accept": "application/json",
    "Content-Type": "application/json",
  };

  if (token) {
    defaultHeaders["Authorization"] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url.toString(), {
      ...rest,
      headers: {
        ...defaultHeaders,
        ...headers,
      },
    });

    if (response.status === 401) {
      localStorage.removeItem("access_token");
      window.location.href = "/autenticacao/login";
      return null;
    }

    const data = await response.json();

    if (!response.ok) {
      return data;
    }

    return data;
  } catch (error) {
    showErrorMessage("Erro de conexão com o servidor.");
    throw error;
  }
}
