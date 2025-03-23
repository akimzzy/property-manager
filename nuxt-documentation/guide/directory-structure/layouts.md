# layouts/ · Nuxt Directory Structure

For best performance, components placed in this directory will be automatically loaded via asynchronous import when used.

Layouts are enabled by adding [`<NuxtLayout>`](https://nuxt.com/docs/api/components/nuxt-layout) to your [`app.vue`](https://nuxt.com/docs/guide/directory-structure/app):

app.vue

```
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

```

To use a layout:

- Set a `layout` property in your page with [definePageMeta](https://nuxt.com/docs/api/utils/define-page-meta).
- Set the `name` prop of `<NuxtLayout>`.

The layout name is normalized to kebab-case, so `someLayout` becomes `some-layout`.

If no layout is specified, `layouts/default.vue` will be used.

If you only have a single layout in your application, we recommend using

[`app.vue`](https://nuxt.com/docs/guide/directory-structure/app)

instead.

Unlike other components, your layouts must have a single root element to allow Nuxt to apply transitions between layout changes - and this root element cannot be a `<slot />`.

Add a `~/layouts/default.vue`:

layouts/default.vue

```
<template>
  <div>
    <p>Some default layout content shared across all pages</p>
    <slot />
  </div>
</template>

```

In a layout file, the content of the page will be displayed in the `<slot />` component.

Directory Structure

```
-| layouts/
---| default.vue
---| custom.vue

```

Then you can use the `custom` layout in your page:

pages/about.vue

```
<script setup lang="ts">

definePageMeta({

layout: 'custom'
})
</script>

```

Learn more about `definePageMeta`.

You can directly override the default layout for all pages using the `name` property of [`<NuxtLayout>`](https://nuxt.com/docs/api/components/nuxt-layout):

app.vue

```
<script setup lang="ts">
// You might choose this based on an API call or logged-in status
const layout = "custom";
</script>

<template>
  <NuxtLayout :name="layout">
    <NuxtPage />
  </NuxtLayout>
</template>

```

If you have a layout in nested directories, the layout's name will be based on its own path directory and filename, with duplicate segments being removed.

| File                            | Layout Name     |
| ------------------------------- | --------------- |
| ~/layouts/desktop/default.vue   | desktop-default |
| ~/layouts/desktop-base/base.vue | desktop-base    |
| ~/layouts/desktop/index.vue     | desktop         |

For clarity, we recommend that the layout's filename matches its name:

| File                                   | Layout Name     |
| -------------------------------------- | --------------- |
| ~/layouts/desktop/DesktopDefault.vue   | desktop-default |
| ~/layouts/desktop-base/DesktopBase.vue | desktop-base    |
| ~/layouts/desktop/Desktop.vue          | desktop         |

You can also use the [`setPageLayout`](https://nuxt.com/docs/api/utils/set-page-layout) helper to change the layout dynamically:

```
<script setup lang="ts">
function
enableCustomLayout () {

setPageLayout('custom')
}

definePageMeta({

layout: false,
});
</script>

<template>
  <
div>
    <
button @
click="
enableCustomLayout">Update layout</
button>
  </
div>
</template>

```

## [Overriding a Layout on a Per-page Basis](#overriding-a-layout-on-a-per-page-basis)

If you are using pages, you can take full control by setting `layout: false` and then using the `<NuxtLayout>` component within the page.

```
<script setup lang="ts">
definePageMeta({
  layout: false,
})
</script>

<template>
  <div>
    <NuxtLayout name="custom">
      <template #header> Some header template content. </template>

      The rest of the page
    </NuxtLayout>
  </div>
</template>

```

If you use `<NuxtLayout>` within your pages, make sure it is not the root element (or

[disable layout/page transitions](about:/docs/getting-started/transitions#disable-transitions)

).
