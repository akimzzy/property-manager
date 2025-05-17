<template>
  <div class="">
    <header>
      <div class="">
        <BackButton class="mb-4" page="/dashboard"> Dashboard </BackButton>
        <div class="flex justify-between items-center">
          <h1 class="text-3xl font-bold leading-tight text-gray-900">
            {{ isManager ? "Manage Properties" : "Available Properties" }}
          </h1>
          <div class="flex items-center space-x-4">
            <UiButton
              v-if="isManager"
              @click="openPropertyModal?.(null)"
              size="md"
              variant="primary"
            >
              Add Property
            </UiButton>
          </div>
        </div>
      </div>
    </header>

    <main>
      <div class="mt-5">
        <!-- Filter Tabs -->
        <TabGroup
          v-model="activeTab"
          :tabs="tabs"
          aria-label="Property filters"
          class="mt-4"
        />
        <div v-if="propertiesLoading">Fetching properties...</div>

        <!-- Property Grid -->
        <div
          v-else
          class="px-4 py-6 sm:px-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5"
        >
          <PropertyCard
            v-for="property in filteredProperties"
            :key="property.id"
            :property="property"
            :is-landlord="isManager"
            @edit="editProperty"
          />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import type { Property } from "../types";

definePageMeta({
  layout: "authenticated",
});

const {
  data: properties,
  pending: propertiesLoading,
  error: propertiesError,
} = await useAPI<Property[]>("/properties/manager");

// Add role-based access control
// const router = useRouter();
const { role } = useDecodedAuth();
const isManager = computed(() => role.value === "manager");

// onBeforeMount(() => {
//   if (!isManager.value) {
//     router.push("/dashboard");
//   }
// });

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
    return properties.value?.filter((p) => p.available);
  return properties.value?.filter((p) => !p.available);
});

const openPropertyModal =
  inject<(property: any | null) => void>("openPropertyModal");

const editProperty = (property: any) => {
  if (openPropertyModal) {
    openPropertyModal(property);
  }
};
</script>
