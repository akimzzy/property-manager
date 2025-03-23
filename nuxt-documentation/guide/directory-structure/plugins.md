# plugins/ · Nuxt Directory Structure
Nuxt automatically reads the files in the `plugins/` directory and loads them at the creation of the Vue application.

All plugins inside are auto-registered, you don't need to add them to your `nuxt.config` separately.

You can use `.server` or `.client` suffix in the file name to load a plugin only on the server or client side.

Only files at the top level of the directory (or index files within any subdirectories) will be auto-registered as plugins.

Directory structure

```
-| plugins/
---| foo.ts      // scanned
---| bar/
-----| baz.ts    // not scanned
-----| foz.vue   // not scanned
-----| index.ts  // currently scanned but deprecated

```


Only `foo.ts` and `bar/index.ts` would be registered.

To add plugins in subdirectories, you can use the [`plugins`](about:/docs/api/nuxt-config#plugins-1) option in `nuxt.config.ts`:

nuxt.config.ts

```
export default 
defineNuxtConfig({
  
plugins: [
    '~/plugins/bar/baz',
    '~/plugins/bar/foz'
  ]
})

```


The only argument passed to a plugin is [`nuxtApp`](https://nuxt.com/docs/api/composables/use-nuxt-app).

plugins/hello.ts

```
export default 
defineNuxtPlugin(
nuxtApp => {
  // Doing something with nuxtApp
})

```


### [Object Syntax Plugins](#object-syntax-plugins)

It is also possible to define a plugin using an object syntax, for more advanced use cases. For example:

plugins/hello.ts

```
export default 
defineNuxtPlugin({
  
name: 'my-plugin',
  
enforce: 'pre', // or 'post'
  async 
setup (
nuxtApp) {
    // this is the equivalent of a normal functional plugin
  },
  
hooks: {
    // You can directly register Nuxt app runtime hooks here
    'app:created'() {
      const 
nuxtApp = 
useNuxtApp()
      // do something in the hook
    }
  },
  
env: {
    // Set this value to `false` if you don't want the plugin to run when rendering server-only or island components.
    
islands: true
  }
})

```


Watch a video from Alexander Lichter about the Object Syntax for Nuxt plugins.

If you are using the object-syntax, the properties are statically analyzed to produce a more optimized build. So you should not define them at runtime.  
For example, setting `enforce: import.meta.server ? 'pre' : 'post'` would defeat any future optimization Nuxt is able to do for your plugins. Nuxt does statically pre-load any hook listeners when using object-syntax, allowing you to define hooks without needing to worry about order of plugin registration.

You can control the order in which plugins are registered by prefixing with 'alphabetical' numbering to the file names.

Directory structure

```
plugins/
 | - 01.myPlugin.ts
 | - 02.myOtherPlugin.ts

```


In this example, `02.myOtherPlugin.ts` will be able to access anything that was injected by `01.myPlugin.ts`.

This is useful in situations where you have a plugin that depends on another plugin.

In case you're new to 'alphabetical' numbering, remember that filenames are sorted as strings, not as numeric values. For example, `10.myPlugin.ts` would come before `2.myOtherPlugin.ts`. This is why the example prefixes single digit numbers with `0`.

### [Parallel Plugins](#parallel-plugins)

By default, Nuxt loads plugins sequentially. You can define a plugin as `parallel` so Nuxt won't wait until the end of the plugin's execution before loading the next plugin.

plugins/my-plugin.ts

```
export default 
defineNuxtPlugin({
  
name: 'my-plugin',
  
parallel: true,
  async 
setup (
nuxtApp) {
    // the next plugin will be executed immediately
  }
})

```


### [Plugins With Dependencies](#plugins-with-dependencies)

If a plugin needs to wait for another plugin before it runs, you can add the plugin's name to the `dependsOn` array.

plugins/depending-on-my-plugin.ts

```
export default 
defineNuxtPlugin({
  
name: 'depends-on-my-plugin',
  
dependsOn: ['my-plugin'],
  async 
setup (
nuxtApp) {
    // this plugin will wait for the end of `my-plugin`'s execution before it runs
  }
})

```


You can use [composables](https://nuxt.com/docs/guide/directory-structure/composables) as well as [utils](https://nuxt.com/docs/guide/directory-structure/utils) within Nuxt plugins:

plugins/hello.ts

```
export default defineNuxtPlugin((nuxtApp) => {
  const foo = useFoo()
})

```


However, keep in mind there are some limitations and differences:

**If a composable depends on another plugin registered later, it might not work.**  
Plugins are called in order sequentially and before everything else. You might use a composable that depends on another plugin which has not been called yet.

**If a composable depends on the Vue.js lifecycle, it won't work.**  
Normally, Vue.js composables are bound to the current component instance while plugins are only bound to

[`nuxtApp`](https://nuxt.com/docs/api/composables/use-nuxt-app)

instance.

If you would like to provide a helper on the [`NuxtApp`](https://nuxt.com/docs/api/composables/use-nuxt-app) instance, return it from the plugin under a `provide` key.

```
export default 
defineNuxtPlugin(() => {
  return {
    
provide: {
      
hello: (
msg: string) => `Hello ${
msg}!`
    }
  }
})

```


You can then use the helper in your components:

components/Hello.vue

```
<script setup lang="ts">
// alternatively, you can also use it here
const { $hello } = useNuxtApp()
</script>

<template>
  <div>
    {{ $hello('world') }}
  </div>
</template>

```


Note that we highly recommend using

[`composables`](https://nuxt.com/docs/guide/directory-structure/composables)

instead of providing helpers to avoid polluting the global namespace and keep your main bundle entry small.

**If your plugin provides a `ref` or `computed`, it will not be unwrapped in a component `<template>`.**  
This is due to how Vue works with refs that aren't top-level to the template. You can read more about it

[in the Vue documentation](https://vuejs.org/guide/essentials/reactivity-fundamentals.html#caveat-when-unwrapping-in-templates)

.

If you return your helpers from the plugin, they will be typed automatically; you'll find them typed for the return of `useNuxtApp()` and within your templates.

If you need to use a provided helper _within_ another plugin, you can call

[`useNuxtApp()`](https://nuxt.com/docs/api/composables/use-nuxt-app)

to get the typed version. But in general, this should be avoided unless you are certain of the plugins' order.

For advanced use-cases, you can declare the type of injected properties like this:

index.d.ts

```
declare module '#app' {
  interface NuxtApp {
    $hello (msg: string): string
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $hello (msg: string): string
  }
}

export {}

```


If you are using WebStorm, you may need to augment `@vue/runtime-core` until

[this issue](https://youtrack.jetbrains.com/issue/WEB-59818/VUE-TypeScript-WS-PS-does-not-correctly-display-type-of-globally-injected-properties)

is resolved.

If you want to use Vue plugins, like [vue-gtag](https://github.com/MatteoGabriele/vue-gtag) to add Google Analytics tags, you can use a Nuxt plugin to do so.

First, install the Vue plugin dependency:

```
npm install --save-dev vue-gtag-next

```


Then create a plugin file:

plugins/vue-gtag.client.ts

```
import VueGtag, { trackRouter } from 'vue-gtag-next'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueGtag, {
    property: {
      id: 'GA_MEASUREMENT_ID'
    }
  })
  trackRouter(useRouter())
})

```


Similarly, you can register a custom Vue directive in a plugin.

plugins/my-directive.ts

```
export default 
defineNuxtPlugin((
nuxtApp) => {
  
nuxtApp.
vueApp.
directive('focus', {
    
mounted (
el) {
      
el.focus()
    },
    
getSSRProps (
binding, 
vnode) {
      // you can provide SSR-specific props here
      return {}
    }
  })
})

```


If you register a Vue directive, you _must_ register it on both client and server side unless you are only using it when rendering one side. If the directive only makes sense from a client side, you can always move it to `~/plugins/my-directive.client.ts` and provide a 'stub' directive for the server in `~/plugins/my-directive.server.ts`.

Read more in Custom Directives on Vue Docs.