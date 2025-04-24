<template>
  <div class="flex flex-col min-h-screen py-10">
    <AppHeader v-if="$route.path !== '/' && $route.path !== '/auth/login'" />
    <div
      class="flex-grow max-w-[1450px] mx-auto px-4 sm:px-0 mb-10 w-full flex flex-col"
    >
      <slot class="w-full" />
    </div>
  </div>
</template>

<script setup lang="ts">
// The layout will automatically include the AppHeader component
</script>
