<template>
  <div class="space-y-6">
    <!-- Tabs -->
    <TabGroup
      v-model="activeTab"
      :tabs="[
        { name: 'Available Properties', value: 'available' },
        { name: 'My Rentals', value: 'rented' },
        { name: 'Maintenance Requests', value: 'maintenance' },
      ]"
      aria-label="Tenant dashboard tabs"
    />

    <!-- Available Properties Tab -->
    <div v-if="activeTab === 'available'">
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="property in availableProperties"
          :key="property.id"
          class="bg-white overflow-hidden shadow rounded-lg flex flex-col h-full"
        >
          <div class="relative aspect-w-16 h-48 overflow-hidden">
            <div
              class="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-sm z-10"
            >
              {{ currentImageIndex[property.id] + 1 }}/{{
                property.images.length
              }}
            </div>
            <div
              class="absolute inset-0 flex transition-transform duration-500 ease-in-out"
              :style="{
                transform: `translateX(-${
                  currentImageIndex[property.id] * 100
                }%)`,
              }"
            >
              <img
                v-for="(image, index) in property.images"
                :key="index"
                :src="image"
                :alt="property.title"
                class="w-full h-full object-cover flex-shrink-0"
              />
            </div>
            <button
              v-if="property.images.length > 1"
              @click="
                setCurrentImage(
                  property.id,
                  (currentImageIndex[property.id] -
                    1 +
                    property.images.length) %
                    property.images.length
                )
              "
              class="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-1.5 rounded-full shadow-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <svg
                class="h-4 w-4 text-gray-800"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              v-if="property.images.length > 1"
              @click="
                setCurrentImage(
                  property.id,
                  (currentImageIndex[property.id] + 1) % property.images.length
                )
              "
              class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-1.5 rounded-full shadow-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <svg
                class="h-4 w-4 text-gray-800"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
          <div class="p-6 flex-1 flex flex-col">
            <div class="flex justify-between items-start mb-4">
              <h3 class="text-lg font-medium text-gray-900 line-clamp-2">
                {{ property.title }}
              </h3>
              <span
                class="bg-green-100 text-green-800 px-2 py-1 text-xs font-medium rounded-full flex-shrink-0 ml-2"
              >
                Available
              </span>
            </div>
            <p class="text-xl font-semibold text-gray-900 mb-2">
              ${{ property.price }}/month
            </p>
            <p class="text-sm text-gray-500 mb-2">
              {{ property.street }}, {{ property.city }}, {{ property.state }}
              {{ property.zipCode }}
            </p>
            <p class="text-sm text-gray-500 line-clamp-2 mb-4">
              {{ property.description }}
            </p>
            <div class="mt-auto flex flex-col space-y-2">
              <NuxtLink
                :to="`/property/${property.id}`"
                class="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                View Property
              </NuxtLink>
              <button
                @click="openApplicationModal(property.id)"
                class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Apply Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Rented Properties Tab -->
    <div v-if="activeTab === 'rented'">
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="property in rentedProperties"
          :key="property.propertyId"
          class="bg-white overflow-hidden shadow rounded-lg flex flex-col h-full"
        >
          <div class="relative aspect-w-16 h-48 overflow-hidden">
            <div
              class="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-sm z-10"
            >
              {{ currentImageIndex[property.propertyId] + 1 }}/{{
                property.images.length
              }}
            </div>
            <div
              class="absolute inset-0 flex transition-transform duration-500 ease-in-out"
              :style="{
                transform: `translateX(-${
                  currentImageIndex[property.propertyId] * 100
                }%)`,
              }"
            >
              <img
                v-for="(image, index) in property.images"
                :key="index"
                :src="image"
                :alt="property.title"
                class="w-full h-full object-cover flex-shrink-0"
              />
            </div>
            <button
              v-if="property.images.length > 1"
              @click="
                setCurrentImage(
                  property.propertyId,
                  (currentImageIndex[property.propertyId] -
                    1 +
                    property.images.length) %
                    property.images.length
                )
              "
              class="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-1.5 rounded-full shadow-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <svg
                class="h-4 w-4 text-gray-800"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              v-if="property.images.length > 1"
              @click="
                setCurrentImage(
                  property.propertyId,
                  (currentImageIndex[property.propertyId] + 1) %
                    property.images.length
                )
              "
              class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-1.5 rounded-full shadow-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <svg
                class="h-4 w-4 text-gray-800"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
          <div class="p-6 flex-1 flex flex-col">
            <div class="flex justify-between items-start mb-4">
              <h3 class="text-lg font-medium text-gray-900 line-clamp-2">
                {{ property.title }}
              </h3>
              <span
                class="bg-indigo-100 text-indigo-800 px-2 py-1 text-xs font-medium rounded-full flex-shrink-0 ml-2"
              >
                Rented
              </span>
            </div>
            <p class="text-xl font-semibold text-gray-900 mb-2">
              ${{ property.monthlyRent }}/month
            </p>
            <p class="text-sm text-gray-500 mb-2">
              {{ property.street }}, {{ property.city }}, {{ property.state }}
              {{ property.zipCode }}
            </p>
            <div class="text-sm text-gray-500 mb-4">
              <div class="mb-1">
                <span class="font-medium">Lease Period:</span>
                {{ formatDate(property.leaseStartDate) }} -
                {{ formatDate(property.leaseEndDate) }}
              </div>
            </div>
            <div class="mt-auto flex flex-col space-y-2">
              <NuxtLink
                :to="`/property/${property.propertyId}`"
                class="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                View Details
              </NuxtLink>
              <button
                @click="submitMaintenanceRequest(property.propertyId)"
                class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Request Maintenance
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Maintenance Requests Tab -->
    <div v-if="activeTab === 'maintenance'" class="mt-6">
      <div v-if="maintenanceRequests.length > 0" class="space-y-4">
        <div
          v-for="request in maintenanceRequests"
          :key="request.id"
          class="bg-white shadow overflow-hidden sm:rounded-lg p-4"
        >
          <div class="flex justify-between items-start">
            <div>
              <h4 class="text-sm font-medium text-gray-900">
                {{ request.title }}
              </h4>
              <p class="mt-1 text-sm text-gray-500">
                {{ request.description }}
              </p>
            </div>
            <span
              :class="{
                'bg-yellow-100 text-yellow-800': request.status === 'pending',
                'bg-blue-100 text-blue-800': request.status === 'in_progress',
                'bg-green-100 text-green-800': request.status === 'completed',
              }"
              class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
            >
              {{ request.status.replace("_", " ") }}
            </span>
          </div>
          <div class="mt-2 text-sm text-gray-500">
            <p>Submitted: {{ formatDate(request.createdAt) }}</p>
            <p>Last Updated: {{ formatDate(request.updatedAt) }}</p>
          </div>
        </div>
      </div>
      <div v-else class="text-sm text-gray-500 text-center py-4">
        No maintenance requests found.
      </div>
    </div>

    <!-- Maintenance Request Modal -->
    <MaintenanceRequestModal
      :is-open="isMaintenanceModalOpen"
      :property-id="selectedPropertyId"
      @close="closeMaintenanceModal"
      @submit="handleMaintenanceSubmit"
    />
  </div>
</template>

<script setup lang="ts">
import { mockProperties } from "~/data/mockProperties";
import { mockTenants } from "~/data/mockTenants";

interface MaintenanceRequest {
  id: number;
  propertyId: number;
  title: string;
  description: string;
  status: "pending" | "in_progress" | "completed";
  createdAt: string;
  updatedAt: string;
}

interface Props {
  openApplicationModal: (propertyId: number) => void;
}

defineProps<Props>();

const route = useRoute();
const router = useRouter();

const activeTab = ref(route.query.tab?.toString() || "available");

// Watch for changes in the active tab and update the URL
watch(activeTab, (newTab) => {
  router.push({
    query: { ...route.query, tab: newTab },
  });
});

// Watch for URL changes and update the active tab
watch(
  () => route.query.tab,
  (newTab) => {
    if (
      newTab &&
      ["available", "rented", "maintenance"].includes(newTab.toString())
    ) {
      activeTab.value = newTab.toString();
    } else {
      activeTab.value = "available";
    }
  }
);

const availableProperties = computed(() =>
  mockProperties.filter((p) => p.available)
);
const rentedProperties = computed(() => {
  if (typeof window === "undefined") return [];
  let user: any = localStorage.getItem("user");
  if (!user) return [];
  user = JSON.parse(user);
  const tenant = mockTenants.find((t) => t.email === user?.email);
  return tenant ? tenant.rentedProperties : [];
});

const maintenanceRequests = computed<MaintenanceRequest[]>(() => {
  if (typeof window === "undefined") return [];
  let user: any = localStorage.getItem("user");
  if (!user) return [];
  user = JSON.parse(user);
  const tenant = mockTenants.find((t) => t.email === user?.email);
  return tenant ? tenant.maintenanceRequests || [] : [];
});

const currentImageIndex = ref<Record<number, number>>({});
const imageIntervals = ref<Record<number, ReturnType<typeof setInterval>>>({});

// Function to set current image
const setCurrentImage = (propertyId: number, index: number) => {
  currentImageIndex.value[propertyId] = index;
};

// Maintenance request modal state
const isMaintenanceModalOpen = ref(false);
const selectedPropertyId = ref<number | null>(null);

// Function to submit maintenance request
const submitMaintenanceRequest = (propertyId: number) => {
  selectedPropertyId.value = propertyId;
  isMaintenanceModalOpen.value = true;
};

// Handle maintenance request submission
const handleMaintenanceSubmit = (request: any) => {
  console.log("Maintenance request submitted:", request);
  // Here you would typically make an API call to save the request
};

// Close maintenance modal
const closeMaintenanceModal = () => {
  isMaintenanceModalOpen.value = false;
  selectedPropertyId.value = null;
};

// Format date helper function
const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString();
};

onMounted(() => {
  // Initialize image carousel for available properties
  availableProperties.value.forEach((property) => {
    currentImageIndex.value[property.id] = 0;
    if (property.images.length > 1) {
      imageIntervals.value[property.id] = setInterval(() => {
        currentImageIndex.value[property.id] =
          (currentImageIndex.value[property.id] + 1) % property.images.length;
      }, 5000);
    }
  });

  // Initialize image carousel for rented properties
  rentedProperties.value.forEach((property) => {
    currentImageIndex.value[property.propertyId] = 0;
    if (property.images.length > 1) {
      imageIntervals.value[property.propertyId] = setInterval(() => {
        currentImageIndex.value[property.propertyId] =
          (currentImageIndex.value[property.propertyId] + 1) %
          property.images.length;
      }, 5000);
    }
  });
});

// Clean up intervals on component unmount
onUnmounted(() => {
  Object.values(imageIntervals.value).forEach((interval) => {
    clearInterval(interval);
  });
});
</script>
