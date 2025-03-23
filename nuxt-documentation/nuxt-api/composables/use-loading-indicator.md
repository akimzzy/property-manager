# useLoadingIndicator · Nuxt Composables
[Nuxt UI Pro v3 is out! Get 20% OFF until Friday](https://ui.nuxt.com/pro/pricing)

This composable gives you access to the loading state of the app page.

A composable which returns the loading state of the page. Used by [`<NuxtLoadingIndicator>`](https://nuxt.com/docs/api/components/nuxt-loading-indicator) and controllable. It hooks into [`page:loading:start`](about:/docs/api/advanced/hooks#app-hooks-runtime) and [`page:loading:end`](about:/docs/api/advanced/hooks#app-hooks-runtime) to change its state.

*   `duration`: Duration of the loading bar, in milliseconds (default `2000`).
*   `throttle`: Throttle the appearing and hiding, in milliseconds (default `200`).
*   `estimatedProgress`: By default Nuxt will back off as it approaches 100%. You can provide a custom function to customize the progress estimation, which is a function that receives the duration of the loading bar (above) and the elapsed time. It should return a value between 0 and 100.

### [`isLoading`](#isloading)

*   **type**: `Ref<boolean>`
*   **description**: The loading state

### [`error`](#error)

*   **type**: `Ref<boolean>`
*   **description**: The error state

### [`progress`](#progress)

*   **type**: `Ref<number>`
*   **description**: The progress state. From `0` to `100`.

### [`start()`](#start)

Set `isLoading` to true and start to increase the `progress` value. `start` accepts a `{ force: true }` option to skip the interval and show the loading state immediately.

### [`set()`](#set)

Set the `progress` value to a specific value. `set` accepts a `{ force: true }` option to skip the interval and show the loading state immediately.

### [`finish()`](#finish)

Set the `progress` value to `100`, stop all timers and intervals then reset the loading state `500` ms later. `finish` accepts a `{ force: true }` option to skip the interval before the state is reset, and `{ error: true }` to change the loading bar color and set the error property to true.

### [`clear()`](#clear)

Used by `finish()`. Clear all timers and intervals used by the composable.

```
<script setup lang="ts">
  const { progress, isLoading, start, finish, clear } = useLoadingIndicator({
    duration: 2000,
    throttle: 200,
    // This is how progress is calculated by default
    estimatedProgress: (duration, elapsed) => (2 / Math.PI * 100) * Math.atan(elapsed / duration * 100 / 50)
  })
</script>

```


```
<script setup lang="ts">
  const { start, set } = useLoadingIndicator()
  // same as set(0, { force: true })
  // set the progress to 0, and show loading immediately
  start({ force: true })
</script>

```


* * *