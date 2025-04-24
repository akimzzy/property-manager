<template>
  <div class="space-y-2">
    <textarea
      :value="modelValue"
      @input="
        $emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)
      "
      :rows="rows"
      :placeholder="placeholder"
      class="block w-full rounded-lg border-gray-300 border outline-none text-sm resize-none p-1 bg-white"
    ></textarea>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string;
  rows?: number;
  placeholder?: string;
}>();

defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();
</script>
