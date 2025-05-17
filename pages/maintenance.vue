<template>
  <div class="py-10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="mb-6">
        <BackButton />
      </div>
      <h1 class="text-3xl font-bold leading-tight text-gray-900">
        Maintenance Requests
      </h1>
    </div>

    <main>
      <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <!-- Maintenance Request List -->
        <div class="bg-white shadow overflow-hidden sm:rounded-lg">
          <div class="px-4 py-5 sm:px-6 flex justify-between items-center">
            <h2 class="text-lg font-medium text-gray-900">
              All Maintenance Requests
            </h2>
            <div class="flex space-x-4">
              <select
                v-model="statusFilter"
                class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
          <div class="border-t border-gray-200">
            <ul class="divide-y divide-gray-200">
              <li
                v-for="request in filteredRequests"
                :key="request.id"
                class="px-4 py-4"
              >
                <div class="flex items-center justify-between">
                  <div class="flex-1">
                    <div class="flex items-center justify-between">
                      <p class="text-sm font-medium text-indigo-600 truncate">
                        {{ request.title }}
                      </p>
                      <div class="ml-2 flex-shrink-0 flex">
                        <p
                          :class="{
                            'bg-yellow-100 text-yellow-800':
                              request.status === 'pending',
                            'bg-blue-100 text-blue-800':
                              request.status === 'in_progress',
                            'bg-green-100 text-green-800':
                              request.status === 'completed',
                          }"
                          class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                        >
                          {{ request.status.replace("_", " ") }}
                        </p>
                      </div>
                    </div>
                    <div class="mt-2">
                      <p class="text-sm text-gray-500">
                        {{ request.description }}
                      </p>
                      <p class="mt-1 text-sm text-gray-500">
                        Property:
                        <NuxtLink
                          :to="`/property/${request.propertyId}`"
                          class="text-indigo-600 hover:text-indigo-900"
                          >{{
                            getPropertyDetails(request.propertyId)
                          }}</NuxtLink
                        >
                      </p>
                      <p class="text-sm text-gray-500">
                        Tenant: {{ getTenantDetails(request.tenantId) }}
                      </p>
                    </div>
                  </div>
                  <div class="ml-6">
                    <select
                      v-model="request.status"
                      @change="updateRequestStatus(request)"
                      class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    >
                      <option value="pending">Pending</option>
                      <option value="in_progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
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
definePageMeta({
  layout: "authenticated",
});
import { useRouter } from "vue-router";
const router = useRouter();
import { ref, computed } from "vue";
import { mockTenants } from "../data/mockTenants";
import { mockProperties } from "../data/mockProperties";
import type { MaintenanceRequest } from "../types";

const statusFilter = ref("all");

// Get all maintenance requests from all tenants
const allRequests = computed(() => {
  return mockTenants.flatMap((tenant) =>
    tenant.maintenanceRequests.map((request) => ({
      ...request,
      tenantId: tenant.id,
    }))
  );
});

// Filter requests based on status
const filteredRequests = computed(() => {
  if (statusFilter.value === "all") {
    return allRequests.value;
  }
  return allRequests.value.filter(
    (request) => request.status === statusFilter.value
  );
});

// Get property details
const getPropertyDetails = (propertyId: number) => {
  const property = mockProperties.find((p) => p.id === propertyId);
  return property
    ? `${property.title} - ${property.street}`
    : "Unknown Property";
};

// Get tenant details
const getTenantDetails = (tenantId: number) => {
  const tenant = mockTenants.find((t) => t.id === tenantId);
  return tenant ? tenant.name : "Unknown Tenant";
};

// Update request status
const updateRequestStatus = (request: MaintenanceRequest) => {
  // In a real application, this would make an API call to update the status
  console.log(`Updated request ${request.id} status to ${request.status}`);
};
</script>
