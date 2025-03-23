# defineNuxtComponent · Nuxt Utils
defineNuxtComponent() is a helper function for defining type safe components with Options API.

`defineNuxtComponent()` is a helper function for defining type safe Vue components using options API similar to

[`defineComponent()`](https://vuejs.org/api/general.html#definecomponent)

. `defineNuxtComponent()` wrapper also adds support for `asyncData` and `head` component options.

Using `<script setup lang="ts">` is the recommended way of declaring Vue components in Nuxt 3.

Read more in Docs > Getting Started > Data Fetching.

If you choose not to use `setup()` in your app, you can use the `asyncData()` method within your component definition:

pages/index.vue

```
<script lang="ts">
export default defineNuxtComponent({
  async asyncData() {
    return {
      data: {
        greetings: 'hello world!'
      }
    }
  },
})
</script>

```


If you choose not to use `setup()` in your app, you can use the `head()` method within your component definition:

pages/index.vue

```
<script lang="ts">
export default defineNuxtComponent({
  head(nuxtApp) {
    return {
      title: 'My site'
    }
  },
})
</script>

```


* * *