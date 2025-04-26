<template>
  <div class="space-y-6">
    <!-- Tabs -->
    <div class="flex justify-end">
      <TabGroup
        v-model="activeTab"
        :tabs="[
          { name: 'Available Properties', value: 'available' },
          { name: 'My Rentals', value: 'rented' },
          { name: 'Maintenance Requests', value: 'maintenance' },
        ]"
        aria-label="Tenant dashboard tabs"
      />
    </div>

    <!-- Available Properties Tab -->
    <div v-if="activeTab === 'available'">
      <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <PropertyCard
          v-for="property in availableProperties"
          :key="property.id"
          :property="property"
          :is-landlord="false"
        />
      </div>
    </div>

    <!-- Rented Properties Tab -->
    <div v-if="activeTab === 'rented'">
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <PropertyCard
          v-for="property in rentedProperties"
          :key="property.propertyId"
          :property="{
            ...property,
            id: property.propertyId,
            price: property.monthlyRent,
          }"
          :is-landlord="false"
        />
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
import PropertyCard from "~/components/PropertyCard.vue";

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

// Maintenance request modal state
const isMaintenanceModalOpen = ref(false);
const selectedPropertyId = ref<number | null>(null);

// Function to submit maintenance request
const submitMaintenanceRequest = (propertyId: number) => {
  selectedPropertyId.value = propertyId || 0;
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
</script>
