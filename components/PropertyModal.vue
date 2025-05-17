<template>
  <div v-if="show" class="fixed inset-0 z-10 overflow-y-auto">
    <div
      class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0"
    >
      <div class="fixed inset-0 transition-opacity" aria-hidden="true">
        <div class="absolute inset-0 bg-gray-700/20 backdrop-blur"></div>
      </div>

      <div
        class="inline-block align-bottom rounded-3xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full relative z-20 bg-gradient-to-br from-blue-50 via-white to-blue-100"
      >
        <form @submit.prevent="handleSubmit">
          <div class="px-4 pt-5 pb-4 sm:p-6 sm:pb-4 border-b border-gray-200">
            <h2 class="text-lg font-medium text-gray-500 truncate">
              {{ property ? "Edit Property" : "Create Property" }}
            </h2>
          </div>
          <div
            class="px-4 sm:px-6 py-6 max-h-[calc(90vh-180px)] overflow-y-auto"
          >
            <!-- Section 1: Title, Description, Price -->
            <PropertyModalSectionWrapper title="Basic Information">
              <div class="mb-4">
                <label
                  for="title"
                  class="block text-xs font-medium text-gray-700"
                  >Title</label
                >
                <input
                  type="text"
                  id="title"
                  v-model="form.title"
                  required
                  class="mt-1 block w-full border border-gray-200 rounded-xl py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-xs"
                />
              </div>
              <div class="mb-4">
                <label
                  for="description"
                  class="block text-xs font-medium text-gray-700"
                  >Description</label
                >
                <textarea
                  id="description"
                  v-model="form.description"
                  rows="3"
                  required
                  class="mt-1 block w-full border border-gray-300 rounded-xl py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-xs"
                ></textarea>
              </div>
              <div class="">
                <div class="mb-4">
                  <label
                    for="street"
                    class="block text-xs font-medium text-gray-700"
                    >Street Address</label
                  >
                  <textarea
                    id="street"
                    v-model="form.street"
                    required
                    rows="2"
                    class="mt-1 block w-full border border-gray-300 rounded-xl py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-xs"
                  ></textarea>
                </div>
                <div class="flex flex-col gap-4 sm:flex-row sm:gap-4">
                  <div class="mb-4 flex-1">
                    <label
                      for="city"
                      class="block text-xs font-medium text-gray-700"
                      >City</label
                    >
                    <input
                      type="text"
                      id="city"
                      v-model="form.city"
                      required
                      class="mt-1 block w-full border border-gray-300 rounded-xl py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-xs"
                    />
                  </div>
                  <div class="mb-4 flex-1">
                    <label
                      for="state"
                      class="block text-xs font-medium text-gray-700"
                      >State</label
                    >
                    <input
                      type="text"
                      id="state"
                      v-model="form.state"
                      required
                      class="mt-1 block w-full border border-gray-300 rounded-xl py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-xs"
                    />
                  </div>
                  <div class="mb-4 flex-1">
                    <label
                      for="zipCode"
                      class="block text-xs font-medium text-gray-700"
                      >ZIP Code</label
                    >
                    <input
                      type="text"
                      id="zipCode"
                      v-model="form.zipCode"
                      required
                      class="mt-1 block w-full border border-gray-300 rounded-xl py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-xs"
                    />
                  </div>
                </div>
              </div>
              <div class="mb-4 flex flex-col sm:flex-row sm:items-end sm:gap-4">
                <div class="flex-1">
                  <label
                    for="price"
                    class="block text-xs font-medium text-gray-700"
                    >Monthly Rent (₦)</label
                  >
                  <input
                    type="number"
                    id="price"
                    v-model.number="form.price"
                    required
                    min="0"
                    class="mt-1 block w-full border border-gray-300 rounded-xl py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-xs"
                  />
                </div>
                <div class="flex-1">
                  <label
                    for="yearlyRent"
                    class="block text-xs font-medium text-gray-700"
                    >Yearly Rent (₦)</label
                  >
                  <input
                    type="number"
                    id="yearlyRent"
                    v-model.number="form.yearlyRent"
                    required
                    min="0"
                    class="mt-1 block w-full border border-gray-300 rounded-xl py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-xs"
                  />
                </div>
              </div>
              <div class="mb-4 flex items-center gap-2">
                <UiToggle v-model="autoCalculateRent" />
                <label
                  for="auto-calc-toggle"
                  class="block text-xs text-gray-900 select-none cursor-pointer"
                  @click.prevent="autoCalculateRent = !autoCalculateRent"
                >
                  Auto-calculate yearly/monthly rent
                </label>
              </div>
            </PropertyModalSectionWrapper>

            <!-- Section 2: Address Fields -->

            <!-- Section 3: Features -->
            <PropertyModalSectionWrapper title="Features">
              <div class="">
                <div
                  v-for="(feature, idx) in allFeatures"
                  :key="idx"
                  class="flex items-center gap-2 mb-2"
                >
                  <input
                    type="text"
                    v-model="feature.key"
                    placeholder="Feature Name"
                    class="block w-1/3 border border-gray-200 rounded-xl py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-xs bg-gray-100"
                  />
                  <textarea
                    v-model="feature.value"
                    placeholder="Feature Value"
                    rows="1"
                    class="block w-2/3 border border-gray-300 rounded-xl py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-xs"
                  ></textarea>
                  <button
                    type="button"
                    @click="removeFeature(idx)"
                    class="text-red-500 hover:text-red-700 ml-1"
                  >
                    &times;
                  </button>
                </div>
                <div class="flex">
                  <UiButton
                    type="button"
                    @click="addFeature"
                    size="sm"
                    class="mt-2 text-gray-500 hover:text-gray-700"
                  >
                    + Add Feature
                  </UiButton>
                </div>
              </div>
            </PropertyModalSectionWrapper>

            <!-- Section 4: Images -->
            <PropertyModalSectionWrapper title="Upload Images and Videos">
              <div class="">
                <div
                  class="flex justify-center px-6 pt-5 pb-6"
                  @drop.prevent="handleDrop"
                  @dragover.prevent
                >
                  <div class="space-y-1 text-center">
                    <svg
                      class="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <div class="flex text-xs text-gray-600">
                      <label
                        for="file-upload"
                        class="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          type="file"
                          multiple
                          accept="image/*"
                          class="sr-only"
                          @change="handleFileInput"
                        />
                      </label>
                      <p class="pl-1">or drag and drop</p>
                    </div>
                    <p class="text-xs text-gray-500">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
                <div
                  v-if="form.images.length > 0"
                  class="mt-4 grid grid-cols-3 gap-4"
                >
                  <div
                    v-for="(image, index) in form.images"
                    :key="index"
                    class="relative group"
                  >
                    <img
                      :src="image"
                      class="h-24 w-full object-cover rounded-md"
                      alt="Property image"
                    />
                    <button
                      type="button"
                      @click="removeImage(index)"
                      class="absolute top-0 right-0 hidden group-hover:block p-1 bg-red-500 text-white rounded-full transform translate-x-1/2 -translate-y-1/2"
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
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </PropertyModalSectionWrapper>

            <!-- Availability Checkbox -->
          </div>

          <div
            class="px-4 sm:px-6 flex flex-row-reverse sticky bottom-0 gap-2 py-5 border-t border-gray-200 justify-between"
          >
            <div class="sm:flex sm:flex-row-reverse gap-2">
              <UiButton type="submit" size="sm" variant="primary">
                {{ property ? "Save Changes" : "Add Property" }}
              </UiButton>
              <UiButton
                type="button"
                @click="closeModal"
                variant="secondary"
                size="sm"
              >
                Cancel
              </UiButton>
            </div>
            <div class="flex items-center">
              <UiToggle v-model="form.available" />
              <label
                for="available"
                class="ml-2 block text-xs text-gray-900 select-none cursor-pointer"
                @click.prevent="form.available = !form.available"
              >
                Available for Rent
              </label>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import UiToggle from "./ui/UiToggle.vue";
import type { Property, Feature } from "~/types";

const props = defineProps<{
  show: boolean;
  property?: Property;
}>();

const emit = defineEmits<{
  (e: "update:show", value: boolean): void;
  (e: "submit", property: Omit<Property, "id">): void;
}>();

const { $api } = useNuxtApp();

const autoCalculateRent = ref(true);

const form = ref({
  title: "",
  description: "",
  price: 0,
  yearlyRent: 0,
  images: [] as string[],
  available: true,
  street: "",
  city: "",
  state: "",
  zipCode: "",
  rooms: 1,
  bathrooms: 1,
  toilets: 1,
  features: [] as Feature[],
});

const allFeatures = computed<Feature[]>({
  get() {
    return [
      { key: "rooms", value: String(form.value.rooms) },
      { key: "bathrooms", value: String(form.value.bathrooms) },
      { key: "toilets", value: String(form.value.toilets) },
      ...form.value.features,
    ];
  },
  set(newFeatures: Feature[]) {
    const [rooms, bathrooms, toilets, ...rest] = newFeatures;
    form.value.rooms = Number(rooms?.value) || 0;
    form.value.bathrooms = Number(bathrooms?.value) || 0;
    form.value.toilets = Number(toilets?.value) || 0;
    form.value.features = rest.map((f) => ({ key: f.key, value: f.value }));
  },
});

watch(
  [() => form.value.price, autoCalculateRent],
  ([newPrice, autoCalc], [oldPrice, oldAutoCalc]) => {
    if (autoCalc && newPrice !== undefined && newPrice !== null) {
      form.value.yearlyRent = Math.round(Number(newPrice) * 12);
    }
  }
);

watch(
  [() => form.value.yearlyRent, autoCalculateRent],
  ([newYearly, autoCalc], [oldYearly, oldAutoCalc]) => {
    if (autoCalc && newYearly !== undefined && newYearly !== null) {
      form.value.price = Math.round(Number(newYearly) / 12);
    }
  }
);

// Prevent infinite loop: only update the other field if the value actually changed
watch(autoCalculateRent, (enabled) => {
  if (enabled) {
    // Sync both fields
    form.value.yearlyRent = Math.round(Number(form.value.price) * 12);
  }
});

watch(
  () => props.property,
  (newProperty) => {
    if (newProperty) {
      form.value = {
        ...newProperty,
        yearlyRent: newProperty.price
          ? Math.round(Number(newProperty.price) * 12)
          : 0,
        rooms: newProperty.rooms ?? 1,
        bathrooms: newProperty.bathrooms ?? 1,
        toilets: newProperty.toilets ?? 1,
        features: Array.isArray(newProperty.features)
          ? newProperty.features.filter(
              (f) => !["rooms", "bathrooms", "toilets"].includes(f.key)
            )
          : [],
      };
    } else {
      resetForm();
    }
  },
  { immediate: true }
);

function resetForm() {
  form.value = {
    title: "",
    description: "",
    price: 0,
    yearlyRent: 0,
    images: [],
    available: true,
    street: "",
    city: "",
    state: "",
    zipCode: "",
    rooms: 1,
    bathrooms: 1,
    toilets: 1,
    features: [],
  };
  autoCalculateRent.value = true;
}

async function handleSubmit() {
  try {
    const isEdit = !!props.property;
    if (isEdit) {
      const output = {
        ...form.value,
        features: [
          ...form.value.features,
          { key: "rooms", value: String(form.value.rooms) },
          { key: "bathrooms", value: String(form.value.bathrooms) },
          { key: "toilets", value: String(form.value.toilets) },
        ],
      };
      emit("submit", output);
      closeModal();
      return;
    }
    // CREATE property logic
    const formData = new FormData();
    formData.append("title", form.value.title);
    formData.append("description", form.value.description);
    formData.append("price", String(form.value.price));
    formData.append("yearlyRent", String(form.value.yearlyRent));
    formData.append("available", String(form.value.available));
    formData.append("street", form.value.street);
    formData.append("city", form.value.city);
    formData.append("state", form.value.state);
    formData.append("zipCode", form.value.zipCode);
    formData.append("rooms", String(form.value.rooms));
    formData.append("bathrooms", String(form.value.bathrooms));
    formData.append("toilets", String(form.value.toilets));
    // Features (excluding rooms, bathrooms, toilets)
    form.value.features.forEach((f, idx) => {
      formData.append(`features[${idx}][key]`, f.key);
      formData.append(`features[${idx}][value]`, f.value);
    });
    // Images: convert base64 to File if needed
    form.value.images.forEach((img, idx) => {
      if (typeof img === "string" && img.startsWith("data:")) {
        // Convert base64 to Blob
        const arr = img.split(",");
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        const file = new File([u8arr], `image_${idx}.png`, { type: mime });
        formData.append("files", file);
      } else if (img instanceof File) {
        formData.append("files", img);
      }
    });
    // Auth handled by useCustomFetch
    const data = await $api<Property>("/properties", {
      method: "POST",
      body: formData,
    });
    navigateTo("/property/" + data.id);
    closeModal();
  } catch (err) {
    alert(
      err?.response?.data?.message ||
        err.message ||
        "Failed to create property."
    );
  }
}

function closeModal() {
  emit("update:show", false);
  if (!props.property) {
    resetForm();
  }
}

function handleFileInput(event: Event) {
  const fileInput = event.target as HTMLInputElement;
  if (fileInput.files) {
    Array.from(fileInput.files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          form.value.images.push(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    });
  }
}

function handleDrop(event: DragEvent) {
  const files = event.dataTransfer?.files;
  if (files) {
    Array.from(files).forEach((file) => {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            form.value.images.push(e.target.result as string);
          }
        };
        reader.readAsDataURL(file);
      }
    });
  }
}

function removeImage(index: number) {
  form.value.images.splice(index, 1);
}

function addFeature() {
  form.value.features.push({ key: "", value: "" });
}
function removeFeature(idx: number) {
  if (idx < 3) {
    if (idx === 0) form.value.rooms = 0;
    if (idx === 1) form.value.bathrooms = 0;
    if (idx === 2) form.value.toilets = 0;
  } else {
    form.value.features.splice(idx - 3, 1);
  }
}
</script>
