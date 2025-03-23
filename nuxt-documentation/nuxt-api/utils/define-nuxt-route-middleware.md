# defineNuxtRouteMiddleware · Nuxt Utils
Route middleware are stored in the [`middleware/`](https://nuxt.com/docs/guide/directory-structure/middleware) of your Nuxt application (unless [set otherwise](about:/docs/api/nuxt-config#middleware)).

```
defineNuxtRouteMiddleware(middleware: RouteMiddleware) => RouteMiddleware

interface RouteMiddleware {
  (to: RouteLocationNormalized, from: RouteLocationNormalized): ReturnType<NavigationGuard>
}

```


### [`middleware`](#middleware)

*   **Type**: `RouteMiddleware`

A function that takes two Vue Router's route location objects as parameters: the next route `to` as the first, and the current route `from` as the second.

Learn more about available properties of `RouteLocationNormalized` in the **[Vue Router docs](https://router.vuejs.org/api/#RouteLocationNormalized)**.

### [Showing Error Page](#showing-error-page)

You can use route middleware to throw errors and show helpful error messages:

middleware/error.ts

```
export default defineNuxtRouteMiddleware((to) => {
  if (to.params.id === '1') {
    throw createError({ statusCode: 404, statusMessage: 'Page Not Found' })
  }
})

```


The above route middleware will redirect a user to the custom error page defined in the `~/error.vue` file, and expose the error message and code passed from the middleware.

### [Redirection](#redirection)

Use [`useState`](https://nuxt.com/docs/api/composables/use-state) in combination with `navigateTo` helper function inside the route middleware to redirect users to different routes based on their authentication status:

middleware/auth.ts

```
export default defineNuxtRouteMiddleware((to, from) => {
  const auth = useState('auth')

  if (!auth.value.isAuthenticated) {
    return navigateTo('/login')
  }

  if (to.path !== '/dashboard') {
    return navigateTo('/dashboard')
  }
})

```


Both [navigateTo](https://nuxt.com/docs/api/utils/navigate-to) and [abortNavigation](https://nuxt.com/docs/api/utils/abort-navigation) are globally available helper functions that you can use inside `defineNuxtRouteMiddleware`.

* * *