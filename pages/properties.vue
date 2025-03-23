<template>
  <div class="min-h-screen bg-gray-100">
    <AppHeader />

    <div class="py-10">
      <header>
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BackButton class="mb-4" />
          <div class="flex justify-between items-center">
            <h1 class="text-3xl font-bold leading-tight text-gray-900">
              {{ isLandlord ? "Manage Properties" : "Available Properties" }}
            </h1>
            <div class="flex items-center space-x-4">
              <button
                v-if="isLandlord"
                @click="openPropertyModal?.(null)"
                class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Add Property
              </button>
            </div>
          </div>
        </div>
      </header>

      <main>
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <!-- Filter Tabs -->
          <TabGroup
            v-model="activeTab"
            :tabs="tabs"
            aria-label="Property filters"
            class="mt-4"
          />

          <!-- Property Grid -->
          <div
            class="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            <PropertyCard
              v-for="property in filteredProperties"
              :key="property.id"
              :property="property"
              :is-landlord="isLandlord"
              @edit="editProperty"
            />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  computed,
  onMounted,
  inject,
  onBeforeMount,
  onUnmounted,
} from "vue";
import { useRouter } from "vue-router";
import { mockProperties } from "../data/mockProperties";

// Add role-based access control
const router = useRouter();

onBeforeMount(() => {
  const userData = localStorage.getItem("user");
  if (!userData) {
    router.push("/auth/login");
    return;
  }

  const user = JSON.parse(userData);
  const allowedRoles = ["ADMIN", "LANDLORD", "PROPERTY_MANAGER"];
  if (!allowedRoles.includes(user.role)) {
    router.push("/dashboard");
  }
});

const userRole = ref<string>("");
const properties = ref(mockProperties);
const currentImageIndex = ref<Record<number, number>>({});
const imageIntervals = ref<Record<number, NodeJS.Timeout>>({});

// Filter tabs
const tabs = [
  { name: "All", value: "all" },
  { name: "Available", value: "available" },
  { name: "Rented", value: "rented" },
];
const activeTab = ref("all");

// Filtered properties based on active tab
const filteredProperties = computed(() => {
  if (activeTab.value === "all") return properties.value;
  if (activeTab.value === "available")
    return properties.value.filter((p) => p.available);
  return properties.value.filter((p) => !p.available);
});

// Initialize currentImageIndex for each property
properties.value.forEach((property) => {
  currentImageIndex.value[property.id] = 0;
});

// Function to set current image
const setCurrentImage = (propertyId: number, index: number) => {
  currentImageIndex.value[propertyId] = index;

  // Clear existing interval
  if (imageIntervals.value[propertyId]) {
    clearInterval(imageIntervals.value[propertyId]);
  }

  // Start new interval
  imageIntervals.value[propertyId] = setInterval(() => {
    currentImageIndex.value[propertyId] =
      (currentImageIndex.value[propertyId] + 1) %
      properties.value.find((p) => p.id === propertyId)!.images.length;
  }, 5000);
};

// Start image rotation intervals
onMounted(() => {
  properties.value.forEach((property) => {
    if (property.images.length > 1) {
      imageIntervals.value[property.id] = setInterval(() => {
        currentImageIndex.value[property.id] =
          (currentImageIndex.value[property.id] + 1) % property.images.length;
      }, 5000); // Change image every 5 seconds
    }
  });

  const userData = localStorage.getItem("user");
  if (userData) {
    const user = JSON.parse(userData);
    userRole.value = user.role;
  }
});

// Clean up intervals on component unmount
onUnmounted(() => {
  Object.values(imageIntervals.value).forEach((interval) => {
    clearInterval(interval);
  });
});

const isLandlord = computed(() => {
  return ["LANDLORD", "PROPERTY_MANAGER"].includes(userRole.value);
});

const openPropertyModal =
  inject<(property: any | null) => void>("openPropertyModal");

const editProperty = (property: any) => {
  if (openPropertyModal) {
    openPropertyModal(property);
  }
};
</script>

import ImageCarousel from '../components/ImageCarousel.vue'; import StatusBadge
from '../components/StatusBadge.vue'; import PropertyCard from
'../components/PropertyCard.vue';
