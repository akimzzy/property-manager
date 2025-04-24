<template>
  <nav
    class="bg-white border-2 border-blue-500/50 mb-6 fixed bottom-0 left-0 right-0 mx-auto w-fit z-50 rounded-tr-none p-3 rounded-2xl"
  >
    <div class="mx-auto px-4 sm:px-0 w">
      <div class="flex justify-between">
        <div class="flex items-center mr-22">
          <NuxtLink
            to="/dashboard"
            class="flex-shrink-0 flex items-center h-6 w-6 ring-3 ring-blue-400 rounded-full bg-blue-600"
          >
            <!-- <h1 class="text-xl font-bold text-gray-900">Manager</h1> -->
          </NuxtLink>
        </div>
        <div class="flex items-center">
          <div class="mr-4 text-xs text-gray-600">
            <span class="font-medium">
              <span v-if="userName">{{ userName }}</span>
              <span v-else>Guest</span>
            </span>
            <span class="mx-2 text-gray-400">|</span>
            <span class="text-gray-500">{{ userRole }}</span>
          </div>
          <Button
            variant="primary"
            size="md"
            @click="handleLogout"
            className="ml-2"
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import Button from "./ui/Button.vue";
const userRole = ref<string>("");
const userName = ref<string>("");

const formatRole = (role: string): string => {
  switch (role) {
    case "PROPERTY_MANAGER":
      return "Manager";
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
    userName.value = user.name;
  }
});

const handleLogout = () => {
  localStorage.removeItem("user");
  navigateTo("/auth/login");
};
</script>

<style scoped>
nav {
  min-width: 320px;
  max-width: 100vw;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
}
</style>
