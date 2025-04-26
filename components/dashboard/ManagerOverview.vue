<template>
  <div class="flex gap-8">
    <!-- Left Container: Cards -->
    <div class="w-3/5 grid grid-cols-2 gap-6">
      <!-- Property Overview Card -->
      <div
        class="bg-gradient-to-br from-gray-50 via-white to-gray-100 border-2 border-gray-200 overflow-hidden rounded-3xl relative col-span-full"
      >
        <div class="p-8 flex flex-col h-full justify-between">
          <div class="flex items-center">
            <div
              class="flex-shrink-0 bg-blue-500 h-6 w-6 ring-3 ring-blue-400 rounded-full"
            ></div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-lg font-medium text-gray-500 truncate">
                  Properties
                </dt>
                <!-- <dd class="text-sm font-medium text-gray-900">
                  {{ properties.length }}
                </dd> -->
              </dl>
            </div>
            <Button
              v-if="isPropertyManager"
              @click="openPropertyModal?.(null)"
              variant="primary"
              size="sm"
              class="right-0 size-10"
            >
              <svg
                class="size-5"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 5v14"></path>
                <path d="M5 12h14"></path>
              </svg>
              Add property
            </Button>
          </div>
          <div class="">
            <span class="text-xs text-gray-600 mb-4 inline-block"
              >Recent properties</span
            >
            <div
              class="flex gap-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-gray-50 rounded-2xl hide-scrollbar"
            >
              <div
                v-for="property in recentProperties"
                :key="property.id"
                class="flex-shrink-0 w-48 rounded-2xl hover:shadow-md transition-shadow duration-200 p-0 flex flex-col items-center overflow-hidden"
                style="min-width: 12rem; max-width: 12rem"
              >
                <NuxtLink
                  :to="`/property/${property.id}`"
                  class="w-full flex flex-col items-center p-0"
                >
                  <img
                    :src="
                      property.images && property.images.length
                        ? property.images[0]
                        : '/placeholder.png'
                    "
                    :alt="property.title"
                    class="w-full aspect-square object-cover rounded-bl-2xl rounded-br-2xl bg-gray-100"
                    style="height: 12rem; min-height: 12rem; max-height: 12rem"
                  />
                  <div class="w-full flex flex-col items-center my-3">
                    <div
                      class="text-xs font-medium text-gray-900 line-clamp-2 w-full text-center"
                    >
                      {{ property.title }}
                    </div>
                    <div
                      class="text-xs text-gray-500 w-full text-center mt-0.5"
                    >
                      {{ property.city }}, {{ property.state }}
                    </div>
                    <!-- <span class="text-xs text-gray-400">{{
                      formatDate(property.updatedAt || property.createdAt)
                    }}</span> -->
                  </div>
                </NuxtLink>
              </div>
              <div
                v-if="recentProperties.length === 0"
                class="flex-shrink-0 w-32 flex items-center justify-center text-xs text-gray-400 bg-white border border-gray-100 rounded-xl p-4"
                style="min-width: 8rem; max-width: 8rem"
              >
                No recent properties
              </div>
            </div>
            <div class="mt-2 flex space-x-2 justify-end">
              <NuxtLink
                to="/properties"
                class="inline-flex items-center px-3 py-1.5 border-none text-xs font-medium text-blue-500 border-blue-500 hover:gap-1.5 hover:text-blue-700 transition-all focus:outline-none gap-0.5"
              >
                View all properties
                <svg
                  class="size-4 rotate-180"
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M19 12H5"></path>
                  <path d="m12 19-7-7 7-7"></path>
                </svg>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>

      <!-- Maintenance Requests Card -->
      <div
        class="bg-gradient-to-br from-gray-100 via-white to-yellow-50 border border-gray-300 overflow-hidden shadow rounded-lg"
      >
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
      <div
        class="bg-gradient-to-br from-gray-100 via-white to-white border border-gray-300 overflow-hidden shadow rounded-lg"
      >
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
      <div
        class="bg-gradient-to-br from-gray-100 via-white to-green-50 border border-gray-300 overflow-hidden shadow rounded-lg"
      >
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

    <!-- Right Container: Recent Activity -->
    <div class="w-2/5">
      <div class="ml-0 lg:ml-4">
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
                  <p class="text-sm text-gray-500">
                    {{ activity.description }}
                  </p>
                </div>
                <div class="text-sm text-gray-500">{{ activity.time }}</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
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

const recentProperties = computed(() => {
  return [...mockProperties]
    .sort((a, b) => {
      const dateA = new Date(a.updatedAt || a.createdAt).getTime();
      const dateB = new Date(b.updatedAt || b.createdAt).getTime();
      return dateB - dateA;
    })
    .slice(0, 5);
});

const formatDate = (dateString: string): string => {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
</script>

<style scoped>
.hide-scrollbar {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}
.hide-scrollbar::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}
</style>
