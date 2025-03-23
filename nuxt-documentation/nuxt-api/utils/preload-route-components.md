# preloadRouteComponents · Nuxt Utils
Preloading routes loads the components of a given route that the user might navigate to in future. This ensures that the components are available earlier and less likely to block the navigation, improving performance.

Nuxt already automatically preloads the necessary routes if you're using the `NuxtLink` component.

Read more in Docs > API > Components > Nuxt Link.

Preload a route when using `navigateTo`.

```
// we don't await this async function, to avoid blocking rendering
// this component's setup function
preloadRouteComponents('/dashboard')

const submit = async () => {
  const results = await $fetch('/api/authentication')

  if (results.token) {
    await navigateTo('/dashboard')
  }
}

```


Read more in Docs > API > Utils > Navigate To.

On server, `preloadRouteComponents` will have no effect.

* * *