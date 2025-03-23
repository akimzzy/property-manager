<template>
  <span
    :class="{
      'bg-green-100 text-green-800': status === 'available',
      'bg-red-100 text-red-800': status === 'rented',
      'bg-yellow-100 text-yellow-800': status === 'pending',
      'bg-blue-100 text-blue-800': status === 'in_progress',
      'bg-gray-100 text-gray-800': !status,
    }"
    class="px-3 py-1 text-sm font-medium rounded-full"
  >
    {{ displayText || formatStatus(status) }}
  </span>
</template>

<script setup lang="ts">
interface Props {
  status: "available" | "rented" | "pending" | "in_progress" | string;
  displayText?: string;
}

defineProps<Props>();

const formatStatus = (status: string): string => {
  if (!status) return "Unknown";
  return status
    .split("_")
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");
};
</script>
