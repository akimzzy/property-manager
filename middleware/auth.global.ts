import { defineNuxtRouteMiddleware, navigateTo, useCookie } from "#app";
import { useDecodedAuth } from "~/composables/useDecodedAuth";

export default defineNuxtRouteMiddleware((to) => {
  // Use cookies for SSR compatibility
  const { isValid } = useDecodedAuth();
  // console.log({ decoded: decoded.value, isValid: isValid.value });

  // Allow all users to access the home page
  if (to.path === "/") {
    return;
  }

  // If user is not authenticated and trying to access protected routes
  if (!isValid.value && !to.path.startsWith("/auth/")) {
    return navigateTo("/auth/login");
  }

  // If user is authenticated and trying to access auth pages
  if (isValid.value && to.path.startsWith("/auth/")) {
    return navigateTo("/dashboard");
  }
});
