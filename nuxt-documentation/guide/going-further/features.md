# Features · Nuxt Advanced
Some features of Nuxt are available on an opt-in basis, or can be disabled based on your needs.

### [inlineStyles](#inlinestyles)

Inlines styles when rendering HTML. This is currently available only when using Vite.

You can also pass a function that receives the path of a Vue component and returns a boolean indicating whether to inline the styles for that component.

nuxt.config.ts

```
export default defineNuxtConfig({
  features: {
    inlineStyles: false // or a function to determine inlining
  }
})

```


### [noScripts](#noscripts)

Disables rendering of Nuxt scripts and JS resource hints. Can also be configured granularly within `routeRules`.

nuxt.config.ts

```
export default defineNuxtConfig({
  features: {
    noScripts: true
  }
})

```


There is also a `future` namespace for early opting-in to new features that will become default in a future (possibly major) version of the framework.

### [compatibilityVersion](#compatibilityversion)

This configuration option is available in Nuxt v3.12+. Please note, that for now, you need to define the compatibility version in each layer that opts into Nuxt 4 behavior. This will not be required after Nuxt 4 is released.

This enables early access to Nuxt features or flags.

Setting `compatibilityVersion` to `4` changes defaults throughout your Nuxt configuration to opt-in to Nuxt v4 behaviour, but you can granularly re-enable Nuxt v3 behaviour when testing (see example). Please file issues if so, so that we can address in Nuxt or in the ecosystem.

```
export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },
  // To re-enable _all_ Nuxt v3 behaviour, set the following options:
  srcDir: '.',
  dir: {
    app: 'app'
  },
  experimental: {
    scanPageMeta: 'after-resolve',
    sharedPrerenderData: false,
    compileTemplate: true,
    resetAsyncDataToUndefined: true,
    templateUtils: true,
    relativeWatchPaths: true,
    normalizeComponentNames: false
    defaults: {
      useAsyncData: {
        deep: true
      }
    }
  },
  features: {
    inlineStyles: true
  },
  unhead: {
    renderSSRHeadOptions: {
      omitLineBreaks: false
    }
  }
})

```


### [typescriptBundlerResolution](#typescriptbundlerresolution)

This enables 'Bundler' module resolution mode for TypeScript, which is the recommended setting for frameworks like Nuxt and [Vite](https://vite.dev/guide/performance.html#reduce-resolve-operations).

It improves type support when using modern libraries with `exports`.

See [the original TypeScript pull request](https://github.com/microsoft/TypeScript/pull/51669).

nuxt.config.ts

```
export default defineNuxtConfig({
  future: {
    typescriptBundlerResolution: true
  }
})

```
