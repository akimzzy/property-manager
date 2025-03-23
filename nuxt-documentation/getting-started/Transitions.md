# Transitions · Get Started with Nuxt
Nuxt leverages Vue's

[`<Transition>`](https://vuejs.org/guide/built-ins/transition.html#the-transition-component)

component to apply transitions between pages and layouts.

[Page Transitions](#page-transitions)
-------------------------------------

You can enable page transitions to apply an automatic transition for all your [pages](https://nuxt.com/docs/guide/directory-structure/pages).

nuxt.config.ts

```
export default 
defineNuxtConfig({
  
app: {
    
pageTransition: { 
name: 'page', 
mode: 'out-in' }
  },
})

```


If you are changing layouts as well as page, the page transition you set here will not run. Instead, you should set a

[layout transition](about:/docs/getting-started/transitions#layout-transitions)

.

To start adding transition between your pages, add the following CSS to your [`app.vue`](https://nuxt.com/docs/guide/directory-structure/app):

```
<template>
  <NuxtPage />
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>

```


This produces the following result when navigating between pages:

To set a different transition for a page, set the `pageTransition` key in [`definePageMeta`](https://nuxt.com/docs/api/utils/define-page-meta) of the page:

```
<script setup lang="ts">

definePageMeta({
  
pageTransition: {
    
name: 'rotate'
  }
})
</script>

```


Moving to the about page will add the 3d rotation effect:

You can enable layout transitions to apply an automatic transition for all your [layouts](https://nuxt.com/docs/guide/directory-structure/layouts).

nuxt.config.ts

```
export default 
defineNuxtConfig({
  
app: {
    
layoutTransition: { 
name: 'layout', 
mode: 'out-in' }
  },
})

```


To start adding transition between your pages and layouts, add the following CSS to your [`app.vue`](https://nuxt.com/docs/guide/directory-structure/app):

```
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
.layout-enter-active,
.layout-leave-active {
  transition: all 0.4s;
}
.layout-enter-from,
.layout-leave-to {
  filter: grayscale(1);
}
</style>

```


This produces the following result when navigating between pages:

Similar to `pageTransition`, you can apply a custom `layoutTransition` to the page component using `definePageMeta`:

pages/about.vue

```
<script setup lang="ts">

definePageMeta({
  
layout: 'orange',
  
layoutTransition: {
    
name: 'slide-in'
  }
})
</script>

```


You can customize these default transition names globally using `nuxt.config`.

Both `pageTransition` and `layoutTransition` keys accept [`TransitionProps`](https://vuejs.org/api/built-in-components.html#transition) as JSON serializable values where you can pass the `name`, `mode` and other valid transition-props of the custom CSS transition.

nuxt.config.ts

```
export default 
defineNuxtConfig({
  
app: {
    
pageTransition: {
      
name: 'fade',
      
mode: 'out-in' // default
    },
    
layoutTransition: {
      
name: 'slide',
      
mode: 'out-in' // default
    }
  }
})

```


If you change the `name` property, you also have to rename the CSS classes accordingly.

To override the global transition property, use the `definePageMeta` to define page or layout transitions for a single Nuxt page and override any page or layout transitions that are defined globally in `nuxt.config` file.

pages/some-page.vue

```
<script setup lang="ts">

definePageMeta({
  
pageTransition: {
    
name: 'bounce',
    
mode: 'out-in' // default
  }
})
</script>

```


`pageTransition` and `layoutTransition` can be disabled for a specific route:

pages/some-page.vue

```
<script setup lang="ts">

definePageMeta({
  
pageTransition: false,
  
layoutTransition: false
})
</script>

```


Or globally in the `nuxt.config`:

nuxt.config.ts

```
export default 
defineNuxtConfig({
  
app: {
    
pageTransition: false,
    
layoutTransition: false
  }
})

```


For advanced use-cases, you can use JavaScript hooks to create highly dynamic and custom transitions for your Nuxt pages.

This way presents perfect use-cases for JavaScript animation libraries such as [GSAP](https://gsap.com/).

pages/some-page.vue

```
<script setup lang="ts">

definePageMeta({
  
pageTransition: {
    
name: 'custom-flip',
    
mode: 'out-in',
    
onBeforeEnter: (
el) => {
      
console.
log('Before enter...')
    },
    
onEnter: (
el, 
done) => {},
    
onAfterEnter: (
el) => {}
  }
})
</script>

```


Learn more about additional

[JavaScript hooks](https://vuejs.org/guide/built-ins/transition.html#javascript-hooks)

available in the `Transition` component.

To apply dynamic transitions using conditional logic, you can leverage inline [middleware](https://nuxt.com/docs/guide/directory-structure/middleware) to assign a different transition name to `to.meta.pageTransition`.

```
<script setup lang="ts">

definePageMeta({
  
pageTransition: {
    
name: 'slide-right',
    
mode: 'out-in'
  },
  
middleware (
to, 
from) {
    if (
to.
meta.
pageTransition && typeof 
to.
meta.
pageTransition !== 'boolean')
      
to.
meta.
pageTransition.
name = +
to.
params.
id! > +
from.
params.
id! ? 'slide-left' : 'slide-right'
  }
})
</script>

<template>
  <
h1>#{{ 
$route.
params.
id }}</
h1>
</template>

<style>
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.2s;
}
.slide-left-enter-from {
  opacity: 0;
  transform: translate(50px, 0);
}
.slide-left-leave-to {
  opacity: 0;
  transform: translate(-50px, 0);
}
.slide-right-enter-from {
  opacity: 0;
  transform: translate(-50px, 0);
}
.slide-right-leave-to {
  opacity: 0;
  transform: translate(50px, 0);
}
</style>

```


The page now applies the `slide-left` transition when going to the next id and `slide-right` for the previous:

[Transition with NuxtPage](#transition-with-nuxtpage)
-----------------------------------------------------

When `<NuxtPage />` is used in `app.vue`, transitions can be configured with the `transition` prop to activate transitions globally.

app.vue

```
<template>
  <div>
    <NuxtLayout>
      <NuxtPage :transition="{
        name: 'bounce',
        mode: 'out-in'
      }" />
    </NuxtLayout>
  </div>
</template>

```


Remember, this page transition cannot be overridden with `definePageMeta` on individual pages.

Nuxt ships with an experimental implementation of the [**View Transitions API**](https://developer.chrome.com/docs/web-platform/view-transitions) (see [MDN](https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API)). This is an exciting new way to implement native browser transitions which (among other things) have the ability to transition between unrelated elements on different pages.

You can check a demo on [https://nuxt-view-transitions.surge.sh](https://nuxt-view-transitions.surge.sh/) and the [source on StackBlitz](https://stackblitz.com/edit/nuxt-view-transitions).

The Nuxt integration is under active development, but can be enabled with the `experimental.viewTransition` option in your configuration file:

nuxt.config.ts

```
export default 
defineNuxtConfig({
  
experimental: {
    
viewTransition: true
  }
})

```


The possible values are: `false`, `true`, or `'always'`.

If set to true, Nuxt will not apply transitions if the user's browser matches `prefers-reduced-motion: reduce` (recommended). If set to `always`, Nuxt will always apply the transition and it is up to you to respect the user's preference.

By default, view transitions are enabled for all [pages](https://nuxt.com/docs/guide/directory-structure/pages), but you can set a different global default.

nuxt.config.ts

```
export default 
defineNuxtConfig({
  
app: {
    // Disable view transitions globally, and opt-in on a per page basis
    
viewTransition: false
  },
})

```


It is possible to override the default `viewTransition` value for a page by setting the `viewTransition` key in [`definePageMeta`](https://nuxt.com/docs/api/utils/define-page-meta) of the page:

pages/about.vue

```
<script setup lang="ts">

definePageMeta({
  
viewTransition: false
})
</script>

```


Overriding view transitions on a per-page basis will only have an effect if you have enabled the `experimental.viewTransition` option.

If you are also using Vue transitions like `pageTransition` and `layoutTransition` (see above) to achieve the same result as the new View Transitions API, then you may wish to _disable_ Vue transitions if the user's browser supports the newer, native web API. You can do this by creating `~/middleware/disable-vue-transitions.global.ts` with the following contents:

```
export default defineNuxtRouteMiddleware(to => {
  if (import.meta.server || !document.startViewTransition) { return }

  // Disable built-in Vue transitions
  to.meta.pageTransition = false
  to.meta.layoutTransition = false
})

```


### [Known Issues](#known-issues)

*   If you perform data fetching within your page setup functions, that you may wish to reconsider using this feature for the moment. (By design, View Transitions completely freeze DOM updates whilst they are taking place.) We're looking at restrict the View Transition to the final moments before `<Suspense>` resolves, but in the interim you may want to consider carefully whether to adopt this feature if this describes you.