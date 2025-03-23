import { defineNuxtRouteMiddleware, navigateTo } from "#app";

export default defineNuxtRouteMiddleware((to) => {
  // Only run on client-side
  if (import.meta.client) {
    const user = localStorage.getItem("user");

    // If user is not authenticated and trying to access protected routes
    if (!user && !to.path.startsWith("/auth/")) {
      return navigateTo("/auth/login");
    }

    // If user is authenticated and trying to access auth pages
    if (user && to.path.startsWith("/auth/")) {
      return navigateTo("/dashboard");
    }
  }
});
