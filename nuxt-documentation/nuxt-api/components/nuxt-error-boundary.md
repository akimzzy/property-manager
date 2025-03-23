# <NuxtErrorBoundary> · Nuxt Components

[Nuxt UI Pro v3 is out! Get 20% OFF until Friday](https://ui.nuxt.com/pro/pricing)

The <NuxtErrorBoundary> component handles client-side errors happening in its default slot.

The `<NuxtErrorBoundary>` uses Vue's

[`onErrorCaptured`](https://vuejs.org/api/composition-api-lifecycle.html#onerrorcaptured)

hook under the hood.

- `@error`: Event emitted when the default slot of the component throws an error.
      ```
  <template>
    <NuxtErrorBoundary @error="logSomeError">
      <!-- ... -->
    </NuxtErrorBoundary>
  </template>

````



*   `#error`: Specify a fallback content to display in case of error.

    ```
  <template>
    <NuxtErrorBoundary>
      <!-- ... -->
      <template #error="{ error }">
        <p>An error occurred: {{ error }}</p>
      </template>
    </NuxtErrorBoundary>
  </template>

````

Read more in Docs > Getting Started > Error Handling.

---
