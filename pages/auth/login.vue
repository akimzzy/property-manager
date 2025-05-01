<template>
  <div class="flex items-center justify-center min-h-screen">
    <div class="max-w-sm w-full space-y-8">
      <div class="flex flex-col items-center">
        <NuxtLink
          to="/dashboard"
          class="flex-shrink-0 flex items-center size-8 ring-3 ring-blue-400 rounded-full bg-blue-600"
        >
        </NuxtLink>
        <h2 class="mt-6 text-center text-2xl font-bold text-gray-900">
          Sign in to your account
        </h2>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="handleSubmit">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="email" class="sr-only">Email address</label>
            <input
              id="email"
              v-model="email"
              name="email"
              type="email"
              required
              class="appearance-none rounded-none relative block w-full p-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Email address"
            />
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input
              id="password"
              v-model="password"
              name="password"
              type="password"
              required
              class="appearance-none rounded-none relative block w-full p-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Password"
            />
          </div>
        </div>

        <div class="text-center">
          <Button
            type="submit"
            variant="primary"
            size="md"
            class="w-full flex justify-center w-full"
          >
            Sign in
          </Button>
        </div>

        <div class="flex items-center justify-center space-x-2">
          <Button
            @click="signInWithGoogle"
            variant="secondary"
            size="sm"
            class="flex items-center justify-center px-2 py-1.5 border border-gray-300 rounded-md shadow-sm text-xs font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <img
              class="h-4 w-4 mr-1"
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google logo"
            />
            Google
          </Button>
          <Button
            @click="signInWithFacebook"
            variant="secondary"
            size="sm"
            class="flex items-center justify-center px-2 py-1.5 border border-gray-300 rounded-md shadow-sm text-xs font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <img
              class="h-4 w-4 mr-1"
              src="https://www.svgrepo.com/show/475647/facebook-color.svg"
              alt="Facebook logo"
            />
            Facebook
          </Button>
          <Button
            @click="signInWithApple"
            variant="secondary"
            size="sm"
            class="flex items-center justify-center px-2 py-1.5 border border-gray-300 rounded-md shadow-sm text-xs font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <img
              class="h-4 w-4 mr-1"
              src="https://www.svgrepo.com/show/475631/apple-color.svg"
              alt="Apple logo"
            />
            Apple
          </Button>
        </div>
      </form>

      <p class="mt-2 text-center text-sm text-gray-600">
        Don't have an account?
        <NuxtLink
          to="/auth/register"
          class="font-medium text-indigo-600 hover:text-indigo-500"
        >
          Sign up
        </NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from "~/components/ui/Button.vue";
const router = useRouter();
const email = ref("");
const password = ref("");

import { mockUsers } from "~/data/mockUsers";

const handleSubmit = async () => {
  try {
    const user = mockUsers.find(
      (u) => u.email === email.value && u.password === password.value
    );

    if (user) {
      // Store user session in localStorage with more details including role
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: user.name,
          email: user.email,
          role: user.role,
          isAuthenticated: true,
          loginTime: new Date().toISOString(),
        })
      );
      await router.push("/dashboard");
    } else {
      alert("Invalid credentials. Please try again.");
    }
  } catch (error) {
    console.error("Login failed:", error);
    alert("An error occurred during login.");
  }
};

const signInWithGoogle = () => {
  alert("Google sign-in is not available in prototype mode.");
};

const signInWithFacebook = () => {
  alert("Facebook sign-in is not available in prototype mode.");
};

const signInWithApple = () => {
  alert("Apple sign-in is not available in prototype mode.");
};
</script>
