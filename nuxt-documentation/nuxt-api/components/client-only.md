# <ClientOnly> · Nuxt Components

Render components only in client-side with the <ClientOnly> component.

The `<ClientOnly>` component is used for purposely rendering a component only on client side.

The content of the default slot will be tree-shaken out of the server build. (This does mean that any CSS used by components within it may not be inlined when rendering the initial HTML.)

- `placeholderTag` | `fallbackTag`: specify a tag to be rendered server-side.
- `placeholder` | `fallback`: specify a content to be rendered server-side.

```
<template>
  <div>
    <Sidebar />
    <!-- The <Comment> component will only be rendered on client-side -->
    <ClientOnly fallback-tag="span" fallback="Loading comments...">
      <Comment />
    </ClientOnly>
  </div>
</template>

```

- `#fallback`: specify a content to be rendered on the server and displayed until `<ClientOnly>` is mounted in the browser.

pages/example.vue

```
<template>
  <div>
    <Sidebar />
    <!-- This renders the "span" element on the server side -->
    <ClientOnly fallbackTag="span">
      <!-- this component will only be rendered on client side -->
      <Comments />
      <template #fallback>
        <!-- this will be rendered on server side -->
        <p>Loading comments...</p>
      </template>
    </ClientOnly>
  </div>
</template>

```

### [Accessing HTML Elements](#accessing-html-elements)

Components inside `<ClientOnly>` are rendered only after being mounted. To access the rendered elements in the DOM, you can watch a template ref:

pages/example.vue

```
<script setup lang="ts">
const nuxtWelcomeRef = ref()

// The watch will be triggered when the component is available
watch(nuxtWelcomeRef, () => {
 console.log('<NuxtWelcome /> mounted')
}, { once: true })
</script>

<template>
  <ClientOnly>
    <NuxtWelcome ref="nuxtWelcomeRef" />
  </ClientOnly>
</template>

```

---
