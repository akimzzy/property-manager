# useLazyFetch · Nuxt Composables
This wrapper around useFetch triggers navigation immediately.

By default, [`useFetch`](https://nuxt.com/docs/api/composables/use-fetch) blocks navigation until its async handler is resolved. `useLazyFetch` provides a wrapper around [`useFetch`](https://nuxt.com/docs/api/composables/use-fetch) that triggers navigation before the handler is resolved by setting the `lazy` option to `true`.

`useLazyFetch` has the same signature as

[`useFetch`](https://nuxt.com/docs/api/composables/use-fetch)

.

Awaiting `useLazyFetch` in this mode only ensures the call is initialized. On client-side navigation, data may not be immediately available, and you should make sure to handle the pending state in your app.

Read more in Docs > API > Composables > Use Fetch.

pages/index.vue

```
<script setup lang="ts">
/* Navigation will occur before fetching is complete.
 * Handle 'pending' and 'error' states directly within your component's template
 */
const { status, data: posts } = await useLazyFetch('/api/posts')
watch(posts, (newPosts) => {
  // Because posts might start out null, you won't have access
  // to its contents immediately, but you can watch it.
})
</script>

<template>
  <div v-if="status === 'pending'">
    Loading ...
  </div>
  <div v-else>
    <div v-for="post in posts">
      <!-- do something -->
    </div>
  </div>
</template>

```


`useLazyFetch` is a reserved function name transformed by the compiler, so you should not name your own function `useLazyFetch`.

Read more in Docs > Getting Started > Data Fetching.

* * *