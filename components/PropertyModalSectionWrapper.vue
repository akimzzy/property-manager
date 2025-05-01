<template>
  <div
    class="mb-6 p-6 pt-8 border-2 border-blue-200 bg-white rounded-3xl relative"
  >
    <h3
      class="text-[10px] py-1 px-3 rounded-xl bg-blue-500 text-white border-blue-200 mb-4 absolute -top-3 border-2 left-10"
    >
      {{ propes.title }}
    </h3>
    <slot />
  </div>
</template>

<script lang="ts" setup>
const propes = defineProps({
  title: String,
});
</script>

<style></style>
