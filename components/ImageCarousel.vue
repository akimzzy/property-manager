<template>
  <div class="relative h-full">
    <div class="overflow-hidden h-full">
      <div
        class="absolute inset-0 flex transition-transform duration-500 ease-in-out"
        :style="{
          transform: `translateX(-${currentIndex * 100}%)`,
        }"
      >
        <div
          v-if="!images.length"
          class="h-full w-full bg-gray-100 flex justify-center items-center"
        >
          <UiButton size="md" variant="secondary" class="shadow">
            <svg
              class="mx-auto h-4 w-4 mr-2 text-gray-500"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Add images
          </UiButton>
        </div>

        <img
          v-else
          v-for="(image, index) in images"
          :key="index"
          :src="image"
          :alt="altText"
          class="w-full h-full object-cover flex-shrink-0"
        />
      </div>
      <div
        v-if="showImageCount"
        class="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-sm z-10"
      >
        {{ currentIndex + 1 }}/{{ images.length }}
      </div>
    </div>
    <div
      v-if="showDots"
      class="absolute bottom-4 left-0 right-0 flex justify-center space-x-2"
    >
      <button
        v-for="(_, index) in images"
        :key="index"
        @click="setCurrentIndex(index)"
        :class="{
          'bg-white': currentIndex === index,
          'bg-gray-400': currentIndex !== index,
        }"
        class="w-3 h-3 rounded-full"
      ></button>
    </div>
    <button
      v-if="images.length > 1"
      @click="prevImage"
      class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-1.5 rounded-full shadow-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      <span class="sr-only">Previous</span>
      <svg
        class="h-4 w-4 text-gray-800"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M15 19l-7-7 7-7"
        />
      </svg>
    </button>
    <button
      v-if="images.length > 1"
      @click="nextImage"
      class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-1.5 rounded-full shadow-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      <span class="sr-only">Next</span>
      <svg
        class="h-4 w-4 text-gray-800"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 5l7 7-7 7"
        />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

interface Props {
  images: string[];
  altText?: string;
  showDots?: boolean;
  showImageCount?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  altText: "",
  showDots: true,
  showImageCount: false,
});

const currentIndex = ref(0);

const setCurrentIndex = (index: number) => {
  currentIndex.value = index;
};

const prevImage = () => {
  currentIndex.value =
    (currentIndex.value - 1 + props.images.length) % props.images.length;
};

const nextImage = () => {
  currentIndex.value = (currentIndex.value + 1) % props.images.length;
};
</script>
