<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto">
    <div class="flex items-center justify-center min-h-screen p-4">
      <div
        class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        @click="$emit('close')"
      ></div>

      <div class="relative bg-white rounded-lg shadow-xl max-w-lg w-full">
        <div
          class="sticky top-0 z-10 bg-white px-4 py-5 sm:p-6 border-b border-gray-200"
        >
          <h3 class="text-lg font-medium text-gray-900">
            Submit Maintenance Request
          </h3>
        </div>
        <div class="px-4 sm:px-6 py-4 max-h-[calc(90vh-180px)] overflow-y-auto">
          <form @submit.prevent="handleSubmit" class="space-y-4">
            <div>
              <label for="title" class="block text-sm font-medium text-gray-700"
                >Title</label
              >
              <input
                type="text"
                id="title"
                v-model="form.title"
                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>

            <div>
              <label
                for="description"
                class="block text-sm font-medium text-gray-700"
                >Description</label
              >
              <textarea
                id="description"
                v-model="form.description"
                rows="4"
                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              ></textarea>
            </div>

            <div>
              <label
                for="priority"
                class="block text-sm font-medium text-gray-700"
                >Priority</label
              >
              <select
                id="priority"
                v-model="form.priority"
                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div class="mt-5 sm:mt-6 flex space-x-3">
              <button
                type="button"
                @click="$emit('close')"
                class="w-full justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="w-full justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Submit Request
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

interface Props {
  isOpen: boolean;
  propertyId: number;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: "close"): void;
  (e: "submit", request: any): void;
}>();

const form = ref({
  title: "",
  description: "",
  priority: "medium",
});

const handleSubmit = () => {
  const request = {
    ...form.value,
    propertyId: props.propertyId,
    status: "pending",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  emit("submit", request);
  emit("close");

  // Reset form
  form.value = {
    title: "",
    description: "",
    priority: "medium",
  };
};
</script>
