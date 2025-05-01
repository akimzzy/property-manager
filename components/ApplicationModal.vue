<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50"
  >
    <div class="bg-white rounded-lg shadow-xl w-full max-w-2xl">
      <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="text-lg font-medium text-gray-900">Rental Application</h3>
      </div>

      <form @submit.prevent="submitApplication" class="px-6 py-4">
        <div class="space-y-4">
          <!-- Basic Information -->
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700"
              >Full Name</label
            >
            <input
              type="text"
              id="name"
              v-model="form.name"
              required
              class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label for="email" class="block text-sm font-medium text-gray-700"
              >Email</label
            >
            <input
              type="email"
              id="email"
              v-model="form.email"
              required
              class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label for="phone" class="block text-sm font-medium text-gray-700"
              >Phone Number</label
            >
            <input
              type="tel"
              id="phone"
              v-model="form.phone"
              required
              class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              for="monthlyIncome"
              class="block text-sm font-medium text-gray-700"
              >Monthly Income (₦)</label
            >
            <input
              type="number"
              id="monthlyIncome"
              v-model.number="form.monthlyIncome"
              required
              min="0"
              class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              for="proposalLetter"
              class="block text-sm font-medium text-gray-700"
              >Proposal Letter (Optional)</label
            >
            <textarea
              id="proposalLetter"
              v-model="form.proposalLetter"
              rows="4"
              class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Write a brief letter to the landlord explaining why you would be a great tenant..."
            ></textarea>
          </div>
        </div>

        <div class="mt-6 flex justify-end space-x-3">
          <button
            type="button"
            @click="closeModal"
            class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit Application
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from "vue";

const emit = defineEmits(["close", "submit"]);

const props = defineProps<{
  isOpen: boolean;
  propertyId: number;
}>();

const form = ref({
  name: "",
  email: "",
  phone: "",
  monthlyIncome: 0,
  proposalLetter: "",
});

const submitApplication = () => {
  emit("submit", {
    ...form.value,
    propertyId: props.propertyId,
    submittedAt: new Date().toISOString(),
    status: "pending",
  });
  closeModal();
};

const closeModal = () => {
  form.value = {
    name: "",
    email: "",
    phone: "",
    monthlyIncome: 0,
    proposalLetter: "",
  };
  emit("close");
};
</script>
