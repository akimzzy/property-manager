<template>
  <div
    class="bg-gradient-to-br from-blue-50 via-white to-blue-100 border border-blue-200 overflow-hidden rounded-3xl relative flex flex-col justify-between mb-6"
  >
    <div class="p-8 flex flex-col h-full justify-between">
      <div class="flex items-center">
        <div class="w-0 flex-1">
          <div class="flex items-center gap-4">
            <span class="text-lg font-medium text-gray-500 truncate">
              Properties
            </span>
            <span
              class="text-[10px] font-medium bg-blue-600 text-white size-8 flex justify-center items-center rounded-full ring-3 ring-blue-400"
            >
              {{ properties.length }}
            </span>
          </div>
        </div>
        <Button
          @click="openPropertyModal?.(null)"
          variant="primary"
          size="md"
          class="flex gap-1 items-center"
        >
          <svg
            class="size-4"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 5v14"></path>
            <path d="M5 12h14"></path>
          </svg>
          Add property
        </Button>
      </div>
      <div class="mt-4">
        <span class="text-xs text-gray-600 mb-4 inline-block"
          >Recent properties</span
        >
        <div
          class="flex gap-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-gray-50 rounded-2xl hide-scrollbar"
        >
          <div
            v-for="property in recentProperties"
            :key="property.id"
            class="flex-shrink-0 w-48 rounded-2xl hover:shadow-md transition-shadow duration-200 p-0 flex flex-col items-center overflow-hidden"
            style="min-width: 12rem; max-width: 12rem"
          >
            <NuxtLink
              :to="`/property/${property.id}`"
              class="w-full flex flex-col items-center p-0"
            >
              <img
                :src="
                  property.images && property.images.length
                    ? property.images[0]
                    : '/placeholder.png'
                "
                :alt="property.title"
                class="w-full aspect-square object-cover rounded-bl-2xl rounded-br-2xl bg-gray-100"
                style="height: 12rem; min-height: 12rem; max-height: 12rem"
              />
              <div class="w-full flex flex-col items-center my-3">
                <div
                  class="text-xs font-medium text-gray-900 line-clamp-2 w-full text-center"
                >
                  {{ property.title }}
                </div>
                <div class="text-xs text-gray-500 w-full text-center mt-0.5">
                  {{ property.city }}, {{ property.state }}
                </div>
              </div>
            </NuxtLink>
          </div>
          <div
            v-if="recentProperties.length === 0"
            class="flex-shrink-0 w-32 flex items-center justify-center text-xs text-gray-400 bg-white border border-gray-100 rounded-xl p-4"
            style="min-width: 8rem; max-width: 8rem"
          >
            No recent properties
          </div>
        </div>
        <div class="mt-2 flex space-x-2 justify-end">
          <NuxtLink
            to="/properties"
            class="text-xs text-blue-600 hover:underline"
            >View all properties</NuxtLink
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from "~/components/ui/Button.vue";
import { defineProps } from "vue";
import { NuxtLink } from "#components";
const props = defineProps<{
  properties: any[];
  recentProperties: any[];
  isPropertyManager: boolean;
  openPropertyModal?: (arg: any) => void;
}>();
</script>
