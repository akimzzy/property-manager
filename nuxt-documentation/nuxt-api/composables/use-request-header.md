# useRequestHeader · Nuxt Composables
[Nuxt UI Pro v3 is out! Get 20% OFF until Friday](https://ui.nuxt.com/pro/pricing)

Use useRequestHeader to access a certain incoming request header.

You can use the built-in [`useRequestHeader`](https://nuxt.com/docs/api/composables/use-request-header) composable to access any incoming request header within your pages, components, and plugins.

```
// Get the authorization request header
const authorization = useRequestHeader('authorization')

```


In the browser, `useRequestHeader` will return `undefined`.

We can use `useRequestHeader` to easily figure out if a user is authorized or not.

The example below reads the `authorization` request header to find out if a person can access a restricted resource.

middleware/authorized-only.ts

```
export default defineNuxtRouteMiddleware((to, from) => {
  if (!useRequestHeader('authorization')) {
    return navigateTo('/not-authorized')
  }
})

```


* * *