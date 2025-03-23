# usePreviewMode · Nuxt Composables
Preview mode allows you to see how your changes would be displayed on a live site without revealing them to users.

You can use the built-in `usePreviewMode` composable to access and control preview state in Nuxt. If the composable detects preview mode it will automatically force any updates necessary for [`useAsyncData`](https://nuxt.com/docs/api/composables/use-async-data) and [`useFetch`](https://nuxt.com/docs/api/composables/use-fetch) to rerender preview content.

```
const { enabled, state } = usePreviewMode()

```


### [Custom `enable` check](#custom-enable-check)

You can specify a custom way to enable preview mode. By default the `usePreviewMode` composable will enable preview mode if there is a `preview` param in url that is equal to `true` (for example, `http://localhost:3000?preview=true`). You can wrap the `usePreviewMode` into custom composable, to keep options consistent across usages and prevent any errors.

```
export function useMyPreviewMode () {
  return usePreviewMode({
    shouldEnable: () => {
      return !!route.query.customPreview
    }
  });
}

```


### [Modify default state](#modify-default-state)

`usePreviewMode` will try to store the value of a `token` param from url in state. You can modify this state and it will be available for all [`usePreviewMode`](https://nuxt.com/docs/api/composables/use-preview-mode) calls.

```
const data1 = ref('data1')

const { enabled, state } = usePreviewMode({
  getState: (currentState) => {
    return { data1, data2: 'data2' }
  }
})

```


The `getState` function will append returned values to current state, so be careful not to accidentally overwrite important state.

### [Customize the `onEnable` and `onDisable` callbacks](#customize-the-onenable-and-ondisable-callbacks)

By default, when `usePreviewMode` is enabled, it will call `refreshNuxtData()` to re-fetch all data from the server.

When preview mode is disabled, the composable will attach a callback to call `refreshNuxtData()` to run after a subsequent router navigation.

You can specify custom callbacks to be triggered by providing your own functions for the `onEnable` and `onDisable` options.

```
const { enabled, state } = usePreviewMode({
  onEnable: () => {
    console.log('preview mode has been enabled')
  },
  onDisable: () => {
    console.log('preview mode has been disabled')
  }
})

```


The example below creates a page where part of a content is rendered only in preview mode.

pages/some-page.vue

```
<script setup>
const { enabled, state } = usePreviewMode()

const { data } = await useFetch('/api/preview', {
  query: {
    apiKey: state.token
  }
})
</script>

<template>
  <div>
    Some base content
    <p v-if="enabled">
      Only preview content: {{ state.token }}
      <br>
      <button @click="enabled = false">
        disable preview mode
      </button>
    </p>
  </div>
</template>

```


Now you can generate your site and serve it:

Terminal

```
npx nuxi generate
npx nuxi preview

```


Then you can see your preview page by adding the query param `preview` to the end of the page you want to see once:

`usePreviewMode` should be tested locally with `nuxi generate` and then `nuxi preview` rather than `nuxi dev`. (The

[preview command](https://nuxt.com/docs/api/commands/preview)

is not related to preview mode.)