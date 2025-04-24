<template>
  <div>
    <!-- Tabs Navigation -->
    <div class="flex gap-2">
      <button
        v-for="tab in tabs"
        :key="tab.value"
        @click="$emit('update:modelValue', tab.value)"
        :class="[
          'px-4 py-2 rounded-2xl cursor-pointer text-sm font-medium transition-colors duration-200',
          modelValue === tab.value
            ? 'bg-blue-500 text-white'
            : 'bg-white text-gray-700 hover:bg-gray-100',
        ]"
      >
        {{ tab.name }}
        <span
          v-if="tab.count"
          class="ml-2 bg-gray-100 text-gray-900 py-0.5 px-2 rounded-full text-xs"
          :class="{ 'bg-white/20 text-white': modelValue === tab.value }"
        >
          {{ tab.count }}
        </span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Tab {
  name: string;
  value: string;
  count?: number;
}

defineProps<{
  modelValue: string;
  tabs: Tab[];
  ariaLabel?: string;
}>();

defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();
</script>
