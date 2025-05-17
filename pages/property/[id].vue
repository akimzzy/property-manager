<template>
  <div class="h-full w-full">
    <div class="h-full">
      <div class="mb-6">
        <BackButton />
      </div>

      <!-- Property Details -->

      <div
        v-if="property"
        class="overflow-hidden sm:rounded-lg flex flex-col lg:flex-row h-full gap-10"
        style="height: calc(100vh - 205px)"
      >
        <!-- Left Section: Property Information -->
        <div
          class="flex-1 min-w-0 overflow-y-auto h-full flex"
          style="min-height: calc(100vh - 150px)"
        >
          <div>
            <!-- Image Carousel -->
            <div
              class="relative w-full overflow-hidden rounded-3xl md:h-[450px]"
            >
              <ImageCarousel
                :images="property.images"
                :alt-text="property.title"
                :show-dots="true"
                class="w-full h-full object-cover"
              />
            </div>

            <!-- Property Information -->
            <div
              class="px-4 py-5 sm:p-5 overflow-y-auto"
              style="height: calc(100vh - 200px)"
            >
              <div>
                <div>
                  <div class="flex gap-10 justify-between">
                    <div>
                      <h3 class="text-lg font-semibold text-gray-900">
                        {{ property.title }}
                      </h3>
                      <div
                        class="mt-1 text-sm text-gray-600 flex gap-2 items-center"
                      >
                        <span>
                          {{ property.street }}, {{ property.city }},
                          {{ property.state }}.
                        </span>
                        <span class="">
                          Zip code - {{ property.zipCode }}
                        </span>
                      </div>
                    </div>
                    <div class="flex items-center gap-4">
                      <p class="text-md font-semibold text-gray-900">
                        ₦{{ property.price }}/month
                      </p>
                      <UiButton
                        @click="openApplicationModal"
                        variant="primary"
                        size="md"
                        class="flex items-center w-max"
                      >
                        Apply to rent
                        <UiArrowIcon class="rotate-[140deg] ml-2" />
                      </UiButton>
                    </div>
                  </div>
                  <p class="text-gray-600 text-sm mt-4">
                    <!-- {{ property.description }} -->
                    Enjoy comfort and convenience in this well-maintained
                    five-bedroom apartment located just a short walk from the
                    main road and a major bus stop — perfect for commuters and
                    city explorers alike!
                  </p>
                </div>

                <div class="my-8">
                  <div class="flex flex-wrap gap-2">
                    <div
                      class="flex items-center gap-1 border border-gray-200 p-2 rounded-lg px-3 bg-gray-50 text-xs"
                      v-for="(value, key) in {
                        rooms: property.rooms,
                        bathroom: property.bathrooms,
                        toilet: property.toilets,
                      }"
                      :key="key"
                    >
                      <span
                        class="flex items-center mr-2 font-semibold text-gray-600 capitalize"
                      >
                        <span> {{ key }} </span>
                      </span>
                      <p class="text-gray-500">
                        {{ value }}
                      </p>
                    </div>

                    <div
                      class="flex items-center gap-1 border border-gray-200 p-2 rounded-lg px-3 bg-gray-50 text-xs"
                      v-for="(value, key) in features"
                      :key="key"
                    >
                      <span
                        class="flex items-center mr-2 font-semibold text-gray-600 capitalize"
                      >
                        <span> {{ key }} </span>
                      </span>
                      <p class="text-gray-500">
                        {{ value }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex items-center space-x-4">
                <!-- <StatusBadge
                  :status="property.available ? 'available' : 'rented'"
                /> -->
              </div>

              <div class="mt-5 border-t border-gray-200 pt-5">
                <dl class="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                  <div v-if="property.tenantName && isPropertyManager">
                    <dt class="text-sm font-medium text-gray-500">
                      Current Tenant
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900">
                      {{ property.tenantName }}
                    </dd>
                  </div>
                </dl>

                <TabGroup
                  v-if="isPropertyManager"
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

                <div v-if="isPropertyManager" class="mt-6">
                  <div v-if="activeTab === 'Maintenance Requests'">
                    <div
                      v-if="maintenanceRequests.length > 0"
                      class="space-y-4"
                    >
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
                              <Button
                                @click="
                                  handleApplicationAction(
                                    application.id,
                                    'approve'
                                  )
                                "
                                variant="primary"
                                size="sm"
                                class="px-3 py-1 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                              >
                                Approve
                              </Button>
                              <Button
                                @click="
                                  handleApplicationAction(
                                    application.id,
                                    'reject'
                                  )
                                "
                                variant="secondary"
                                size="sm"
                                class="px-3 py-1 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                              >
                                Reject
                              </Button>
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

              <div v-if="!isPropertyManager" class="mt-6">
                <button
                  v-if="property.available"
                  @click="openApplicationModal"
                  variant="primary"
                  size="md"
                  class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Apply to Rent
                </button>
                <button
                  v-if="!property.available && isCurrentTenant"
                  @click="openMaintenanceModal"
                  variant="primary"
                  size="md"
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

          <div v-if="isPropertyManager" class="flex flex-col ml-4 gap-4">
            <button
              @click="openPropertyModal(property)"
              class="size-12 bg-blue-50 p-0 m-0 flex justify-center items-center rounded-xl text-blue-600 hover:text-blue-900 cursor-pointer"
            >
              <svg
                class="h-4 w-4"
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
            </button>
            <button
              class="size-12 bg-red-50 p-0 m-0 flex justify-center items-center rounded-xl text-red-600 hover:text-red-900 cursor-pointer"
              @click="showDeleteModal = true"
            >
              <svg
                class="h-4 w-4"
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
            </button>
          </div>
        </div>

        <!-- Right Section: Comments -->
        <div
          class="lg:w-1/3 h-full rounded-3xl border border-gray-200 overflow-hidden"
        >
          <div class="border-b border-gray-200 p-6 bg-gray-50">
            <h3 class="text- font-medium text-gray-900 mb-2">
              Comments & Questions
            </h3>

            <!-- Add Comment Form -->
            <div class="flex space-x-4">
              <div class="flex-1">
                <UiCommentInput
                  :placeholder="'Add a comment...'"
                  :initialText="newComment"
                  @onSubmit="addComment"
                  @onCancel="() => (newComment = '')"
                />
              </div>
            </div>
          </div>

          <!-- Comments List -->
          <div class="space-y-6 max-h-[600px] overflow-y-auto bg-white">
            <CommentSection :comments="propertyComments" />
          </div>
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
</template>

<script setup lang="ts">
import { type Property } from "../../types";
import { mockTenants } from "../../data/mockTenants";
import type { MaintenanceRequest } from "../../types";
import { mockComments } from "../../data/mockComments";
import type { Comment } from "../../types";
import CommentSection from "../../components/CommentSection.vue";
import Button from "~/components/ui/Button.vue";

const route = useRoute();
const { role: userRole, decoded } = useDecodedAuth();
const { $api } = useNuxtApp();

const features = {
  bedrooms: "Two spacious bedrooms with ample closet space",
  living_area:
    "Bright and airy living room perfect for relaxation or entertaining guests",
  kitchen: "Modern kitchen with cabinets and generous storage space",
  bathroom: "Clean, well-ventilated bathroom with essential fittings",
  location: "Close to the main road and a major bus stop for easy commuting",
  water_supply: "Reliable 24/7 water supply",
  security: "Secure and safe environment for peace of mind",
  natural_light: "Plenty of natural light throughout the apartment",
  proximity_to_amenities: "Near local shops, schools, and markets",
  parking: "On-site or nearby parking available for residents",
};

const {
  data: property,
  status: propertyStatus,
  error: propertyError,
} = await useAPI<Property>(`/properties/${route.params.id}`);

const isApplicationModalOpen = ref(false);
const isMaintenanceModalOpen = ref(false);
const applications = ref<TenantApplication[]>([]);
const propertyMaintenanceRequests = ref<MaintenanceRequest[]>([]);
const activeTab = ref("Maintenance Requests");

const propertyComments = ref<Comment[]>(
  mockComments.filter((comment) => comment.propertyId === 1)
);
const newComment = ref("");

const addComment = () => {
  if (!newComment.value.trim()) return;

  const userData = localStorage.getItem("access_token");
  const user = userData ? JSON.parse(userData) : null;

  const comment: Comment = {
    id: Math.random().toString(36).substr(2, 9),
    userName: user?.name || "Anonymous",
    text: newComment.value,
    timestamp: new Date().toLocaleString(),
    isPropertyManager: ["LANDLORD", "PROPERTY_MANAGER"].includes(
      userRole.value
    ),
    replies: [],
  };

  propertyComments.value.push(comment);
  newComment.value = "";
};

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

const currentImageIndex = ref(0);

const maintenanceRequests = ref<MaintenanceRequest[]>([]);

// Add openPropertyModal injection
const openPropertyModal = inject("openPropertyModal") as (
  property: Property | null
) => void;

const isPropertyManager = computed(
  () =>
    userRole.value === "manager" &&
    property.value?.manager?.user?.id === decoded.value?.sub
);

const isCurrentTenant = computed(() => {
  if (!property.value || userRole.value === "manager") return false;
  const userData = localStorage.getItem("access_token");
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

onMounted(async () => {
  // Get maintenance requests for this property
  const propertyRequests = mockTenants
    .flatMap((tenant) => tenant.maintenanceRequests)
    .filter((request) => request.propertyId === 1);
  maintenanceRequests.value = propertyRequests;

  // Initialize propertyMaintenanceRequests for current tenant
  if (!isPropertyManager.value) {
    const tenant = mockTenants.find((t) => t.email === "user.email");
    if (tenant) {
      propertyMaintenanceRequests.value = tenant.maintenanceRequests.filter(
        (request) => request.propertyId === 2
      );
    }
  }
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

const handleDelete = async () => {
  try {
    // Add your delete logic here
    const response = await $api(`/properties/${route.params.id}`, {
      method: "DELETE",
    });
    console.log(response);
  } catch (error) {
    console.log(error);
  }
  showDeleteModal.value = false;
  navigateTo("/properties");
};
</script>
