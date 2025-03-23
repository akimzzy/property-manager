# Error Handling · Get Started with Nuxt
Nuxt is a full-stack framework, which means there are several sources of unpreventable user runtime errors that can happen in different contexts:

*   Errors during the Vue rendering lifecycle (SSR & CSR)
*   Server and client startup errors (SSR + CSR)
*   Errors during Nitro server lifecycle ([`server/`](https://nuxt.com/docs/guide/directory-structure/server) directory)
*   Errors downloading JS chunks

**SSR** stands for **Server-Side Rendering** and **CSR** for **Client-Side Rendering**.

You can hook into Vue errors using [`onErrorCaptured`](https://vuejs.org/api/composition-api-lifecycle.html#onerrorcaptured).

In addition, Nuxt provides a [`vue:error`](about:/docs/api/advanced/hooks#app-hooks-runtime) hook that will be called if any errors propagate up to the top level.

If you are using an error reporting framework, you can provide a global handler through [`vueApp.config.errorHandler`](https://vuejs.org/api/application.html#app-config-errorhandler). It will receive all Vue errors, even if they are handled.

plugins/error-handler.ts

```
export default 
defineNuxtPlugin((
nuxtApp) => {
  
nuxtApp.
vueApp.
config.
errorHandler = (
error, 
instance, 
info) => {
    // handle error, e.g. report to a service
  }

  // Also possible
  
nuxtApp.
hook('vue:error', (
error, 
instance, 
info) => {
    // handle error, e.g. report to a service
  })
})

```


Note that the `vue:error` hook is based on

[`onErrorCaptured`](https://vuejs.org/api/composition-api-lifecycle.html#onerrorcaptured)

lifecycle hook.

Nuxt will call the `app:error` hook if there are any errors in starting your Nuxt application.

This includes:

*   running [Nuxt plugins](https://nuxt.com/docs/guide/directory-structure/plugins)
*   processing `app:created` and `app:beforeMount` hooks
*   rendering your Vue app to HTML (during SSR)
*   mounting the app (on client-side), though you should handle this case with `onErrorCaptured` or with `vue:error`
*   processing the `app:mounted` hook

You cannot currently define a server-side handler for these errors, but can render an error page, see the [Render an Error Page](#error-page) section.

You might encounter chunk loading errors due to a network connectivity failure or a new deployment (which invalidates your old, hashed JS chunk URLs). Nuxt provides built-in support for handling chunk loading errors by performing a hard reload when a chunk fails to load during route navigation.

You can change this behavior by setting `experimental.emitRouteChunkError` to `false` (to disable hooking into these errors at all) or to `manual` if you want to handle them yourself. If you want to handle chunk loading errors manually, you can check out the [the automatic implementation](https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/plugins/chunk-reload.client.ts) for ideas.

[Error Page](#error-page)
-------------------------

When Nuxt encounters a fatal error (any unhandled error on the server, or an error created with `fatal: true` on the client) it will either render a JSON response (if requested with `Accept: application/json` header) or trigger a full-screen error page.

An error may occur during the server lifecycle when:

*   processing your Nuxt plugins
*   rendering your Vue app into HTML
*   a server API route throws an error

It can also occur on the client side when:

*   processing your Nuxt plugins
*   before mounting the application (`app:beforeMount` hook)
*   mounting your app if the error was not handled with `onErrorCaptured` or `vue:error` hook
*   the Vue app is initialized and mounted in browser (`app:mounted`).

Discover all the Nuxt lifecycle hooks.

Customize the default error page by adding `~/error.vue` in the source directory of your application, alongside `app.vue`.

error.vue

```
<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps({
  error: Object as () => NuxtError
})

const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <div>
    <h2>{{ error.statusCode }}</h2>
    <button @click="handleError">Clear errors</button>
  </div>
</template>

```


Read more about `error.vue` and its uses.

For custom errors we highly recommend to use `onErrorCaptured` composable that can be called in a page/component setup function or `vue:error` runtime nuxt hook that can be configured in a nuxt plugin.

plugins/error-handler.ts

```
export default 
defineNuxtPlugin(
nuxtApp => {
  
nuxtApp.
hook('vue:error', (
err) => {
    //
  })
})

```


When you are ready to remove the error page, you can call the [`clearError`](https://nuxt.com/docs/api/utils/clear-error) helper function, which takes an optional path to redirect to (for example, if you want to navigate to a 'safe' page).

Make sure to check before using anything dependent on Nuxt plugins, such as `$route` or `useRouter`, as if a plugin threw an error, then it won't be re-run until you clear the error.

Rendering an error page is an entirely separate page load, meaning any registered middleware will run again. You can use

[`useError`](#useerror)

in middleware to check if an error is being handled.

If you are running on Node 16 and you set any cookies when rendering your error page, they will

[overwrite cookies previously set](https://github.com/nuxt/nuxt/pull/20585)

. We recommend using a newer version of Node as Node 16 reached end-of-life in September 2023.

### [`useError`](#useerror)

TS Signature

```
function useError (): Ref<Error | { url, statusCode, statusMessage, message, description, data }>

```


This function will return the global Nuxt error that is being handled.

Read more about `useError` composable.

### [`createError`](#createerror)

TS Signature

```
function createError (err: string | { cause, data, message, name, stack, statusCode, statusMessage, fatal }): Error

```


Create an error object with additional metadata. You can pass a string to be set as the error `message` or an object containing error properties. It is usable in both the Vue and Server portions of your app, and is meant to be thrown.

If you throw an error created with `createError`:

*   on server-side, it will trigger a full-screen error page which you can clear with [`clearError`](#clearerror).
*   on client-side, it will throw a non-fatal error for you to handle. If you need to trigger a full-screen error page, then you can do this by setting `fatal: true`.

pages/movies/\[slug\].vue

```
<script setup lang="ts">
const 
route = 
useRoute()
const { 
data } = await 
useFetch(`/api/movies/${
route.
params.
slug}`)

if (!
data.
value) {
  throw 
createError({
    
statusCode: 404,
    
statusMessage: 'Page Not Found'
  })
}
</script>

```


Read more about `createError` util.

### [`showError`](#showerror)

TS Signature

```
function showError (err: string | Error | { statusCode, statusMessage }): Error

```


You can call this function at any point on client-side, or (on server side) directly within middleware, plugins or `setup()` functions. It will trigger a full-screen error page which you can clear with [`clearError`](#clearerror).

It is recommended instead to use `throw createError()`.

Read more about `showError` util.

### [`clearError`](#clearerror)

TS Signature

```
function clearError (options?: { redirect?: string }): Promise<void>

```


This function will clear the currently handled Nuxt error. It also takes an optional path to redirect to (for example, if you want to navigate to a 'safe' page).

Read more about `clearError` util.

Nuxt also provides a [`<NuxtErrorBoundary>`](https://nuxt.com/docs/api/components/nuxt-error-boundary) component that allows you to handle client-side errors within your app, without replacing your entire site with an error page.

This component is responsible for handling errors that occur within its default slot. On client-side, it will prevent the error from bubbling up to the top level, and will render the `#error` slot instead.

The `#error` slot will receive `error` as a prop. (If you set `error = null` it will trigger re-rendering the default slot; you'll need to ensure that the error is fully resolved first or the error slot will just be rendered a second time.)

If you navigate to another route, the error will be cleared automatically.

pages/index.vue

```
<template>
  <!-- some content -->
  <NuxtErrorBoundary @error="someErrorLogger">
    <!-- You use the default slot to render your content -->
    <template #error="{ error, clearError }">
      You can display the error locally here: {{ error }}
      <button @click="clearError">
        This will clear the error.
      </button>
    </template>
  </NuxtErrorBoundary>
</template>

```
