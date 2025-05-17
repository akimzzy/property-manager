<template>
  <button
    @click="handleClick"
    class="inline-flex items-center px-2 py-1 border border-transparent text-sm font-medium text-black bg-transparent rounded-full hover:text-gray-500 focus:outline-none gap-1 cursor-pointer"
  >
    <UiArrowIcon class="" />
    <slot>Back</slot>
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{
  page?: string;
}>();

import { useRouter } from "vue-router";
const router = useRouter();

function handleClick() {
  if (props.page) navigateTo(props.page);
  else router.back();
}
</script>
