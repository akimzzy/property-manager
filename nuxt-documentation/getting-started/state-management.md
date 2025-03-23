# State Management · Get Started with Nuxt

Nuxt provides the [`useState`](https://nuxt.com/docs/api/composables/use-state) composable to create a reactive and SSR-friendly shared state across components.

[`useState`](https://nuxt.com/docs/api/composables/use-state) is an SSR-friendly [`ref`](https://vuejs.org/api/reactivity-core.html#ref) replacement. Its value will be preserved after server-side rendering (during client-side hydration) and shared across all components using a unique key.

Watch a video from Alexander Lichter about why and when to use `useState()`.

Because the data inside

[`useState`](https://nuxt.com/docs/api/composables/use-state)

will be serialized to JSON, it is important that it does not contain anything that cannot be serialized, such as classes, functions or symbols.

Read more about `useState` composable.

Never define `const state = ref()` outside of `<script setup>` or `setup()` function.  
For example, doing `export myState = ref({})` would result in state shared across requests on the server and can lead to memory leaks.

Instead use `const useX = () => useState('x')`

### [Basic Usage](#basic-usage)

In this example, we use a component-local counter state. Any other component that uses `useState('counter')` shares the same reactive state.

app.vue

```
<script setup lang="ts">
const
counter =
useState('counter', () =>
Math.
round(
Math.
random() * 1000))
</script>

<template>
  <
div>
    Counter: {{
counter }}
    <
button @
click="
counter++">
      +
    </
button>
    <
button @
click="
counter--">
      -
    </
button>
  </
div>
</template>

```

To globally invalidate cached state, see

[`clearNuxtState`](https://nuxt.com/docs/api/utils/clear-nuxt-state)

util.

### [Initializing State](#initializing-state)

Most of the time, you will want to initialize your state with data that resolves asynchronously. You can use the [`app.vue`](https://nuxt.com/docs/guide/directory-structure/app) component with the [`callOnce`](https://nuxt.com/docs/api/utils/call-once) util to do so.

app.vue

```
<script setup lang="ts">
const
websiteConfig =
useState('config')

await
callOnce(async () => {

websiteConfig.
value = await
$fetch('https://my-cms.com/api/website-config')
})
</script>

```

This is similar to the

[`nuxtServerInit` action](https://v2.nuxt.com/docs/directory-structure/store/#the-nuxtserverinit-action)

in Nuxt 2, which allows filling the initial state of your store server-side before rendering the page.

Read more in Docs > API > Utils > Call Once.

### [Usage with Pinia](#usage-with-pinia)

In this example, we leverage the [Pinia module](https://nuxt.com/modules/pinia) to create a global store and use it across the app.

Make sure to install the Pinia module with `npx nuxi@latest module add pinia` or follow the

[module's installation steps](https://pinia.vuejs.org/ssr/nuxt.html#Installation)

.

```
export const useWebsiteStore = defineStore('websiteStore', {
  state: () => ({
    name: '',
    description: ''
  }),
  actions: {
    async fetch() {
      const infos = await $fetch('https://api.nuxt.com/modules/pinia')

      this.name = infos.name
      this.description = infos.description
    }
  }
})

```

```
import type { Ref } from 'vue'

export const useLocale = () => {
  return useState<string>('locale', () => useDefaultLocale().value)
}

export const useDefaultLocale = (fallback = 'en-US') => {
  const locale = ref(fallback)
  if (import.meta.server) {
    const reqLocale = useRequestHeaders()
['accept-language']?.split(',')
[0]
    if (reqLocale) {
      locale.value = reqLocale
    }
  } else if (import.meta.client) {
    const navLang = navigator.language
    if (navLang) {
      locale.value = navLang
    }
  }
  return locale
}

export const useLocales = () => {
  const locale = useLocale()
  const locales = ref([
    'en-US',
    'en-GB',
    ...
    'ja-JP-u-ca-japanese'
  ])
  if (!locales.value.includes(locale.value)) {
    locales.value.unshift(locale.value)
  }
  return locales
}

export const useLocaleDate = (date: Ref<Date> | Date, locale = useLocale()) => {
  return computed(() => new Intl.DateTimeFormat(locale.value, { dateStyle: 'full' }).format(unref(date)))
}

```

By using [auto-imported composables](https://nuxt.com/docs/guide/directory-structure/composables) we can define global type-safe states and import them across the app.

composables/states.ts

```
export const
useColor = () =>
useState<string>('color', () => 'pink')

```

app.vue

```
<script setup lang="ts">
// ---cut-start---
const useColor = () => useState<string>('color', () => 'pink')
// ---cut-end---
const color = useColor() // Same as useState('color')
</script>

<template>
  <p>Current color: {{ color }}</p>
</template>

```

Watch a video from Daniel Roe on how to deal with global state and SSR in Nuxt.

Nuxt **used to rely** on the Vuex library to provide global state management. If you are migrating from Nuxt 2, please head to [the migration guide](about:/docs/migration/configuration#vuex).

Nuxt is not opinionated about state management, so feel free to choose the right solution for your needs. There are multiple integrations with the most popular state management libraries, including:

- [Pinia](https://nuxt.com/modules/pinia) - the official Vue recommendation
- [Harlem](https://nuxt.com/modules/harlem) - immutable global state management
- [XState](https://nuxt.com/modules/xstate) - state machine approach with tools for visualizing and testing your state logic
