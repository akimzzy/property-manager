<template>
  <div class="relative h-full">
    <div class="overflow-hidden h-full">
      <div
        class="absolute inset-0 flex transition-transform duration-500 ease-in-out"
        :style="{
          transform: `translateX(-${currentIndex * 100}%)`,
        }"
      >
        <img
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
