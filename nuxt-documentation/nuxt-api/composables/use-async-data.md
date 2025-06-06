# useAsyncData · Nuxt Composables
Within your pages, components, and plugins you can use useAsyncData to get access to data that resolves asynchronously.

[`useAsyncData`](https://nuxt.com/docs/api/composables/use-async-data)

is a composable meant to be called directly in the

[Nuxt context](about:/docs/guide/going-further/nuxt-app#the-nuxt-context)

. It returns reactive composables and handles adding responses to the Nuxt payload so they can be passed from server to client **without re-fetching the data on client side** when the page hydrates.

pages/index.vue

```
<script setup lang="ts">
const { data, status, error, refresh, clear } = await useAsyncData(
  'mountains',
  () => $fetch('https://api.nuxtjs.dev/mountains')
)
</script>

```


If you're using a custom useAsyncData wrapper, do not await it in the composable, as that can cause unexpected behavior. Please follow

[this recipe](about:/docs/guide/recipes/custom-usefetch#custom-usefetch)

for more information on how to make a custom async data fetcher.

`data`, `status` and `error` are Vue refs and they should be accessed with `.value` when used within the `<script setup>`, while `refresh`/`execute` and `clear` are plain functions.

### [Watch Params](#watch-params)

The built-in `watch` option allows automatically rerunning the fetcher function when any changes are detected.

pages/index.vue

```
<script setup lang="ts">
const page = ref(1)
const { data: posts } = await useAsyncData(
  'posts',
  () => $fetch('https://fakeApi.com/posts', {
    params: {
      page: page.value
    }
  }), {
    watch: [page]
  }
)
</script>

```


[`useAsyncData`](https://nuxt.com/docs/api/composables/use-async-data)

is a reserved function name transformed by the compiler, so you should not name your own function

[`useAsyncData`](https://nuxt.com/docs/api/composables/use-async-data)

.

Read more in Docs > Getting Started > Data Fetching#useasyncdata.

*   `key`: a unique key to ensure that data fetching can be properly de-duplicated across requests. If you do not provide a key, then a key that is unique to the file name and line number of the instance of `useAsyncData` will be generated for you.
*   `handler`: an asynchronous function that must return a truthy value (for example, it should not be `undefined` or `null`) or the request may be duplicated on the client side.
    
    The `handler` function should be **side-effect free** to ensure predictable behavior during SSR and CSR hydration. If you need to trigger side effects, use the
    
    [`callOnce`](https://nuxt.com/docs/api/utils/call-once)
    
    utility to do so.
    
*   `options`:
    *   `server`: whether to fetch the data on the server (defaults to `true`)
    *   `lazy`: whether to resolve the async function after loading the route, instead of blocking client-side navigation (defaults to `false`)
    *   `immediate`: when set to `false`, will prevent the request from firing immediately. (defaults to `true`)
    *   `default`: a factory function to set the default value of the `data`, before the async function resolves - useful with the `lazy: true` or `immediate: false` option
    *   `transform`: a function that can be used to alter `handler` function result after resolving
    *   `getCachedData`: Provide a function which returns cached data. A `null` or `undefined` return value will trigger a fetch. By default, this is:
        
        ```
const getDefaultCachedData = (key, nuxtApp) => nuxtApp.isHydrating 
  ? nuxtApp.payload.data[key] 
  : nuxtApp.static.data[key]

```

        
        Which only caches data when `experimental.payloadExtraction` of `nuxt.config` is enabled.
    *   `pick`: only pick specified keys in this array from the `handler` function result
    *   `watch`: watch reactive sources to auto-refresh
    *   `deep`: return data in a deep ref object (it is `true` by default). It can be set to `false` to return data in a shallow ref object, which can improve performance if your data does not need to be deeply reactive.
    *   `dedupe`: avoid fetching same key more than once at a time (defaults to `cancel`). Possible options:
        *   `cancel` - cancels existing requests when a new one is made
        *   `defer` - does not make new requests at all if there is a pending request

Under the hood, `lazy: false` uses `<Suspense>` to block the loading of the route before the data has been fetched. Consider using `lazy: true` and implementing a loading state instead for a snappier user experience.

You can use `useLazyAsyncData` to have the same behavior as `lazy: true` with `useAsyncData`.

Learn how to use `transform` and `getCachedData` to avoid superfluous calls to an API and cache data for visitors on the client.

*   `data`: the result of the asynchronous function that is passed in.
*   `refresh`/`execute`: a function that can be used to refresh the data returned by the `handler` function.
*   `error`: an error object if the data fetching failed.
*   `status`: a string indicating the status of the data request:
    *   `idle`: when the request has not started, such as:
        *   when `execute` has not yet been called and `{ immediate: false }` is set
        *   when rendering HTML on the server and `{ server: false }` is set
    *   `pending`: the request is in progress
    *   `success`: the request has completed successfully
    *   `error`: the request has failed
*   `clear`: a function which will set `data` to `undefined`, set `error` to `null`, set `status` to `'idle'`, and mark any currently pending requests as cancelled.

By default, Nuxt waits until a `refresh` is finished before it can be executed again.

If you have not fetched data on the server (for example, with `server: false`), then the data _will not_ be fetched until hydration completes. This means even if you await

[`useAsyncData`](https://nuxt.com/docs/api/composables/use-async-data)

on the client side, `data` will remain `null` within `<script setup>`.

Signature

```
function useAsyncData<DataT, DataE>(
  handler: (nuxtApp?: NuxtApp) => Promise<DataT>,
  options?: AsyncDataOptions<DataT>
): AsyncData<DataT, DataE>
function useAsyncData<DataT, DataE>(
  key: string,
  handler: (nuxtApp?: NuxtApp) => Promise<DataT>,
  options?: AsyncDataOptions<DataT>
): Promise<AsyncData<DataT, DataE>>

type AsyncDataOptions<DataT> = {
  server?: boolean
  lazy?: boolean
  immediate?: boolean
  deep?: boolean
  dedupe?: 'cancel' | 'defer'
  default?: () => DataT | Ref<DataT> | null
  transform?: (input: DataT) => DataT | Promise<DataT>
  pick?: string[]
  watch?: WatchSource[]
  getCachedData?: (key: string, nuxtApp: NuxtApp) => DataT | undefined
}

type AsyncData<DataT, ErrorT> = {
  data: Ref<DataT | null>
  refresh: (opts?: AsyncDataExecuteOptions) => Promise<void>
  execute: (opts?: AsyncDataExecuteOptions) => Promise<void>
  clear: () => void
  error: Ref<ErrorT | null>
  status: Ref<AsyncDataRequestStatus>
};

interface AsyncDataExecuteOptions {
  dedupe?: 'cancel' | 'defer'
}

type AsyncDataRequestStatus = 'idle' | 'pending' | 'success' | 'error'

```


Read more in Docs > Getting Started > Data Fetching.