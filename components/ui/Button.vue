<template>
  <button
    :class="[
      'inline-flex items-center font-medium focus:outline-none focus:ring-1 focus:ring-offset-1 cursor-pointer rounded-lg',
      variant === 'primary'
        ? 'border-transparent text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
        : variant === 'secondary'
        ? 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:ring-blue-500'
        : 'text-blue-600 hover:text-blue-800',
      size === 'sm'
        ? 'px-4 py-2 text-xs'
        : size === 'md'
        ? 'px-3 py-2.5 text-xs'
        : 'px-6 py-3 text-sm',
      className,
    ]"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
defineProps<{
  variant?: "primary" | "secondary" | "text";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  className?: string;
}>();

defineEmits<{
  (e: "click"): void;
}>();
</script>
