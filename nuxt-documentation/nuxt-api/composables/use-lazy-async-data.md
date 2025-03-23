# useLazyAsyncData · Nuxt Composables
This wrapper around useAsyncData triggers navigation immediately.

By default, [`useAsyncData`](https://nuxt.com/docs/api/composables/use-async-data) blocks navigation until its async handler is resolved. `useLazyAsyncData` provides a wrapper around [`useAsyncData`](https://nuxt.com/docs/api/composables/use-async-data) that triggers navigation before the handler is resolved by setting the `lazy` option to `true`.

`useLazyAsyncData` has the same signature as

[`useAsyncData`](https://nuxt.com/docs/api/composables/use-async-data)

.

Read more in Docs > API > Composables > Use Async Data.

pages/index.vue

```
<script setup lang="ts">
/* Navigation will occur before fetching is complete.
  Handle 'pending' and 'error' states directly within your component's template
*/
const { status, data: count } = await useLazyAsyncData('count', () => $fetch('/api/count'))

watch(count, (newCount) => {
  // Because count might start out null, you won't have access
  // to its contents immediately, but you can watch it.
})
</script>

<template>
  <div>
    {{ status === 'pending' ? 'Loading' : count }}
  </div>
</template>

```


`useLazyAsyncData` is a reserved function name transformed by the compiler, so you should not name your own function `useLazyAsyncData`.

Read more in Docs > Getting Started > Data Fetching.

* * *