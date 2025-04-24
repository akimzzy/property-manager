<template>
  <div class="landing-page min-h-screen bg-red-400 flex flex-col">
    <div>
      <!-- Hero Section -->
      <section
        class="hero flex flex-col items-center justify-center py-28 px-4 bg-gradient-to-br from-indigo-700 to-blue-500 text-white shadow-lg rounded-b-3xl mb-12"
      >
        <h1
          class="text-6xl font-extrabold mb-6 drop-shadow-xl text-center tracking-tight leading-tight"
        >
          Manager
        </h1>
        <p class="text-2xl mb-10 max-w-3xl text-center font-light opacity-90">
          The modern solution for managing properties, tenants, payments, and
          maintenance—effortlessly and efficiently.
        </p>
        <div
          class="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-6"
        >
          <NuxtLink
            to="/auth/register"
            class="cta-button px-10 py-4 bg-white text-indigo-700 font-bold rounded-xl shadow-lg hover:bg-indigo-100 hover:scale-105 transition-all duration-200 text-lg"
          >
            Get Started
          </NuxtLink>
          <NuxtLink
            to="/auth/login"
            class="cta-button px-10 py-4 bg-indigo-600 text-white font-bold rounded-xl shadow-lg hover:bg-indigo-800 hover:scale-105 transition-all duration-200 text-lg border border-white/30"
          >
            Sign In
          </NuxtLink>
        </div>
      </section>

      <!-- Features Section -->
      <section class="py-20 px-4 max-w-7xl mx-auto">
        <h2
          class="text-4xl font-bold text-center text-gray-900 mb-14 tracking-tight"
        >
          Powerful Features
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div
            class="feature-card bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center hover:shadow-2xl hover:-translate-y-1 transition-all"
          >
            <svg
              class="h-14 w-14 text-indigo-500 mb-5"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3 7v4a1 1 0 001 1h3v9a1 1 0 001 1h4a1 1 0 001-1v-9h3a1 1 0 001-1V7a1 1 0 00-1-1h-3V3a1 1 0 00-1-1h-4a1 1 0 00-1 1v3H4a1 1 0 00-1 1z"
              />
            </svg>
            <h3 class="text-xl font-semibold mb-2">Property Listings</h3>
            <p class="text-gray-600 text-center">
              Showcase and manage your properties with detailed listings,
              images, and amenities.
            </p>
          </div>
          <div
            class="feature-card bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center hover:shadow-2xl hover:-translate-y-1 transition-all"
          >
            <svg
              class="h-14 w-14 text-indigo-500 mb-5"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m5-7.13a4 4 0 110-8 4 4 0 010 8zm6 8v-5a2 2 0 00-2-2h-4a2 2 0 00-2 2v5"
              />
            </svg>
            <h3 class="text-xl font-semibold mb-2">Tenant Management</h3>
            <p class="text-gray-600 text-center">
              Track tenants, lease agreements, and communications in one
              convenient dashboard.
            </p>
          </div>
          <div
            class="feature-card bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center hover:shadow-2xl hover:-translate-y-1 transition-all"
          >
            <svg
              class="h-14 w-14 text-indigo-500 mb-5"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 17v-2a4 4 0 014-4h4a4 4 0 014 4v2M7 7a4 4 0 110-8 4 4 0 010 8z"
              />
            </svg>
            <h3 class="text-xl font-semibold mb-2">Maintenance Requests</h3>
            <p class="text-gray-600 text-center">
              Streamline maintenance requests and track their status for timely
              resolution.
            </p>
          </div>
          <div
            class="feature-card bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center hover:shadow-2xl hover:-translate-y-1 transition-all"
          >
            <svg
              class="h-14 w-14 text-indigo-500 mb-5"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 8c-1.657 0-3 1.343-3 3v1a3 3 0 006 0v-1c0-1.657-1.343-3-3-3zm0 9a5 5 0 01-5-5v-1a5 5 0 0110 0v1a5 5 0 01-5 5z"
              />
            </svg>
            <h3 class="text-xl font-semibold mb-2">Online Payments</h3>
            <p class="text-gray-600 text-center">
              Accept and track rent payments securely with automated reminders
              and receipts.
            </p>
          </div>
          <div
            class="feature-card bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center hover:shadow-2xl hover:-translate-y-1 transition-all"
          >
            <svg
              class="h-14 w-14 text-indigo-500 mb-5"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M8 17l4 4 4-4m-4-5v9"
              />
            </svg>
            <h3 class="text-xl font-semibold mb-2">Document Storage</h3>
            <p class="text-gray-600 text-center">
              Upload and manage lease agreements, inspection reports, and
              important documents.
            </p>
          </div>
          <div
            class="feature-card bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center hover:shadow-2xl hover:-translate-y-1 transition-all"
          >
            <svg
              class="h-14 w-14 text-indigo-500 mb-5"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <h3 class="text-xl font-semibold mb-2">
              Notifications & Reminders
            </h3>
            <p class="text-gray-600 text-center">
              Stay updated with automated notifications for rent, maintenance,
              and lease renewals.
            </p>
          </div>
          <div
            class="feature-card bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center hover:shadow-2xl hover:-translate-y-1 transition-all"
          >
            <svg
              class="h-14 w-14 text-indigo-500 mb-5"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 17v-2a4 4 0 014-4h4a4 4 0 014 4v2M7 7a4 4 0 110-8 4 4 0 010 8z"
              />
            </svg>
            <h3 class="text-xl font-semibold mb-2">Analytics Dashboard</h3>
            <p class="text-gray-600 text-center">
              Visualize property performance, occupancy rates, and financials
              with interactive charts.
            </p>
          </div>
          <div
            class="feature-card bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center hover:shadow-2xl hover:-translate-y-1 transition-all"
          >
            <svg
              class="h-14 w-14 text-indigo-500 mb-5"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 8c-1.657 0-3 1.343-3 3v1a3 3 0 006 0v-1c0-1.657-1.343-3-3-3zm0 9a5 5 0 01-5-5v-1a5 5 0 0110 0v1a5 5 0 01-5 5z"
              />
            </svg>
            <h3 class="text-xl font-semibold mb-2">Support & Chat</h3>
            <p class="text-gray-600 text-center">
              Get instant help with integrated support and messaging features.
            </p>
          </div>
        </div>
      </section>

      <!-- Testimonials Section -->
      <section class="testimonials bg-white py-20 px-4">
        <h2 class="text-3xl font-bold text-center text-gray-900 mb-12">
          What Our Users Say
        </h2>
        <div class="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          <div class="bg-indigo-50 rounded-2xl shadow p-8">
            <p class="text-gray-700 italic mb-6 text-lg">
              "Manager has made managing my rental properties so much easier.
              The interface is intuitive and the support is fantastic!"
            </p>
            <div class="flex items-center space-x-4">
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="User"
                class="h-12 w-12 rounded-full border-2 border-indigo-400"
              />
              <span class="font-semibold text-gray-900">John D., Landlord</span>
            </div>
          </div>
          <div class="bg-indigo-50 rounded-2xl shadow p-8">
            <p class="text-gray-700 italic mb-6 text-lg">
              "As a tenant, I love how easy it is to submit maintenance requests
              and communicate with my landlord. Highly recommended!"
            </p>
            <div class="flex items-center space-x-4">
              <img
                src="https://randomuser.me/api/portraits/women/44.jpg"
                alt="User"
                class="h-12 w-12 rounded-full border-2 border-indigo-400"
              />
              <span class="font-semibold text-gray-900">Sarah K., Tenant</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Benefits Section -->
      <section class="benefits py-20 px-4 max-w-7xl mx-auto">
        <h2 class="text-3xl font-bold text-center text-gray-900 mb-12">
          Why Choose Manager?
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div class="flex flex-col items-center md:items-start">
            <h3 class="text-2xl font-semibold mb-3 text-indigo-700">
              For Landlords
            </h3>
            <ul class="list-disc pl-6 text-gray-700 space-y-3 text-lg">
              <li>Centralized dashboard for all your properties</li>
              <li>Automated reminders for rent and lease renewals</li>
              <li>Easy communication with tenants</li>
              <li>Track maintenance and payment history</li>
            </ul>
          </div>
          <div class="flex flex-col items-center md:items-start">
            <h3 class="text-2xl font-semibold mb-3 text-indigo-700">
              For Tenants
            </h3>
            <ul class="list-disc pl-6 text-gray-700 space-y-3 text-lg">
              <li>Simple application and onboarding process</li>
              <li>Submit and track maintenance requests online</li>
              <li>Access lease documents and payment history</li>
              <li>Direct messaging with property managers</li>
            </ul>
          </div>
        </div>
      </section>
    </div>

    <!-- FAQs Section -->
    <section class="faqs-section py-20 px-4 max-w-4xl w-3xl mx-auto">
      <h2 class="text-3xl font-bold text-center text-gray-900 mb-10">
        Frequently Asked Questions
      </h2>
      <div>
        <div
          v-for="(faq, idx) in faqs"
          :key="faq.question"
          class="mb-4 rounded-2xl focus:outline-none border border-gray-200 hover:shadow bg-white py-4 px-5"
        >
          <button
            @click="toggleFaq(idx)"
            class="w-full text-left flex items-center justify-between cursor-pointer"
          >
            <span class="font-semibold text-black">
              {{ faq.question }}
            </span>
            <span class="ml-4 text-xl text-gray-400">
              {{ openFaq === idx ? "×" : "+" }}
            </span>
          </button>
          <transition>
            <div
              v-if="openFaq === idx"
              class="bg-white rounded-b-2xl text-gray-700 text-sm mt-2"
            >
              {{ faq.answer }}
            </div>
          </transition>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const faqs = [
  {
    question: "Does Manager support maintenance requests?",
    answer:
      "Yes, tenants and landlords can submit and track maintenance requests directly through the platform.",
  },
  {
    question: "Can I manage multiple properties?",
    answer:
      "Absolutely! Manager is designed to help you manage as many properties as you need from a single dashboard.",
  },
  {
    question: "Is there a mobile app?",
    answer:
      "A mobile app is coming soon. For now, you can access Manager from any device using your browser.",
  },
  {
    question: "How do I invite tenants?",
    answer:
      "You can invite tenants by sending them an email invitation from the dashboard. They can then register and access their portal.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes, we use industry-standard security practices to keep your data safe and private.",
  },
];

const openFaq = ref<number | null>(0);
function toggleFaq(idx: number) {
  openFaq.value = openFaq.value === idx ? null : idx;
}
</script>

<style scoped>
.landing-page {
  /* Gradient background similar to the attached image */
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5fe 40%, #e6eaff 100%);
}
.faqs-section button {
  transition: box-shadow 0.2s, border-color 0.2s;
  border-radius: 1rem;
}
.faqs-section .bg-white {
  background: #fff;
}
.faqs-section .rounded-2xl {
  border-radius: 1rem;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
