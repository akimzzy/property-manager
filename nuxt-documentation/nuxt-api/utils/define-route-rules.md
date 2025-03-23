# defineRouteRules · Nuxt Utils
Define route rules for hybrid rendering at the page level.

This feature is experimental and in order to use it you must enable the `experimental.inlineRouteRules` option in your `nuxt.config`.

pages/index.vue

```
<script setup lang="ts">
defineRouteRules({
  prerender: true
})
</script>

<template>
  <h1>Hello world!</h1>
</template>

```


Will be translated to:

nuxt.config.ts

```
export default defineNuxtConfig({
  routeRules: {
    '/': { prerender: true }
  }
})

```


When running

[`nuxt build`](https://nuxt.com/docs/api/commands/build)

, the home page will be pre-rendered in `.output/public/index.html` and statically served.

*   A rule defined in `~/pages/foo/bar.vue` will be applied to `/foo/bar` requests.
*   A rule in `~/pages/foo/[id].vue` will be applied to `/foo/**` requests.

For more control, such as if you are using a custom `path` or `alias` set in the page's [`definePageMeta`](https://nuxt.com/docs/api/utils/define-page-meta), you should set `routeRules` directly within your `nuxt.config`.

Read more about the `routeRules`.

* * *