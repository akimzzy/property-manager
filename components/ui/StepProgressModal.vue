<template>
  <transition name="fade-slide">
    <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div class="bg-white rounded-2xl shadow-xl w-full max-w-md mx-auto overflow-hidden">
        <!-- Header with Progress Bar -->
        <div class="px-6 pt-6 pb-2">
          <div class="flex items-center justify-between mb-2">
            <h3 class="font-semibold text-lg">{{ title }}</h3>
            <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600 focus:outline-none">
              <span class="sr-only">Close</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div class="flex items-center justify-between mb-1">
            <span class="text-sm font-medium text-gray-700">{{ steps[currentStep]?.label || '' }}</span>
            <span class="text-xs text-gray-500">{{ currentStep + 1 }}/{{ steps.length }}</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2 mb-2">
            <div
              class="bg-indigo-600 h-2 rounded-full transition-all duration-300"
              :style="{ width: ((currentStep + 1) / steps.length * 100) + '%' }"
            ></div>
          </div>
        </div>

        <!-- Steps List -->
        <div class="px-6 pb-4">
          <ul class="space-y-2">
            <li v-for="(step, idx) in steps" :key="step.label" class="flex items-center group">
              <span class="mr-3">
                <template v-if="idx < currentStep">
                  <svg class="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                </template>
                <template v-else-if="idx === currentStep">
                  <svg class="h-5 w-5 text-indigo-500 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                  </svg>
                </template>
                <template v-else>
                  <svg class="h-5 w-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                    <circle cx="10" cy="10" r="8" />
                  </svg>
                </template>
              </span>
              <span
                class="text-sm"
                :class="{
                  'text-gray-900': idx <= currentStep,
                  'text-gray-400': idx > currentStep,
                  'cursor-pointer': step.tooltip
                }"
                v-tooltip="step.tooltip"
              >
                {{ step.label }}
                <span v-if="step.tooltip" class="ml-1 align-middle">
                  <svg class="inline h-4 w-4 text-gray-400 hover:text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M18 10A8 8 0 11 2 10a8 8 0 0116 0zm-8 4a1 1 0 100-2 1 1 0 000 2zm1-7V7a1 1 0 10-2 0v2a1 1 0 001 1h1a1 1 0 100-2h-1z" />
                  </svg>
                </span>
              </span>
            </li>
          </ul>
        </div>

        <!-- Step Content Slot -->
        <div class="px-6 pb-6">
          <slot :step="steps[currentStep]" :currentStep="currentStep"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { defineProps, withDefaults } from 'vue';

interface Step {
  label: string;
  tooltip?: string;
}

withDefaults(defineProps<{
  isOpen: boolean;
  steps: Step[];
  currentStep: number;
  title?: string;
}>(), {
  title: 'Getting Started',
});
</script>

<style scoped>
.fade-slide-enter-active, .fade-slide-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}
.fade-slide-enter-from, .fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
.fade-slide-enter-to, .fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>

<!--
USAGE EXAMPLE:
<StepProgressModal
  :is-open="modalOpen"
  :steps="[
    { label: 'Set your first Company', tooltip: '' },
    { label: 'Connect your Twilio account', tooltip: 'Connect your Twilio account' },
    { label: 'Add a Phone Number', tooltip: 'Add a phone number after Twilio' },
    { label: 'Adjust Your Preferences', tooltip: '' },
  ]"
  :current-step="1"
  @close="modalOpen = false"
>
  <template #default="{ step, currentStep }">
    <!-- Custom content for each step here -->
    <div class="text-center text-gray-500">Step {{ currentStep + 1 }} content goes here.</div>
  </template>
</StepProgressModal>
-->