<template>
  <div>
    <NuxtPage />
    <PropertyModal
      v-model:show="showPropertyModal"
      :property="selectedProperty"
      @submit="handlePropertySubmit"
    />
    <ApplicationModal
      :is-open="showApplicationModal"
      :property-id="selectedPropertyId"
      @close="closeApplicationModal"
      @submit="handleApplicationSubmit"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, provide } from "vue";
import { type Property } from "./data/mockProperties";

const showPropertyModal = ref(false);
const selectedProperty = ref<Property | undefined>(undefined);
const showApplicationModal = ref(false);
const selectedPropertyId = ref<number>(0);

const openPropertyModal = (property: Property | undefined) => {
  selectedProperty.value = property;
  showPropertyModal.value = true;
};

const openApplicationModal = (propertyId: number) => {
  selectedPropertyId.value = propertyId;
  showApplicationModal.value = true;
};

const closeApplicationModal = () => {
  showApplicationModal.value = false;
};

provide("openPropertyModal", openPropertyModal);
provide("openApplicationModal", openApplicationModal);

const handlePropertySubmit = (propertyData: Omit<Property, "id">) => {
  if (selectedProperty.value) {
    // Update existing property
    const event = new CustomEvent("property-updated", {
      detail: { ...propertyData, id: selectedProperty.value.id },
    });
    window.dispatchEvent(event);
  } else {
    // Add new property
    const event = new CustomEvent("property-added", {
      detail: propertyData,
    });
    window.dispatchEvent(event);
  }
  showPropertyModal.value = false;
  selectedProperty.value = undefined;
};

const handleApplicationSubmit = (applicationData: any) => {
  // Dispatch event for application submission
  const event = new CustomEvent("application-submitted", {
    detail: applicationData,
  });
  window.dispatchEvent(event);
};
</script>
