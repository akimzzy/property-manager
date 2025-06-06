# error.vue · Nuxt Directory Structure

During the lifespan of your application, some errors may appear unexpectedly at runtime. In such case, we can use the `error.vue` file to override the default error files and display the error nicely.

error.vue

```
<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps({
  error: Object as () => NuxtError
})
</script>

<template>
  <div>
    <h1>{{ error.statusCode }}</h1>
    <NuxtLink to="/">Go back home</NuxtLink>
  </div>
</template>

```

Although it is called an 'error page' it's not a route and shouldn't be placed in your `~/pages` directory. For the same reason, you shouldn't use `definePageMeta` within this page. That being said, you can still use layouts in the error file, by utilizing the

[`NuxtLayout`](https://nuxt.com/docs/api/components/nuxt-layout)

component and specifying the name of the layout.

The error page has a single prop - `error` which contains an error for you to handle.

The `error` object provides the following fields:

```
{
  statusCode: number
  fatal: boolean
  unhandled: boolean
  statusMessage?: string
  data?: unknown
  cause?: unknown
}

```

If you have an error with custom fields they will be lost; you should assign them to `data` instead:

```
throw createError({
  statusCode: 404,
  statusMessage: 'Page Not Found',
  data: {
    myCustomField: true
  }
})

```

---
