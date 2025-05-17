<template>
  <div
    class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-sm w-full space-y-8">
      <div class="flex flex-col items-center">
        <NuxtLink
          to="/dashboard"
          class="flex-shrink-0 flex items-center size-8 ring-3 ring-blue-400 rounded-full bg-blue-600"
        >
        </NuxtLink>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="handleSubmit">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="name" class="sr-only">Full name</label>
            <input
              id="name"
              v-model="name"
              name="name"
              type="text"
              required
              class="appearance-none rounded-none relative block w-full p-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Full name"
            />
          </div>
          <div>
            <label for="email" class="sr-only">Email address</label>
            <input
              id="email"
              v-model="email"
              name="email"
              type="email"
              required
              class="appearance-none rounded-none relative block w-full p-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
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
              class="appearance-none rounded-none relative block w-full p-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Password"
            />
          </div>
          <!-- <div>
            <label for="role" class="sr-only">Role</label>
            <select
              id="role"
              v-model="role"
              name="role"
              required
              class="appearance-none rounded-none relative block w-full p-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            >
              <option value="">Select your role</option>
              <option value="TENANT">Tenant</option>
              <option value="LANDLORD">Landlord</option>
              <option value="PROPERTY_MANAGER">Manager</option>
            </select>
          </div> -->
        </div>

        <!-- <div class="flex items-center">
          <input
            id="enable-mfa"
            v-model="enableMfa"
            name="enable-mfa"
            type="checkbox"
            class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label for="enable-mfa" class="ml-2 block text-sm text-gray-900">
            Enable Multi-Factor Authentication
          </label>
        </div> -->

        <div class="text-center">
          <UiButton
            type="submit"
            variant="primary"
            size="md"
            class="w-full flex justify-center"
          >
            Sign up
          </UiButton>
        </div>
      </form>

      <p class="mt-2 text-center text-sm text-gray-600">
        Already have an account?
        <NuxtLink
          to="/auth/login"
          class="font-medium text-indigo-600 hover:text-indigo-500"
        >
          Sign in
        </NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { User } from "~/types";

const { $api } = useNuxtApp();
const { login } = useDecodedAuth();
const name = ref("");
const email = ref("");
const password = ref("");
const router = useRouter();
const loading = ref(false);
const errorMsg = ref("");

async function handleSubmit() {
  loading.value = true;
  errorMsg.value = "";
  try {
    const data = await $api<{ access_token: string; user: User }>(
      "/auth/register",
      {
        method: "POST",
        body: {
          name: name.value,
          email: email.value,
          password: password.value,
        },
      }
    );

    if (data && data.access_token) {
      login({
        access_token: data.access_token,
        account: "manager",
      });
    } else {
      errorMsg.value = "Invalid response from server.";
    }
  } catch (err: any) {
    errorMsg.value = err?.message || "Registration failed.";
  } finally {
    loading.value = false;
  }
}
</script>
