import { useFetch } from "nuxt/app";
import { useCookie } from "#app";

interface ApiOptions<T> {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: any;
  params?: Record<string, any>;
  headers?: Record<string, string>;
  baseURL?: string;
  token?: string;
  onRequest?: (options: any) => void;
  onResponse?: (response: any) => void;
  onError?: (error: any) => void;
}

const defaultBaseURL = process.env.NUXT_PUBLIC_API_BASE_URL;

export function useApi<T = any>(url: string, options: ApiOptions<T> = {}) {
  const token =
    options.token ||
    (typeof window !== "undefined"
      ? useCookie && useCookie("access_token").value
      : null);
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const fetchOptions: any = {
    method: options.method || "GET",
    baseURL: options.baseURL || defaultBaseURL,
    headers,
    params: options.params,
    body: options.body,
    onRequest: options.onRequest,
    onResponse: options.onResponse,
    onRequestError: options.onError,
    onResponseError: options.onError,
  };

  // Remove undefined keys
  Object.keys(fetchOptions).forEach((key) => {
    if (fetchOptions[key] === undefined) delete fetchOptions[key];
  });

  return useFetch<T>(url, fetchOptions);
}

// Helper methods for convenience
export function useApiGet<T = any>(url: string, options: ApiOptions<T> = {}) {
  return useApi<T>(url, { ...options, method: "GET" });
}

export function useApiPost<T = any>(
  url: string,
  body?: any,
  options: ApiOptions<T> = {}
) {
  return useApi<T>(url, { ...options, method: "POST", body });
}

export function useApiPut<T = any>(
  url: string,
  body?: any,
  options: ApiOptions<T> = {}
) {
  return useApi<T>(url, { ...options, method: "PUT", body });
}

export function useApiDelete<T = any>(
  url: string,
  options: ApiOptions<T> = {}
) {
  return useApi<T>(url, { ...options, method: "DELETE" });
}
