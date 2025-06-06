# Runtime Config · Nuxt Advanced
To expose config and environment variables to the rest of your app, you will need to define runtime configuration in your [`nuxt.config`](https://nuxt.com/docs/guide/directory-structure/nuxt-config) file, using the [`runtimeConfig`](about:/docs/api/nuxt-config#runtimeconfig) option.

nuxt.config.ts

```
export default defineNuxtConfig({
  runtimeConfig: {
    // The private keys which are only available within server-side
    apiSecret: '123',
    // Keys within public, will be also exposed to the client-side
    public: {
      apiBase: '/api'
    }
  }
})

```


When adding `apiBase` to the `runtimeConfig.public`, Nuxt adds it to each page payload. We can universally access `apiBase` in both server and browser.

```
const runtimeConfig = useRuntimeConfig()

console.log(runtimeConfig.apiSecret)
console.log(runtimeConfig.public.apiBase)

```


Public runtime config is accessible in Vue templates with `$config.public`.

### [Serialization](#serialization)

Your runtime config will be serialized before being passed to Nitro. This means that anything that cannot be serialized and then deserialized (such as functions, Sets, Maps, and so on), should not be set in your `nuxt.config`.

Instead of passing non-serializable objects or functions into your application from your `nuxt.config`, you can place this code in a Nuxt or Nitro plugin or middleware.

### [Environment Variables](#environment-variables)

The most common way to provide configuration is by using [Environment Variables](https://medium.com/chingu/an-introduction-to-environment-variables-and-how-to-use-them-f602f66d15fa).

Nuxi CLI has built-in support for reading your `.env` file in development, build and generate. But when you run your built server, **your `.env` file will not be read**.

Read more in Docs > Guide > Directory Structure > Env.

Runtime config values are **automatically replaced by matching environment variables at runtime**.

There are two key requirements:

1.  Your desired variables must be defined in your `nuxt.config`. This ensures that arbitrary environment variables are not exposed to your application code.
2.  Only a specially-named environment variable can override a runtime config property. That is, an uppercase environment variable starting with `NUXT_` which uses `_` to separate keys and case changes.

Setting the default of `runtimeConfig` values to _differently named environment variables_ (for example setting `myVar` to `process.env.OTHER_VARIABLE`) will only work during build-time and will break on runtime. It is advised to use environment variables that match the structure of your `runtimeConfig` object.

Watch a video from Alexander Lichter showcasing the top mistake developers make using runtimeConfig.

#### [Example](#example)

.env

```
NUXT_API_SECRET=api_secret_token
NUXT_PUBLIC_API_BASE=https://nuxtjs.org

```


nuxt.config.ts

```
export default defineNuxtConfig({
  runtimeConfig: {
    apiSecret: '', // can be overridden by NUXT_API_SECRET environment variable
    public: {
      apiBase: '', // can be overridden by NUXT_PUBLIC_API_BASE environment variable
    }
  },
})

```


### [Vue App](#vue-app)

Within the Vue part of your Nuxt app, you will need to call [`useRuntimeConfig()`](https://nuxt.com/docs/api/composables/use-runtime-config) to access the runtime config.

The behavior is different between the client-side and server-side:

*   On client-side, only keys in `runtimeConfig.public` are available, and the object is both writable and reactive.
*   On server-side, the entire runtime config is available, but it is read-only to avoid context sharing.

pages/index.vue

```
<script setup lang="ts">
const config = useRuntimeConfig()

console.log('Runtime config:', config)
if (import.meta.server) {
  console.log('API secret:', config.apiSecret)
}
</script>

<template>
  <div>
    <div>Check developer console!</div>
  </div>
</template>

```


**Security note:** Be careful not to expose runtime config keys to the client-side by either rendering them or passing them to `useState`.

### [Plugins](#plugins)

If you want to use the runtime config within any (custom) plugin, you can use [`useRuntimeConfig()`](https://nuxt.com/docs/api/composables/use-runtime-config) inside of your `defineNuxtPlugin` function.

plugins/config.ts

```
export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()

  console.log('API base URL:', config.public.apiBase)
});

```


### [Server Routes](#server-routes)

You can access runtime config within the server routes as well using `useRuntimeConfig`.

server/api/test.ts

```
export default defineEventHandler(async (event) => {
  const { apiSecret } = useRuntimeConfig(event)
  const result = await $fetch('https://my.api.com/test', {
    headers: {
      Authorization: `Bearer ${apiSecret}`
    }
  })
  return result
})

```


Giving the `event` as argument to `useRuntimeConfig` is optional, but it is recommended to pass it to get the runtime config overwritten by

[environment variables](about:/docs/guide/going-further/runtime-config#environment-variables)

at runtime for server routes.

Nuxt tries to automatically generate a typescript interface from provided runtime config using [unjs/untyped](https://github.com/unjs/untyped).

But it is also possible to type your runtime config manually:

index.d.ts

```
declare module 'nuxt/schema' {
  interface RuntimeConfig {
    apiSecret: string
  }
  interface PublicRuntimeConfig {
    apiBase: string
  }
}
// It is always important to ensure you import/export something when augmenting a type
export {}

```


`nuxt/schema` is provided as a convenience for end-users to access the version of the schema used by Nuxt in their project. Module authors should instead augment `@nuxt/schema`.