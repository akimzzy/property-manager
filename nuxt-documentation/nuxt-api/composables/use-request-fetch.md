# useRequestFetch · Nuxt Composables
Forward the request context and headers for server-side fetch requests with the useRequestFetch composable.

You can use `useRequestFetch` to forward the request context and headers when making server-side fetch requests.

When making a client-side fetch request, the browser automatically sends the necessary headers. However, when making a request during server-side rendering, due to security considerations, we need to forward the headers manually.

Headers that are **not meant to be forwarded** will **not be included** in the request. These headers include, for example: `transfer-encoding`, `connection`, `keep-alive`, `upgrade`, `expect`, `host`, `accept`

The

[`useFetch`](https://nuxt.com/docs/api/composables/use-fetch)

composable uses `useRequestFetch` under the hood to automatically forward the request context and headers.

```
<script setup lang="ts">
// This will forward the user's headers to the `/api/cookies` event handler
// Result: { cookies: { foo: 'bar' } }
const requestFetch = useRequestFetch()
const { data: forwarded } = await useAsyncData(() => requestFetch('/api/cookies'))

// This will NOT forward anything
// Result: { cookies: {} }
const { data: notForwarded } = await useAsyncData(() => $fetch('/api/cookies')) 
</script>

```


In the browser during client-side navigation, `useRequestFetch` will behave just like regular

[`$fetch`](https://nuxt.com/docs/api/utils/dollarfetch)

.

* * *