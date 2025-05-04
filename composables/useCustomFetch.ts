import { useRuntimeConfig } from "#app";
import { useCookie } from "#app";

export async function useCustomFetch<T = any>(
  url: string,
  options: {
    method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
    body?: any;
    params?: Record<string, any>;
    headers?: Record<string, string>;
    token?: string;
  } = {}
): Promise<T> {
  const config = useRuntimeConfig();
  const baseURL =
    config.public?.apiBaseUrl ||
    process.env.NUXT_PUBLIC_API_BASE_URL ||
    "http://localhost:3000";

  const token =
    options.token ||
    (typeof window !== "undefined"
      ? useCookie && useCookie("access_token").value
      : null);
  let headers: Record<string, string> = {
    ...(options.headers || {}),
  };
  // Only set Content-Type if not FormData
  const isFormData =
    typeof FormData !== "undefined" && options.body instanceof FormData;
  if (!isFormData) {
    headers["Content-Type"] = "application/json";
  }
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  let fullUrl = baseURL.replace(/\/$/, "") + "/" + url.replace(/^\//, "");
  if (options.params) {
    const query = new URLSearchParams(options.params).toString();
    fullUrl += `?${query}`;
  }
  try {
    const fetchOptions: Record<string, any> = {
      method: options.method || "GET",
      headers,
      baseURL,
    };
    if (isFormData) {
      fetchOptions.body = options.body;
    } else if (options.body) {
      fetchOptions.body = options.body;
    }
    if (options.params) {
      fetchOptions.params = options.params;
    }
    return await $fetch<T>(url, fetchOptions);
  } catch (error: any) {
    if (error && error.data) throw error.data;
    throw error;
  }
}

// Auth helpers
export async function loginApi(email: string, password: string) {
  return useCustomFetch("/auth/login", {
    method: "POST",
    body: { email, password },
  });
}

export async function registerApi(
  name: string,
  email: string,
  password: string
) {
  return useCustomFetch("/auth/register", {
    method: "POST",
    body: { name, email, password },
  });
}
