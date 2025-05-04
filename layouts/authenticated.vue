<template>
  <div class="flex flex-col min-h-screen py-10 bg-gray-50">
    <AppHeader />
    <div
      class="flex-grow max-w-[1450px] mx-auto px-4 sm:px-0 mb-10 w-full flex flex-col"
    >
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
// This layout is used for authenticated pages only
</script>
