# <NuxtLayout> · Nuxt Components
Nuxt provides the <NuxtLayout> component to show layouts on pages and error pages.

You can use `<NuxtLayout />` component to activate the `default` layout on `app.vue` or `error.vue`.

app.vue

```
<template>
  <NuxtLayout>
    some page content
  </NuxtLayout>
</template>

```


Read more in Docs > Guide > Directory Structure > Layouts.

*   `name`: Specify a layout name to be rendered, can be a string, reactive reference or a computed property. It **must** match the name of the corresponding layout file in the [`layouts/`](https://nuxt.com/docs/guide/directory-structure/layouts) directory.
    *   **type**: `string`
    *   **default**: `default`

pages/index.vue

```
<script setup lang="ts">
// layouts/custom.vue
const layout = 'custom'
</script>

<template>
  <NuxtLayout :name="layout">
    <NuxtPage />
  </NuxtLayout>
</template>

```


Please note the layout name is normalized to kebab-case, so if your layout file is named `errorLayout.vue`, it will become `error-layout` when passed as a `name` property to `<NuxtLayout />`.

error.vue

```
<template>
  <NuxtLayout name="error-layout">
    <NuxtPage />
  </NuxtLayout>
</template>

```


Read more about dynamic layouts.

*   `fallback`: If an invalid layout is passed to the `name` prop, no layout will be rendered. Specify a `fallback` layout to be rendered in this scenario. It **must** match the name of the corresponding layout file in the [`layouts/`](https://nuxt.com/docs/guide/directory-structure/layouts) directory.
    *   **type**: `string`
    *   **default**: `null`

`NuxtLayout` also accepts any additional props that you may need to pass to the layout. These custom props are then made accessible as attributes.

pages/some-page.vue

```
<template>
  <div>
    <NuxtLayout name="custom" title="I am a custom layout">
      <-- ... -->
    </NuxtLayout>
  </div>
</template>

```


In the above example, the value of `title` will be available using `$attrs.title` in the template or `useAttrs().title` in `<script setup>` at custom.vue.

layouts/custom.vue

```
<script setup lang="ts">
const layoutCustomProps = useAttrs()

console.log(layoutCustomProps.title) // I am a custom layout
</script>

```


`<NuxtLayout />` renders incoming content via `<slot />`, which is then wrapped around Vue’s `<Transition />` component to activate layout transition. For this to work as expected, it is recommended that `<NuxtLayout />` is **not** the root element of the page component.

```
<template>
  <div>
    <NuxtLayout name="custom">
      <template #header> Some header template content. </template>
    </NuxtLayout>
  </div>
</template>

```


Read more in Docs > Getting Started > Transitions.

To get the ref of a layout component, access it through `ref.value.layoutRef`.

```
<script setup lang="ts">
const layout = ref()

function logFoo () {
  layout.value.layoutRef.foo()
}
</script>

<template>
  <NuxtLayout ref="layout">
    default layout
  </NuxtLayout>
</template>

```


Read more in Docs > Guide > Directory Structure > Layouts.

* * *