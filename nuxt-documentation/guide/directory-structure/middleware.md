# middleware/ · Nuxt Directory Structure

Nuxt provides a customizable **route middleware** framework you can use throughout your application, ideal for extracting code that you want to run before navigating to a particular route.

There are three kinds of route middleware:

1.  Anonymous (or inline) route middleware are defined directly within the page.
2.  Named route middleware, placed in the `middleware/` and automatically loaded via asynchronous import when used on a page.
3.  Global route middleware, placed in the `middleware/` with a `.global` suffix and is run on every route change.

The first two kinds of route middleware can be defined in [`definePageMeta`](https://nuxt.com/docs/api/utils/define-page-meta).

Name of middleware are normalized to kebab-case: `myMiddleware` becomes `my-middleware`.

Route middleware run within the Vue part of your Nuxt app. Despite the similar name, they are completely different from

[server middleware](about:/docs/guide/directory-structure/server#server-middleware)

, which are run in the Nitro server part of your app.

Route middleware are navigation guards that receive the current route and the next route as arguments.

middleware/my-middleware.ts

```
export default
defineNuxtRouteMiddleware((
to,
from) => {
  if (
to.
params.
id === '1') {
    return
abortNavigation()
  }
  // In a real app you would probably not redirect every route to `/`
  // however it is important to check `to.path` before redirecting or you
  // might get an infinite redirect loop
  if (
to.
path !== '/') {
    return
navigateTo('/')
  }
})

```

Nuxt provides two globally available helpers that can be returned directly from the middleware.

1.  [`navigateTo`](https://nuxt.com/docs/api/utils/navigate-to) - Redirects to the given route
2.  [`abortNavigation`](https://nuxt.com/docs/api/utils/abort-navigation) - Aborts the navigation, with an optional error message.

Unlike [navigation guards](https://router.vuejs.org/guide/advanced/navigation-guards.html#global-before-guards) from `vue-router`, a third `next()` argument is not passed, and **redirect or route cancellation is handled by returning a value from the middleware**.

Possible return values are:

- nothing (a simple `return` or no return at all) - does not block navigation and will move to the next middleware function, if any, or complete the route navigation
- `return navigateTo('/')` - redirects to the given path and will set the redirect code to [`302` Found](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/302) if the redirect happens on the server side
- `return navigateTo('/', { redirectCode: 301 })` - redirects to the given path and will set the redirect code to [`301` Moved Permanently](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/301) if the redirect happens on the server side
- `return abortNavigation()` - stops the current navigation
- `return abortNavigation(error)` - rejects the current navigation with an error

Read more in Docs > API > Utils > Navigate To.

Read more in Docs > API > Utils > Abort Navigation.

We recommend using the helper functions above for performing redirects or stopping navigation. Other possible return values described in

[the vue-router docs](https://router.vuejs.org/guide/advanced/navigation-guards.html#global-before-guards)

may work but there may be breaking changes in future.

Middleware runs in the following order:

1.  Global Middleware
2.  Page defined middleware order (if there are multiple middleware declared with the array syntax)

For example, assuming you have the following middleware and component:

middleware/ directory

```
-| middleware/
---| analytics.global.ts
---| setup.global.ts
---| auth.ts

```

pages/profile.vue

```
<script setup lang="ts">
definePageMeta({
  middleware: [
    function (to, from) {
      // Custom inline middleware
    },
    'auth',
  ],
});
</script>

```

You can expect the middleware to be run in the following order:

1.  `analytics.global.ts`
2.  `setup.global.ts`
3.  Custom inline middleware
4.  `auth.ts`

### [Ordering Global Middleware](#ordering-global-middleware)

By default, global middleware is executed alphabetically based on the filename.

However, there may be times you want to define a specific order. For example, in the last scenario, `setup.global.ts` may need to run before `analytics.global.ts`. In that case, we recommend prefixing global middleware with 'alphabetical' numbering.

Directory structure

```
-| middleware/
---| 01.setup.global.ts
---| 02.analytics.global.ts
---| auth.ts

```

In case you're new to 'alphabetical' numbering, remember that filenames are sorted as strings, not as numeric values. For example, `10.new.global.ts` would come before `2.new.global.ts`. This is why the example prefixes single digit numbers with `0`.

If your site is server-rendered or generated, middleware for the initial page will be executed both when the page is rendered and then again on the client. This might be needed if your middleware needs a browser environment, such as if you have a generated site, aggressively cache responses, or want to read a value from local storage.

However, if you want to avoid this behaviour you can do so:

middleware/example.ts

```
export default
defineNuxtRouteMiddleware(
to => {
  // skip middleware on server
  if (import.meta.
server) return
  // skip middleware on client side entirely
  if (import.meta.
client) return
  // or only skip middleware on initial client load
  const
nuxtApp =
useNuxtApp()
  if (import.meta.
client &&
nuxtApp.
isHydrating &&
nuxtApp.
payload.
serverRendered) return
})

```

Rendering an error page is an entirely separate page load, meaning any registered middleware will run again. You can use

[`useError`](about:/docs/getting-started/error-handling#useerror)

in middleware to check if an error is being handled.

It is possible to add global or named route middleware manually using the [`addRouteMiddleware()`](https://nuxt.com/docs/api/utils/add-route-middleware) helper function, such as from within a plugin.

```
export default
defineNuxtPlugin(() => {

addRouteMiddleware('global-test', () => {

console.
log('this global middleware was added in a plugin and will be run on every route change')
  }, {
global: true })


addRouteMiddleware('named-test', () => {

console.
log('this named middleware was added in a plugin and would override any existing middleware of the same name')
  })
})

```

Directory Structure

```
-| middleware/
---| auth.ts

```

In your page file, you can reference this route middleware:

```
<script setup lang="ts">
definePageMeta({
  middleware: ["auth"]
  // or middleware: 'auth'
})
</script>

```

Now, before navigation to that page can complete, the `auth` route middleware will be run.

Instead of using `definePageMeta` on each page, you can add named route middleware within the `pages:extend` hook.

nuxt.config.ts

```
import type {
NuxtPage } from 'nuxt/schema'

export default
defineNuxtConfig({

hooks: {
    'pages:extend' (
pages) {
      function
setMiddleware (
pages:
NuxtPage[]) {
        for (const
page of
pages) {
          if (/* some condition */ true) {

page.
meta ||= {}
            // Note that this will override any middleware set in `definePageMeta` in the page

page.
meta.middleware = ['named']
          }
          if (
page.
children) {

setMiddleware(
page.
children)
          }
        }
      }

setMiddleware(
pages)
    }
  }
})

```
