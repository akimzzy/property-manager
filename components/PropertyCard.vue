<template>
  <div class="bg-white overflow-hidden shadow rounded-lg flex flex-col h-full">
    <div class="relative w-full h-48">
      <ImageCarousel
        :images="property.images"
        :alt-text="property.title"
        :show-dots="false"
        :show-image-count="true"
        class="h-full w-full object-cover"
      />
    </div>
    <div class="p-6 flex-1 flex flex-col">
      <div class="flex justify-between items-start mb-4">
        <h3 class="text-lg font-medium text-gray-900 line-clamp-2">
          {{ property.title }}
        </h3>
        <StatusBadge :status="property.available ? 'available' : 'rented'" />
      </div>
      <p class="text-xl font-semibold text-gray-900 mb-2">
        ${{ property.price }}/month
      </p>
      <p class="text-sm text-gray-500 mb-2">
        {{ property.street }}, {{ property.city }}, {{ property.state }}
        {{ property.zipCode }}
      </p>
      <p class="text-sm text-gray-500 line-clamp-2 mb-4">
        {{ property.description }}
      </p>
      <div class="mt-auto flex justify-between items-center">
        <NuxtLink
          :to="`/property/${property.id}`"
          class="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
        >
          View Details
        </NuxtLink>
        <button
          v-if="isLandlord"
          @click="$emit('edit', property)"
          class="text-blue-600 hover:text-blue-900 text-sm font-medium flex items-center"
        >
          <svg
            class="h-4 w-4 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
          Edit
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  property: {
    type: Object,
    required: true,
  },
  isLandlord: {
    type: Boolean,
    default: false,
  },
});

defineEmits(["edit"]);
</script>
