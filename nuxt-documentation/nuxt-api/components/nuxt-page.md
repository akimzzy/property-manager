# <NuxtPage> · Nuxt Components

`<NuxtPage>` is a built-in component that comes with Nuxt. It lets you display top-level or nested pages located in the [`pages/`](https://nuxt.com/docs/guide/directory-structure/pages) directory.

`<NuxtPage>` is a wrapper around

[`<RouterView>`](https://router.vuejs.org/api/interfaces/RouterViewProps.html#interface-routerviewprops)

from Vue Router. It should be used instead of `<RouterView>` because the former takes additional care of internal states. Otherwise, `useRoute()` may return incorrect paths.

`<NuxtPage>` includes the following components:

```
<template>
  <RouterView #default="{ Component }">
    <!-- Optional, when using transitions -->
    <Transition>
      <!-- Optional, when using keep-alive -->
      <KeepAlive>
        <Suspense>
          <component :is="Component" />
        </Suspense>
      </KeepAlive>
    </Transition>
  </RouterView>
</template>

```

By default, Nuxt does not enable `<Transition>` and `<KeepAlive>`. You can enable them in the nuxt.config file or by setting the `transition` and `keepalive` properties on `<NuxtPage>`. If you want to define a specific page, you can set it in `definePageMeta` in the page component.

If you enable `<Transition>` in your page component, ensure that the page has a single root element.

Since `<NuxtPage>` uses `<Suspense>` under the hood, the component lifecycle behavior during page changes differs from that of a typical Vue application.

In a typical Vue application, a new page component is mounted **only after** the previous one has been fully unmounted. However, in Nuxt, due to how Vue `<Suspense>` is implemented, the new page component is mounted **before** the previous one is unmounted.

- `name`: tells `<RouterView>` to render the component with the corresponding name in the matched route record's components option.
  - type: `string`
- `route`: route location that has all of its components resolved.
  - type: `RouteLocationNormalized`
- `pageKey`: control when the `NuxtPage` component is re-rendered.
  - type: `string` or `function`
- `transition`: define global transitions for all pages rendered with the `NuxtPage` component.
  - type: `boolean` or [`TransitionProps`](https://vuejs.org/api/built-in-components#transition)
- `keepalive`: control state preservation of pages rendered with the `NuxtPage` component.
  - type: `boolean` or [`KeepAliveProps`](https://vuejs.org/api/built-in-components#keepalive)

Nuxt automatically resolves the `name` and `route` by scanning and rendering all Vue component files found in the `/pages` directory.

For example, if you pass a key that never changes, the `<NuxtPage>` component will be rendered only once - when it is first mounted.

app.vue

```
<template>
  <NuxtPage page-key="static" />
</template>

```

You can also use a dynamic key based on the current route:

```
<NuxtPage :page-key="route => route.fullPath" />

```

Don't use `$route` object here as it can cause problems with how `<NuxtPage>` renders pages with `<Suspense>`.

Alternatively, `pageKey` can be passed as a `key` value via [`definePageMeta`](https://nuxt.com/docs/api/utils/define-page-meta) from the `<script>` section of your Vue component in the `/pages` directory.

pages/my-page.vue

```
<script setup lang="ts">
definePageMeta({
  key: route => route.fullPath
})
</script>

```

Read and edit a live example in [Docs > Examples > Routing > Pages](https://nuxt.com/docs/examples/routing/pages).

## [Page's Ref](#pages-ref)

To get the `ref` of a page component, access it through `ref.value.pageRef`

app.vue

```
<script setup lang="ts">
const page = ref()

function logFoo () {
  page.value.pageRef.foo()
}
</script>

<template>
  <NuxtPage ref="page" />
</template>

```

my-page.vue

```
<script setup lang="ts">
const foo = () => {
  console.log('foo method called')
}

defineExpose({
  foo,
})
</script>

```

`<NuxtPage>` also accepts custom props that you may need to pass further down the hierarchy.

For example, in the below example, the value of `foobar` will be passed to the `NuxtPage` component and then to the page components.

app.vue

```
<template>
  <NuxtPage :foobar="123" />
</template>

```

We can access the `foobar` prop in the page component:

pages/page.vue

```
<script setup lang="ts">
const props = defineProps<{ foobar: number }>()

console.log(props.foobar) // Outputs: 123

```

If you have not defined the prop with `defineProps`, any props passed down to `NuxtPage` can still be accessed directly from the page `attrs`:

pages/page.vue

```
<script setup lang="ts">
const attrs = useAttrs()
console.log(attrs.foobar) // Outputs: 123
</script>

```

Read more in Docs > Guide > Directory Structure > Pages.
