# Upgrade Guide · Get Started with Nuxt

### [Latest release](#latest-release)

To upgrade Nuxt to the [latest release](https://github.com/nuxt/nuxt/releases), use the `nuxi upgrade` command.

### [Nightly Release Channel](#nightly-release-channel)

To use the latest Nuxt build and test features before their release, read about the [nightly release channel](https://nuxt.com/docs/guide/going-further/nightly-release-channel) guide.

The nightly release channel `latest` tag is currently tracking the Nuxt v4 branch, meaning that it is particularly likely to have breaking changes right now - be careful!You can opt in to the 3.x branch nightly releases with `"nuxt": "npm:nuxt-nightly@3x"`.

The release date of Nuxt 4 is **to be announced**. It is dependent on having enough time after Nitro's major release to be properly tested in the community. You can follow progress towards Nitro's release in [this PR](https://github.com/nitrojs/nitro/pull/2521).

Until the release, it is possible to test many of Nuxt 4's breaking changes from Nuxt version 3.12+.

Watch a video from Alexander Lichter showing how to opt in to Nuxt 4's breaking changes already.

### [Opting in to Nuxt 4](#opting-in-to-nuxt-4)

First, upgrade Nuxt to the [latest release](https://github.com/nuxt/nuxt/releases).

Then you can set your `compatibilityVersion` to match Nuxt 4 behavior:

For now, you need to define the compatibility version in each layer that opts into Nuxt 4 behavior. This will not be required after Nuxt 4 is released.

nuxt.config.ts

```
export default
defineNuxtConfig({

future: {

compatibilityVersion: 4,
  },
  // To re-enable _all_ Nuxt v3 behavior, set the following options:
  // srcDir: '.',
  // dir: {
  //   app: 'app'
  // },
  // experimental: {
  //   scanPageMeta: 'after-resolve',
  //   sharedPrerenderData: false,
  //   compileTemplate: true,
  //   resetAsyncDataToUndefined: true,
  //   templateUtils: true,
  //   relativeWatchPaths: true,
  //   normalizeComponentNames: false,
  //   spaLoadingTemplateLocation: 'within',
  //   defaults: {
  //     useAsyncData: {
  //       deep: true
  //     }
  //   }
  // },
  // features: {
  //   inlineStyles: true
  // },
  // unhead: {
  //   renderSSRHeadOptions: {
  //     omitLineBreaks: false
  //   }
  // }
})

```

When you set your `compatibilityVersion` to `4`, defaults throughout your Nuxt configuration will change to opt in to Nuxt v4 behavior, but you can granularly re-enable Nuxt v3 behavior when testing, following the commented out lines above. Please file issues if so, so that we can address them in Nuxt or in the ecosystem.

### [Migrating to Nuxt 4](#migrating-to-nuxt-4)

Breaking or significant changes will be noted here along with migration steps for backward/forward compatibility.

This section is subject to change until the final release, so please check back here regularly if you are testing Nuxt 4 using `compatibilityVersion: 4`.

#### [Migrating Using Codemods](#migrating-using-codemods)

To facilitate the upgrade process, we have collaborated with the [Codemod](https://github.com/codemod-com/codemod) team to automate many migration steps with some open-source codemods.

If you encounter any issues, please report them to the Codemod team with `npx codemod feedback` 🙏

For a complete list of Nuxt 4 codemods, detailed information on each, their source, and various ways to run them, visit the [Codemod Registry](https://go.codemod.com/codemod-registry).

You can run all the codemods mentioned in this guide using the following `codemod` recipe:

```
npx codemod@latest nuxt/4/migration-recipe

```

This command will execute all codemods in sequence, with the option to deselect any that you do not wish to run. Each codemod is also listed below alongside its respective change and can be executed independently.

#### [New Directory Structure](#new-directory-structure)

🚦 **Impact Level**: Significant

Nuxt now defaults to a new directory structure, with backwards compatibility (so if Nuxt detects you are using the old structure, such as with a top-level `pages/` directory, this new structure will not apply).

👉 [See full RFC](https://github.com/nuxt/nuxt/issues/26444)

##### What Changed

- the new Nuxt default `srcDir` is `app/` by default, and most things are resolved from there.
- `serverDir` now defaults to `<rootDir>/server` rather than `<srcDir>/server`
- `layers/`, `modules/` and `public/` are resolved relative to `<rootDir>` by default
- if using [Nuxt Content v2.13+](https://github.com/nuxt/content/pull/2649), `content/` is resolved relative to `<rootDir>`
- a new `dir.app` is added, which is the directory we look for `router.options.ts` and `spa-loading-template.html` - this defaults to `<srcDir>/`

An example v4 folder structure.

```
.output/
.nuxt/
app/
  assets/
  components/
  composables/
  layouts/
  middleware/
  pages/
  plugins/
  utils/
  app.config.ts
  app.vue
  router.options.ts
content/
layers/
modules/
node_modules/
public/
server/
  api/
  middleware/
  plugins/
  routes/
  utils/
nuxt.config.ts

```

👉 For more details, see the [PR implementing this change](https://github.com/nuxt/nuxt/pull/27029).

##### Reasons for Change

1.  **Performance** - placing all your code in the root of your repo causes issues with `.git/` and `node_modules/` folders being scanned/included by FS watchers which can significantly delay startup on non-Mac OSes.
2.  **IDE type-safety** - `server/` and the rest of your app are running in two entirely different contexts with different global imports available, and making sure `server/` isn't _inside_ the same folder as the rest of your app is a big first step to ensuring you get good auto-completes in your IDE.

##### Migration Steps

1.  Create a new directory called `app/`.
2.  Move your `assets/`, `components/`, `composables/`, `layouts/`, `middleware/`, `pages/`, `plugins/` and `utils/` folders under it, as well as `app.vue`, `error.vue`, `app.config.ts`. If you have an `app/router-options.ts` or `app/spa-loading-template.html`, these paths remain the same.
3.  Make sure your `nuxt.config.ts`, `content/`, `layers/`, `modules/`, `public/` and `server/` folders remain outside the `app/` folder, in the root of your project.
4.  Remember to update any third-party configuration files to work with the new directory structure, such as your `tailwindcss` or `eslint` configuration (if required - `@nuxtjs/tailwindcss` should automatically configure `tailwindcss` correctly).

You can automate this migration by running `npx codemod@latest nuxt/4/file-structure`

However, migration is _not required_. If you wish to keep your current folder structure, Nuxt should auto-detect it. (If it does not, please raise an issue.) The one exception is that if you _already_ have a custom `srcDir`. In this case, you should be aware that your `modules/`, `public/` and `server/` folders will be resolved from your `rootDir` rather than from your custom `srcDir`. You can override this by configuring `dir.modules`, `dir.public` and `serverDir` if you need to.

You can also force a v3 folder structure with the following configuration:

nuxt.config.ts

```
export default defineNuxtConfig({
  // This reverts the new srcDir default from `app` back to your root directory
  srcDir: '.',
  // This specifies the directory prefix for `app/router.options.ts` and `app/spa-loading-template.html`
  dir: {
    app: 'app'
  }
})

```

#### [Deduplication of Route Metadata](#deduplication-of-route-metadata)

🚦 **Impact Level**: Minimal

##### What Changed

It's possible to set some route metadata using `definePageMeta`, such as the `name`, `path`, and so on. Previously these were available both on the route and on route metadata (for example, `route.name` and `route.meta.name`).

Now, they are only accessible on the route object.

##### Reasons for Change

This is a result of enabling `experimental.scanPageMeta` by default, and is a performance optimization.

##### Migration Steps

The migration should be straightforward:

```
  const route = useRoute()

- console.log(route.meta.name)
+ console.log(route.name)

```

#### [Normalized Component Names](#normalized-component-names)

🚦 **Impact Level**: Moderate

Vue will now generate component names that match the Nuxt pattern for component naming.

##### What Changed

By default, if you haven't set it manually, Vue will assign a component name that matches the filename of the component.

Directory structure

```
├─ components/
├─── SomeFolder/
├───── MyComponent.vue

```

In this case, the component name would be `MyComponent`, as far as Vue is concerned. If you wanted to use `<KeepAlive>` with it, or identify it in the Vue DevTools, you would need to use this name.

But in order to auto-import it, you would need to use `SomeFolderMyComponent`.

With this change, these two values will match, and Vue will generate a component name that matches the Nuxt pattern for component naming.

##### Migration Steps

Ensure that you use the updated name in any tests which use `findComponent` from `@vue/test-utils` and in any `<KeepAlive>` which depends on the name of your component.

Alternatively, for now, you can disable this behaviour with:

nuxt.config.ts

```
export default
defineNuxtConfig({

experimental: {

normalizeComponentNames: false
  }
})

```

#### [Unhead v2](#unhead-v2)

🚦 **Impact Level**: Minimal

##### What Changed

[Unhead](https://unhead.unjs.io/), used to generate `<head>` tags, has been updated to version 2. While mostly compatible it includes several breaking changes for lower-level APIs.

- Removed props: `vmid`, `hid`, `children`, `body`.
- Promise input no longer supported.
- Tags are now sorted using Capo.js by default.

##### Migration Steps

The above changes should have minimal impact on your app.

If you have issues you should verify:

- You're not using any of the removed props.

```
useHead({
  meta: [{
    name: 'description',
    // meta tags don't need a vmid, or a key
-   vmid: 'description'
-   hid: 'description'
  }]
})

```

- If you're using [Template Params](https://unhead.unjs.io/docs/plugins/template-params) or [Alias Tag Sorting](https://unhead.unjs.io/docs/plugins/alias-sorting), you will need to explicitly opt in to these features now.

```
import { TemplateParamsPlugin, AliasSortingPlugin } from '@unhead/vue/plugins'

export default defineNuxtPlugin({
  setup() {
    const unhead = injectHead()
    unhead.use(TemplateParamsPlugin)
    unhead.use(AliasSortingPlugin)
  }
})

```

While not required it's recommend to update any imports from `@unhead/vue` to `#imports` or `nuxt/app`.

```
-import { useHead } from '@unhead/vue'
+import { useHead } from '#imports'

```

If you still have issues you may revert to the v1 behavior by enabling the `head.legacy` config.

```
export default defineNuxtConfig({
  unhead: {
    legacy: true,
  }
})

```

#### [New DOM Location for SPA Loading Screen](#new-dom-location-for-spa-loading-screen)

🚦 **Impact Level**: Minimal

##### What Changed

When rendering a client-only page (with `ssr: false`), we optionally render a loading screen (from `app/spa-loading-template.html`), within the Nuxt app root:

```
<div id="__nuxt">
  <!-- spa loading template -->
</div>

```

Now, we default to rendering the template alongside the Nuxt app root:

```
<div id="__nuxt"></div>
<!-- spa loading template -->

```

##### Reasons for Change

This allows the spa loading template to remain in the DOM until the Vue app suspense resolves, preventing a flash of white.

##### Migration Steps

If you were targeting the spa loading template with CSS or `document.queryElement` you will need to update your selectors. For this purpose you can use the new `app.spaLoaderTag` and `app.spaLoaderAttrs` configuration options.

Alternatively, you can revert to the previous behaviour with:

nuxt.config.ts

```
export default
defineNuxtConfig({

experimental: {

spaLoadingTemplateLocation: 'within',
  }
})

```

#### [More Granular Inline Styles](#more-granular-inline-styles)

🚦 **Impact Level**: Moderate

Nuxt will now only inline styles for Vue components, not global CSS.

##### What Changed

Previously, Nuxt would inline all CSS, including global styles, and remove `<link>` elements to separate CSS files. Now, Nuxt will only do this for Vue components (which previously produced separate chunks of CSS). We think this is a better balance of reducing separate network requests (just as before, there will not be separate requests for individual `.css` files per-page or per-component on the initial load), as well as allowing caching of a single global CSS file and reducing the document download size of the initial request.

##### Migration Steps

This feature is fully configurable and you can revert to the previous behavior by setting `inlineStyles: true` to inline global CSS as well as per-component CSS.

nuxt.config.ts

```
export default
defineNuxtConfig({

features: {

inlineStyles: true
  }
})

```

#### [Scan Page Meta After Resolution](#scan-page-meta-after-resolution)

🚦 **Impact Level**: Minimal

##### What Changed

We now scan page metadata (defined in `definePageMeta`) _after_ calling the `pages:extend` hook rather than before.

##### Reasons for Change

This was to allow scanning metadata for pages that users wanted to add in `pages:extend`. We still offer an opportunity to change or override page metadata in a new `pages:resolved` hook.

##### Migration Steps

If you want to override page metadata, do that in `pages:resolved` rather than in `pages:extend`.

```
  export default defineNuxtConfig({
    hooks: {
-     'pages:extend'(pages) {
+     'pages:resolved'(pages) {
        const myPage = pages.find(page => page.path === '/')
        myPage.meta ||= {}
        myPage.meta.layout = 'overridden-layout'
      }
    }
  })

```

Alternatively, you can revert to the previous behaviour with:

nuxt.config.ts

```
export default
defineNuxtConfig({

experimental: {

scanPageMeta: true
  }
})

```

#### [Shared Prerender Data](#shared-prerender-data)

🚦 **Impact Level**: Medium

##### What Changed

We enabled a previously experimental feature to share data from `useAsyncData` and `useFetch` calls, across different pages. See [original PR](https://github.com/nuxt/nuxt/pull/24894).

##### Reasons for Change

This feature automatically shares payload _data_ between pages that are prerendered. This can result in a significant performance improvement when prerendering sites that use `useAsyncData` or `useFetch` and fetch the same data in different pages.

For example, if your site requires a `useFetch` call for every page (for example, to get navigation data for a menu, or site settings from a CMS), this data would only be fetched once when prerendering the first page that uses it, and then cached for use when prerendering other pages.

##### Migration Steps

Make sure that any unique key of your data is always resolvable to the same data. For example, if you are using `useAsyncData` to fetch data related to a particular page, you should provide a key that uniquely matches that data. (`useFetch` should do this automatically for you.)

app/pages/test/\[slug\].vue

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

Alternatively, you can disable this feature with:

nuxt.config.ts

```
export default
defineNuxtConfig({

experimental: {

sharedPrerenderData: false
  }
})

```

#### [Default `data` and `error` values in `useAsyncData` and `useFetch`](#default-data-and-error-values-in-useasyncdata-and-usefetch)

🚦 **Impact Level**: Minimal

##### What Changed

`data` and `error` objects returned from `useAsyncData` will now default to `undefined`.

##### Reasons for Change

Previously `data` was initialized to `null` but reset in `clearNuxtData` to `undefined`. `error` was initialized to `null`. This change is to bring greater consistency.

##### Migration Steps

If you were checking if `data.value` or `error.value` were `null`, you can update these checks to check for `undefined` instead.

You can automate this step by running `npx codemod@latest nuxt/4/default-data-error-value`

If you encounter any issues you can revert back to the previous behavior with:

nuxt.config.ts

```
export default
defineNuxtConfig({

experimental: {

defaults: {

useAsyncData: {

value: 'null',

errorValue: 'null'
      }
    }
  }
})

```

Please report an issue if you are doing this, as we do not plan to keep this as configurable.

#### [Removal of deprecated `boolean` values for `dedupe` option when calling `refresh` in `useAsyncData` and `useFetch`](#removal-of-deprecated-boolean-values-for-dedupe-option-when-calling-refresh-in-useasyncdata-and-usefetch)

🚦 **Impact Level**: Minimal

##### What Changed

Previously it was possible to pass `dedupe: boolean` to `refresh`. These were aliases of `cancel` (`true`) and `defer` (`false`).

app.vue

```
const { refresh } = await useAsyncData(async () => ({ message: 'Hello, Nuxt 3!' }))

async function refreshData () {
  await refresh({ dedupe: true })
}

```

##### Reasons for Change

These aliases were removed, for greater clarity.

The issue came up when adding `dedupe` as an option to `useAsyncData`, and we removed the boolean values as they ended up being _opposites_.

`refresh({ dedupe: false })` meant 'do not _cancel_ existing requests in favour of this new one'. But passing `dedupe: true` within the options of `useAsyncData` means 'do not make any new requests if there is an existing pending request.' (See [PR](https://github.com/nuxt/nuxt/pull/24564#pullrequestreview-1764584361).)

##### Migration Steps

The migration should be straightforward:

```
  const { refresh } = await useAsyncData(async () => ({ message: 'Hello, Nuxt 3!' }))

  async function refreshData () {
-   await refresh({ dedupe: true })
+   await refresh({ dedupe: 'cancel' })

-   await refresh({ dedupe: false })
+   await refresh({ dedupe: 'defer' })
  }

```

You can automate this step by running `npx codemod@latest nuxt/4/deprecated-dedupe-value`

#### [Respect defaults when clearing `data` in `useAsyncData` and `useFetch`](#respect-defaults-when-clearing-data-in-useasyncdata-and-usefetch)

🚦 **Impact Level**: Minimal

##### What Changed

If you provide a custom `default` value for `useAsyncData`, this will now be used when calling `clear` or `clearNuxtData` and it will be reset to its default value rather than simply unset.

##### Reasons for Change

Often users set an appropriately empty value, such as an empty array, to avoid the need to check for `null`/`undefined` when iterating over it. This should be respected when resetting/clearing the data.

##### Migration Steps

If you encounter any issues you can revert back to the previous behavior, for now, with:

nuxt.config.ts

```
export default
defineNuxtConfig({

experimental: {

resetAsyncDataToUndefined: true,
  }
})

```

Please report an issue if you are doing so, as we do not plan to keep this as configurable.

#### [Shallow Data Reactivity in `useAsyncData` and `useFetch`](#shallow-data-reactivity-in-useasyncdata-and-usefetch)

🚦 **Impact Level**: Minimal

The `data` object returned from `useAsyncData`, `useFetch`, `useLazyAsyncData` and `useLazyFetch` is now a `shallowRef` rather than a `ref`.

##### What Changed

When new data is fetched, anything depending on `data` will still be reactive because the entire object is replaced. But if your code changes a property _within_ that data structure, this will not trigger any reactivity in your app.

##### Reasons for Change

This brings a **significant** performance improvement for deeply nested objects and arrays because Vue does not need to watch every single property/array for modification. In most cases, `data` should also be immutable.

##### Migration Steps

In most cases, no migration steps are required, but if you rely on the reactivity of the data object then you have two options:

1.  You can granularly opt in to deep reactivity on a per-composable basis:

    ```

    ```

- const { data } = useFetch('/api/test')

* const { data } = useFetch('/api/test', { deep: true })

````


2.  You can change the default behavior on a project-wide basis (not recommended):

    nuxt.config.ts

    ```
export default
defineNuxtConfig({

experimental: {

defaults: {

useAsyncData: {

deep: true
      }
    }
  }
})

````

If you need to, you can automate this step by running `npx codemod@latest nuxt/4/shallow-function-reactivity`

#### [Absolute Watch Paths in `builder:watch`](#absolute-watch-paths-in-builderwatch)

🚦 **Impact Level**: Minimal

##### What Changed

The Nuxt `builder:watch` hook now emits a path which is absolute rather than relative to your project `srcDir`.

##### Reasons for Change

This allows us to support watching paths which are outside your `srcDir`, and offers better support for layers and other more complex patterns.

##### Migration Steps

We have already proactively migrated the public Nuxt modules which we are aware use this hook. See [issue #25339](https://github.com/nuxt/nuxt/issues/25339).

However, if you are a module author using the `builder:watch` hook and wishing to remain backwards/forwards compatible, you can use the following code to ensure that your code works the same in both Nuxt v3 and Nuxt v4:

```
+ import { relative, resolve } from 'node:fs'
  // ...
  nuxt.hook('builder:watch', async (event, path) => {
+   path = relative(nuxt.options.srcDir, resolve(nuxt.options.srcDir, path))
    // ...
  })

```

You can automate this step by running `npx codemod@latest nuxt/4/absolute-watch-path`

#### [Removal of `window.__NUXT__` object](#removal-of-window__nuxt__-object)

##### What Changed

We are removing the global `window.__NUXT__` object after the app finishes hydration.

##### Reasons for Change

This opens the way to multi-app patterns ([#21635](https://github.com/nuxt/nuxt/issues/21635)) and enables us to focus on a single way to access Nuxt app data - `useNuxtApp()`.

##### Migration Steps

The data is still available, but can be accessed with `useNuxtApp().payload`:

```
- console.log(window.__NUXT__)
+ console.log(useNuxtApp().payload)

```

#### [Directory index scanning](#directory-index-scanning)

🚦 **Impact Level**: Medium

##### What Changed

Child folders in your `middleware/` folder are also scanned for `index` files and these are now also registered as middleware in your project.

##### Reasons for Change

Nuxt scans a number of folders automatically, including `middleware/` and `plugins/`.

Child folders in your `plugins/` folder are scanned for `index` files and we wanted to make this behavior consistent between scanned directories.

##### Migration Steps

Probably no migration is necessary but if you wish to revert to previous behavior you can add a hook to filter out these middleware:

```
export default defineNuxtConfig({
  hooks: {
    'app:resolve'(app) {
      app.middleware = app.middleware.filter(mw => !/\/index\.[^/]+$/.test(mw.path))
    }
  }
})

```

#### [Template Compilation Changes](#template-compilation-changes)

🚦 **Impact Level**: Minimal

##### What Changed

Previously, Nuxt used `lodash/template` to compile templates located on the file system using the `.ejs` file format/syntax.

In addition, we provided some template utilities (`serialize`, `importName`, `importSources`) which could be used for code-generation within these templates, which are now being removed.

##### Reasons for Change

In Nuxt v3 we moved to a 'virtual' syntax with a `getContents()` function which is much more flexible and performant.

In addition, `lodash/template` has had a succession of security issues. These do not really apply to Nuxt projects because it is being used at build-time, not runtime, and by trusted code. However, they still appear in security audits. Moreover, `lodash` is a hefty dependency and is unused by most projects.

Finally, providing code serialization functions directly within Nuxt is not ideal. Instead, we maintain projects like [unjs/knitwork](http://github.com/unjs/knitwork) which can be dependencies of your project, and where security issues can be reported/resolved directly without requiring an upgrade of Nuxt itself.

##### Migration Steps

We have raised PRs to update modules using EJS syntax, but if you need to do this yourself, you have three backwards/forwards-compatible alternatives:

- Moving your string interpolation logic directly into `getContents()`.
- Using a custom function to handle the replacement, such as in [https://github.com/nuxt-modules/color-mode/pull/240](https://github.com/nuxt-modules/color-mode/pull/240).
- Use `es-toolkit/compat` (a drop-in replacement for lodash template), as a dependency of _your_ project rather than Nuxt:

```
+ import { readFileSync } from 'node:fs'
+ import { template } from 'es-toolkit/compat'
  // ...
  addTemplate({
    fileName: 'appinsights-vue.js'
    options: { /* some options */ },
-   src: resolver.resolve('./runtime/plugin.ejs'),
+   getContents({ options }) {
+     const contents = readFileSync(resolver.resolve('./runtime/plugin.ejs'), 'utf-8')
+     return template(contents)({ options })
+   },
  })

```

Finally, if you are using the template utilities (`serialize`, `importName`, `importSources`), you can replace them as follows with utilities from `knitwork`:

```
import { genDynamicImport, genImport, genSafeVariableName } from 'knitwork'

const serialize = (data: any) => JSON.stringify(data, null, 2).replace(/"{(.+)}"(?=,?$)/gm, r => JSON.parse(r).replace(/^{(.*)}$/, '$1'))

const importSources = (sources: string | string[], { lazy = false } = {}) => {
  return toArray(sources).map((src) => {
    if (lazy) {
      return `const ${genSafeVariableName(src)} = ${genDynamicImport(src, { comment: `webpackChunkName: ${JSON.stringify(src)}` })}`
    }
    return genImport(src, genSafeVariableName(src))
  }).join('\n')
}

const importName = genSafeVariableName

```

You can automate this step by running `npx codemod@latest nuxt/4/template-compilation-changes`

#### [Removal of Experimental Features](#removal-of-experimental-features)

🚦 **Impact Level**: Minimal

##### What Changed

Four experimental features are no longer configurable in Nuxt 4:

- `experimental.treeshakeClientOnly` will be `true` (default since v3.0)
- `experimental.configSchema` will be `true` (default since v3.3)
- `experimental.polyfillVueUseHead` will be `false` (default since v3.4)
- `experimental.respectNoSSRHeader` will be `false` (default since v3.4)
- `vite.devBundler` is no longer configurable - it will use `vite-node` by default

##### Reasons for Change

These options have been set to their current values for some time and we do not have a reason to believe that they need to remain configurable.

##### Migration Steps

- `polyfillVueUseHead` is implementable in user-land with [this plugin](https://github.com/nuxt/nuxt/blob/f209158352b09d1986aa320e29ff36353b91c358/packages/nuxt/src/head/runtime/plugins/vueuse-head-polyfill.ts#L10-L11)
- `respectNoSSRHeader`is implementable in user-land with [server middleware](https://github.com/nuxt/nuxt/blob/c660b39447f0d5b8790c0826092638d321cd6821/packages/nuxt/src/core/runtime/nitro/no-ssr.ts#L8-L9)

In the table below, there is a quick comparison between 3 versions of Nuxt:

| Feature / Version      | Nuxt 2     | Nuxt Bridge | Nuxt 3+    |
| ---------------------- | ---------- | ----------- | ---------- |
| Vue                    | 2          | 2           | 3          |
| Stability              | 😊 Stable  | 😊 Stable   | 😊 Stable  |
| Performance            | 🏎 Fast     | ✈️ Faster   | 🚀 Fastest |
| Nitro Engine           | ❌         | ✅          | ✅         |
| ESM support            | 🌙 Partial | 👍 Better   | ✅         |
| TypeScript             | ☑️ Opt-in  | 🚧 Partial  | ✅         |
| Composition API        | ❌         | 🚧 Partial  | ✅         |
| Options API            | ✅         | ✅          | ✅         |
| Components Auto Import | ✅         | ✅          | ✅         |
| <script setup> syntax  | ❌         | 🚧 Partial  | ✅         |
| Auto Imports           | ❌         | ✅          | ✅         |
| webpack                | 4          | 4           | 5          |
| Vite                   | ⚠️ Partial | 🚧 Partial  | ✅         |
| Nuxi CLI               | ❌ Old     | ✅ nuxi     | ✅ nuxi    |
| Static sites           | ✅         | ✅          | ✅         |

The migration guide provides a step-by-step comparison of Nuxt 2 features to Nuxt 3+ features and guidance to adapt your current application.

Check out the **guide to migrating from Nuxt 2 to Nuxt 3**.

If you prefer to progressively migrate your Nuxt 2 application to Nuxt 3, you can use Nuxt Bridge. Nuxt Bridge is a compatibility layer that allows you to use Nuxt 3+ features in Nuxt 2 with an opt-in mechanism.

**Migrate from Nuxt 2 to Nuxt Bridge**
