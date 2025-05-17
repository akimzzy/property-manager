import type { UseFetchOptions } from "nuxt/app";

export function useAPI<T>(
  url: string | (() => string),
  options?: UseFetchOptions<T>
) {
  return useFetch(url, {
    ...options,
    $fetch: useNuxtApp().$api as typeof $fetch,
  });
}

// // Helper methods for convenience
// export function useApiGet<T = any>(url: string, options: ApiOptions<T> = {}) {
//   return useAPI<T>(url, { ...options, method: "GET" });
// }

// export function useApiPost<T = any>(
//   url: string,
//   body?: any,
//   options: ApiOptions<T> = {}
// ) {
//   return useAPI<T>(url, { ...options, method: "POST", body });
// }

// export function useApiPut<T = any>(
//   url: string,
//   body?: any,
//   options: ApiOptions<T> = {}
// ) {
//   return useAPI<T>(url, { ...options, method: "PUT", body });
// }

// export function useApiDelete<T = any>(
//   url: string,
//   options: ApiOptions<T> = {}
// ) {
//   return useAPI<T>(url, { ...options, method: "DELETE" });
// }
