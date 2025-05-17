export default defineNuxtPlugin((nuxtApp) => {
  const { accessToken, logout } = useDecodedAuth();

  const config = useRuntimeConfig();

  const api = $fetch.create({
    baseURL: config.public.apiBaseUrl,
    onRequest({ request, options, error }) {
      if (accessToken.value) {
        // note that this relies on ofetch >= 1.4.0 - you may need to refresh your lockfile
        options.headers.set(
          "Authorization",
          `Bearer ${accessToken.value.access_token}`
        );
      }
    },
    async onResponseError({ response }) {
      console.log({ status: response.status });
      if (response.status === 401) {
        await nuxtApp.runWithContext(() => logout());
      }
    },
  });

  // Expose to useNuxtApp().$api
  return {
    provide: {
      api,
    },
  };
});
