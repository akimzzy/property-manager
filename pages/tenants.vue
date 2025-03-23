<template>
  <div class="min-h-screen bg-gray-100">
    <AppHeader />
    <div class="py-10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold text-gray-900">Tenants</h1>

        <!-- Tenant List -->
        <div class="mt-8 space-y-6">
          <div
            v-for="tenant in mockTenants"
            :key="tenant.id"
            class="bg-white shadow rounded-lg overflow-hidden"
          >
            <!-- Tenant Info Section -->
            <div class="px-6 py-5">
              <div class="flex items-start">
                <div class="flex-shrink-0">
                  <div
                    class="inline-flex items-center justify-center h-12 w-12 rounded-full bg-indigo-500"
                  >
                    <span class="text-xl font-medium leading-none text-white">{{
                      tenant.name.charAt(0).toUpperCase()
                    }}</span>
                  </div>
                </div>
                <div class="min-w-0 ml-4 flex-1">
                  <div class="flex items-center justify-between">
                    <h3 class="text-xl font-bold text-gray-900 truncate">
                      {{ tenant.name }}
                    </h3>
                    <div class="text-sm text-gray-500">
                      {{ tenant.rentedProperties.length }} Properties
                    </div>
                  </div>
                  <div class="mt-2 flex flex-col space-y-1">
                    <div class="flex items-center text-sm text-gray-600">
                      <svg
                        class="flex-shrink-0 mr-2 h-4 w-4 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"
                        />
                        <path
                          d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"
                        />
                      </svg>
                      {{ tenant.email }}
                    </div>
                    <div class="flex items-center text-sm text-gray-600">
                      <svg
                        class="flex-shrink-0 mr-2 h-4 w-4 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"
                        />
                      </svg>
                      {{ tenant.phone }}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Rented Properties Section -->
            <div class="px-6 py-5 border-t border-gray-100">
              <button
                @click="toggleSection(tenant.id, 'properties')"
                class="w-full flex items-center justify-between focus:outline-none group"
              >
                <div class="flex items-center space-x-2">
                  <h4
                    class="text-sm font-medium text-gray-900 group-hover:text-indigo-600"
                  >
                    Rented Properties
                  </h4>
                  <span class="text-xs font-medium text-gray-500"
                    >({{ tenant.rentedProperties.length }})</span
                  >
                </div>
                <svg
                  :class="{
                    'transform rotate-180':
                      expandedSections[tenant.id]?.properties,
                  }"
                  class="h-5 w-5 text-gray-400 transition-transform duration-200 ease-in-out group-hover:text-indigo-600"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
              <div
                v-show="expandedSections[tenant.id]?.properties"
                class="mt-4 space-y-3 max-h-48 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
              >
                <NuxtLink
                  v-for="property in tenant.rentedProperties"
                  :key="property.propertyId"
                  class="block bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors duration-200"
                  :to="`/property/${property.propertyId}`"
                >
                  <div class="flex justify-between items-start">
                    <div class="flex-1">
                      <h5 class="text-sm font-medium text-gray-900">
                        {{ property.title }}
                      </h5>
                      <p class="mt-1 text-xs text-gray-500">
                        {{ property.street }}, {{ property.city }},
                        {{ property.state }} {{ property.zipCode }}
                      </p>
                      <div
                        class="mt-2 flex flex-wrap gap-4 text-xs text-gray-600"
                      >
                        <span>
                          <span class="font-medium">Rent:</span>
                          <span class="ml-1">${{ property.monthlyRent }}</span>
                        </span>
                        <span>
                          <span class="font-medium">Lease:</span>
                          <span class="ml-1"
                            >{{ formatDate(property.leaseStartDate) }} -
                            {{ formatDate(property.leaseEndDate) }}</span
                          >
                        </span>
                      </div>
                    </div>
                    <div
                      class="flex items-center text-xs font-medium text-indigo-600 hover:text-indigo-900"
                    >
                      <span>View Details</span>
                      <svg
                        class="ml-1.5 h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </NuxtLink>
              </div>
            </div>

            <!-- Maintenance Requests Section -->
            <div
              v-if="tenant.maintenanceRequests.length > 0"
              class="px-6 py-5 border-t border-gray-100"
            >
              <button
                @click="toggleSection(tenant.id, 'maintenance')"
                class="w-full flex items-center justify-between focus:outline-none group"
              >
                <div class="flex items-center space-x-2">
                  <h4
                    class="text-sm font-medium text-gray-900 group-hover:text-indigo-600"
                  >
                    Maintenance Requests
                  </h4>
                  <span class="text-xs font-medium text-gray-500"
                    >({{ tenant.maintenanceRequests.length }})</span
                  >
                </div>
                <svg
                  :class="{
                    'transform rotate-180':
                      expandedSections[tenant.id]?.maintenance,
                  }"
                  class="h-5 w-5 text-gray-400 transition-transform duration-200 ease-in-out group-hover:text-indigo-600"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
              <div
                v-show="expandedSections[tenant.id]?.maintenance"
                class="mt-4 space-y-4"
              >
                <div
                  v-for="request in tenant.maintenanceRequests"
                  :key="request.id"
                  class="bg-gray-50 rounded-lg p-4"
                >
                  <div class="flex justify-between items-start">
                    <div class="flex-1 mr-4">
                      <h5 class="text-sm font-medium text-gray-900">
                        {{ request.title }}
                      </h5>
                      <p class="mt-1 text-sm text-gray-500">
                        {{ request.description }}
                      </p>
                      <div
                        class="mt-2 flex flex-wrap gap-4 text-xs text-gray-500"
                      >
                        <p>
                          <span class="font-medium">Property:</span>
                          <span class="ml-1">{{
                            getPropertyDetails(request.propertyId)
                          }}</span>
                        </p>
                        <p>
                          <span class="font-medium">Created:</span>
                          <span class="ml-1">{{
                            formatDate(request.createdAt)
                          }}</span>
                        </p>
                      </div>
                    </div>
                    <span
                      :class="{
                        'bg-yellow-100 text-yellow-800':
                          request.status === 'pending',
                        'bg-blue-100 text-blue-800':
                          request.status === 'in_progress',
                        'bg-green-100 text-green-800':
                          request.status === 'completed',
                      }"
                      class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize"
                    >
                      {{ request.status.replace("_", " ") }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
  mockTenants,
  type Tenant,
  type MaintenanceRequest,
} from "../data/mockTenants";
import { mockProperties } from "../data/mockProperties";

interface ExpandedSections {
  [key: number]: {
    properties?: boolean;
    maintenance?: boolean;
  };
}

const expandedSections = ref<ExpandedSections>({});

const toggleSection = (
  tenantId: number,
  section: "properties" | "maintenance"
) => {
  expandedSections.value[tenantId] = {
    ...expandedSections.value[tenantId],
    [section]: !expandedSections.value[tenantId]?.[section],
  };
};

const getPropertyDetails = (propertyId: number): string => {
  const property = mockProperties.find((p) => p.id === propertyId);
  return property
    ? `${property.title} - ${property.street}`
    : "Unknown Property";
};

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
</script>
