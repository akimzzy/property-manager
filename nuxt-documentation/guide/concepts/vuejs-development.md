# Vue.js Development · Nuxt Concepts
Nuxt integrates Vue 3, the new major release of Vue that enables new patterns for Nuxt users.

While an in-depth knowledge of Vue is not required to use Nuxt, we recommend that you read the documentation and go through some of the examples on

[vuejs.org](https://vuejs.org/)

.

Nuxt has always used Vue as a frontend framework.

We chose to build Nuxt on top of Vue for these reasons:

*   The reactivity model of Vue, where a change in data automatically triggers a change in the interface.
*   The component-based templating, while keeping HTML as the common language of the web, enables intuitive patterns to keep your interface consistent, yet powerful.
*   From small projects to large web applications, Vue keeps performing well at scale to ensure that your application keeps delivering value to your users.

### [Single File Components](#single-file-components)

[Vue’s single-file components](https://vuejs.org/guide/scaling-up/sfc.html) (SFC or `*.vue` files) encapsulate the markup (`<template>`), logic (`<script>`) and styling (`<style>`) of a Vue component. Nuxt provides a zero-config experience for SFCs with [Hot Module Replacement](https://vite.dev/guide/features.html#hot-module-replacement) that offers a seamless developer experience.

### [Auto-imports](#auto-imports)

Every Vue component created in the [`components/`](https://nuxt.com/docs/guide/directory-structure/components) directory of a Nuxt project will be available in your project without having to import it. If a component is not used anywhere, your production’s code will not include it.

Read more in Docs > Guide > Concepts > Auto Imports.

### [Vue Router](#vue-router)

Most applications need multiple pages and a way to navigate between them. This is called **routing**. Nuxt uses a [`pages/`](https://nuxt.com/docs/guide/directory-structure/pages) directory and naming conventions to directly create routes mapped to your files using the official [Vue Router library](https://router.vuejs.org/).

Read more in Docs > Getting Started > Routing.

Nuxt 3+ is based on Vue 3. The new major Vue version introduces several changes that Nuxt takes advantage of:

*   Better performance
*   Composition API
*   TypeScript support

### [Faster Rendering](#faster-rendering)

The Vue Virtual DOM (VDOM) has been rewritten from the ground up and allows for better rendering performance. On top of that, when working with compiled Single-File Components, the Vue compiler can further optimize them at build time by separating static and dynamic markup.

This results in faster first rendering (component creation) and updates, and less memory usage. In Nuxt 3, it enables faster server-side rendering as well.

### [Smaller Bundle](#smaller-bundle)

With Vue 3 and Nuxt 3, a focus has been put on bundle size reduction. With version 3, most of Vue’s functionality, including template directives and built-in components, is tree-shakable. Your production bundle will not include them if you don’t use them.

This way, a minimal Vue 3 application can be reduced to 12 kb gzipped.

### [Composition API](#composition-api)

The only way to provide data and logic to components in Vue 2 was through the Options API, which allows you to return data and methods to a template with pre-defined properties like `data` and `methods`:

```
<script>
export default {
  data() {
    return {
      count: 0
    }
  },
  methods: {
    increment(){
      this.count++
    }
  }
}
</script>

```


The [Composition API](https://vuejs.org/guide/extras/composition-api-faq.html) introduced in Vue 3 is not a replacement of the Options API, but it enables better logic reuse throughout an application, and is a more natural way to group code by concern in complex components.

Used with the `setup` keyword in the `<script>` definition, here is the above component rewritten with Composition API and Nuxt 3’s auto-imported Reactivity APIs:

components/Counter.vue

```
<script setup lang="ts">
const 
count = 
ref(0)
const 
increment = () => 
count.
value++
</script>

```


The goal of Nuxt is to provide a great developer experience around the Composition API.

*   Use auto-imported [Reactivity functions](https://vuejs.org/api/reactivity-core.html) from Vue and Nuxt [built-in composables](https://nuxt.com/docs/api/composables/use-async-data).
*   Write your own auto-imported reusable functions in the [`composables/` directory](https://nuxt.com/docs/guide/directory-structure/composables).

### [TypeScript Support](#typescript-support)

Both Vue 3 and Nuxt 3+ are written in TypeScript. A fully typed codebase prevents mistakes and documents APIs usage. This doesn’t mean that you have to write your application in TypeScript to take advantage of it. With Nuxt 3, you can opt-in by renaming your file from `.js` to `.ts` , or add `<script setup lang="ts">` in a component.

Read the details about TypeScript in Nuxt