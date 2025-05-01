<template>
  <div class="ml-0 lg:ml-4 h-full flex flex-col">
    <h2 class="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
      <svg
        class="h-5 w-5 text-blue-500"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
        />
      </svg>
      Notifications
    </h2>
    <div class="bg- overflow-hidden sm:rounded-lg flex-1">
      <ul class="space-y-3 h-full overflow-auto">
        <li
          v-for="activity in activities"
          :key="activity.id"
          :class="[
            'p-4 rounded-2xl border',
            activity.read
              ? 'bg-gray-50 border-gray-200'
              : 'bg-blue-50 border-blue-300',
          ]"
        >
          <div class="flex items-center space-x-4">
            <div class="flex-1 min-w-0">
              <p
                class="text-sm font-medium"
                :class="activity.read ? 'text-gray-900' : 'text-blue-800'"
              >
                {{ activity.title }}
              </p>
              <p
                class="text-xs"
                :class="activity.read ? 'text-gray-500' : 'text-blue-700'"
              >
                {{ activity.description }}
              </p>
            </div>
            <div
              class="text-xs"
              :class="activity.read ? 'text-gray-500' : 'text-blue-700'"
            >
              {{ activity.time }}
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
const props = defineProps<{ activities: any[] }>();
</script>
