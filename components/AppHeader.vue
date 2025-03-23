<template>
  <nav class="bg-white shadow mb-6">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex items-center">
          <NuxtLink to="/dashboard" class="flex-shrink-0 flex items-center">
            <svg
              class="h-8 w-8 text-indigo-600 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            <!-- <h1 class="text-xl font-bold text-gray-900">Property Manager</h1> -->
          </NuxtLink>
        </div>
        <div class="flex items-center">
          <div class="mr-4 text-sm text-gray-600">
            <span class="font-medium">{{ userEmail }}</span>
            <span class="mx-2 text-gray-400">|</span>
            <span class="text-gray-500">{{ userRole }}</span>
          </div>
          <button
            @click="handleLogout"
            class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
const userRole = ref<string>("");
const userEmail = ref<string>("");

const formatRole = (role: string): string => {
  switch (role) {
    case "PROPERTY_MANAGER":
      return "Property Manager";
    case "TENANT":
      return "Tenant";
    default:
      return role;
  }
};

onMounted(() => {
  const userData = localStorage.getItem("user");
  if (userData) {
    const user = JSON.parse(userData);
    userRole.value = formatRole(user.role);
    userEmail.value = user.email;
  }
});

const handleLogout = () => {
  localStorage.removeItem("user");
  navigateTo("/auth/login");
};
</script>
