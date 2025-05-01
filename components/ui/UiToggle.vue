<template>
  <button
    type="button"
    :aria-pressed="modelValue"
    :class="[
      'relative w-12 h-6 rounded-full transition-colors duration-200 focus:outline-none',
      modelValue ? 'bg-blue-600' : 'bg-gray-300',
      customClass,
    ]"
    @click="$emit('update:modelValue', !modelValue)"
  >
    <span
      :class="[
        'absolute left-1 top-1 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200',
        modelValue ? 'translate-x-6' : '',
      ]"
    ></span>
    <slot />
  </button>
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  customClass: {
    type: String,
    default: "",
  },
});
const emit = defineEmits(["update:modelValue"]);
</script>
