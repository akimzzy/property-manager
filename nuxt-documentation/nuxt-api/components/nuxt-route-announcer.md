# <NuxtRouteAnnouncer> · Nuxt Components
[Nuxt UI Pro v3 is out! Get 20% OFF until Friday](https://ui.nuxt.com/pro/pricing)

The <NuxtRouteAnnouncer> component adds a hidden element with the page title to announce route changes to assistive technologies.

This component is available in Nuxt v3.12+.

Add `<NuxtRouteAnnouncer/>` in your [`app.vue`](https://nuxt.com/docs/guide/directory-structure/app) or [`layouts/`](https://nuxt.com/docs/guide/directory-structure/layouts) to enhance accessibility by informing assistive technologies about page title changes. This ensures that navigational changes are announced to users relying on screen readers.

app.vue

```
<template>
  <NuxtRouteAnnouncer />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

```


You can pass custom HTML or components through the route announcer's default slot.

```
  <template>
    <NuxtRouteAnnouncer>
      <template #default="{ message }">
        <p>{{ message }} was loaded.</p>
      </template>
    </NuxtRouteAnnouncer>
  </template>

```


*   `atomic`: Controls if screen readers only announce changes or the entire content. Set to true for full content readouts on updates, false for changes only. (default `false`)
*   `politeness`: Sets the urgency for screen reader announcements: `off` (disable the announcement), `polite` (waits for silence), or `assertive` (interrupts immediately). (default `polite`)

This component is optional.  
To achieve full customization, you can implement your own one based on

[its source code](https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/components/nuxt-route-announcer.ts)

.

You can hook into the underlying announcer instance using

[the `useRouteAnnouncer` composable](https://nuxt.com/docs/api/composables/use-route-announcer)

, which allows you to set a custom announcement message.

* * *