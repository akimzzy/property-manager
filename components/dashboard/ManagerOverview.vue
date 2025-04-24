<template>
  <div class="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
    <!-- Property Overview Card -->
    <div class="bg-white overflow-hidden shadow rounded-lg">
      <div class="p-5">
        <div class="flex items-center">
          <div class="flex-shrink-0 bg-indigo-500 rounded-md p-3">
            <svg
              class="h-6 w-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
          </div>
          <div class="ml-5 w-0 flex-1">
            <dl>
              <dt class="text-sm font-medium text-gray-500 truncate">
                Total Properties
              </dt>
              <dd class="text-lg font-medium text-gray-900">
                {{ properties.length }}
              </dd>
            </dl>
          </div>
        </div>
        <div class="mt-4 flex space-x-2">
          <NuxtLink
            to="/properties"
            class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            View Properties
          </NuxtLink>
          <Button
            v-if="isPropertyManager"
            @click="openPropertyModal?.(null)"
            variant="primary"
            size="sm"
            class="bg-green-600 hover:bg-green-700 focus:ring-green-500"
          >
            Add Property
          </Button>
        </div>
      </div>
    </div>

    <!-- Maintenance Requests Card -->
    <div class="bg-white overflow-hidden shadow rounded-lg">
      <div class="p-5">
        <div class="flex items-center">
          <div class="flex-shrink-0 bg-yellow-500 rounded-md p-3">
            <svg
              class="h-6 w-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <div class="ml-5 w-0 flex-1">
            <dl>
              <dt class="text-sm font-medium text-gray-500 truncate">
                Pending Maintenance
              </dt>
              <dd class="text-lg font-medium text-gray-900">
                {{ pendingMaintenanceCount }}
              </dd>
            </dl>
          </div>
        </div>
        <div class="mt-4">
          <NuxtLink
            to="/maintenance"
            class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            View Maintenance
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Rent Collection Card -->
    <div class="bg-white overflow-hidden shadow rounded-lg">
      <div class="p-5">
        <div class="flex items-center">
          <div class="flex-shrink-0 bg-green-500 rounded-md p-3">
            <svg
              class="h-6 w-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div class="ml-5 w-0 flex-1">
            <dl>
              <dt class="text-sm font-medium text-gray-500 truncate">
                Monthly Rent Collection
              </dt>
              <dd class="text-lg font-medium text-gray-900">
                ${{ totalMonthlyRent }}
              </dd>
            </dl>
          </div>
        </div>
        <div class="mt-4 flex space-x-2">
          <NuxtLink
            to="/payments"
            class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            View Payments
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Tenant Overview Card -->
    <div class="bg-white overflow-hidden shadow rounded-lg">
      <div class="p-5">
        <div class="flex items-center">
          <div class="flex-shrink-0 bg-blue-500 rounded-md p-3">
            <svg
              class="h-6 w-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <div class="ml-5 w-0 flex-1">
            <dl>
              <dt class="text-sm font-medium text-gray-500 truncate">
                Total Tenants
              </dt>
              <dd class="text-lg font-medium text-gray-900">
                {{ totalTenants }}
              </dd>
            </dl>
          </div>
        </div>

        <div class="mt-4 flex space-x-2">
          <NuxtLink
            to="/tenants"
            class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            View Tenants
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>

  <!-- Recent Activity Section -->
  <div class="mt-6">
    <h2 class="text-lg font-medium text-gray-900 mb-4">Recent Activity</h2>
    <div class="bg-white shadow overflow-hidden sm:rounded-lg">
      <ul class="divide-y divide-gray-200">
        <li v-for="activity in activities" :key="activity.id" class="p-4">
          <div class="flex items-center space-x-4">
            <div class="flex-shrink-0">
              <span :class="activity.iconClass" class="p-2 rounded-full">
                <svg
                  class="h-5 w-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    :d="activity.icon"
                  />
                </svg>
              </span>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-gray-900">
                {{ activity.title }}
              </p>
              <p class="text-sm text-gray-500">{{ activity.description }}</p>
            </div>
            <div class="text-sm text-gray-500">{{ activity.time }}</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from "~/components/ui/Button.vue";
import { computed } from "vue";
import { mockProperties } from "~/data/mockProperties";
import { mockActivities } from "~/data/mockActivities";
import { mockTenants } from "~/data/mockTenants";

interface Props {
  properties: any[];
  activities: any[];
  totalTenants: number;
  totalMonthlyRent: number;
  pendingMaintenanceCount: number;
  isPropertyManager: boolean;
  openPropertyModal?: (propertyId: number | null) => void;
}

defineProps<Props>();

const properties = computed(() => mockProperties);
const activities = computed(() => mockActivities);
const totalTenants = computed(() => mockTenants.length);
const totalMonthlyRent = computed(() => {
  return mockProperties.reduce((total, property) => total + property.price, 0);
});
const pendingMaintenanceCount = computed(() => {
  return mockTenants.reduce((count, tenant) => {
    return (
      count +
      tenant.maintenanceRequests.filter((req) => req.status === "pending")
        .length
    );
  }, 0);
});
</script>
