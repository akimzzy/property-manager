<template>
  <button
    @click="router.back()"
    class="inline-flex items-center px-2 py-1 border border-transparent text-sm font-medium text-black bg-transparent rounded-full hover:text-gray-500 focus:outline-none gap-1 cursor-pointer"
  >
    <svg
      class="h-4 w-4 text-inherit"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fill-rule="evenodd"
        d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
        clip-rule="evenodd"
      />
    </svg>
    <slot>Back</slot>
  </button>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();
</script>
