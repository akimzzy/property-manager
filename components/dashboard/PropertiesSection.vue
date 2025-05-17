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
              {{ properties?.length }}
            </span>
          </div>
        </div>
        <UiButton
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
        </UiButton>
      </div>
      <div class="mt-6">
        <span class="text-xs text-gray-600 mb-4 inline-block"
          >Recent properties</span
        >
        <div
          class="flex gap-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-gray-50 rounded-2xl hide-scrollbar"
        >
          <div
            style="min-width: 12rem; max-width: 12rem"
            v-for="property in recentProperties"
            :key="property.id"
          >
            <PropertyCard :property="property" :is-landlord="true" />
          </div>

          <div
            v-if="recentProperties.length === 0"
            class="flex-shrink-0 w-32 flex items-center justify-center text-xs text-gray-400 bg-white border border-gray-100 rounded-xl p-4"
            style="min-width: 8rem; max-width: 8rem"
          >
            No recent properties
          </div>
        </div>
        <div class="mt-4 flex space-x-2 justify-end">
          <NuxtLink
            to="/properties"
            class="text-xs text-blue-600 hover:underline flex gap-1"
            >View all properties
            <UiArrowIcon class="rotate-180" />
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type Property } from "~/types";

const props = defineProps<{
  properties: Property[] | null;
}>();

const openPropertyModal =
  inject<(propertyId: number | null) => void>("openPropertyModal");

const recentProperties = computed(() => {
  return [...(props.properties || [])]
    .sort((a, b) => {
      const dateA = new Date(a.updatedAt || a.createdAt).getTime();
      const dateB = new Date(b.updatedAt || b.createdAt).getTime();
      return dateB - dateA;
    })
    .slice(0, 5);
});
</script>
