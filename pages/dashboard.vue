<template>
  <div>
    <div>
      <main>
        <div class="">
          <div class="px-4 py-6 sm:px-0">
            <!-- Manager View -->
            <ManagerOverview
              v-if="isManager"
              :properties="mockProperties"
              :activities="recentActivities"
              :total-tenants="totalTenants"
              :total-monthly-rent="totalMonthlyRent"
              :pending-maintenance-count="pendingMaintenanceCount"
              :is-property-manager="isPropertyManager"
              :open-property-modal="openPropertyModal"
            />

            <!-- Tenant View -->
            <TenantView
              v-else
              :available-properties="availableProperties"
              :rented-properties="rentedProperties"
              :open-application-modal="openApplicationModal"
            />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, inject } from "vue";
import { mockProperties, type Property } from "../data/mockProperties";
import { mockTenants } from "../data/mockTenants";
import { mockActivities, type Activity } from "../data/mockActivities";
import ManagerOverview from "~/components/dashboard/ManagerOverview.vue";
import TenantView from "~/components/dashboard/TenantView.vue";

const userRole = ref<string>("");
const rentedProperties = ref<Property[]>([]);
const recentActivities = ref<Activity[]>(mockActivities);

// Computed properties
const isManager = computed(() =>
  ["LANDLORD", "PROPERTY_MANAGER"].includes(userRole.value)
);
const isPropertyManager = computed(() => userRole.value === "PROPERTY_MANAGER");
const isAdminOrLandlord = computed(() =>
  ["ADMIN", "LANDLORD", "PROPERTY_MANAGER"].includes(userRole.value)
);
const availableProperties = computed(() =>
  mockProperties.filter((p) => p.available)
);

// Mock data for dashboard stats
const totalTenants = computed(() => mockTenants.length);
const totalMonthlyRent = computed(() =>
  mockProperties.reduce((sum, prop) => sum + (prop.price || 0), 0)
);
const pendingMaintenanceCount = computed(() => 5); // Mock value

// Inject modals
const openPropertyModal =
  inject<(propertyId: number | null) => void>("openPropertyModal");
const openApplicationModal = inject<(propertyId: number) => void>(
  "openApplicationModal"
);

onMounted(() => {
  const userData = localStorage.getItem("user");
  if (userData) {
    const user = JSON.parse(userData);
    userRole.value = user.role;

    // Set rented properties for tenant view
    if (!isAdminOrLandlord.value) {
      rentedProperties.value = mockProperties.filter((p) => !p.available);
    }
  }
});
</script>
