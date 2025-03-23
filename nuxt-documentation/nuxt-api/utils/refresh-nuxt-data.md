# refreshNuxtData · Nuxt Utils
[Nuxt UI Pro v3 is out! Get 20% OFF until Friday](https://ui.nuxt.com/pro/pricing)

refreshNuxtData refetches all data from the server and updates the page.

`refreshNuxtData` re-fetches all data from the server and updates the page as well as invalidates the cache of

[`useAsyncData`](https://nuxt.com/docs/api/composables/use-async-data)

, `useLazyAsyncData`,

[`useFetch`](https://nuxt.com/docs/api/composables/use-fetch)

and `useLazyFetch`.

```
refreshNuxtData(keys?: string | string[])

```


**Parameters:**

*   `keys`:  
    **Type**: `String | String[]`  
    `refreshNuxtData` accepts a single or an array of strings as `keys` that are used to fetch the data. This parameter is **optional**. All [`useAsyncData`](https://nuxt.com/docs/api/composables/use-async-data) and [`useFetch`](https://nuxt.com/docs/api/composables/use-fetch) are re-fetched when no `keys` are specified.

This example below refreshes all data being fetched using [`useAsyncData`](https://nuxt.com/docs/api/composables/use-async-data) and [`useFetch`](https://nuxt.com/docs/api/composables/use-fetch) on the current page.

pages/some-page.vue

```
<script setup lang="ts">
const refreshing = ref(false)
const refreshAll = async () => {
  refreshing.value = true
  try {
    await refreshNuxtData()
  } finally {
    refreshing.value = false
  }
}
</script>

<template>
  <div>
    <button :disabled="refreshing" @click="refreshAll">
      Refetch All Data
    </button>
  </div>
</template>

```


This example below refreshes only data where the key matches to `count`.

pages/some-page.vue

```
<script setup lang="ts">
const { status, data: count } = await useLazyAsyncData('count', () => $fetch('/api/count'))
const refresh = () => refreshNuxtData('count')
</script>

<template>
  <div>
    {{ status === 'pending' ? 'Loading' : count }}
  </div>
  <button @click="refresh">Refresh</button>
</template>

```


Read more in Docs > Getting Started > Data Fetching.

* * *