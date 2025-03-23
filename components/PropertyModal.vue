<template>
  <div v-if="show" class="fixed inset-0 z-10 overflow-y-auto">
    <div
      class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0"
    >
      <div class="fixed inset-0 transition-opacity" aria-hidden="true">
        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>

      <div
        class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full"
      >
        <form @submit.prevent="handleSubmit">
          <div
            class="bg-white sticky top-0 z-10 px-4 pt-5 pb-4 sm:p-6 sm:pb-4 border-b border-gray-200"
          >
            <h2 class="text-2xl font-bold text-gray-900">
              {{ property ? "Edit Property" : "Create Property" }}
            </h2>
          </div>
          <div
            class="bg-white px-4 sm:px-6 py-4 max-h-[calc(90vh-180px)] overflow-y-auto"
          >
            <div class="mb-4">
              <label for="title" class="block text-sm font-medium text-gray-700"
                >Title</label
              >
              <input
                type="text"
                id="title"
                v-model="form.title"
                required
                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div class="mb-4">
              <label
                for="description"
                class="block text-sm font-medium text-gray-700"
                >Description</label
              >
              <textarea
                id="description"
                v-model="form.description"
                rows="3"
                required
                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              ></textarea>
            </div>

            <div class="mb-4">
              <label for="price" class="block text-sm font-medium text-gray-700"
                >Monthly Rent ($)</label
              >
              <input
                type="number"
                id="price"
                v-model.number="form.price"
                required
                min="0"
                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div class="mb-4">
              <label
                for="street"
                class="block text-sm font-medium text-gray-700"
                >Street Address</label
              >
              <input
                type="text"
                id="street"
                v-model="form.street"
                required
                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div class="mb-4">
                <label
                  for="city"
                  class="block text-sm font-medium text-gray-700"
                  >City</label
                >
                <input
                  type="text"
                  id="city"
                  v-model="form.city"
                  required
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div class="mb-4">
                <label
                  for="state"
                  class="block text-sm font-medium text-gray-700"
                  >State</label
                >
                <input
                  type="text"
                  id="state"
                  v-model="form.state"
                  required
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div class="mb-4">
              <label
                for="zipCode"
                class="block text-sm font-medium text-gray-700"
                >ZIP Code</label
              >
              <input
                type="text"
                id="zipCode"
                v-model="form.zipCode"
                required
                pattern="[0-9]{5}"
                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700"
                >Images</label
              >
              <div
                class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"
                @drop.prevent="handleDrop"
                @dragover.prevent
              >
                <div class="space-y-1 text-center">
                  <svg
                    class="mx-auto h-12 w-12 text-gray-400"
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
                  <div class="flex text-sm text-gray-600">
                    <label
                      for="file-upload"
                      class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        type="file"
                        multiple
                        accept="image/*"
                        class="sr-only"
                        @change="handleFileInput"
                      />
                    </label>
                    <p class="pl-1">or drag and drop</p>
                  </div>
                  <p class="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>

              <div
                v-if="form.images.length > 0"
                class="mt-4 grid grid-cols-3 gap-4"
              >
                <div
                  v-for="(image, index) in form.images"
                  :key="index"
                  class="relative group"
                >
                  <img
                    :src="image"
                    class="h-24 w-full object-cover rounded-md"
                    alt="Property image"
                  />
                  <button
                    type="button"
                    @click="removeImage(index)"
                    class="absolute top-0 right-0 hidden group-hover:block p-1 bg-red-500 text-white rounded-full transform translate-x-1/2 -translate-y-1/2"
                  >
                    <svg
                      class="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div class="flex items-center">
              <input
                type="checkbox"
                id="available"
                v-model="form.available"
                class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label for="available" class="ml-2 block text-sm text-gray-900"
                >Available for Rent</label
              >
            </div>
          </div>

          <div
            class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse sticky bottom-0"
          >
            <button
              type="submit"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              {{ property ? "Save Changes" : "Add Property" }}
            </button>
            <button
              type="button"
              @click="closeModal"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

interface Property {
  id: number;
  title: string;
  description: string;
  price: number;
  images: string[];
  available: boolean;
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

const props = defineProps<{
  show: boolean;
  property?: Property;
}>();

const emit = defineEmits<{
  (e: "update:show", value: boolean): void;
  (e: "submit", property: Omit<Property, "id">): void;
}>();

const form = ref({
  title: "",
  description: "",
  price: 0,
  images: [] as string[],
  available: true,
  street: "",
  city: "",
  state: "",
  zipCode: "",
});

watch(
  () => props.property,
  (newProperty) => {
    if (newProperty) {
      form.value = { ...newProperty };
    } else {
      resetForm();
    }
  },
  { immediate: true }
);

function resetForm() {
  form.value = {
    title: "",
    description: "",
    price: 0,
    images: [],
    available: true,
    street: "",
    city: "",
    state: "",
    zipCode: "",
  };
}

function handleSubmit() {
  emit("submit", { ...form.value });
  closeModal();
}

function closeModal() {
  emit("update:show", false);
  if (!props.property) {
    resetForm();
  }
}

function handleFileInput(event: Event) {
  const fileInput = event.target as HTMLInputElement;
  if (fileInput.files) {
    Array.from(fileInput.files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          form.value.images.push(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    });
  }
}

function handleDrop(event: DragEvent) {
  const files = event.dataTransfer?.files;
  if (files) {
    Array.from(files).forEach((file) => {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            form.value.images.push(e.target.result as string);
          }
        };
        reader.readAsDataURL(file);
      }
    });
  }
}

function removeImage(index: number) {
  form.value.images.splice(index, 1);
}
</script>
