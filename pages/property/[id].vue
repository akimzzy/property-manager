<template>
  <div class="min-h-screen bg-gray-100">
    <AppHeader />

    <div class="py-10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="mb-6">
          <BackButton />
        </div>
        <!-- Property Details -->
        <div
          v-if="property"
          class="bg-white shadow overflow-hidden sm:rounded-lg"
        >
          <!-- Image Carousel -->
          <div class="relative w-full overflow-hidden" style="height: 400px">
            <ImageCarousel
              :images="property.images"
              :alt-text="property.title"
              :show-dots="true"
              class="w-full h-full object-cover"
            />
          </div>

          <!-- Property Information -->
          <div class="px-4 py-5 sm:px-6">
            <div class="flex justify-between items-start">
              <div>
                <h3 class="text-2xl font-bold text-gray-900">
                  {{ property.title }}
                </h3>
                <p class="mt-2 text-xl font-semibold text-gray-900">
                  ${{ property.price }}/month
                </p>
              </div>
              <div class="flex items-center space-x-4">
                <StatusBadge
                  :status="property.available ? 'available' : 'rented'"
                />
                <div v-if="isLandlord" class="flex items-center space-x-4">
                  <button
                    @click="openPropertyModal(property)"
                    class="text-blue-600 hover:text-blue-900 text-sm font-medium flex items-center"
                  >
                    <svg
                      class="h-4 w-4 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                    Edit
                  </button>
                  <button
                    @click="showDeleteModal = true"
                    class="text-red-600 hover:text-red-900 text-sm font-medium flex items-center"
                  >
                    <svg
                      class="h-4 w-4 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                    Delete
                  </button>
                </div>
              </div>
            </div>

            <div class="mt-4">
              <p class="text-gray-600">{{ property.description }}</p>
            </div>

            <div class="mt-6 border-t border-gray-200 pt-6">
              <dl class="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                <div>
                  <dt class="text-sm font-medium text-gray-500">Address</dt>
                  <dd class="mt-1 text-sm text-gray-900">
                    {{ property.street }}<br />
                    {{ property.city }}, {{ property.state }}
                    {{ property.zipCode }}
                  </dd>
                </div>

                <div v-if="property.tenantName && isLandlord">
                  <dt class="text-sm font-medium text-gray-500">
                    Current Tenant
                  </dt>
                  <dd class="mt-1 text-sm text-gray-900">
                    {{ property.tenantName }}
                  </dd>
                </div>
              </dl>

              <!-- Tabs Navigation -->
              <TabGroup
                v-if="isLandlord"
                v-model="activeTab"
                :tabs="[
                  {
                    name: 'Maintenance Requests',
                    value: 'Maintenance Requests',
                    count: maintenanceRequests.length || undefined,
                  },
                  {
                    name: 'Applications',
                    value: 'Applications',
                    count: applications.length || undefined,
                  },
                ]"
                aria-label="Property management tabs"
                class="mt-6"
              />

              <!-- Tab Content -->
              <div v-if="isLandlord" class="mt-6">
                <!-- Maintenance Requests Tab -->
                <div v-if="activeTab === 'Maintenance Requests'">
                  <div v-if="maintenanceRequests.length > 0" class="space-y-4">
                    <div
                      v-for="request in maintenanceRequests"
                      :key="request.id"
                      class="bg-white shadow overflow-hidden sm:rounded-lg"
                    >
                      <div class="px-4 py-5 sm:px-6">
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
                              'bg-yellow-100 text-yellow-800':
                                request.status === 'pending',
                              'bg-blue-100 text-blue-800':
                                request.status === 'in_progress',
                              'bg-green-100 text-green-800':
                                request.status === 'completed',
                            }"
                            class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                          >
                            {{ request.status.replace("_", " ") }}
                          </span>
                        </div>
                        <div class="mt-2 text-sm text-gray-500">
                          <p>
                            Submitted:
                            {{
                              new Date(request.createdAt).toLocaleDateString()
                            }}
                          </p>
                          <p>
                            Last Updated:
                            {{
                              new Date(request.updatedAt).toLocaleDateString()
                            }}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div v-else class="text-sm text-gray-500 text-center py-4">
                    No maintenance requests found.
                  </div>
                </div>

                <!-- Applications Tab -->
                <div v-if="activeTab === 'Applications'" class="mt-6">
                  <div class="bg-white p-4 rounded-md shadow">
                    <h3 class="text-lg font-medium text-gray-900 mb-4">
                      Tenant Applications
                    </h3>
                    <div v-if="applications.length > 0" class="space-y-4">
                      <div
                        v-for="application in applications"
                        :key="application.id"
                        class="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0"
                      >
                        <div class="flex justify-between items-start">
                          <div>
                            <h4 class="text-sm font-medium text-gray-900">
                              {{ application.name }}
                            </h4>
                            <p class="text-sm text-gray-500">
                              Applied:
                              {{
                                new Date(
                                  application.createdAt
                                ).toLocaleDateString()
                              }}
                            </p>
                            <p class="text-sm text-gray-600 mt-2">
                              {{ application.message }}
                            </p>
                          </div>
                          <div class="flex space-x-2">
                            <button
                              @click="
                                handleApplicationAction(
                                  application.id,
                                  'approve'
                                )
                              "
                              class="px-3 py-1 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            >
                              Approve
                            </button>
                            <button
                              @click="
                                handleApplicationAction(
                                  application.id,
                                  'reject'
                                )
                              "
                              class="px-3 py-1 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            >
                              Reject
                            </button>
                          </div>
                        </div>
                        <div class="mt-2">
                          <dl class="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <dt class="text-gray-500">Email</dt>
                              <dd class="text-gray-900">
                                {{ application.email }}
                              </dd>
                            </div>
                            <div>
                              <dt class="text-gray-500">Phone</dt>
                              <dd class="text-gray-900">
                                {{ application.phone }}
                              </dd>
                            </div>
                          </dl>
                        </div>
                      </div>
                    </div>
                    <div v-else class="text-sm text-gray-500">
                      No applications received yet.
                    </div>
                  </div>
                  <div
                    v-if="!property.available"
                    class="bg-yellow-50 p-4 rounded-md"
                  >
                    <h4 class="text-sm font-medium text-yellow-800">
                      Rental Information
                    </h4>
                    <div class="mt-2 text-sm text-yellow-700">
                      <p>Rented since: [Add Rental Start Date]</p>
                      <p>Lease expires: [Add Lease End Date]</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Tenant-specific Actions -->
            <div v-if="!isLandlord" class="mt-6">
              <button
                v-if="property.available"
                @click="openApplicationModal"
                class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Apply to Rent
              </button>
              <button
                v-if="!property.available && isCurrentTenant"
                @click="openMaintenanceModal"
                class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Request Maintenance
              </button>
              <div v-if="!property.available && isCurrentTenant" class="mt-6">
                <h3 class="text-lg font-medium text-gray-900 mb-4">
                  Maintenance Request History
                </h3>
                <div
                  v-if="propertyMaintenanceRequests.length > 0"
                  class="space-y-4"
                >
                  <div
                    v-for="request in propertyMaintenanceRequests"
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
                          'bg-yellow-100 text-yellow-800':
                            request.status === 'pending',
                          'bg-blue-100 text-blue-800':
                            request.status === 'in_progress',
                          'bg-green-100 text-green-800':
                            request.status === 'completed',
                        }"
                        class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                      >
                        {{ request.status.replace("_", " ") }}
                      </span>
                    </div>
                    <div class="mt-2 text-sm text-gray-500">
                      <p>
                        Submitted:
                        {{ new Date(request.createdAt).toLocaleDateString() }}
                      </p>
                      <p>
                        Last Updated:
                        {{ new Date(request.updatedAt).toLocaleDateString() }}
                      </p>
                    </div>
                  </div>
                </div>
                <div v-else class="text-sm text-gray-500 text-center py-4">
                  No maintenance requests found.
                </div>
              </div>
            </div>

            <ApplicationModal
              :is-open="isApplicationModalOpen"
              :property-id="property?.id"
              @close="closeApplicationModal"
              @submit="handleApplicationSubmit"
            />

            <MaintenanceRequestModal
              :is-open="isMaintenanceModalOpen"
              :property-id="property?.id"
              @close="closeMaintenanceModal"
              @submit="handleMaintenanceSubmit"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <DeleteConfirmationModal
      :show="showDeleteModal"
      @confirm="handleDelete"
      @close="showDeleteModal = false"
    />
  </div>
</template>

<script setup lang="ts">
import { type Property, mockProperties } from "../../data/mockProperties";
import { mockTenants, type MaintenanceRequest } from "../../data/mockTenants";
import {
  type TenantApplication,
  mockApplications,
} from "../../data/mockApplications";

const isApplicationModalOpen = ref(false);
const isMaintenanceModalOpen = ref(false);
const applications = ref<TenantApplication[]>([]);
const propertyMaintenanceRequests = ref<MaintenanceRequest[]>([]);
const activeTab = ref("Maintenance Requests");

const openApplicationModal = () => {
  isApplicationModalOpen.value = true;
};

const closeApplicationModal = () => {
  isApplicationModalOpen.value = false;
};

const handleApplicationSubmit = (application: any) => {
  applications.value.push(application);
  console.log("Application submitted:", application);
};

const route = useRoute();

const property = ref<Property | null>(null);
const currentImageIndex = ref(0);
const userRole = ref<string>("");
const maintenanceRequests = ref<MaintenanceRequest[]>([]);

// Add openPropertyModal injection
const openPropertyModal = inject("openPropertyModal") as (
  property: Property | null
) => void;

const isLandlord = computed(() => {
  return ["LANDLORD", "PROPERTY_MANAGER"].includes(userRole.value);
});

const isCurrentTenant = computed(() => {
  if (
    !property.value ||
    userRole.value === "LANDLORD" ||
    userRole.value === "PROPERTY_MANAGER"
  )
    return false;
  const userData = localStorage.getItem("user");
  if (!userData) return false;
  const user = JSON.parse(userData);
  const tenant = mockTenants.find((t) => t.email === user.email);
  return (
    tenant?.rentedProperties.some((p) => p.propertyId === property.value?.id) ||
    false
  );
});

const openMaintenanceModal = () => {
  isMaintenanceModalOpen.value = true;
};

const closeMaintenanceModal = () => {
  isMaintenanceModalOpen.value = false;
};

const handleMaintenanceSubmit = (request: any) => {
  console.log("Maintenance request submitted:", request);
  propertyMaintenanceRequests.value.push(request);
};

const prevImage = () => {
  if (!property.value) return;
  currentImageIndex.value =
    (currentImageIndex.value - 1 + property.value.images.length) %
    property.value.images.length;
};

const nextImage = () => {
  if (!property.value) return;
  currentImageIndex.value =
    (currentImageIndex.value + 1) % property.value.images.length;
};

onMounted(async () => {
  // Get user data from localStorage
  const userData = localStorage.getItem("user");
  if (userData) {
    const user = JSON.parse(userData);
    userRole.value = user.role;
  }

  // Get property data from mock data using route parameter
  const propertyId = parseInt(route.params.id as string);
  const foundProperty = mockProperties.find((p) => p.id === propertyId);

  if (!foundProperty) {
    navigateTo("/properties"); // Redirect to properties list if not found
    return;
  }

  property.value = foundProperty;

  // Get maintenance requests for this property
  const propertyRequests = mockTenants
    .flatMap((tenant) => tenant.maintenanceRequests)
    .filter((request) => request.propertyId === propertyId);
  maintenanceRequests.value = propertyRequests;

  // Initialize propertyMaintenanceRequests for current tenant
  if (!isLandlord.value) {
    const user = JSON.parse(userData || "{}");
    const tenant = mockTenants.find((t) => t.email === user.email);
    if (tenant) {
      propertyMaintenanceRequests.value = tenant.maintenanceRequests.filter(
        (request) => request.propertyId === propertyId
      );
    }
  }

  // Load applications for this property
  applications.value = mockApplications.filter(
    (app) => app.propertyId === propertyId
  );
});

// Add to the script section
const handleApplicationAction = (
  applicationId: string,
  action: "approve" | "reject"
) => {
  const applicationIndex = applications.value.findIndex(
    (app) => app.id === applicationId
  );
  if (applicationIndex === -1) return;

  if (action === "approve") {
    // Update property status and tenant information
    if (property.value) {
      property.value.available = false;
      property.value.tenantName = applications.value[applicationIndex].name;
    }
  }

  // Remove the application from the list
  applications.value.splice(applicationIndex, 1);
};
const showDeleteModal = ref(false);

const handleDelete = () => {
  // Add your delete logic here
  showDeleteModal.value = false;
  navigateTo("/properties");
};
</script>
