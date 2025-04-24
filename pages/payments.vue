<template>
  <div class="py-10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="mb-6">
        <BackButton />
      </div>
      <h1 class="text-3xl font-bold leading-tight text-gray-900">
        Rent Collection & Payments
      </h1>
    </div>

    <main>
      <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <!-- Payment Overview -->
        <div class="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
          <div class="px-4 py-5 sm:px-6">
            <h2 class="text-lg font-medium text-gray-900">Payment Overview</h2>
            <div class="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-3">
              <div class="bg-gray-50 p-4 rounded-lg">
                <h3 class="text-sm font-medium text-gray-500">Total Due</h3>
                <p class="mt-1 text-2xl font-semibold text-gray-900">$24,500</p>
              </div>
              <div class="bg-gray-50 p-4 rounded-lg">
                <h3 class="text-sm font-medium text-gray-500">
                  Collected This Month
                </h3>
                <p class="mt-1 text-2xl font-semibold text-green-600">
                  $18,300
                </p>
              </div>
              <div class="bg-gray-50 p-4 rounded-lg">
                <h3 class="text-sm font-medium text-gray-500">
                  Outstanding Balance
                </h3>
                <p class="mt-1 text-2xl font-semibold text-red-600">$6,200</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Payment List -->
        <div class="bg-white shadow overflow-hidden sm:rounded-lg">
          <div class="px-4 py-5 sm:px-6 flex justify-between items-center">
            <h2 class="text-lg font-medium text-gray-900">Recent Payments</h2>
            <div class="flex space-x-4">
              <select
                v-model="statusFilter"
                class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="all">All Status</option>
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="overdue">Overdue</option>
              </select>
            </div>
          </div>
          <div class="border-t border-gray-200">
            <ul class="divide-y divide-gray-200">
              <li
                v-for="payment in filteredPayments"
                :key="payment.id"
                class="px-4 py-4"
              >
                <div class="flex items-center justify-between">
                  <div class="flex-1">
                    <div class="flex items-center justify-between">
                      <div>
                        <NuxtLink
                          :to="`/property/${payment.propertyId}`"
                          class="text-sm font-medium text-indigo-600 hover:text-indigo-900"
                        >
                          {{ payment.propertyName }}
                        </NuxtLink>
                        <p class="text-sm text-gray-500">
                          {{ payment.tenantName }}
                        </p>
                      </div>
                      <div class="ml-2 flex-shrink-0 flex">
                        <p
                          :class="{
                            'bg-green-100 text-green-800':
                              payment.status === 'paid',
                            'bg-yellow-100 text-yellow-800':
                              payment.status === 'pending',
                            'bg-red-100 text-red-800':
                              payment.status === 'overdue',
                          }"
                          class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                        >
                          {{ payment.status }}
                        </p>
                      </div>
                    </div>
                    <div class="mt-2">
                      <p class="text-sm text-gray-900">
                        Amount: ${{ payment.amount }}
                      </p>
                      <p class="text-sm text-gray-500">
                        Due Date: {{ payment.dueDate }}
                      </p>
                    </div>
                  </div>
                  <div class="ml-6">
                    <Button
                      v-if="payment.status !== 'paid'"
                      @click="markAsPaid(payment)"
                      variant="primary"
                      size="md"
                      class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Mark as Paid
                    </Button>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { navigateTo } from "#app";
import { ref, computed } from "vue";

import Button from "~/components/ui/Button.vue";

const statusFilter = ref("all");

// Mock payment data - in a real app, this would come from an API
const payments = ref([
  {
    id: 1,
    propertyId: 1,
    propertyName: "Sunset Apartments - Unit 101",
    tenantName: "John Doe",
    amount: 1500,
    dueDate: "2024-02-01",
    status: "paid",
  },
  {
    id: 2,
    propertyId: 2,
    propertyName: "Ocean View Condos - Unit 205",
    tenantName: "Jane Smith",
    amount: 2000,
    dueDate: "2024-02-01",
    status: "pending",
  },
  {
    id: 3,
    propertyId: 3,
    propertyName: "Mountain Lodge - Unit 303",
    tenantName: "Bob Johnson",
    amount: 1800,
    dueDate: "2024-01-15",
    status: "overdue",
  },
]);

const filteredPayments = computed(() => {
  if (statusFilter.value === "all") {
    return payments.value;
  }
  return payments.value.filter(
    (payment) => payment.status === statusFilter.value
  );
});

const markAsPaid = (payment) => {
  // In a real app, this would make an API call
  payment.status = "paid";
};
</script>
