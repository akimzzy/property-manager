# Data Fetching · Get Started with Nuxt

Nuxt comes with two composables and a built-in library to perform data-fetching in browser or server environments: `useFetch`, [`useAsyncData`](https://nuxt.com/docs/api/composables/use-async-data) and `$fetch`.

In a nutshell:

- [`$fetch`](https://nuxt.com/docs/api/utils/dollarfetch) is the simplest way to make a network request.
- [`useFetch`](https://nuxt.com/docs/api/composables/use-fetch) is wrapper around `$fetch` that fetches data only once in [universal rendering](about:/docs/guide/concepts/rendering#universal-rendering).
- [`useAsyncData`](https://nuxt.com/docs/api/composables/use-async-data) is similar to `useFetch` but offers more fine-grained control.

Both `useFetch` and `useAsyncData` share a common set of options and patterns that we will detail in the last sections.

Nuxt is a framework which can run isomorphic (or universal) code in both server and client environments. If the [`$fetch` function](https://nuxt.com/docs/api/utils/dollarfetch) is used to perform data fetching in the setup function of a Vue component, this may cause data to be fetched twice, once on the server (to render the HTML) and once again on the client (when the HTML is hydrated). This can cause hydration issues, increase the time to interactivity and cause unpredictable behavior.

The [`useFetch`](https://nuxt.com/docs/api/composables/use-fetch) and [`useAsyncData`](https://nuxt.com/docs/api/composables/use-async-data) composables solve this problem by ensuring that if an API call is made on the server, the data is forwarded to the client in the payload.

The payload is a JavaScript object accessible through [`useNuxtApp().payload`](about:/docs/api/composables/use-nuxt-app#payload). It is used on the client to avoid refetching the same data when the code is executed in the browser [during hydration](about:/docs/guide/concepts/rendering#universal-rendering).

Use the

[Nuxt DevTools](https://devtools.nuxt.com/)

to inspect this data in the **Payload tab**.

app.vue

```
<script setup lang="ts">
const { data } = await useFetch('/api/data')

async function handleFormSubmit() {
  const res = await $fetch('/api/submit', {
    method: 'POST',
    body: {
      // My form data
    }
  })
}
</script>

<template>
  <div v-if="data == null">
    No data
  </div>
  <div v-else>
    <form @submit="handleFormSubmit">
      <!-- form input tags -->
    </form>
  </div>
</template>

```

In the example above, `useFetch` would make sure that the request would occur in the server and is properly forwarded to the browser. `$fetch` has no such mechanism and is a better option to use when the request is solely made from the browser.

### [Suspense](#suspense)

Nuxt uses Vue’s [`<Suspense>`](https://vuejs.org/guide/built-ins/suspense) component under the hood to prevent navigation before every async data is available to the view. The data fetching composables can help you leverage this feature and use what suits best on a per-call basis.

You can add the

[`<NuxtLoadingIndicator>`](https://nuxt.com/docs/api/components/nuxt-loading-indicator)

to add a progress bar between page navigations.

Nuxt includes the [ofetch](https://github.com/unjs/ofetch) library, and is auto-imported as the `$fetch` alias globally across your application.

pages/todos.vue

```
<script setup lang="ts">
async function
addTodo() {
  const
todo = await
$fetch('/api/todos', {

method: 'POST',

body: {
      // My todo data
    }
  })
}
</script>

```

Beware that using only `$fetch` will not provide

[network calls de-duplication and navigation prevention](#the-need-for-usefetch-and-useasyncdata)

.  
It is recommended to use `$fetch` for client-side interactions (event based) or combined with

[`useAsyncData`](#useasyncdata)

when fetching the initial component data.

### [Pass Client Headers to the API](#pass-client-headers-to-the-api)

When calling `useFetch` on the server, Nuxt will use [`useRequestFetch`](https://nuxt.com/docs/api/composables/use-request-fetch) to proxy client headers and cookies (with the exception of headers not meant to be forwarded, like `host`).

```
<script setup lang="ts">
const { data } = await useFetch('/api/echo');
</script>

```

```
// /api/echo.ts
export default defineEventHandler(event => parseCookies(event))

```

Alternatively, the example below shows how to use [`useRequestHeaders`](https://nuxt.com/docs/api/composables/use-request-headers) to access and send cookies to the API from a server-side request (originating on the client). Using an isomorphic `$fetch` call, we ensure that the API endpoint has access to the same `cookie` header originally sent by the user's browser. This is only necessary if you aren't using `useFetch`.

```
<script setup lang="ts">
const headers = useRequestHeaders(['cookie'])

async function getCurrentUser() {
  return await $fetch('/api/me', { headers })
}
</script>

```

You can also use

[`useRequestFetch`](https://nuxt.com/docs/api/composables/use-request-fetch)

to proxy headers to the call automatically.

Be very careful before proxying headers to an external API and just include headers that you need. Not all headers are safe to be bypassed and might introduce unwanted behavior. Here is a list of common headers that are NOT to be proxied:

- `host`, `accept`
- `content-length`, `content-md5`, `content-type`
- `x-forwarded-host`, `x-forwarded-port`, `x-forwarded-proto`
- `cf-connecting-ip`, `cf-ray`

The [`useFetch`](https://nuxt.com/docs/api/composables/use-fetch) composable uses `$fetch` under-the-hood to make SSR-safe network calls in the setup function.

app.vue

```
<script setup lang="ts">
const {
data:
count } = await
useFetch('/api/count')
</script>

<template>
  <
p>Page visits: {{
count }}</
p>
</template>

```

This composable is a wrapper around the [`useAsyncData`](https://nuxt.com/docs/api/composables/use-async-data) composable and `$fetch` utility.

Watch the video from Alexander Lichter to avoid using `useFetch` the wrong way!

Read more in Docs > API > Composables > Use Fetch.

The `useAsyncData` composable is responsible for wrapping async logic and returning the result once it is resolved.

`useFetch(url)` is nearly equivalent to `useAsyncData(url, () => event.$fetch(url))`.  
It's developer experience sugar for the most common use case. (You can find out more about `event.fetch` at

[`useRequestFetch`](https://nuxt.com/docs/api/composables/use-request-fetch)

.)

Watch a video from Alexander Lichter to dig deeper into the difference between `useFetch` and `useAsyncData`.

There are some cases when using the [`useFetch`](https://nuxt.com/docs/api/composables/use-fetch) composable is not appropriate, for example when a CMS or a third-party provide their own query layer. In this case, you can use [`useAsyncData`](https://nuxt.com/docs/api/composables/use-async-data) to wrap your calls and still keep the benefits provided by the composable.

pages/users.vue

```
<script setup lang="ts">
const { data, error } = await useAsyncData('users', () => myGetFunction('users'))

// This is also possible:
const { data, error } = await useAsyncData(() => myGetFunction('users'))
</script>

```

The first argument of

[`useAsyncData`](https://nuxt.com/docs/api/composables/use-async-data)

is a unique key used to cache the response of the second argument, the querying function. This key can be ignored by directly passing the querying function, the key will be auto-generated.

Since the autogenerated key only takes into account the file and line where `useAsyncData` is invoked, it is recommended to always create your own key to avoid unwanted behavior, like when you are creating your own custom composable wrapping `useAsyncData`.

Setting a key can be useful to share the same data between components using

[`useNuxtData`](https://nuxt.com/docs/api/composables/use-nuxt-data)

or to

[refresh specific data](about:/docs/api/utils/refresh-nuxt-data#refresh-specific-data)

.

pages/users/\[id\].vue

```
<script setup lang="ts">
const { id } = useRoute().params

const { data, error } = await useAsyncData(`user:${id}`, () => {
  return myGetFunction('users', { id })
})
</script>

```

The `useAsyncData` composable is a great way to wrap and wait for multiple `$fetch` requests to be completed, and then process the results.

```
<script setup lang="ts">
const { data: discounts, status } = await useAsyncData('cart-discount', async () => {
  const [coupons, offers] = await Promise.all([
    $fetch('/cart/coupons'),
    $fetch('/cart/offers')
  ])

  return { coupons, offers }
})
// discounts.value.coupons
// discounts.value.offers
</script>

```

`useAsyncData` is for fetching and caching data, not triggering side effects like calling Pinia actions, as this can cause unintended behavior such as repeated executions with nullish values. If you need to trigger side effects, use the

[`callOnce`](https://nuxt.com/docs/api/utils/call-once)

utility to do so.

```
<script setup lang="ts">
const offersStore = useOffersStore()

// you can't do this
await useAsyncData(() => offersStore.getOffer(route.params.slug))
</script>

```

Read more about `useAsyncData`.

`useFetch` and `useAsyncData` have the same return values listed below.

- `data`: the result of the asynchronous function that is passed in.
- `refresh`/`execute`: a function that can be used to refresh the data returned by the `handler` function.
- `clear`: a function that can be used to set `data` to `undefined`, set `error` to `null`, set `status` to `idle`, and mark any currently pending requests as cancelled.
- `error`: an error object if the data fetching failed.
- `status`: a string indicating the status of the data request (`"idle"`, `"pending"`, `"success"`, `"error"`).

`data`, `error` and `status` are Vue refs accessible with `.value` in `<script setup>`

By default, Nuxt waits until a `refresh` is finished before it can be executed again.

If you have not fetched data on the server (for example, with `server: false`), then the data _will not_ be fetched until hydration completes. This means even if you await `useFetch` on client-side, `data` will remain null within `<script setup>`.

[`useAsyncData`](https://nuxt.com/docs/api/composables/use-async-data) and [`useFetch`](https://nuxt.com/docs/api/composables/use-fetch) return the same object type and accept a common set of options as their last argument. They can help you control the composables behavior, such as navigation blocking, caching or execution.

### [Lazy](#lazy)

By default, data fetching composables will wait for the resolution of their asynchronous function before navigating to a new page by using Vue’s Suspense. This feature can be ignored on client-side navigation with the `lazy` option. In that case, you will have to manually handle loading state using the `status` value.

app.vue

```
<script setup lang="ts">
const {
status,
data:
posts } =
useFetch('/api/posts', {

lazy: true
})
</script>

<template>
  <!-- you will need to handle a loading state -->
  <
div v-if="
status === 'pending'">
    Loading ...
  </
div>
  <
div v-else>
    <
div v-for="
post in
posts">
      <!-- do something -->
    </
div>
  </
div>
</template>

```

You can alternatively use [`useLazyFetch`](https://nuxt.com/docs/api/composables/use-lazy-fetch) and `useLazyAsyncData` as convenient methods to perform the same.

```
<script setup lang="ts">
const {
status,
data:
posts } =
useLazyFetch('/api/posts')
</script>

```

Read more about `useLazyFetch`.

Read more about `useLazyAsyncData`.

### [Client-only fetching](#client-only-fetching)

By default, data fetching composables will perform their asynchronous function on both client and server environments. Set the `server` option to `false` to only perform the call on the client-side. On initial load, the data will not be fetched before hydration is complete so you have to handle a pending state, though on subsequent client-side navigation the data will be awaited before loading the page.

Combined with the `lazy` option, this can be useful for data that is not needed on the first render (for example, non-SEO sensitive data).

```
/* This call is performed before hydration */
const
articles = await
useFetch('/api/article')

/* This call will only be performed on the client */
const {
status,
data:
comments } =
useFetch('/api/comments', {

lazy: true,

server: false
})

```

The `useFetch` composable is meant to be invoked in setup method or called directly at the top level of a function in lifecycle hooks, otherwise you should use [`$fetch` method](#fetch).

### [Minimize payload size](#minimize-payload-size)

The `pick` option helps you to minimize the payload size stored in your HTML document by only selecting the fields that you want returned from the composables.

```
<script setup lang="ts">
/* only pick the fields used in your template */
const { data: mountain } = await useFetch('/api/mountains/everest', {
  pick: ['title', 'description']
})
</script>

<template>
  <h1>{{ mountain.title }}</h1>
  <p>{{ mountain.description }}</p>
</template>

```

If you need more control or map over several objects, you can use the `transform` function to alter the result of the query.

```
const { data: mountains } = await useFetch('/api/mountains', {
  transform: (mountains) => {
    return mountains.map(mountain => ({ title: mountain.title, description: mountain.description }))
  }
})

```

Both `pick` and `transform` don't prevent the unwanted data from being fetched initially. But they will prevent unwanted data from being added to the payload transferred from server to client.

### [Caching and refetching](#caching-and-refetching)

#### [Keys](#keys)

[`useFetch`](https://nuxt.com/docs/api/composables/use-fetch) and [`useAsyncData`](https://nuxt.com/docs/api/composables/use-async-data) use keys to prevent refetching the same data.

- [`useFetch`](https://nuxt.com/docs/api/composables/use-fetch) uses the provided URL as a key. Alternatively, a `key` value can be provided in the `options` object passed as a last argument.
- [`useAsyncData`](https://nuxt.com/docs/api/composables/use-async-data) uses its first argument as a key if it is a string. If the first argument is the handler function that performs the query, then a key that is unique to the file name and line number of the instance of `useAsyncData` will be generated for you.

To get the cached data by key, you can use

[`useNuxtData`](https://nuxt.com/docs/api/composables/use-nuxt-data)

#### [Refresh and execute](#refresh-and-execute)

If you want to fetch or refresh data manually, use the `execute` or `refresh` function provided by the composables.

```
<script setup lang="ts">
const {
data,
error,
execute,
refresh } = await
useFetch('/api/users')
</script>

<template>
  <
div>
    <
p>{{
data }}</
p>
    <
button @
click="() =>
refresh()">Refresh data</
button>
  </
div>
</template>

```

The `execute` function is an alias for `refresh` that works in exactly the same way but is more semantic for cases when the fetch is [not immediate](#not-immediate).

To globally refetch or invalidate cached data, see

[`clearNuxtData`](https://nuxt.com/docs/api/utils/clear-nuxt-data)

and

[`refreshNuxtData`](https://nuxt.com/docs/api/utils/refresh-nuxt-data)

.

#### [Clear](#clear)

If you want to clear the data provided, for whatever reason, without needing to know the specific key to pass to `clearNuxtData`, you can use the `clear` function provided by the composables.

```
<script setup lang="ts">
const {
data,
clear } = await
useFetch('/api/users')

const
route =
useRoute()

watch(() =>
route.
path, (
path) => {
  if (
path === '/')
clear()
})
</script>

```

#### [Watch](#watch)

To re-run your fetching function each time other reactive values in your application change, use the `watch` option. You can use it for one or multiple _watchable_ elements.

```
<script setup lang="ts">
const
id =
ref(1)

const {
data,
error,
refresh } = await
useFetch('/api/users', {
  /* Changing the id will trigger a refetch */

watch: [
id]
})
</script>

```

Note that **watching a reactive value won't change the URL fetched**. For example, this will keep fetching the same initial ID of the user because the URL is constructed at the moment the function is invoked.

```
<script setup lang="ts">
const id = ref(1)

const { data, error, refresh } = await useFetch(`/api/users/${id.value}`, {
  watch: [id]
})
</script>

```

If you need to change the URL based on a reactive value, you may want to use a [computed URL](#computed-url) instead.

#### [Computed URL](#computed-url)

Sometimes you may need to compute an URL from reactive values, and refresh the data each time these change. Instead of juggling your way around, you can attach each param as a reactive value. Nuxt will automatically use the reactive value and re-fetch each time it changes.

```
<script setup lang="ts">
const id = ref(null)

const { data, status } = useLazyFetch('/api/user', {
  query: {
    user_id: id
  }
})
</script>

```

In the case of more complex URL construction, you may use a callback as a [computed getter](https://vuejs.org/guide/essentials/computed.html) that returns the URL string.

Every time a dependency changes, the data will be fetched using the newly constructed URL. Combine this with [not-immediate](#not-immediate), and you can wait until the reactive element changes before fetching.

```
<script setup lang="ts">
const id = ref(null)

const { data, status } = useLazyFetch(() => `/api/users/${id.value}`, {
  immediate: false
})

const pending = computed(() => status.value === 'pending');
</script>

<template>
  <div>
    <!-- disable the input while fetching -->
    <input v-model="id" type="number" :disabled="pending"/>

    <div v-if="status === 'idle'">
      Type an user ID
    </div>

    <div v-else-if="pending">
      Loading ...
    </div>

    <div v-else>
      {{ data }}
    </div>
  </div>
</template>

```

If you need to force a refresh when other reactive values change, you can also [watch other values](#watch).

### [Not immediate](#not-immediate)

The `useFetch` composable will start fetching data the moment is invoked. You may prevent this by setting `immediate: false`, for example, to wait for user interaction.

With that, you will need both the `status` to handle the fetch lifecycle, and `execute` to start the data fetch.

```
<script setup lang="ts">
const { data, error, execute, status } = await useLazyFetch('/api/comments', {
  immediate: false
})
</script>

<template>
  <div v-if="status === 'idle'">
    <button @click="execute">Get data</button>
  </div>

  <div v-else-if="status === 'pending'">
    Loading comments...
  </div>

  <div v-else>
    {{ data }}
  </div>
</template>

```

For finer control, the `status` variable can be:

- `idle` when the fetch hasn't started
- `pending` when a fetch has started but not yet completed
- `error` when the fetch fails
- `success` when the fetch is completed successfully

When we call `$fetch` in the browser, user headers like `cookie` will be directly sent to the API.

Normally, during server-side-rendering, due to security considerations, the `$fetch` wouldn't include the user's browser cookies, nor pass on cookies from the fetch response.

However, when calling `useFetch` with a relative URL on the server, Nuxt will use [`useRequestFetch`](https://nuxt.com/docs/api/composables/use-request-fetch) to proxy headers and cookies (with the exception of headers not meant to be forwarded, like `host`).

### [Pass Cookies From Server-side API Calls on SSR Response](#pass-cookies-from-server-side-api-calls-on-ssr-response)

If you want to pass on/proxy cookies in the other direction, from an internal request back to the client, you will need to handle this yourself.

composables/fetch.ts

```
import { appendResponseHeader } from 'h3'
import type { H3Event } from 'h3'

export const fetchWithCookie = async (event: H3Event, url: string) => {
  /* Get the response from the server endpoint */
  const res = await $fetch.raw(url)
  /* Get the cookies from the response */
  const cookies = res.headers.getSetCookie()
  /* Attach each cookie to our incoming Request */
  for (const cookie of cookies) {
    appendResponseHeader(event, 'set-cookie', cookie)
  }
  /* Return the data of the response */
  return res._data
}

```

```
<script setup lang="ts">
// This composable will automatically pass cookies to the client
const event = useRequestEvent()

const { data: result } = await useAsyncData(() => fetchWithCookie(event!, '/api/with-cookie'))

onMounted(() => console.log(document.cookie))
</script>

```

Nuxt provides a way to perform `asyncData` fetching within the Options API. You must wrap your component definition within `defineNuxtComponent` for this to work.

```
<script>
export default defineNuxtComponent({
  /* Use the fetchKey option to provide a unique key */
  fetchKey: 'hello',
  async asyncData () {
    return {
      hello: await $fetch('/api/hello')
    }
  }
})
</script>

```

Using `<script setup>` or `<script setup lang="ts">` are the recommended way of declaring Vue components in Nuxt 3.

Read more in Docs > API > Utils > Define Nuxt Component.

When using `useAsyncData` and `useLazyAsyncData` to transfer data fetched on server to the client (as well as anything else that utilizes [the Nuxt payload](about:/docs/api/composables/use-nuxt-app#payload)), the payload is serialized with [`devalue`](https://github.com/Rich-Harris/devalue). This allows us to transfer not just basic JSON but also to serialize and revive/deserialize more advanced kinds of data, such as regular expressions, Dates, Map and Set, `ref`, `reactive`, `shallowRef`, `shallowReactive` and `NuxtError` - and more.

It is also possible to define your own serializer/deserializer for types that are not supported by Nuxt. You can read more in the [`useNuxtApp`](about:/docs/api/composables/use-nuxt-app#payload) docs.

Note that this _does not apply_ to data passed from your server routes when fetched with `$fetch` or `useFetch` - see the next section for more information.

When fetching data from the `server` directory, the response is serialized using `JSON.stringify`. However, since serialization is limited to only JavaScript primitive types, Nuxt does its best to convert the return type of `$fetch` and [`useFetch`](https://nuxt.com/docs/api/composables/use-fetch) to match the actual value.

Learn more about `JSON.stringify` limitations.

### [Example](#example)

server/api/foo.ts

```
export default defineEventHandler(() => {
  return new Date()
})

```

app.vue

```
<script setup lang="ts">
// Type of `data` is inferred as string even though we returned a Date object
const { data } = await useFetch('/api/foo')
</script>

```

### [Custom serializer function](#custom-serializer-function)

To customize the serialization behavior, you can define a `toJSON` function on your returned object. If you define a `toJSON` method, Nuxt will respect the return type of the function and will not try to convert the types.

server/api/bar.ts

```
export default defineEventHandler(() => {
  const data = {
    createdAt: new Date(),

    toJSON() {
      return {
        createdAt: {
          year: this.createdAt.getFullYear(),
          month: this.createdAt.getMonth(),
          day: this.createdAt.getDate(),
        },
      }
    },
  }
  return data
})

```

app.vue

```
<script setup lang="ts">
// Type of `data` is inferred as
// {
//   createdAt: {
//     year: number
//     month: number
//     day: number
//   }
// }
const { data } = await useFetch('/api/bar')
</script>

```

### [Using an alternative serializer](#using-an-alternative-serializer)

Nuxt does not currently support an alternative serializer to `JSON.stringify`. However, you can return your payload as a normal string and utilize the `toJSON` method to maintain type safety.

In the example below, we use [superjson](https://github.com/blitz-js/superjson) as our serializer.

server/api/superjson.ts

```
import superjson from 'superjson'

export default defineEventHandler(() => {
  const data = {
    createdAt: new Date(),

    // Workaround the type conversion
    toJSON() {
      return this
    }
  }

  // Serialize the output to string, using superjson
  return superjson.stringify(data) as unknown as typeof data
})

```

app.vue

```
<script setup lang="ts">
import superjson from 'superjson'

// `date` is inferred as { createdAt: Date } and you can safely use the Date object methods
const { data } = await useFetch('/api/superjson', {
  transform: (value) => {
    return superjson.parse(value as unknown as string)
  },
})
</script>

```

### [Consuming SSE (Server Sent Events) via POST request](#consuming-sse-server-sent-events-via-post-request)

If you're consuming SSE via GET request, you can use

[`EventSource`](https://developer.mozilla.org/en-US/docs/Web/API/EventSource)

or VueUse composable

[`useEventSource`](https://vueuse.org/core/useEventSource/)

.

When consuming SSE via POST request, you need to handle the connection manually. Here's how you can do it:

```
// Make a POST request to the SSE endpoint
const response = await $fetch<ReadableStream>('/chats/ask-ai', {
  method: 'POST',
  body: {
    query: "Hello AI, how are you?",
  },
  responseType: 'stream',
})

// Create a new ReadableStream from the response with TextDecoderStream to get the data as text
const reader = response.pipeThrough(new TextDecoderStream()).getReader()

// Read the chunk of data as we get it
while (true) {
  const { value, done } = await reader.read()

  if (done)
    break

  console.log('Received:', value)
}

```
