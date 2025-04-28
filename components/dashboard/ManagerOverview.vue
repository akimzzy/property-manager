<template>
  <div class="flex gap-8 h-[calc(100vh-12rem)] min-h-0 overflow-hidden">
    <!-- Left Container: Cards -->
    <div class="w-3/5 flex flex-col gap-3 h-full min-h-0 overflow-y-auto pr-2">
      <!-- Property Overview Card -->
      <div
        class="bg-gradient-to-br from-blue-50 via-white to-blue-100 border border-blue-200 overflow-hidden rounded-3xl relative flex flex-col justify-between mb-6"
      >
        <div class="p-8 flex flex-col h-full justify-between">
          <div class="flex items-center">
            <!-- <div
              class="flex-shrink-0 bg-blue-500 h-6 w-6 ring-3 ring-blue-400 rounded-full"
            ></div> -->
            <div class="w-0 flex-1">
              <dl class="flex items-center gap-4">
                <dt class="text-lg font-medium text-gray-500 truncate">
                  Properties
                </dt>
                <dd
                  class="text-[10px] font-medium bg-blue-600 text-white size-8 flex justify-center items-center rounded-full ring-3 ring-blue-400"
                >
                  {{ properties.length }}
                </dd>
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
          <div class="mt-4">
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

      <!-- Overview Cards Row -->
      <div class="grid grid-cols-3 gap-6">
        <!-- Maintenance Requests Card -->
        <NuxtLink
          to="/maintenance"
          :class="[
            'bg-gradient-to-br  border  overflow-hidden rounded-3xl p-8 flex flex-col h-64 group',
            maintenanceHover
              ? 'from-yellow-50 via-white to-yellow-50 border-yellow-200'
              : 'from-gray-50 via-white to-gray-50 border-gray-200',
          ]"
          @mouseenter="maintenanceHover = true"
          @mouseleave="maintenanceHover = false"
        >
          <div class="flex gap-4 items-center">
            <span class="text-lg font-medium text-gray-500"> Maintenance </span>
            <div class="text-xs text-gray-500 w-full mt-0.5">
              <span
                class="text-[10px] font-medium bg-yellow-600 text-white size-8 flex justify-center items-center rounded-full ring-3 ring-yellow-400"
              >
                {{
                  pendingMaintenanceCount +
                  inProgressMaintenanceCount +
                  completedMaintenanceCount
                }}
              </span>
            </div>
          </div>
          <div
            class="flex flex-col justify-center text-xs text-gray-700 flex-1 divide-y"
          >
            <div
              class="text-xs text-gray-500 w-full p-1.5 border-gray-200 capitalize flex justify-between items-center"
              v-for="stats in [
                { name: 'pending', count: pendingMaintenanceCount },
                { name: 'In progress', count: inProgressMaintenanceCount },
                { name: 'completed', count: completedMaintenanceCount },
              ]"
            >
              {{ stats.name }}
              <span class="font-semibold text-gray-800 p-1">{{
                stats.count
              }}</span>
            </div>
          </div>
          <div
            :class="[
              'inline-flex items-center text-xs font-medium transition-all focus:outline-none gap-0.5 justify-end',
              maintenanceHover ? 'gap-1.5 text-yellow-700' : 'text-yellow-600',
            ]"
          >
            See more
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
          </div>
        </NuxtLink>

        <!-- Rent Collection Card -->
        <NuxtLink
          to="/payments"
          :class="[
            'bg-gradient-to-br border overflow-hidden rounded-3xl p-8 flex flex-col h-64 group',
            rentHover
              ? 'from-green-50 via-white to-green-50 border-green-200'
              : 'from-gray-50 via-white to-gray-50 border-gray-200',
          ]"
          @mouseenter="rentHover = true"
          @mouseleave="rentHover = false"
        >
          <div class="flex gap-4 items-center">
            <span class="text-lg font-medium text-gray-500"> Rent </span>
            <div class="text-xs text-gray-500 w-full mt-0.5">
              <span
                class="text-[10px] font-medium bg-green-600 text-white size-8 flex justify-center items-center rounded-full ring-3 ring-green-400"
              >
                {{ totalRentedProperties }}
              </span>
            </div>
          </div>
          <div
            class="flex flex-col justify-center text-xs text-gray-700 flex-1 divide-y"
          >
            <div
              class="text-xs text-gray-500 w-full p-1.5 border-gray-200 capitalize flex justify-between items-center"
            >
              Total Received
              <span class="font-semibold text-gray-800 p-1"
                >${{ totalReceivedRent }}</span
              >
            </div>
            <div
              class="text-xs text-gray-500 w-full p-2 border-gray-200 capitalize flex justify-between items-center"
            >
              Overdue Payments
              <span class="font-semibold text-red-700 p-1"
                >{{ overduePayments.count }}
                <span v-if="overduePayments.count"
                  >(${{ overduePayments.amount }})</span
                ></span
              >
            </div>
            <div
              class="text-xs text-gray-500 w-full p-2 border-gray-200 capitalize flex justify-between items-center"
            >
              Upcoming Payments
              <span class="font-semibold text-blue-700 p-1"
                >{{ upcomingPayments.count }}
                <span v-if="upcomingPayments.count"
                  >(${{ upcomingPayments.amount }})</span
                ></span
              >
            </div>
          </div>
          <div
            :class="[
              'inline-flex items-center text-xs font-medium transition-all focus:outline-none gap-0.5 justify-end',
              rentHover ? 'gap-1.5 text-green-700' : 'text-green-600',
            ]"
          >
            See more
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
          </div>
        </NuxtLink>

        <!-- Tenant Overview Card -->
        <NuxtLink
          to="/tenants"
          :class="[
            'bg-gradient-to-br border overflow-hidden rounded-3xl p-8 flex flex-col h-64 group',
            tenantHover
              ? 'from-purple-50 via-white to-purple-50 border-purple-200'
              : 'from-gray-50 via-white to-gray-50 border-gray-200',
          ]"
          @mouseenter="tenantHover = true"
          @mouseleave="tenantHover = false"
        >
          <div class="flex gap-4 items-center">
            <span class="text-lg font-medium text-gray-500"> Tenants </span>
            <div class="flex gap-2 items-center mt-0.5">
              <span
                class="text-[10px] font-medium bg-purple-600 text-white size-8 flex justify-center items-center rounded-full ring-3 ring-purple-400"
              >
                {{ totalTenants }}
              </span>
            </div>
          </div>
          <div
            class="flex flex-col justify-center text-xs text-gray-700 flex-1 divide-y"
          >
            <div
              class="text-xs text-gray-500 w-full p-1.5 border-gray-200 capitalize flex items-center justify-between"
            >
              Total Tenants
              <span class="font-semibold text-gray-800 p-1">{{
                totalTenants
              }}</span>
            </div>
            <div
              class="text-xs text-gray-500 w-full p-2 border-gray-200 capitalize flex items-center justify-between"
            >
              Applications
              <span class="font-semibold text-gray-800 p-1">{{
                totalTenantApplications
              }}</span>
            </div>
          </div>
          <div
            class="inline-flex items-center text-xs font-medium transition-all focus:outline-none gap-1.5 justify-end text-purple-700"
          >
            See more
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
          </div>
        </NuxtLink>
      </div>
    </div>

    <!-- Right Container: Recent Activity -->
    <div class="w-2/5">
      <div class="ml-0 lg:ml-4 h-full flex flex-col">
        <h2
          class="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2"
        >
          <svg
            class="h-5 w-5 text-blue-500"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            /></svg
          >Notifications
        </h2>
        <div class="bg- overflow-hidden sm:rounded-lg flex-1">
          <ul class="space-y-3 h-full overflow-auto">
            <li
              v-for="activity in activities"
              :key="activity.id"
              :class="[
                'p-4 rounded-2xl border',
                activity.read
                  ? 'bg-gray-50 border-gray-200'
                  : 'bg-blue-50 border-blue-300',
              ]"
            >
              <div class="flex items-center space-x-4">
                <div class="flex-1 min-w-0">
                  <p
                    class="text-sm font-medium"
                    :class="activity.read ? 'text-gray-900' : 'text-blue-800'"
                  >
                    {{ activity.title }}
                  </p>
                  <p
                    class="text-xs"
                    :class="activity.read ? 'text-gray-500' : 'text-blue-700'"
                  >
                    {{ activity.description }}
                  </p>
                </div>
                <div
                  class="text-xs"
                  :class="activity.read ? 'text-gray-500' : 'text-blue-700'"
                >
                  {{ activity.time }}
                </div>
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
import { mockApplications } from "~/data/mockApplications";

interface Props {
  properties: any[];
  activities: any[];
  totalTenants: number;
  totalMonthlyRent: number;
  pendingMaintenanceCount: number;
  isPropertyManager: boolean;
  openPropertyModal?: (propertyId: number | null) => void;
  totalTenantApplications?: number;
}

defineProps<Props>();

const properties = computed(() => mockProperties);
const activities = computed(() =>
  mockActivities.map((a, i) => ({ ...a, read: i !== 0 && i !== 2 }))
);
const totalTenants = computed(() => mockTenants.length);
const totalTenantApplications = computed(() => mockApplications.length);
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

const inProgressMaintenanceCount = computed(() => {
  return mockTenants.reduce((count, tenant) => {
    return (
      count +
      tenant.maintenanceRequests.filter((req) => req.status === "in progress")
        .length
    );
  }, 0);
});

const completedMaintenanceCount = computed(() => {
  return mockTenants.reduce((count, tenant) => {
    return (
      count +
      tenant.maintenanceRequests.filter((req) => req.status === "completed")
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
import { ref } from "vue";
import type { count } from "console";

const maintenanceHover = ref(false);
const rentHover = ref(false);
const tenantHover = ref(false);
const totalRentedProperties = computed(() => {
  return mockTenants.reduce(
    (total, tenant) => total + (tenant.rentedProperties?.length || 0),
    0
  );
});

const overduePayments = computed(() => {
  let count = 0;
  let amount = 0;
  mockTenants.forEach((tenant) => {
    if (tenant.payments) {
      tenant.payments.forEach((payment) => {
        if (payment.status === "overdue") {
          count++;
          amount += payment.amount;
        }
      });
    }
  });
  return { count, amount };
});

const upcomingPayments = computed(() => {
  let count = 0;
  let amount = 0;
  mockTenants.forEach((tenant) => {
    if (tenant.payments) {
      tenant.payments.forEach((payment) => {
        if (payment.status === "upcoming") {
          count++;
          amount += payment.amount;
        }
      });
    }
  });
  return { count, amount };
});
const totalReceivedRent = computed(() => {
  let total = 0;
  mockTenants.forEach((tenant) => {
    if (tenant.payments) {
      tenant.payments.forEach((payment) => {
        if (payment.status === "received") {
          total += payment.amount;
        }
      });
    }
  });
  return total;
});
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
