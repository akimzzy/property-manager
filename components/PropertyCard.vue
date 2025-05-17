<template>
  <NuxtLink
    :to="`/property/${property.id}`"
    class="relative overflow-hidden rounded-2xl transition-shadow duration-200"
  >
    <div
      style="height: 12rem; min-height: 12rem; max-height: 12rem"
      class="w-full rounded-2xl overflow-hidden relative"
    >
      <img
        v-if="property.images[0]"
        :src="property.images[0]"
        :alt="property.title"
        class="w-full object-cover h-full"
      />
      <div
        class="w-full h-full flex items-center justify-center text-gray-400 bg-gray-100"
        v-else
      >
        <UiImageIcon class="size-14" />
      </div>
      <div
        class="text-sm font-semibold w-full flex justify-center absolute bottom-0"
      >
        <span class="p-1.5 text-xs bg-black/70 text-white px-2.5 rounded-t-lg">
          ₦{{ property.price }}/m
        </span>
      </div>

      <div
        v-if="property.images.length > 1"
        class="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded-full text-xs"
      >
        {{ property.images.length }}
      </div>
    </div>

    <!-- <div class="absolute top-2 left-2 text-white rounded-full">
      <StatusBadge :status="property.available ? 'available' : 'draft'" />
    </div> -->
    <div class="w-full flex flex-col items-center my-2">
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
</template>

<script setup lang="ts">
import { type Property } from "~/types";

defineProps<{
  property: Property;
  isLandlord?: boolean;
}>();

defineEmits(["edit"]);
</script>
