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
definePageMeta({
  layout: "authenticated",
});
import { ref, computed, onMounted, inject } from "vue";
import { mockProperties, type Property } from "../data/mockProperties";
import { mockTenants } from "../data/mockTenants";
import { mockActivities, type Activity } from "../data/mockActivities";
import ManagerOverview from "~/components/dashboard/ManagerOverview.vue";
import TenantView from "~/components/dashboard/TenantView.vue";

const rentedProperties = ref<Property[]>([]);
const recentActivities = ref<Activity[]>(mockActivities);

const { role } = useDecodedAuth();
console.log(role.value);
// Computed properties
const isManager = computed(() => role.value === "manager");
const isPropertyManager = computed(() => role.value === "manager");

const isAdminOrLandlord = computed(() => role.value === "manager");
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
  if (!isAdminOrLandlord.value) {
    rentedProperties.value = mockProperties.filter((p) => !p.available);
  }
});
</script>
