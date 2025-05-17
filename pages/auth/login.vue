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

        <div class="text-center w-full bg-green-100">
          <UiButton
            type="submit"
            variant="primary"
            size="md"
            class="w-full flex justify-center w-full"
          >
            Sign in
          </UiButton>
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
import { type User } from "~/types";

const { $api } = useNuxtApp();

const email = ref("");
const password = ref("");

const loading = ref(false);
const errorMsg = ref("");

const { login } = useDecodedAuth();

async function handleSubmit() {
  loading.value = true;
  errorMsg.value = "";
  try {
    const data = await $api<{ access_token: string; user: User }>(
      "/auth/login",
      {
        method: "POST",
        body: { email: email.value, password: password.value },
      }
    );

    if (data?.access_token) {
      login({
        access_token: data.access_token,
        account: "manager",
      });
    } else {
      errorMsg.value = "Invalid response from server.";
    }
  } catch (err: any) {
    errorMsg.value = err?.message || "Login failed.";
  } finally {
    loading.value = false;
  }
}
</script>
