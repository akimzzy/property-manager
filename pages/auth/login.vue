<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
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
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
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
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Password"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sign in
          </button>
        </div>

        <div class="flex items-center justify-center space-x-2">
          <button
            @click="signInWithGoogle"
            class="flex items-center justify-center px-2 py-1.5 border border-gray-300 rounded-md shadow-sm text-xs font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <img
              class="h-4 w-4 mr-1"
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google logo"
            />
            Google
          </button>
          <button
            @click="signInWithFacebook"
            class="flex items-center justify-center px-2 py-1.5 border border-gray-300 rounded-md shadow-sm text-xs font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <img
              class="h-4 w-4 mr-1"
              src="https://www.svgrepo.com/show/475647/facebook-color.svg"
              alt="Facebook logo"
            />
            Facebook
          </button>
          <button
            @click="signInWithApple"
            class="flex items-center justify-center px-2 py-1.5 border border-gray-300 rounded-md shadow-sm text-xs font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <img
              class="h-4 w-4 mr-1"
              src="https://www.svgrepo.com/show/475631/apple-color.svg"
              alt="Apple logo"
            />
            Apple
          </button>
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
import { ref } from "vue";
import { useRouter } from "vue-router";

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
