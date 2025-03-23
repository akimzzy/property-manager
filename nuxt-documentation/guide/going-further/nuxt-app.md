# NuxtApp · Nuxt Advanced
In Nuxt 3, you can access runtime app context within composables, components and plugins.

In Nuxt 2, this was referred to as **Nuxt context**.

Jump over the `NuxtApp` interface documentation.

[The Nuxt Context](#the-nuxt-context)
-------------------------------------

Many composables and utilities, both built-in and user-made, may require access to the Nuxt instance. This doesn't exist everywhere on your application, because a fresh instance is created on every request.

Currently, the Nuxt context is only accessible in [plugins](https://nuxt.com/docs/guide/directory-structure/plugins), [Nuxt hooks](https://nuxt.com/docs/guide/going-further/hooks), [Nuxt middleware](https://nuxt.com/docs/guide/directory-structure/middleware) (if wrapped in `defineNuxtRouteMiddleware`), and [setup functions](https://vuejs.org/api/composition-api-setup.html) (in pages and components).

If a composable is called without access to the context, you may get an error stating that 'A composable that requires access to the Nuxt instance was called outside of a plugin, Nuxt hook, Nuxt middleware, or Vue setup function.' In that case, you can also explicitly call functions within this context by using [`nuxtApp.runWithContext`](about:/docs/api/composables/use-nuxt-app#runwithcontext).

Within composables, plugins and components you can access `nuxtApp` with [`useNuxtApp()`](https://nuxt.com/docs/api/composables/use-nuxt-app):

composables/useMyComposable.ts

```
export function useMyComposable () {
  const nuxtApp = useNuxtApp()
  // access runtime nuxt app instance
}

```


If your composable does not always need `nuxtApp` or you simply want to check if it is present or not, since [`useNuxtApp`](https://nuxt.com/docs/api/composables/use-nuxt-app) throws an exception, you can use [`tryUseNuxtApp`](about:/docs/api/composables/use-nuxt-app#tryusenuxtapp) instead.

Plugins also receive `nuxtApp` as the first argument for convenience.

Read more in Docs > Guide > Directory Structure > Plugins.

You can provide helpers to be usable across all composables and application. This usually happens within a Nuxt plugin.

```
const nuxtApp = useNuxtApp()
nuxtApp.provide('hello', (name) => `Hello ${name}!`)

console.log(nuxtApp.$hello('name')) // Prints "Hello name!"

```


It is possible to inject helpers by returning an object with a `provide` key in plugins.

In Nuxt 2 plugins, this was referred to as **inject function**.