<template>
  <div
    :class="[
      'rounded-full bg-gray-100 flex items-center justify-center text-gray-600',
      size === 'sm'
        ? 'h-8 w-8 text-sm'
        : size === 'md'
        ? 'h-10 w-10 text-lg'
        : 'h-12 w-12 text-xl',
      className,
    ]"
  >
    {{ getInitials(username) }}
  </div>
</template>

<script setup lang="ts">
defineProps<{
  username: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}>();

const getInitials = (name: string) => {
  return name.charAt(0).toUpperCase();
};
</script>
