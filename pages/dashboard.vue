<template>
  <div>
    <div>
      <main>
        <div class="">
          <div class="px-4 py-6 sm:px-0">
            <!-- Manager View -->
            <ManagerOverview v-if="isManager" />

            <!-- Tenant View -->
            <TenantView v-else :open-application-modal="openApplicationModal" />
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
import { mockProperties } from "../data/mockProperties";

import type { Property } from "../types";
import ManagerOverview from "~/components/dashboard/ManagerOverview.vue";
import TenantView from "~/components/dashboard/TenantView.vue";

const rentedProperties = ref<Property[]>([]);

const { role } = useDecodedAuth();

// Computed properties
const isManager = computed(() => role.value === "manager");

onMounted(() => {
  if (!isManager.value) {
    rentedProperties.value = mockProperties.filter((p) => !p.available);
  }
});
</script>
