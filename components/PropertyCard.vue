<template>
  <NuxtLink
    :to="`/property/${property.id}`"
    class="relative overflow-hidden shadow rounded-2xl h-[300px] hover:shadow-lg transition-shadow duration-200"
  >
    <img
      :src="property.images[0]"
      :alt="property.title"
      class="h-full w-full object-cover"
    />
    <div
      v-if="property.images.length > 1"
      class="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded-full text-xs"
    >
      {{ property.images.length }}
    </div>
    <div class="absolute top-2 left-2 text-white rounded-full">
      <StatusBadge :status="property.available ? 'available' : 'rented'" />
    </div>
    <div
      class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6"
    >
      <div class="flex justify-between items-start mb-1">
        <h3 class="text-sm font-medium text-white line-clamp-2">
          {{ property.title }}
        </h3>
        <p class="text-sm font-semibold text-white">${{ property.price }}/m</p>
      </div>

      <p class="text-xs text-gray-300">
        {{ property.city }}
      </p>
    </div>
  </NuxtLink>
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
