# useRouter · Nuxt Composables
The useRouter composable returns the router instance.

pages/index.vue

```
<script setup lang="ts">
const router = useRouter()
</script>

```


If you only need the router instance within your template, use `$router`:

pages/index.vue

```
<template>
  <button @click="$router.back()">Back</button>
</template>

```


If you have a `pages/` directory, `useRouter` is identical in behavior to the one provided by `vue-router`.

Read `vue-router` documentation about the `Router` interface.

*   [`addRoute()`](https://router.vuejs.org/api/interfaces/Router.html#addRoute): Add a new route to the router instance. `parentName` can be provided to add new route as the child of an existing route.
*   [`removeRoute()`](https://router.vuejs.org/api/interfaces/Router.html#removeRoute): Remove an existing route by its name.
*   [`getRoutes()`](https://router.vuejs.org/api/interfaces/Router.html#getRoutes): Get a full list of all the route records.
*   [`hasRoute()`](https://router.vuejs.org/api/interfaces/Router.html#hasRoute): Checks if a route with a given name exists.
*   [`resolve()`](https://router.vuejs.org/api/interfaces/Router.html#resolve): Returns the normalized version of a route location. Also includes an `href` property that includes any existing base.

Example

```
const router = useRouter()

router.addRoute({ name: 'home', path: '/home', component: Home })
router.removeRoute('home')
router.getRoutes()
router.hasRoute('home')
router.resolve({ name: 'home' })

```


`router.addRoute()` adds route details into an array of routes and it is useful while building

[Nuxt plugins](https://nuxt.com/docs/guide/directory-structure/plugins)

while `router.push()` on the other hand, triggers a new navigation immediately and it is useful in pages, Vue components and composable.

[Based on History API](#based-on-history-api)
---------------------------------------------

*   [`back()`](https://router.vuejs.org/api/interfaces/Router.html#back): Go back in history if possible, same as `router.go(-1)`.
*   [`forward()`](https://router.vuejs.org/api/interfaces/Router.html#forward): Go forward in history if possible, same as `router.go(1)`.
*   [`go()`](https://router.vuejs.org/api/interfaces/Router.html#go): Move forward or backward through the history without the hierarchical restrictions enforced in `router.back()` and `router.forward()`.
*   [`push()`](https://router.vuejs.org/api/interfaces/Router.html#push): Programmatically navigate to a new URL by pushing an entry in the history stack. **It is recommended to use [`navigateTo`](https://nuxt.com/docs/api/utils/navigate-to) instead.**
*   [`replace()`](https://router.vuejs.org/api/interfaces/Router.html#replace): Programmatically navigate to a new URL by replacing the current entry in the routes history stack. **It is recommended to use [`navigateTo`](https://nuxt.com/docs/api/utils/navigate-to) instead.**

Example

```
const router = useRouter()

router.back()
router.forward()
router.go(3)
router.push({ path: "/home" })
router.replace({ hash: "#bio" })

```


Read more about the browser's History API.

`useRouter` composable provides `afterEach`, `beforeEach` and `beforeResolve` helper methods that acts as navigation guards.

However, Nuxt has a concept of **route middleware** that simplifies the implementation of navigation guards and provides a better developer experience.

Read more in Docs > Guide > Directory Structure > Middleware.

*   [`isReady()`](https://router.vuejs.org/api/interfaces/Router.html#isReady): Returns a Promise that resolves when the router has completed the initial navigation.
*   [`onError`](https://router.vuejs.org/api/interfaces/Router.html#onError): Adds an error handler that is called every time a non caught error happens during navigation.

Read more in Vue Router Docs.

If you do not have a `pages/` folder, then [`useRouter`](https://nuxt.com/docs/api/composables/use-router) will return a universal router instance with similar helper methods, but be aware that not all features may be supported or behave in exactly the same way as with `vue-router`.

* * *