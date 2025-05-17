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
          </NuxtLink>
        </div>
        <div class="flex items-center">
          <div class="mr-4 text-xs text-gray-600">
            <span class="font-medium">
              <span v-if="userName">{{ userName }}</span>
              <span v-else>Guest</span>
            </span>
            <span class="mx-2 text-gray-400">|</span>
            <select
              v-model="userRole"
              class="text-gray-500 bg-transparent border-none focus:ring-0 cursor-pointer text-xs py-0 pl-0 pr-6"
            >
              <option value="manager">Manager</option>
              <option value="tenant">Tenant</option>
            </select>
          </div>
          <UiButton
            variant="primary"
            size="md"
            @click="handleLogout"
            className="ml-2"
          >
            Logout
          </UiButton>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
const { role } = useDecodedAuth();
const userRole = ref(role.value);
const userName = ref<string>("");

const { logout: handleLogout } = useDecodedAuth();
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

select {
  appearance: none;
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236B7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E");
  background-position: right 0 center;
  background-repeat: no-repeat;
  background-size: 1.2em 1.2em;
}
</style>
