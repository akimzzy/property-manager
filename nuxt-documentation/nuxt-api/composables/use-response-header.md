# useResponseHeader · Nuxt Composables
[Nuxt UI Pro v3 is out! Get 20% OFF until Friday](https://ui.nuxt.com/pro/pricing)

Use useResponseHeader to set a server response header.

This composable is available in Nuxt v3.14+.

You can use the built-in [`useResponseHeader`](https://nuxt.com/docs/api/composables/use-response-header) composable to set any server response header within your pages, components, and plugins.

```
// Set the a custom response header
const header = useResponseHeader('X-My-Header');
header.value = 'my-value';

```


We can use `useResponseHeader` to easily set a response header on a per-page basis.

pages/test.vue

```
<script setup>
// pages/test.vue
const header = useResponseHeader('X-My-Header');
header.value = 'my-value';
</script>

<template>
  <h1>Test page with custom header</h1>
  <p>The response from the server for this "/test" page will have a custom "X-My-Header" header.</p>
</template>

```


We can use `useResponseHeader` for example in Nuxt [middleware](https://nuxt.com/docs/guide/directory-structure/middleware) to set a response header for all pages.

middleware/my-header-middleware.ts

```
export default defineNuxtRouteMiddleware((to, from) => {
  const header = useResponseHeader('X-My-Always-Header');
  header.value = `I'm Always here!`;
});

```


* * *