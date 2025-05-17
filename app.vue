<template>
  <NuxtLayout>
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
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, provide } from "vue";
import type { Property } from "./types";

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
  console.log("Property submitted:", propertyData);
  if (selectedProperty.value) {
    // Update existing property
  } else {
    // Add new property
  }
  // showPropertyModal.value = false;
  // selectedProperty.value = undefined;
};

const handleApplicationSubmit = (applicationData: any) => {
  // Dispatch event for application submission
  const event = new CustomEvent("application-submitted", {
    detail: applicationData,
  });
  window.dispatchEvent(event);
};
</script>
