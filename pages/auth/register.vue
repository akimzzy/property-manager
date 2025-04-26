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
          <div>
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
          </div>
        </div>

        <div class="flex items-center">
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
        </div>

        <div class="text-center">
          <Button
            type="submit"
            variant="primary"
            size="md"
            class="w-full flex justify-center"
          >
            Sign up
          </Button>
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
import Button from "~/components/ui/Button.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const name = ref("");
const email = ref("");
const password = ref("");
const role = ref("");
const enableMfa = ref(false);

const handleSubmit = async () => {
  try {
    // Simulate registration by storing user data in localStorage
    const newUser = {
      name: name.value,
      email: email.value,
      role: role.value,
      mfaEnabled: enableMfa.value,
      isAuthenticated: true,
      registrationTime: new Date().toISOString(),
    };

    // Store the new user in localStorage
    localStorage.setItem("user", JSON.stringify(newUser));

    // Redirect to dashboard after successful registration
    await router.push("/dashboard");
  } catch (error) {
    console.error("Registration failed:", error);
    alert("An error occurred during registration.");
  }
};
</script>
