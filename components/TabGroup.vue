<template>
  <div>
    <!-- Tabs Navigation -->
    <div class="border-b border-gray-200">
      <nav class="-mb-px flex space-x-8" :aria-label="ariaLabel">
        <button
          v-for="tab in tabs"
          :key="tab.value"
          @click="$emit('update:modelValue', tab.value)"
          :class="[
            modelValue === tab.value
              ? 'border-indigo-500 text-indigo-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
            'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center',
          ]"
        >
          {{ tab.name }}
          <span
            v-if="tab.count"
            class="ml-2 bg-gray-100 text-gray-900 py-0.5 px-2 rounded-full text-xs"
          >
            {{ tab.count }}
          </span>
        </button>
      </nav>
    </div>

    <!-- Tab Content -->
    <div class="mt-6">
      <slot></slot>
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
