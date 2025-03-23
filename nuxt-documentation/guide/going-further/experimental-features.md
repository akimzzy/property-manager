# Experimental Features · Nuxt Advanced
The Nuxt experimental features can be enabled in the Nuxt configuration file.

Internally, Nuxt uses `@nuxt/schema` to define these experimental features. You can refer to the [API documentation](about:/docs/api/configuration/nuxt-config#experimental) or the [source code](https://github.com/nuxt/nuxt/blob/main/packages/schema/src/config/experimental.ts) for more information.

Note that these features are experimental and could be removed or modified in the future.

[asyncContext](#asynccontext)
-----------------------------

Enable native async context to be accessible for nested composables in Nuxt and in Nitro. This opens the possibility to use composables inside async composables and reduce the chance to get the `Nuxt instance is unavailable` error.

nuxt.config.ts

```
export default 
defineNuxtConfig({
  
experimental: {
    
asyncContext: true
  }
})

```


See full explanation on the GitHub pull-request.

[asyncEntry](#asyncentry)
-------------------------

Enables generation of an async entry point for the Vue bundle, aiding module federation support.

nuxt.config.ts

```
export default 
defineNuxtConfig({
  
experimental: {
    
asyncEntry: true
  }
})

```


Externalizes `vue`, `@vue/*` and `vue-router` when building.

_Enabled by default._

nuxt.config.ts

```
export default 
defineNuxtConfig({
  
experimental: {
    
externalVue: true
  }
})

```


This feature will likely be removed in a near future.

Tree shakes contents of client-only components from server bundle.

_Enabled by default._

nuxt.config.ts

```
export default 
defineNuxtConfig({
  
experimental: {
    
treeshakeClientOnly: true
  }
})

```


Emits `app:chunkError` hook when there is an error loading vite/webpack chunks. Default behavior is to perform a reload of the new route on navigation to a new route when a chunk fails to load.

If you set this to `'automatic-immediate'` Nuxt will reload the current route immediatly, instead of waiting for a navigation. This is useful for chunk errors that are not triggered by navigation, e.g., when your Nuxt app fails to load a [lazy component](about:/docs/guide/directory-structure/components#dynamic-imports). A potential downside of this behavior is undesired reloads, e.g., when your app does not need the chunk that caused the error.

You can disable automatic handling by setting this to `false`, or handle chunk errors manually by setting it to `manual`.

nuxt.config.ts

```
export default 
defineNuxtConfig({
  
experimental: {
    
emitRouteChunkError: 'automatic' // or 'automatic-immediate', 'manual' or false
  }
})

```


Allows Nuxt app state to be restored from `sessionStorage` when reloading the page after a chunk error or manual [`reloadNuxtApp()`](https://nuxt.com/docs/api/utils/reload-nuxt-app) call.

To avoid hydration errors, it will be applied only after the Vue app has been mounted, meaning there may be a flicker on initial load.

Consider carefully before enabling this as it can cause unexpected behavior, and consider providing explicit keys to

[`useState`](https://nuxt.com/docs/api/composables/use-state)

as auto-generated keys may not match across builds.

nuxt.config.ts

```
export default 
defineNuxtConfig({
  
experimental: {
    
restoreState: true
  }
})

```


Define route rules at the page level using [`defineRouteRules`](https://nuxt.com/docs/api/utils/define-route-rules).

nuxt.config.ts

```
export default 
defineNuxtConfig({
  
experimental: {
    
inlineRouteRules: true
  }
})

```


Matching route rules will be created, based on the page's `path`.

Read more in `defineRouteRules` utility.

Read more in Docs > Guide > Concepts > Rendering#hybrid Rendering.

Allows rendering of JSON payloads with support for revivifying complex types.

_Enabled by default._

nuxt.config.ts

```
export default 
defineNuxtConfig({
  
experimental: {
    
renderJsonPayloads: true
  }
})

```


Disables Vue server renderer endpoint within Nitro.

nuxt.config.ts

```
export default 
defineNuxtConfig({
  
experimental: {
    
noVueServer: true
  }
})

```


Enables extraction of payloads of pages generated with `nuxt generate`.

nuxt.config.ts

```
export default 
defineNuxtConfig({
  
experimental: {
    
payloadExtraction: true
  }
})

```


Enables the experimental [`<NuxtClientFallback>`](https://nuxt.com/docs/api/components/nuxt-client-fallback) component for rendering content on the client if there's an error in SSR.

nuxt.config.ts

```
export default 
defineNuxtConfig({
  
experimental: {
    
clientFallback: true
  }
})

```


Enables cross-origin prefetch using the Speculation Rules API.

nuxt.config.ts

```
export default 
defineNuxtConfig({
  
experimental: {
    
crossOriginPrefetch: true
  }
})

```


Read more about the **Speculation Rules API**.

Enables View Transition API integration with client-side router.

nuxt.config.ts

```
export default 
defineNuxtConfig({
  
experimental: {
    
viewTransition: true
  }
})

```


Read more about the **View Transition API**.

Enables writing of early hints when using node server.

nuxt.config.ts

```
export default 
defineNuxtConfig({
  
experimental: {
    
writeEarlyHints: true
  }
})

```


Enables experimental component islands support with [`<NuxtIsland>`](https://nuxt.com/docs/api/components/nuxt-island) and `.island.vue` files.

nuxt.config.ts

```
export default 
defineNuxtConfig({
  
experimental: {
    
componentIslands: true // false or 'local+remote'
  }
})

```


Read more in Docs > Guide > Directory Structure > Components#server Components.

You can follow the server components roadmap on GitHub.

Enables config schema support.

_Enabled by default._

nuxt.config.ts

```
export default 
defineNuxtConfig({
  
experimental: {
    
configSchema: true
  }
})

```


Adds a compatibility layer for modules, plugins, or user code relying on the old `@vueuse/head` API.

nuxt.config.ts

```
export default 
defineNuxtConfig({
  
experimental: {
    
polyfillVueUseHead: false
  }
})

```


Allow disabling Nuxt SSR responses by setting the `x-nuxt-no-ssr` header.

nuxt.config.ts

```
export default 
defineNuxtConfig({
  
experimental: {
    
respectNoSSRHeader: false
  }
})

```


Resolve `~`, `~~`, `@` and `@@` aliases located within layers with respect to their layer source and root directories.

_Enabled by default._

nuxt.config.ts

```
export default 
defineNuxtConfig({
  
experimental: {
    
localLayerAliases: true
  }
})

```


[typedPages](#typedpages)
-------------------------

Enable the new experimental typed router using [`unplugin-vue-router`](https://github.com/posva/unplugin-vue-router).

nuxt.config.ts

```
export default 
defineNuxtConfig({
  
experimental: {
    
typedPages: true
  }
})

```


Out of the box, this will enable typed usage of [`navigateTo`](https://nuxt.com/docs/api/utils/navigate-to), [`<NuxtLink>`](https://nuxt.com/docs/api/components/nuxt-link), [`router.push()`](https://nuxt.com/docs/api/composables/use-router) and more.

You can even get typed params within a page by using `const route = useRoute('route-name')`.

If you use `pnpm` without `shamefully-hoist=true`, you will need to have `unplugin-vue-router` installed as a devDependency in order for this feature to work.

Watch a video from Daniel Roe explaining type-safe routing in Nuxt.

Set an alternative watcher that will be used as the watching service for Nuxt.

Nuxt uses `chokidar-granular` by default, which will ignore top-level directories (like `node_modules` and `.git`) that are excluded from watching.

You can set this instead to `parcel` to use `@parcel/watcher`, which may improve performance in large projects or on Windows platforms.

You can also set this to `chokidar` to watch all files in your source directory.

nuxt.config.ts

```
export default 
defineNuxtConfig({
  
experimental: {
    
watcher: 'chokidar-granular' // 'chokidar' or 'parcel' are also options
  }
})

```


Enabling this feature automatically shares payload _data_ between pages that are prerendered. This can result in a significant performance improvement when prerendering sites that use `useAsyncData` or `useFetch` and fetch the same data in different pages.

nuxt.config.ts

```
export default 
defineNuxtConfig({
  
experimental: {
    
sharedPrerenderData: true
  }
})

```


Watch a video from Alexander Lichter about the experimental `sharedPrerenderData` setting.

It is particularly important when enabling this feature to make sure that any unique key of your data is always resolvable to the same data. For example, if you are using `useAsyncData` to fetch data related to a particular page, you should provide a key that uniquely matches that data. (`useFetch` should do this automatically for you.)

```
// This would be unsafe in a dynamic page (e.g. `[slug].vue`) because the route slug makes a difference
// to the data fetched, but Nuxt can't know that because it's not reflected in the key.
const route = useRoute()
const { data } = await useAsyncData(async () => {
  return await $fetch(`/api/my-page/${route.params.slug}`)
})
// Instead, you should use a key that uniquely identifies the data fetched.
const { data } = await useAsyncData(route.params.slug, async () => {
  return await $fetch(`/api/my-page/${route.params.slug}`)
})

```


With this feature, Nuxt will automatically polyfill Node.js imports in the client build using [`unenv`](https://github.com/unjs/unenv).

To make globals like `Buffer` work in the browser, you need to manually inject them.

```
import { Buffer } from 'node:buffer'

globalThis.Buffer = globalThis.Buffer || Buffer

```


This option allows exposing some route metadata defined in `definePageMeta` at build-time to modules (specifically `alias`, `name`, `path`, `redirect`).

This only works with static or strings/arrays rather than variables or conditional assignment. See [original issue](https://github.com/nuxt/nuxt/issues/24770) for more information and context.

It is also possible to scan page metadata only after all routes have been registered in `pages:extend`. Then another hook, `pages:resolved` will be called. To enable this behavior, set `scanPageMeta: 'after-resolve'`.

You can disable this feature if it causes issues in your project.

nuxt.config.ts

```
export default 
defineNuxtConfig({
  
experimental: {
    
scanPageMeta: false
  }
})

```


Enables CookieStore support to listen for cookie updates (if supported by the browser) and refresh `useCookie` ref values.

nuxt.config.ts

```
export default 
defineNuxtConfig({
  
experimental: {
    
cookieStore: true
  }
})

```


Read more about the **CookieStore**.

Caches Nuxt build artifacts based on a hash of the configuration and source files.

nuxt.config.ts

```
export default 
defineNuxtConfig({
  
experimental: {
    
buildCache: true
  }
})

```


When enabled, changes to the following files will trigger a full rebuild:

Directory structure

```
.nuxtrc
.npmrc
package.json
package-lock.json
yarn.lock
pnpm-lock.yaml
tsconfig.json
bun.lockb

```


In addition, any changes to files within `srcDir` will trigger a rebuild of the Vue client/server bundle. Nitro will always be rebuilt (though work is in progress to allow Nitro to announce its cacheable artifacts and their hashes).

A maximum of 10 cache tarballs are kept.

The `definePageMeta()` macro is a useful way to collect build-time meta about pages. Nuxt itself provides a set list of supported keys which is used to power some of the internal features such as redirects, page aliases and custom paths.

This option allows passing additional keys to extract from the page metadata when using `scanPageMeta`.

```
<script lang="ts" setup>
definePageMeta({
  foo: 'bar'
})
</script>

```


```
export default defineNuxtConfig({
  experimental: {
    extraPageMetaExtractionKeys: ['foo'],
  },
  hooks: {
    'pages:resolved' (ctx) {
      // ✅ foo is available
    },
  },
})

```


This allows modules to access additional metadata from the page metadata in the build context. If you are using this within a module, it's recommended also to [augment the `NuxtPage` types with your keys](about:/docs/guide/directory-structure/pages#typing-custom-metadata).

Ensure that auto-generated Vue component names match the full component name you would use to auto-import the component.

nuxt.config.ts

```
export default 
defineNuxtConfig({
  
experimental: {
    
normalizeComponentNames: true
  }
})

```


By default, if you haven't set it manually, Vue will assign a component name that matches the filename of the component.

Directory structure

```
├─ components/
├─── SomeFolder/
├───── MyComponent.vue

```


In this case, the component name would be `MyComponent`, as far as Vue is concerned. If you wanted to use `<KeepAlive>` with it, or identify it in the Vue DevTools, you would need to use this component.

But in order to auto-import it, you would need to use `SomeFolderMyComponent`.

By setting `experimental.normalizeComponentNames`, these two values match, and Vue will generate a component name that matches the Nuxt pattern for component naming.

When rendering a client-only page (with `ssr: false`), we optionally render a loading screen (from `app/spa-loading-template.html`).

It can be set to `within`, which will render it like this:

```
<div id="__nuxt">
  <!-- spa loading template -->
</div>

```


Alternatively, you can render the template alongside the Nuxt app root by setting it to `body`:

```
<div id="__nuxt"></div>
<!-- spa loading template -->

```


This avoids a white flash when hydrating a client-only page.

This option enables enabling decorator syntax across your entire Nuxt/Nitro app, powered by [esbuild](https://github.com/evanw/esbuild/releases/tag/v0.21.3).

For a long time, TypeScript has had support for decorators via `compilerOptions.experimentalDecorators`. This implementation predated the TC39 standardization process. Now, decorators are a [Stage 3 Proposal](https://github.com/tc39/proposal-decorators), and supported without special configuration in TS 5.0+ (see [https://github.com/microsoft/TypeScript/pull/52582](https://github.com/microsoft/TypeScript/pull/52582) and [https://devblogs.microsoft.com/typescript/announcing-typescript-5-0-beta/#decorators](https://devblogs.microsoft.com/typescript/announcing-typescript-5-0-beta/#decorators)).

Enabling `experimental.decorators` enables support for the TC39 proposal, **NOT** for TypeScript's previous `compilerOptions.experimentalDecorators` implementation.

Note that there may be changes before this finally lands in the JS standard.

### [Usage](#usage)

nuxt.config.ts

```
export default defineNuxtConfig({
  experimental: {
    decorators: true,
  },
})

```


app.vue

```
function something (_method: () => unknown) {
  return () => 'decorated'
}

class SomeClass {
  @something
  public someMethod () {
    return 'initial'
  }
}

const value = new SomeClass().someMethod()
// this will return 'decorated'

```
