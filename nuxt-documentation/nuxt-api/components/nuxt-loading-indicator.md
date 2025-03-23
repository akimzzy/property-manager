# <NuxtLoadingIndicator> · Nuxt Components
Display a progress bar between page navigations.

Add `<NuxtLoadingIndicator/>` in your [`app.vue`](https://nuxt.com/docs/guide/directory-structure/app) or [`layouts/`](https://nuxt.com/docs/guide/directory-structure/layouts).

app.vue

```
<template>
  <NuxtLoadingIndicator />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

```


Read and edit a live example in [Docs > Examples > Routing > Pages](https://nuxt.com/docs/examples/routing/pages).

You can pass custom HTML or components through the loading indicator's default slot.

*   `color`: The color of the loading bar. It can be set to `false` to turn off explicit color styling.
*   `errorColor`: The color of the loading bar when `error` is set to `true`.
*   `height`: Height of the loading bar, in pixels (default `3`).
*   `duration`: Duration of the loading bar, in milliseconds (default `2000`).
*   `throttle`: Throttle the appearing and hiding, in milliseconds (default `200`).
*   `estimatedProgress`: By default Nuxt will back off as it approaches 100%. You can provide a custom function to customize the progress estimation, which is a function that receives the duration of the loading bar (above) and the elapsed time. It should return a value between 0 and 100.

This component is optional.  
To achieve full customization, you can implement your own one based on

[its source code](https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/components/nuxt-loading-indicator.ts)

.

You can hook into the underlying indicator instance using

[the `useLoadingIndicator` composable](https://nuxt.com/docs/api/composables/use-loading-indicator)

, which will allow you to trigger start/finish events yourself.

The loading indicator's speed gradually decreases after reaching a specific point controlled by `estimatedProgress`. This adjustment provides a more accurate reflection of longer page loading times and prevents the indicator from prematurely showing 100% completion.

* * *