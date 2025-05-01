<template>
  <div class="flex gap-8 h-[calc(100vh-12rem)] min-h-0 overflow-hidden">
    <!-- Left Container: Cards -->
    <div class="w-3/5 flex flex-col gap-3 h-full min-h-0 overflow-y-auto pr-2">
      <PropertiesSection
        :properties="properties"
        :recentProperties="recentProperties"
        :isPropertyManager="isPropertyManager"
        :openPropertyModal="openPropertyModal"
      />
      <!-- Other cards can go here -->
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
      <NotificationsSection :activities="activities" />
    </div>
  </div>
</template>

<script setup lang="ts">
import PropertiesSection from "~/components/dashboard/PropertiesSection.vue";
import NotificationsSection from "~/components/dashboard/NotificationsSection.vue";
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
