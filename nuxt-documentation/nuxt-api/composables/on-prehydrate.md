# onPrehydrate · Nuxt Composables
Use onPrehydrate to run a callback on the client immediately before Nuxt hydrates the page.

This composable is available in Nuxt v3.12+.

`onPrehydrate` is a composable lifecycle hook that allows you to run a callback on the client immediately before Nuxt hydrates the page.

This is an advanced utility and should be used with care. For example,

[`nuxt-time`](https://github.com/danielroe/nuxt-time/pull/251)

and

[`@nuxtjs/color-mode`](https://github.com/nuxt-modules/color-mode/blob/main/src/script.js)

manipulate the DOM to avoid hydration mismatches.

`onPrehydrate` can be called directly in the setup function of a Vue component (for example, in `<script setup>`), or in a plugin. It will only have an effect when it is called on the server, and it will not be included in your client build.

*   `callback`: A function that will be stringified and inlined in the HTML. It should not have any external dependencies (such as auto-imports) or refer to variables defined outside the callback. The callback will run before Nuxt runtime initializes so it should not rely on the Nuxt or Vue context.

app.vue

```
<script setup lang="ts">
// onPrehydrate is guaranteed to run before Nuxt hydrates

onPrehydrate(() => {
  
console.
log(
window)
})

// As long as it only has one root node, you can access the element

onPrehydrate((
el) => {
  
console.
log(
el.outerHTML)
  // <div data-v-inspector="app.vue:15:3" data-prehydrate-id=":b3qlvSiBeH:"> Hi there </div>
})

// For _very_ advanced use cases (such as not having a single root node) you
// can access/set `data-prehydrate-id` yourself
const 
prehydrateId = 
onPrehydrate((
el) => {})
</script>

<template>
  <
div>
    Hi there
  </
div>
</template>

```


* * *