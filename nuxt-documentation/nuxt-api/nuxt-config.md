# Nuxt Configuration
This file is auto-generated from Nuxt source code.

Discover all the options you can use in your nuxt.config.ts file.

You can improve your DX by defining additional aliases to access custom directories within your JavaScript and CSS.

*   **Type**: `object`
*   **Default**

```
{
  "~": "/<srcDir>",
  "@": "/<srcDir>",
  "~~": "/<rootDir>",
  "@@": "/<rootDir>",
  "#shared": "/<rootDir>/shared",
  "assets": "/<srcDir>/assets",
  "public": "/<srcDir>/public",
  "#build": "/<rootDir>/.nuxt",
  "#internal/nuxt/paths": "/<rootDir>/.nuxt/paths.mjs"
}

```


**Note**: Within a webpack context (image sources, CSS - but not JavaScript) you _must_ access your alias by prefixing it with `~`.

**Note**: These aliases will be automatically added to the generated `.nuxt/tsconfig.json` so you can get full type support and path auto-complete. In case you need to extend options provided by `./.nuxt/tsconfig.json` further, make sure to add them here or within the `typescript.tsConfig` property in `nuxt.config`.

**Example**:

```
export default {
  alias: {
    'images': fileURLToPath(new URL('./assets/images', import.meta.url)),
    'style': fileURLToPath(new URL('./assets/style', import.meta.url)),
    'data': fileURLToPath(new URL('./assets/other/data', import.meta.url))
  }
}

```


The directory where Nuxt will store the generated files when running `nuxt analyze`.

If a relative path is specified, it will be relative to your `rootDir`.

*   **Type**: `string`
*   **Default:** `"/<rootDir>/.nuxt/analyze"`

Nuxt App configuration.

### [`baseURL`](#baseurl)

The base path of your Nuxt application.

For example:

*   **Type**: `string`
*   **Default:** `"/"`

**Example**:

```
export default defineNuxtConfig({
  app: {
    baseURL: '/prefix/'
  }
})

```


**Example**:

```
NUXT_APP_BASE_URL=/prefix/ node .output/server/index.mjs

```


### [`buildAssetsDir`](#buildassetsdir)

The folder name for the built site assets, relative to `baseURL` (or `cdnURL` if set). This is set at build time and should not be customized at runtime.

*   **Type**: `string`
*   **Default:** `"/_nuxt/"`

### [`cdnURL`](#cdnurl)

An absolute URL to serve the public folder from (production-only).

For example:

*   **Type**: `string`
*   **Default:** `""`

**Example**:

```
export default defineNuxtConfig({
  app: {
    cdnURL: 'https://mycdn.org/'
  }
})

```


**Example**:

```
NUXT_APP_CDN_URL=https://mycdn.org/ node .output/server/index.mjs

```


### [`head`](#head)

Set default configuration for `<head>` on every page.

*   **Type**: `object`
*   **Default**

```
{
  "meta": [
    {
      "name": "viewport",
      "content": "width=device-width, initial-scale=1"
    },
    {
      "charset": "utf-8"
    }
  ],
  "link": [],
  "style": [],
  "script": [],
  "noscript": []
}

```


**Example**:

```
app: {
  head: {
    meta: [
      // <meta name="viewport" content="width=device-width, initial-scale=1">
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ],
    script: [
      // <script src="https://myawesome-lib.js"></script>
      { src: 'https://awesome-lib.js' }
    ],
    link: [
      // <link rel="stylesheet" href="https://myawesome-lib.css">
      { rel: 'stylesheet', href: 'https://awesome-lib.css' }
    ],
    // please note that this is an area that is likely to change
    style: [
      // <style type="text/css">:root { color: red }</style>
      { children: ':root { color: red }', type: 'text/css' }
    ],
    noscript: [
      // <noscript>JavaScript is required</noscript>
      { children: 'JavaScript is required' }
    ]
  }
}

```


### [`keepalive`](#keepalive)

Default values for KeepAlive configuration between pages.

This can be overridden with `definePageMeta` on an individual page. Only JSON-serializable values are allowed.

*   **Type**: `boolean`
*   **Default:** `false`

**See**: [Vue KeepAlive](https://vuejs.org/api/built-in-components.html#keepalive)

### [`layoutTransition`](#layouttransition)

Default values for layout transitions.

This can be overridden with `definePageMeta` on an individual page. Only JSON-serializable values are allowed.

*   **Type**: `boolean`
*   **Default:** `false`

**See**: [Vue Transition docs](https://vuejs.org/api/built-in-components.html#transition)

### [`pageTransition`](#pagetransition)

Default values for page transitions.

This can be overridden with `definePageMeta` on an individual page. Only JSON-serializable values are allowed.

*   **Type**: `boolean`
*   **Default:** `false`

**See**: [Vue Transition docs](https://vuejs.org/api/built-in-components.html#transition)

### [`rootAttrs`](#rootattrs)

Customize Nuxt root element id.

*   **Type**: `object`
*   **Default**

### [`rootId`](#rootid)

Customize Nuxt root element id.

*   **Type**: `string`
*   **Default:** `"__nuxt"`

### [`rootTag`](#roottag)

Customize Nuxt root element tag.

*   **Type**: `string`
*   **Default:** `"div"`

### [`spaLoaderAttrs`](#spaloaderattrs)

Customize Nuxt Nuxt SpaLoader element attributes.

#### [`id`](#id)

*   **Type**: `string`
*   **Default:** `"__nuxt-loader"`

### [`spaLoaderTag`](#spaloadertag)

Customize Nuxt SpaLoader element tag.

*   **Type**: `string`
*   **Default:** `"div"`

### [`teleportAttrs`](#teleportattrs)

Customize Nuxt Teleport element attributes.

*   **Type**: `object`
*   **Default**

### [`teleportId`](#teleportid)

Customize Nuxt Teleport element id.

*   **Type**: `string`
*   **Default:** `"teleports"`

### [`teleportTag`](#teleporttag)

Customize Nuxt Teleport element tag.

*   **Type**: `string`
*   **Default:** `"div"`

### [`viewTransition`](#viewtransition)

Default values for view transitions.

This only has an effect when **experimental** support for View Transitions is [enabled in your nuxt.config file](about:/docs/getting-started/transitions#view-transitions-api-experimental). This can be overridden with `definePageMeta` on an individual page.

*   **Type**: `boolean`
*   **Default:** `false`

**See**: [Nuxt View Transition API docs](https://nuxt.com/docs/getting-started/transitions#view-transitions-api-experimental)

Additional app configuration

For programmatic usage and type support, you can directly provide app config with this option. It will be merged with `app.config` file as default value.

### [`nuxt`](#nuxt)

For multi-app projects, the unique id of the Nuxt application.

Defaults to `nuxt-app`.

*   **Type**: `string`
*   **Default:** `"nuxt-app"`

Shared build configuration.

### [`analyze`](#analyze)

Nuxt allows visualizing your bundles and how to optimize them.

Set to `true` to enable bundle analysis, or pass an object with options: [for webpack](https://github.com/webpack-contrib/webpack-bundle-analyzer#options-for-plugin) or [for vite](https://github.com/btd/rollup-plugin-visualizer#options).

*   **Type**: `object`
*   **Default**

```
{
  "template": "treemap",
  "projectRoot": "/<rootDir>",
  "filename": "/<rootDir>/.nuxt/analyze/{name}.html"
}

```


**Example**:

```
analyze: {
  analyzerMode: 'static'
}

```


### [`templates`](#templates)

It is recommended to use `addTemplate` from `@nuxt/kit` instead of this option.

*   **Type**: `array`

**Example**:

```
templates: [
  {
    src: '~/modules/support/plugin.js', // `src` can be absolute or relative
    dst: 'support.js', // `dst` is relative to project `.nuxt` dir
  }
]

```


### [`transpile`](#transpile)

If you want to transpile specific dependencies with Babel, you can add them here. Each item in transpile can be a package name, a function, a string or regex object matching the dependency's file name.

You can also use a function to conditionally transpile. The function will receive an object ({ isDev, isServer, isClient, isModern, isLegacy }).

*   **Type**: `array`

**Example**:

```
transpile: [({ isLegacy }) => isLegacy && 'ky']

```


Define the directory where your built Nuxt files will be placed.

Many tools assume that `.nuxt` is a hidden directory (because it starts with a `.`). If that is a problem, you can use this option to prevent that.

*   **Type**: `string`
*   **Default:** `"/<rootDir>/.nuxt"`

**Example**:

```
export default {
  buildDir: 'nuxt-build'
}

```


A unique identifier matching the build. This may contain the hash of the current state of the project.

*   **Type**: `string`
*   **Default:** `"f82392b2-46a9-44da-a2ea-53c8f00383c6"`

The builder to use for bundling the Vue part of your application.

*   **Type**: `string`
*   **Default:** `"@nuxt/vite-builder"`

Specify a compatibility date for your app.

This is used to control the behavior of presets in Nitro, Nuxt Image and other modules that may change behavior without a major version bump. We plan to improve the tooling around this feature in the future.

Configure Nuxt component auto-registration.

Any components in the directories configured here can be used throughout your pages, layouts (and other components) without needing to explicitly import them.

*   **Type**: `object`
*   **Default**

```
{
  "dirs": [
    {
      "path": "~/components/global",
      "global": true
    },
    "~/components"
  ]
}

```


**See**: [`components/` directory documentation](https://nuxt.com/docs/guide/directory-structure/components)

You can define the CSS files/modules/libraries you want to set globally (included in every page).

Nuxt will automatically guess the file type by its extension and use the appropriate pre-processor. You will still need to install the required loader if you need to use them.

*   **Type**: `array`

**Example**:

```
css: [
  // Load a Node.js module directly (here it's a Sass file).
  'bulma',
  // CSS file in the project
  '~/assets/css/main.css',
  // SCSS file in the project
  '~/assets/css/main.scss'
]

```


Set to `true` to enable debug mode.

At the moment, it prints out hook names and timings on the server, and logs hook arguments as well in the browser. You can also set this to an object to enable specific debug options.

*   **Type**: `boolean`
*   **Default:** `false`

Whether Nuxt is running in development mode.

Normally, you should not need to set this.

*   **Type**: `boolean`
*   **Default:** `false`

### [`cors`](#cors)

Set CORS options for the dev server

#### [`origin`](#origin)

*   **Type**: `array`
*   **Default**

### [`host`](#host)

Dev server listening host

### [`https`](#https)

Whether to enable HTTPS.

*   **Type**: `boolean`
*   **Default:** `false`

**Example**:

```
export default defineNuxtConfig({
  devServer: {
    https: {
      key: './server.key',
      cert: './server.crt'
    }
  }
})

```


### [`loadingTemplate`](#loadingtemplate)

Template to show a loading screen

*   **Type**: `function`

### [`port`](#port)

Dev server listening port

*   **Type**: `number`
*   **Default:** `3000`

### [`url`](#url)

Listening dev server URL.

This should not be set directly as it will always be overridden by the dev server with the full URL (for module and internal use).

*   **Type**: `string`
*   **Default:** `"http://localhost:3000"`

Nitro development-only server handlers.

*   **Type**: `array`

**See**: [Nitro server routes documentation](https://nitro.unjs.io/guide/routing)

Enable Nuxt DevTools for development.

Breaking changes for devtools might not reflect on the version of Nuxt.

**See**: [Nuxt DevTools](https://devtools.nuxt.com/) for more information.

Customize default directory structure used by Nuxt.

It is better to stick with defaults unless needed.

### [`app`](#app-1)

*   **Type**: `string`
*   **Default:** `"app"`

### [`assets`](#assets)

The assets directory (aliased as `~assets` in your build).

*   **Type**: `string`
*   **Default:** `"assets"`

### [`layouts`](#layouts)

The layouts directory, each file of which will be auto-registered as a Nuxt layout.

*   **Type**: `string`
*   **Default:** `"layouts"`

### [`middleware`](#middleware)

The middleware directory, each file of which will be auto-registered as a Nuxt middleware.

*   **Type**: `string`
*   **Default:** `"middleware"`

### [`modules`](#modules)

The modules directory, each file in which will be auto-registered as a Nuxt module.

*   **Type**: `string`
*   **Default:** `"modules"`

### [`pages`](#pages)

The directory which will be processed to auto-generate your application page routes.

*   **Type**: `string`
*   **Default:** `"pages"`

### [`plugins`](#plugins)

The plugins directory, each file of which will be auto-registered as a Nuxt plugin.

*   **Type**: `string`
*   **Default:** `"plugins"`

### [`public`](#public)

The directory containing your static files, which will be directly accessible via the Nuxt server and copied across into your `dist` folder when your app is generated.

*   **Type**: `string`
*   **Default:** `"public"`

### [`shared`](#shared)

The shared directory. This directory is shared between the app and the server.

*   **Type**: `string`
*   **Default:** `"shared"`

### [`static`](#static)

*   **Type**: `string`
*   **Default:** `"public"`

### [`options`](#options)

Configure shared esbuild options used within Nuxt and passed to other builders, such as Vite or Webpack.

#### [`jsxFactory`](#jsxfactory)

*   **Type**: `string`
*   **Default:** `"h"`

#### [`jsxFragment`](#jsxfragment)

*   **Type**: `string`
*   **Default:** `"Fragment"`

#### [`target`](#target)

*   **Type**: `string`
*   **Default:** `"esnext"`

#### [`tsconfigRaw`](#tsconfigraw)

*   **Type**: `object`

### [`appManifest`](#appmanifest)

Use app manifests to respect route rules on client-side.

*   **Type**: `boolean`
*   **Default:** `true`

### [`asyncContext`](#asynccontext)

Enable native async context to be accessible for nested composables

*   **Type**: `boolean`
*   **Default:** `false`

**See**: [Nuxt PR #20918](https://github.com/nuxt/nuxt/pull/20918)

### [`asyncEntry`](#asyncentry)

Set to true to generate an async entry point for the Vue bundle (for module federation support).

*   **Type**: `boolean`
*   **Default:** `false`

### [`browserDevtoolsTiming`](#browserdevtoolstiming)

Enable timings for Nuxt application hooks in the performance panel of Chromium-based browsers.

*   **Type**: `boolean`
*   **Default:** `false`

**See**: [the Chrome DevTools extensibility API](https://developer.chrome.com/docs/devtools/performance/extension#tracks)

### [`buildCache`](#buildcache)

Cache Nuxt/Nitro build artifacts based on a hash of the configuration and source files.

This only works for source files within `srcDir` and `serverDir` for the Vue/Nitro parts of your app.

*   **Type**: `boolean`
*   **Default:** `false`

### [`checkOutdatedBuildInterval`](#checkoutdatedbuildinterval)

Set the time interval (in ms) to check for new builds. Disabled when `experimental.appManifest` is `false`.

Set to `false` to disable.

*   **Type**: `number`
*   **Default:** `3600000`

### [`clientFallback`](#clientfallback)

Whether to enable the experimental `<NuxtClientFallback>` component for rendering content on the client if there's an error in SSR.

*   **Type**: `boolean`
*   **Default:** `false`

### [`clientNodeCompat`](#clientnodecompat)

Automatically polyfill Node.js imports in the client build using `unenv`.

*   **Type**: `boolean`
*   **Default:** `false`

**See**: [unenv](https://github.com/unjs/unenv)

### [`compileTemplate`](#compiletemplate)

Whether to use `lodash.template` to compile Nuxt templates.

This flag will be removed with the release of v4 and exists only for advance testing within Nuxt v3.12+ or in [the nightly release channel](https://nuxt.com/docs/guide/going-further/nightly-release-channel).

*   **Type**: `boolean`
*   **Default:** `true`

### [`componentIslands`](#componentislands)

Experimental component islands support with `<NuxtIsland>` and `.island.vue` files.

By default it is set to 'auto', which means it will be enabled only when there are islands, server components or server pages in your app.

*   **Type**: `string`
*   **Default:** `"auto"`

### [`configSchema`](#configschema)

Config schema support

*   **Type**: `boolean`
*   **Default:** `true`

**See**: [Nuxt Issue #15592](https://github.com/nuxt/nuxt/issues/15592)

### [`cookieStore`](#cookiestore)

Enables CookieStore support to listen for cookie updates (if supported by the browser) and refresh `useCookie` ref values.

*   **Type**: `boolean`
*   **Default:** `true`

**See**: [CookieStore](https://developer.mozilla.org/en-US/docs/Web/API/CookieStore)

### [`crossOriginPrefetch`](#crossoriginprefetch)

Enable cross-origin prefetch using the Speculation Rules API.

*   **Type**: `boolean`
*   **Default:** `false`

### [`debugModuleMutation`](#debugmodulemutation)

Record mutations to `nuxt.options` in module context

*   **Type**: `boolean`
*   **Default:** `false`

### [`decorators`](#decorators)

Enable to use experimental decorators in Nuxt and Nitro.

*   **Type**: `boolean`
*   **Default:** `false`

**See**: [https://github.com/tc39/proposal-decorators](https://github.com/tc39/proposal-decorators)

### [`defaults`](#defaults)

This allows specifying the default options for core Nuxt components and composables.

These options will likely be moved elsewhere in the future, such as into `app.config` or into the `app/` directory.

#### [`nuxtLink`](#nuxtlink)

##### `componentName`

*   **Type**: `string`
*   **Default:** `"NuxtLink"`

##### `prefetch`

*   **Type**: `boolean`
*   **Default:** `true`

##### `prefetchOn`

###### `visibility`

*   **Type**: `boolean`
*   **Default:** `true`

#### [`useAsyncData`](#useasyncdata)

Options that apply to `useAsyncData` (and also therefore `useFetch`)

##### `deep`

*   **Type**: `boolean`
*   **Default:** `true`

##### `errorValue`

*   **Type**: `string`
*   **Default:** `"null"`

##### `value`

*   **Type**: `string`
*   **Default:** `"null"`

#### [`useFetch`](#usefetch)

### [`emitRouteChunkError`](#emitroutechunkerror)

Emit `app:chunkError` hook when there is an error loading vite/webpack chunks.

By default, Nuxt will also perform a reload of the new route when a chunk fails to load when navigating to a new route (`automatic`). Setting `automatic-immediate` will lead Nuxt to perform a reload of the current route right when a chunk fails to load (instead of waiting for navigation). You can disable automatic handling by setting this to `false`, or handle chunk errors manually by setting it to `manual`.

*   **Type**: `string`
*   **Default:** `"automatic"`

**See**: [Nuxt PR #19038](https://github.com/nuxt/nuxt/pull/19038)

### [`externalVue`](#externalvue)

Externalize `vue`, `@vue/*` and `vue-router` when building.

*   **Type**: `boolean`
*   **Default:** `true`

**See**: [Nuxt Issue #13632](https://github.com/nuxt/nuxt/issues/13632)

### [`extraPageMetaExtractionKeys`](#extrapagemetaextractionkeys)

Configure additional keys to extract from the page metadata when using `scanPageMeta`.

This allows modules to access additional metadata from the page metadata. It's recommended to augment the NuxtPage types with your keys.

*   **Type**: `array`

### [`headNext`](#headnext)

Use new experimental head optimisations:

*   Add the capo.js head plugin in order to render tags in of the head in a more performant way. - Uses the hash hydration plugin to reduce initial hydration
*   **Type**: `boolean`
*   **Default:** `true`

**See**: [Nuxt Discussion #22632](https://github.com/nuxt/nuxt/discussions/22632)

### [`inlineRouteRules`](#inlinerouterules)

Allow defining `routeRules` directly within your `~/pages` directory using `defineRouteRules`.

Rules are converted (based on the path) and applied for server requests. For example, a rule defined in `~/pages/foo/bar.vue` will be applied to `/foo/bar` requests. A rule in `~/pages/foo/[id].vue` will be applied to `/foo/**` requests. For more control, such as if you are using a custom `path` or `alias` set in the page's `definePageMeta`, you should set `routeRules` directly within your `nuxt.config`.

*   **Type**: `boolean`
*   **Default:** `false`

### [`lazyHydration`](#lazyhydration)

Enable automatic configuration of hydration strategies for `<Lazy>` components.

*   **Type**: `boolean`
*   **Default:** `true`

### [`localLayerAliases`](#locallayeraliases)

Resolve `~`, `~~`, `@` and `@@` aliases located within layers with respect to their layer source and root directories.

*   **Type**: `boolean`
*   **Default:** `true`

### [`navigationRepaint`](#navigationrepaint)

Wait for a single animation frame before navigation, which gives an opportunity for the browser to repaint, acknowledging user interaction.

It can reduce INP when navigating on prerendered routes.

*   **Type**: `boolean`
*   **Default:** `true`

### [`noVueServer`](#novueserver)

Disable vue server renderer endpoint within nitro.

*   **Type**: `boolean`
*   **Default:** `false`

### [`normalizeComponentNames`](#normalizecomponentnames)

Ensure that auto-generated Vue component names match the full component name you would use to auto-import the component.

*   **Type**: `boolean`
*   **Default:** `false`

### [`payloadExtraction`](#payloadextraction)

When this option is enabled (by default) payload of pages that are prerendered are extracted

*   **Type**: `boolean`
*   **Default:** `true`

### [`polyfillVueUseHead`](#polyfillvueusehead)

Whether or not to add a compatibility layer for modules, plugins or user code relying on the old `@vueuse/head` API.

This is disabled to reduce the client-side bundle by ~0.5kb.

*   **Type**: `boolean`
*   **Default:** `false`

### [`relativeWatchPaths`](#relativewatchpaths)

Whether to provide relative paths in the `builder:watch` hook.

This flag will be removed with the release of v4 and exists only for advance testing within Nuxt v3.12+ or in [the nightly release channel](https://nuxt.com/docs/guide/going-further/nightly-release-channel).

*   **Type**: `boolean`
*   **Default:** `true`

### [`renderJsonPayloads`](#renderjsonpayloads)

Render JSON payloads with support for revivifying complex types.

*   **Type**: `boolean`
*   **Default:** `true`

### [`resetAsyncDataToUndefined`](#resetasyncdatatoundefined)

Whether `clear` and `clearNuxtData` should reset async data to its _default_ value or update it to `null`/`undefined`.

*   **Type**: `boolean`
*   **Default:** `true`

### [`respectNoSSRHeader`](#respectnossrheader)

Allow disabling Nuxt SSR responses by setting the `x-nuxt-no-ssr` header.

*   **Type**: `boolean`
*   **Default:** `false`

### [`restoreState`](#restorestate)

Whether to restore Nuxt app state from `sessionStorage` when reloading the page after a chunk error or manual `reloadNuxtApp()` call.

To avoid hydration errors, it will be applied only after the Vue app has been mounted, meaning there may be a flicker on initial load. Consider carefully before enabling this as it can cause unexpected behavior, and consider providing explicit keys to `useState` as auto-generated keys may not match across builds.

*   **Type**: `boolean`
*   **Default:** `false`

### [`scanPageMeta`](#scanpagemeta)

Allow exposing some route metadata defined in `definePageMeta` at build-time to modules (alias, name, path, redirect).

This only works with static or strings/arrays rather than variables or conditional assignment.

*   **Type**: `boolean`
*   **Default:** `true`

**See**: [Nuxt Issues #24770](https://github.com/nuxt/nuxt/issues/24770)

### [`sharedPrerenderData`](#sharedprerenderdata)

Automatically share payload _data_ between pages that are prerendered. This can result in a significant performance improvement when prerendering sites that use `useAsyncData` or `useFetch` and fetch the same data in different pages.

It is particularly important when enabling this feature to make sure that any unique key of your data is always resolvable to the same data. For example, if you are using `useAsyncData` to fetch data related to a particular page, you should provide a key that uniquely matches that data. (`useFetch` should do this automatically for you.)

*   **Type**: `boolean`
*   **Default:** `false`

**Example**:

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


### [`spaLoadingTemplateLocation`](#spaloadingtemplatelocation)

Keep showing the spa-loading-template until suspense:resolve

*   **Type**: `string`
*   **Default:** `"within"`

**See**: [Nuxt Issues #24770](https://github.com/nuxt/nuxt/issues/21721)

### [`templateImportResolution`](#templateimportresolution)

Disable resolving imports into Nuxt templates from the path of the module that added the template.

*   **Type**: `boolean`
*   **Default:** `true`

### [`templateRouteInjection`](#templaterouteinjection)

By default the route object returned by the auto-imported `useRoute()` composable is kept in sync with the current page in view in `<NuxtPage>`. This is not true for `vue-router`'s exported `useRoute` or for the default `$route` object available in your Vue templates.

By enabling this option a mixin will be injected to keep the `$route` template object in sync with Nuxt's managed `useRoute()`.

*   **Type**: `boolean`
*   **Default:** `true`

### [`templateUtils`](#templateutils)

Whether to provide a legacy `templateUtils` object (with `serialize`, `importName` and `importSources`) when compiling Nuxt templates.

This flag will be removed with the release of v4 and exists only for advance testing within Nuxt v3.12+ or in [the nightly release channel](https://nuxt.com/docs/guide/going-further/nightly-release-channel).

*   **Type**: `boolean`
*   **Default:** `true`

### [`treeshakeClientOnly`](#treeshakeclientonly)

Tree shakes contents of client-only components from server bundle.

*   **Type**: `boolean`
*   **Default:** `true`

**See**: [Nuxt PR #5750](https://github.com/nuxt/framework/pull/5750)

### [`typedPages`](#typedpages)

Enable the new experimental typed router using [unplugin-vue-router](https://github.com/posva/unplugin-vue-router).

*   **Type**: `boolean`
*   **Default:** `false`

### [`viewTransition`](#viewtransition-1)

Enable View Transition API integration with client-side router.

*   **Type**: `boolean`
*   **Default:** `false`

**See**: [View Transitions API](https://developer.chrome.com/docs/web-platform/view-transitions)

### [`watcher`](#watcher)

Set an alternative watcher that will be used as the watching service for Nuxt.

Nuxt uses 'chokidar-granular' if your source directory is the same as your root directory . This will ignore top-level directories (like `node_modules` and `.git`) that are excluded from watching. You can set this instead to `parcel` to use `@parcel/watcher`, which may improve performance in large projects or on Windows platforms. You can also set this to `chokidar` to watch all files in your source directory.

*   **Type**: `string`
*   **Default:** `"chokidar"`

**See**: [chokidar](https://github.com/paulmillr/chokidar)

**See**: [@parcel/watcher](https://github.com/parcel-bundler/watcher)

### [`writeEarlyHints`](#writeearlyhints)

Write early hints when using node server.

*   **Type**: `boolean`
*   **Default:** `false`

**Note**: nginx does not support 103 Early hints in the current version.

Extend project from multiple local or remote sources.

Value should be either a string or array of strings pointing to source directories or config path relative to current config. You can use `github:`, `gh:` `gitlab:` or `bitbucket:`

**See**: [`c12` docs on extending config layers](https://github.com/unjs/c12#extending-config-layer-from-remote-sources)

**See**: [`giget` documentation](https://github.com/unjs/giget)

The extensions that should be resolved by the Nuxt resolver.

*   **Type**: `array`
*   **Default**

```
[
  ".js",
  ".jsx",
  ".mjs",
  ".ts",
  ".tsx",
  ".vue"
]

```


Some features of Nuxt are available on an opt-in basis, or can be disabled based on your needs.

### [`devLogs`](#devlogs)

Stream server logs to the client as you are developing. These logs can be handled in the `dev:ssr-logs` hook.

If set to `silent`, the logs will not be printed to the browser console.

*   **Type**: `boolean`
*   **Default:** `false`

### [`inlineStyles`](#inlinestyles)

Inline styles when rendering HTML (currently vite only).

You can also pass a function that receives the path of a Vue component and returns a boolean indicating whether to inline the styles for that component.

*   **Type**: `boolean`
*   **Default:** `true`

### [`noScripts`](#noscripts)

Turn off rendering of Nuxt scripts and JS resource hints. You can also disable scripts more granularly within `routeRules`.

*   **Type**: `boolean`
*   **Default:** `false`

`future` is for early opting-in to new features that will become default in a future (possibly major) version of the framework.

### [`compatibilityVersion`](#compatibilityversion)

Enable early access to Nuxt v4 features or flags.

Setting `compatibilityVersion` to `4` changes defaults throughout your Nuxt configuration, but you can granularly re-enable Nuxt v3 behaviour when testing (see example). Please file issues if so, so that we can address in Nuxt or in the ecosystem.

*   **Type**: `number`
*   **Default:** `3`

**Example**:

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
    compileTemplate: true,
    templateUtils: true,
    relativeWatchPaths: true,
    resetAsyncDataToUndefined: true,
    defaults: {
      useAsyncData: {
        deep: true
      }
    }
  },
  unhead: {
    renderSSRHeadOptions: {
      omitLineBreaks: false
    }
  }
})

```


### [`multiApp`](#multiapp)

This enables early access to the experimental multi-app support.

*   **Type**: `boolean`
*   **Default:** `false`

**See**: [Nuxt Issue #21635](https://github.com/nuxt/nuxt/issues/21635)

### [`typescriptBundlerResolution`](#typescriptbundlerresolution)

This enables 'Bundler' module resolution mode for TypeScript, which is the recommended setting for frameworks like Nuxt and Vite.

It improves type support when using modern libraries with `exports`. You can set it to false to use the legacy 'Node' mode, which is the default for TypeScript.

*   **Type**: `boolean`
*   **Default:** `true`

**See**: [TypeScript PR implementing `bundler` module resolution](https://github.com/microsoft/TypeScript/pull/51669)

### [`exclude`](#exclude)

This option is no longer used. Instead, use `nitro.prerender.ignore`.

*   **Type**: `array`

### [`routes`](#routes)

The routes to generate.

If you are using the crawler, this will be only the starting point for route generation. This is often necessary when using dynamic routes. It is preferred to use `nitro.prerender.routes`.

*   **Type**: `array`

**Example**:

```
routes: ['/users/1', '/users/2', '/users/3']

```


Hooks are listeners to Nuxt events that are typically used in modules, but are also available in `nuxt.config`.

Internally, hooks follow a naming pattern using colons (e.g., build:done). For ease of configuration, you can also structure them as an hierarchical object in `nuxt.config` (as below).

**Example**:

```
import fs from 'node:fs'
import path from 'node:path'
export default {
  hooks: {
    build: {
      done(builder) {
        const extraFilePath = path.join(
          builder.nuxt.options.buildDir,
          'extra-file'
        )
        fs.writeFileSync(extraFilePath, 'Something extra')
      }
    }
  }
}

```


More customizable than `ignorePrefix`: all files matching glob patterns specified inside the `ignore` array will be ignored in building.

*   **Type**: `array`
*   **Default**

```
[
  "**/*.stories.{js,cts,mts,ts,jsx,tsx}",
  "**/*.{spec,test}.{js,cts,mts,ts,jsx,tsx}",
  "**/*.d.{cts,mts,ts}",
  "**/.{pnpm-store,vercel,netlify,output,git,cache,data}",
  "**/*.sock",
  ".nuxt/analyze",
  ".nuxt",
  "**/-*.*"
]

```


Pass options directly to `node-ignore` (which is used by Nuxt to ignore files).

**See**: [node-ignore](https://github.com/kaelzhang/node-ignore)

**Example**:

```
ignoreOptions: {
  ignorecase: false
}

```


Any file in `pages/`, `layouts/`, `middleware/`, and `public/` directories will be ignored during the build process if its filename starts with the prefix specified by `ignorePrefix`. This is intended to prevent certain files from being processed or served in the built application. By default, the `ignorePrefix` is set to '-', ignoring any files starting with '-'.

*   **Type**: `string`
*   **Default:** `"-"`

Configure how Nuxt auto-imports composables into your application.

**See**: [Nuxt documentation](https://nuxt.com/docs/guide/directory-structure/composables)

### [`dirs`](#dirs)

An array of custom directories that will be auto-imported. Note that this option will not override the default directories (~/composables, ~/utils).

*   **Type**: `array`

**Example**:

```
imports: {
  // Auto-import pinia stores defined in `~/stores`
  dirs: ['stores']
}

```


### [`global`](#global)

*   **Type**: `boolean`
*   **Default:** `false`

### [`scan`](#scan)

Whether to scan your `composables/` and `utils/` directories for composables to auto-import. Auto-imports registered by Nuxt or other modules, such as imports from `vue` or `nuxt`, will still be enabled.

*   **Type**: `boolean`
*   **Default:** `true`

Log level when building logs.

Defaults to 'silent' when running in CI or when a TTY is not available. This option is then used as 'silent' in Vite and 'none' in Webpack

*   **Type**: `string`
*   **Default:** `"info"`

Modules are Nuxt extensions which can extend its core functionality and add endless integrations.

Each module is either a string (which can refer to a package, or be a path to a file), a tuple with the module as first string and the options as a second object, or an inline module function. Nuxt tries to resolve each item in the modules array using node require path (in `node_modules`) and then will be resolved from project `srcDir` if `~` alias is used.

*   **Type**: `array`

**Note**: Modules are executed sequentially so the order is important. First, the modules defined in `nuxt.config.ts` are loaded. Then, modules found in the `modules/` directory are executed, and they load in alphabetical order.

**Example**:

```
modules: [
  // Using package name
  '@nuxtjs/axios',
  // Relative to your project srcDir
  '~/modules/awesome.js',
  // Providing options
  ['@nuxtjs/google-analytics', { ua: 'X1234567' }],
  // Inline definition
  function () {}
]

```


Used to set the modules directories for path resolving (for example, webpack's `resolveLoading`, `nodeExternals` and `postcss`).

The configuration path is relative to `options.rootDir` (default is current working directory). Setting this field may be necessary if your project is organized as a yarn workspace-styled mono-repository.

*   **Type**: `array`
*   **Default**

```
[
  "/<rootDir>/node_modules"
]

```


**Example**:

```
export default {
  modulesDir: ['../../node_modules']
}

```


Configuration for Nitro.

**See**: [Nitro configuration docs](https://nitro.unjs.io/config/)

### [`routeRules`](#routerules)

*   **Type**: `object`

### [`runtimeConfig`](#runtimeconfig)

*   **Type**: `object`
*   **Default**

```
{
  "public": {},
  "app": {
    "buildId": "f82392b2-46a9-44da-a2ea-53c8f00383c6",
    "baseURL": "/",
    "buildAssetsDir": "/_nuxt/",
    "cdnURL": ""
  },
  "nitro": {
    "envPrefix": "NUXT_"
  }
}

```


Build time optimization configuration.

### [`asyncTransforms`](#asynctransforms)

Options passed directly to the transformer from `unctx` that preserves async context after `await`.

#### [`asyncFunctions`](#asyncfunctions)

*   **Type**: `array`
*   **Default**

```
[
  "defineNuxtPlugin",
  "defineNuxtRouteMiddleware"
]

```


#### [`objectDefinitions`](#objectdefinitions)

##### `defineNuxtComponent`

*   **Type**: `array`
*   **Default**

##### `defineNuxtPlugin`

*   **Type**: `array`
*   **Default**

##### `definePageMeta`

*   **Type**: `array`
*   **Default**

```
[
  "middleware",
  "validate"
]

```


### [`keyedComposables`](#keyedcomposables)

Functions to inject a key for.

As long as the number of arguments passed to the function is less than `argumentLength`, an additional magic string will be injected that can be used to deduplicate requests between server and client. You will need to take steps to handle this additional key. The key will be unique based on the location of the function being invoked within the file.

*   **Type**: `array`
*   **Default**

```
[
  {
    "name": "callOnce",
    "argumentLength": 3
  },
  {
    "name": "defineNuxtComponent",
    "argumentLength": 2
  },
  {
    "name": "useState",
    "argumentLength": 2
  },
  {
    "name": "useFetch",
    "argumentLength": 3
  },
  {
    "name": "useAsyncData",
    "argumentLength": 3
  },
  {
    "name": "useLazyAsyncData",
    "argumentLength": 3
  },
  {
    "name": "useLazyFetch",
    "argumentLength": 3
  }
]

```


### [`treeShake`](#treeshake)

Tree shake code from specific builds.

#### [`composables`](#composables)

Tree shake composables from the server or client builds.

**Example**:

```
treeShake: { client: { myPackage: ['useServerOnlyComposable'] } }

```


##### `client`

*   **Type**: `object`
*   **Default**

```
{
  "vue": [
    "onRenderTracked",
    "onRenderTriggered",
    "onServerPrefetch"
  ],
  "#app": [
    "definePayloadReducer",
    "definePageMeta",
    "onPrehydrate"
  ]
}

```


##### `server`

*   **Type**: `object`
*   **Default**

```
{
  "vue": [
    "onMounted",
    "onUpdated",
    "onUnmounted",
    "onBeforeMount",
    "onBeforeUpdate",
    "onBeforeUnmount",
    "onRenderTracked",
    "onRenderTriggered",
    "onActivated",
    "onDeactivated"
  ],
  "#app": [
    "definePayloadReviver",
    "definePageMeta"
  ]
}

```


[pages](#pages-1)
-----------------

Whether to use the vue-router integration in Nuxt 3. If you do not provide a value it will be enabled if you have a `pages/` directory in your source folder.

An array of nuxt app plugins.

Each plugin can be a string (which can be an absolute or relative path to a file). If it ends with `.client` or `.server` then it will be automatically loaded only in the appropriate context. It can also be an object with `src` and `mode` keys.

*   **Type**: `array`

**Note**: Plugins are also auto-registered from the `~/plugins` directory and these plugins do not need to be listed in `nuxt.config` unless you need to customize their order. All plugins are deduplicated by their src path.

**See**: [`plugins/` directory documentation](https://nuxt.com/docs/guide/directory-structure/plugins)

**Example**:

```
plugins: [
  '~/plugins/foo.client.js', // only in client side
  '~/plugins/bar.server.js', // only in server side
  '~/plugins/baz.js', // both client & server
  { src: '~/plugins/both-sides.js' },
  { src: '~/plugins/client-only.js', mode: 'client' }, // only on client side
  { src: '~/plugins/server-only.js', mode: 'server' } // only on server side
]

```


[postcss](#postcss)
-------------------

### [`order`](#order)

A strategy for ordering PostCSS plugins.

*   **Type**: `function`

### [`plugins`](#plugins-2)

Options for configuring PostCSS plugins.

**See**: [PostCSS docs](https://postcss.org/)

#### [`autoprefixer`](#autoprefixer)

Plugin to parse CSS and add vendor prefixes to CSS rules.

**See**: [`autoprefixer`](https://github.com/postcss/autoprefixer)

#### [`cssnano`](#cssnano)

*   **Type**: `object`

**See**: [`cssnano` configuration options](https://cssnano.github.io/cssnano/docs/config-file/#configuration-options)

Define the root directory of your application.

This property can be overwritten (for example, running `nuxt ./my-app/` will set the `rootDir` to the absolute path of `./my-app/` from the current/working directory. It is normally not needed to configure this option.

*   **Type**: `string`
*   **Default:** `"/<rootDir>"`

Global route options applied to matching server routes.

**Experimental**: This is an experimental feature and API may change in the future.

**See**: [Nitro route rules documentation](https://nitro.unjs.io/config/#routerules)

### [`options`](#options-1)

Additional router options passed to `vue-router`. On top of the options for `vue-router`, Nuxt offers additional options to customize the router (see below).

**Note**: Only JSON serializable options should be passed by Nuxt config. For more control, you can use `app/router.options.ts` file.

**See**: [Vue Router documentation](https://router.vuejs.org/api/interfaces/routeroptions.html).

#### [`hashMode`](#hashmode)

You can enable hash history in SPA mode. In this mode, router uses a hash character (#) before the actual URL that is internally passed. When enabled, the **URL is never sent to the server** and **SSR is not supported**.

*   **Type**: `boolean`
*   **Default:** `false`

**Default**: false

#### [`scrollBehaviorType`](#scrollbehaviortype)

Customize the scroll behavior for hash links.

*   **Type**: `string`
*   **Default:** `"auto"`

**Default**: 'auto'

Runtime config allows passing dynamic config and environment variables to the Nuxt app context.

The value of this object is accessible from server only using `useRuntimeConfig`. It mainly should hold _private_ configuration which is not exposed on the frontend. This could include a reference to your API secret tokens. Anything under `public` and `app` will be exposed to the frontend as well. Values are automatically replaced by matching env variables at runtime, e.g. setting an environment variable `NUXT_API_KEY=my-api-key NUXT_PUBLIC_BASE_URL=/foo/` would overwrite the two values in the example below.

*   **Type**: `object`
*   **Default**

```
{
  "public": {},
  "app": {
    "buildId": "f82392b2-46a9-44da-a2ea-53c8f00383c6",
    "baseURL": "/",
    "buildAssetsDir": "/_nuxt/",
    "cdnURL": ""
  }
}

```


**Example**:

```
export default {
 runtimeConfig: {
    apiKey: '', // Default to an empty string, automatically set at runtime using process.env.NUXT_API_KEY
    public: {
       baseURL: '' // Exposed to the frontend as well.
    }
  }
}

```


Define the server directory of your Nuxt application, where Nitro routes, middleware and plugins are kept.

If a relative path is specified, it will be relative to your `rootDir`.

*   **Type**: `string`
*   **Default:** `"/<srcDir>/server"`

Nitro server handlers.

Each handler accepts the following options:

*   handler: The path to the file defining the handler. - route: The route under which the handler is available. This follows the conventions of [rou3](https://github.com/unjs/rou3). - method: The HTTP method of requests that should be handled. - middleware: Specifies whether it is a middleware handler. - lazy: Specifies whether to use lazy loading to import the handler.
*   **Type**: `array`

**See**: [`server/` directory documentation](https://nuxt.com/docs/guide/directory-structure/server)

**Note**: Files from `server/api`, `server/middleware` and `server/routes` will be automatically registered by Nuxt.

**Example**:

```
serverHandlers: [
  { route: '/path/foo/**:name', handler: '~/server/foohandler.ts' }
]

```


Configures whether and how sourcemaps are generated for server and/or client bundles.

If set to a single boolean, that value applies to both server and client. Additionally, the `'hidden'` option is also available for both server and client. Available options for both client and server: - `true`: Generates sourcemaps and includes source references in the final bundle. - `false`: Does not generate any sourcemaps. - `'hidden'`: Generates sourcemaps but does not include references in the final bundle.

*   **Type**: `object`
*   **Default**

```
{
  "server": true,
  "client": false
}

```


Boolean or a path to an HTML file with the contents of which will be inserted into any HTML page rendered with `ssr: false`.

*   If it is unset, it will use `~/app/spa-loading-template.html` file in one of your layers, if it exists. - If it is false, no SPA loading indicator will be loaded. - If true, Nuxt will look for `~/app/spa-loading-template.html` file in one of your layers, or a default Nuxt image will be used. Some good sources for spinners are [SpinKit](https://github.com/tobiasahlin/SpinKit) or [SVG Spinners](https://icones.js.org/collection/svg-spinners).
*   **Default:** `null`

**Example**: ~/app/spa-loading-template.html

```
<!-- https://github.com/barelyhuman/snips/blob/dev/pages/css-loader.md -->
<div class="loader"></div>
<style>
.loader {
  display: block;
  position: fixed;
  z-index: 1031;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 18px;
  height: 18px;
  box-sizing: border-box;
  border: solid 2px transparent;
  border-top-color: #000;
  border-left-color: #000;
  border-bottom-color: #efefef;
  border-right-color: #efefef;
  border-radius: 50%;
  -webkit-animation: loader 400ms linear infinite;
  animation: loader 400ms linear infinite;
}

@-webkit-keyframes loader {
  0% {
    -webkit-transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    -webkit-transform: translate(-50%, -50%) rotate(360deg);
  }
}
@keyframes loader {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
</style>

```


Define the source directory of your Nuxt application.

If a relative path is specified, it will be relative to the `rootDir`.

*   **Type**: `string`
*   **Default:** `"/<srcDir>"`

**Example**:

```
export default {
  srcDir: 'src/'
}

```


This would work with the following folder structure:

```
-| app/
---| node_modules/
---| nuxt.config.js
---| package.json
---| src/
------| assets/
------| components/
------| layouts/
------| middleware/
------| pages/
------| plugins/
------| public/
------| store/
------| server/
------| app.config.ts
------| app.vue
------| error.vue

```


Whether to enable rendering of HTML - either dynamically (in server mode) or at generate time. If set to `false` generated pages will have no content.

*   **Type**: `boolean`
*   **Default:** `true`

Manually disable nuxt telemetry.

**See**: [Nuxt Telemetry](https://github.com/nuxt/telemetry) for more information.

Whether your app is being unit tested.

*   **Type**: `boolean`
*   **Default:** `false`

Extend project from a local or remote source.

Value should be a string pointing to source directory or config path relative to current config. You can use `github:`, `gitlab:`, `bitbucket:` or `https://` to extend from a remote git repository.

*   **Type**: `string`

Configuration for Nuxt's TypeScript integration.

### [`builder`](#builder-1)

Which builder types to include for your project.

By default Nuxt infers this based on your `builder` option (defaulting to 'vite') but you can either turn off builder environment types (with `false`) to handle this fully yourself, or opt for a 'shared' option. The 'shared' option is advised for module authors, who will want to support multiple possible builders.

*   **Default:** `null`

### [`hoist`](#hoist)

Modules to generate deep aliases for within `compilerOptions.paths`. This does not yet support subpaths. It may be necessary when using Nuxt within a pnpm monorepo with `shamefully-hoist=false`.

*   **Type**: `array`
*   **Default**

```
[
  "nitropack/types",
  "nitropack/runtime",
  "nitropack",
  "defu",
  "h3",
  "consola",
  "ofetch",
  "@unhead/vue",
  "@nuxt/devtools",
  "vue",
  "@vue/runtime-core",
  "@vue/compiler-sfc",
  "vue-router",
  "vue-router/auto-routes",
  "unplugin-vue-router/client",
  "@nuxt/schema",
  "nuxt"
]

```


### [`includeWorkspace`](#includeworkspace)

Include parent workspace in the Nuxt project. Mostly useful for themes and module authors.

*   **Type**: `boolean`
*   **Default:** `false`

### [`shim`](#shim)

Generate a `*.vue` shim.

We recommend instead letting the [official Vue extension](https://marketplace.visualstudio.com/items?itemName=Vue.volar) generate accurate types for your components. Note that you may wish to set this to `true` if you are using other libraries, such as ESLint, that are unable to understand the type of `.vue` files.

*   **Type**: `boolean`
*   **Default:** `false`

### [`strict`](#strict)

TypeScript comes with certain checks to give you more safety and analysis of your program. Once you’ve converted your codebase to TypeScript, you can start enabling these checks for greater safety. [Read More](https://www.typescriptlang.org/docs/handbook/migrating-from-javascript.html#getting-stricter-checks)

*   **Type**: `boolean`
*   **Default:** `true`

### [`tsConfig`](#tsconfig)

You can extend generated `.nuxt/tsconfig.json` using this option.

### [`typeCheck`](#typecheck)

Enable build-time type checking.

If set to true, this will type check in development. You can restrict this to build-time type checking by setting it to `build`. Requires to install `typescript` and `vue-tsc` as dev dependencies.

*   **Type**: `boolean`
*   **Default:** `false`

**See**: [Nuxt TypeScript docs](https://nuxt.com/docs/guide/concepts/typescript)

An object that allows us to configure the `unhead` nuxt module.

### [`legacy`](#legacy)

Enable the legacy compatibility mode for `unhead` module. This applies the following changes: - Disables Capo.js sorting - Adds the `DeprecationsPlugin`: supports `hid`, `vmid`, `children`, `body` - Adds the `PromisesPlugin`: supports promises as input

*   **Type**: `boolean`
*   **Default:** `false`

**See**: [`unhead` migration documentation](https://unhead-unjs-io.nuxt.dev/docs/migration)

**Example**:

```
export default defineNuxtConfig({
 unhead: {
  legacy: true
})

```


### [`renderSSRHeadOptions`](#renderssrheadoptions)

An object that will be passed to `renderSSRHead` to customize the output.

*   **Type**: `object`
*   **Default**

```
{
  "omitLineBreaks": false
}

```


**Example**:

```
export default defineNuxtConfig({
 unhead: {
  renderSSRHeadOptions: {
   omitLineBreaks: true
  }
})

```


Configuration that will be passed directly to Vite.

**See**: [Vite configuration docs](https://vite.dev/config) for more information. Please note that not all vite options are supported in Nuxt.

### [`build`](#build-1)

#### [`assetsDir`](#assetsdir)

*   **Type**: `string`
*   **Default:** `"_nuxt/"`

#### [`emptyOutDir`](#emptyoutdir)

*   **Type**: `boolean`
*   **Default:** `false`

### [`cacheDir`](#cachedir)

*   **Type**: `string`
*   **Default:** `"/<rootDir>/node_modules/.cache/vite"`

### [`clearScreen`](#clearscreen)

*   **Type**: `boolean`
*   **Default:** `true`

### [`define`](#define)

*   **Type**: `object`
*   **Default**

```
{
  "__VUE_PROD_HYDRATION_MISMATCH_DETAILS__": false,
  "process.dev": false,
  "import.meta.dev": false,
  "process.test": false,
  "import.meta.test": false
}

```


### [`esbuild`](#esbuild-1)

*   **Type**: `object`
*   **Default**

```
{
  "target": "esnext",
  "jsxFactory": "h",
  "jsxFragment": "Fragment",
  "tsconfigRaw": {}
}

```


### [`mode`](#mode)

*   **Type**: `string`
*   **Default:** `"production"`

### [`optimizeDeps`](#optimizedeps)

#### [`esbuildOptions`](#esbuildoptions)

*   **Type**: `object`
*   **Default**

```
{
  "target": "esnext",
  "jsxFactory": "h",
  "jsxFragment": "Fragment",
  "tsconfigRaw": {}
}

```


#### [`exclude`](#exclude-1)

*   **Type**: `array`
*   **Default**

### [`publicDir`](#publicdir)

### [`resolve`](#resolve)

#### [`extensions`](#extensions-1)

*   **Type**: `array`
*   **Default**

```
[
  ".mjs",
  ".js",
  ".ts",
  ".jsx",
  ".tsx",
  ".json",
  ".vue"
]

```


### [`root`](#root)

*   **Type**: `string`
*   **Default:** `"/<srcDir>"`

### [`server`](#server-1)

#### [`fs`](#fs)

##### `allow`

*   **Type**: `array`
*   **Default**

```
[
  "/<rootDir>/.nuxt",
  "/<srcDir>",
  "/<rootDir>",
  "/<workspaceDir>",
  "/<rootDir>/node_modules"
]

```


### [`vue`](#vue)

#### [`features`](#features-1)

##### `propsDestructure`

*   **Type**: `boolean`
*   **Default:** `true`

#### [`isProduction`](#isproduction)

*   **Type**: `boolean`
*   **Default:** `true`

#### [`script`](#script)

##### `hoistStatic`

#### [`template`](#template)

##### `compilerOptions`

*   **Type**: `object`

##### `transformAssetUrls`

*   **Type**: `object`
*   **Default**

```
{
  "video": [
    "src",
    "poster"
  ],
  "source": [
    "src"
  ],
  "img": [
    "src"
  ],
  "image": [
    "xlink:href",
    "href"
  ],
  "use": [
    "xlink:href",
    "href"
  ]
}

```


### [`vueJsx`](#vuejsx)

*   **Type**: `object`
*   **Default**

```
{
  "isCustomElement": {
    "$schema": {
      "title": "",
      "description": "",
      "tags": []
    }
  }
}

```


Vue.js config

### [`compilerOptions`](#compileroptions-1)

Options for the Vue compiler that will be passed at build time.

**See**: [Vue documentation](https://vuejs.org/api/application.html#app-config-compileroptions)

### [`config`](#config)

It is possible to pass configure the Vue app globally. Only serializable options may be set in your `nuxt.config`. All other options should be set at runtime in a Nuxt plugin..

**See**: [Vue app config documentation](https://vuejs.org/api/application.html#app-config)

### [`propsDestructure`](#propsdestructure-1)

Enable reactive destructure for `defineProps`

*   **Type**: `boolean`
*   **Default:** `true`

### [`runtimeCompiler`](#runtimecompiler)

Include Vue compiler in runtime bundle.

*   **Type**: `boolean`
*   **Default:** `false`

### [`transformAssetUrls`](#transformasseturls-1)

#### [`image`](#image)

*   **Type**: `array`
*   **Default**

#### [`img`](#img)

*   **Type**: `array`
*   **Default**

#### [`source`](#source)

*   **Type**: `array`
*   **Default**

#### [`use`](#use)

*   **Type**: `array`
*   **Default**

#### [`video`](#video)

*   **Type**: `array`
*   **Default**

The watch property lets you define patterns that will restart the Nuxt dev server when changed.

It is an array of strings or regular expressions. Strings should be either absolute paths or relative to the `srcDir` (and the `srcDir` of any layers). Regular expressions will be matched against the path relative to the project `srcDir` (and the `srcDir` of any layers).

*   **Type**: `array`

The watchers property lets you overwrite watchers configuration in your `nuxt.config`.

### [`chokidar`](#chokidar)

Options to pass directly to `chokidar`.

**See**: [chokidar](https://github.com/paulmillr/chokidar#api)

#### [`ignoreInitial`](#ignoreinitial)

*   **Type**: `boolean`
*   **Default:** `true`

#### [`ignorePermissionErrors`](#ignorepermissionerrors)

*   **Type**: `boolean`
*   **Default:** `true`

### [`rewatchOnRawEvents`](#rewatchonrawevents)

An array of event types, which, when received, will cause the watcher to restart.

### [`webpack`](#webpack)

`watchOptions` to pass directly to webpack.

**See**: [webpack@4 watch options](https://v4.webpack.js.org/configuration/watch/#watchoptions).

#### [`aggregateTimeout`](#aggregatetimeout)

*   **Type**: `number`
*   **Default:** `1000`

### [`aggressiveCodeRemoval`](#aggressivecoderemoval)

Hard-replaces `typeof process`, `typeof window` and `typeof document` to tree-shake bundle.

*   **Type**: `boolean`
*   **Default:** `false`

### [`analyze`](#analyze-1)

Nuxt uses `webpack-bundle-analyzer` to visualize your bundles and how to optimize them.

Set to `true` to enable bundle analysis, or pass an object with options: [for webpack](https://github.com/webpack-contrib/webpack-bundle-analyzer#options-for-plugin) or [for vite](https://github.com/btd/rollup-plugin-visualizer#options).

*   **Type**: `object`
*   **Default**

```
{
  "template": "treemap",
  "projectRoot": "/<rootDir>",
  "filename": "/<rootDir>/.nuxt/analyze/{name}.html"
}

```


**Example**:

```
analyze: {
  analyzerMode: 'static'
}

```


### [`cssSourceMap`](#csssourcemap)

Enables CSS source map support (defaults to `true` in development).

*   **Type**: `boolean`
*   **Default:** `false`

### [`devMiddleware`](#devmiddleware)

See [webpack-dev-middleware](https://github.com/webpack/webpack-dev-middleware) for available options.

#### [`stats`](#stats)

*   **Type**: `string`
*   **Default:** `"none"`

### [`experiments`](#experiments)

Configure [webpack experiments](https://webpack.js.org/configuration/experiments/)

### [`extractCSS`](#extractcss)

Enables Common CSS Extraction.

Using [mini-css-extract-plugin](https://github.com/webpack-contrib/mini-css-extract-plugin) under the hood, your CSS will be extracted into separate files, usually one per component. This allows caching your CSS and JavaScript separately.

*   **Type**: `boolean`
*   **Default:** `true`

**Example**:

```
export default {
  webpack: {
    extractCSS: true,
    // or
    extractCSS: {
      ignoreOrder: true
    }
  }
}

```


**Example**:

```
export default {
  webpack: {
    extractCSS: true,
    optimization: {
      splitChunks: {
        cacheGroups: {
          styles: {
            name: 'styles',
            test: /\.(css|vue)$/,
            chunks: 'all',
            enforce: true
          }
        }
      }
    }
  }
}

```


### [`filenames`](#filenames)

Customize bundle filenames.

To understand a bit more about the use of manifests, take a look at [webpack documentation](https://webpack.js.org/guides/code-splitting/).

**Note**: Be careful when using non-hashed based filenames in production as most browsers will cache the asset and not detect the changes on first load.

**Example**:

```
filenames: {
  chunk: ({ isDev }) => (isDev ? '[name].js' : '[id].[contenthash].js')
}

```


#### [`app`](#app-2)

*   **Type**: `function`

#### [`chunk`](#chunk)

*   **Type**: `function`

#### [`css`](#css-1)

*   **Type**: `function`

#### [`font`](#font)

*   **Type**: `function`

#### [`img`](#img-1)

*   **Type**: `function`

#### [`video`](#video-1)

*   **Type**: `function`

### [`friendlyErrors`](#friendlyerrors)

Set to `false` to disable the overlay provided by [FriendlyErrorsWebpackPlugin](https://github.com/nuxt/friendly-errors-webpack-plugin).

*   **Type**: `boolean`
*   **Default:** `true`

### [`hotMiddleware`](#hotmiddleware)

See [webpack-hot-middleware](https://github.com/webpack-contrib/webpack-hot-middleware) for available options.

### [`loaders`](#loaders)

Customize the options of Nuxt's integrated webpack loaders.

#### [`css`](#css-2)

See [css-loader](https://github.com/webpack-contrib/css-loader) for available options.

##### `esModule`

*   **Type**: `boolean`
*   **Default:** `false`

##### `importLoaders`

*   **Type**: `number`
*   **Default:** `0`

##### `url`

###### `filter`

*   **Type**: `function`

#### [`cssModules`](#cssmodules)

See [css-loader](https://github.com/webpack-contrib/css-loader) for available options.

##### `esModule`

*   **Type**: `boolean`
*   **Default:** `false`

##### `importLoaders`

*   **Type**: `number`
*   **Default:** `0`

##### `modules`

###### `localIdentName`

*   **Type**: `string`
*   **Default:** `"[local]_[hash:base64:5]"`

##### `url`

###### `filter`

*   **Type**: `function`

#### [`esbuild`](#esbuild-2)

*   **Type**: `object`
*   **Default**

```
{
  "target": "esnext",
  "jsxFactory": "h",
  "jsxFragment": "Fragment",
  "tsconfigRaw": {}
}

```


**See**: [esbuild loader](https://github.com/esbuild-kit/esbuild-loader)

#### [`file`](#file)

**See**: [`file-loader` Options](https://github.com/webpack-contrib/file-loader#options)

**Default**:

##### `esModule`

*   **Type**: `boolean`
*   **Default:** `false`

##### `limit`

*   **Type**: `number`
*   **Default:** `1000`

#### [`fontUrl`](#fonturl)

**See**: [`file-loader` Options](https://github.com/webpack-contrib/file-loader#options)

**Default**:

##### `esModule`

*   **Type**: `boolean`
*   **Default:** `false`

##### `limit`

*   **Type**: `number`
*   **Default:** `1000`

#### [`imgUrl`](#imgurl)

**See**: [`file-loader` Options](https://github.com/webpack-contrib/file-loader#options)

**Default**:

##### `esModule`

*   **Type**: `boolean`
*   **Default:** `false`

##### `limit`

*   **Type**: `number`
*   **Default:** `1000`

#### [`less`](#less)

*   **Default**

**See**: [`less-loader` Options](https://github.com/webpack-contrib/less-loader#options)

#### [`pugPlain`](#pugplain)

**See**: [`pug` options](https://pugjs.org/api/reference.html#options)

#### [`sass`](#sass)

**See**: [`sass-loader` Options](https://github.com/webpack-contrib/sass-loader#options)

**Default**:

```
{
  sassOptions: {
    indentedSyntax: true
  }
}

```


##### `sassOptions`

###### `indentedSyntax`

*   **Type**: `boolean`
*   **Default:** `true`

#### [`scss`](#scss)

*   **Default**

**See**: [`sass-loader` Options](https://github.com/webpack-contrib/sass-loader#options)

#### [`stylus`](#stylus)

*   **Default**

**See**: [`stylus-loader` Options](https://github.com/webpack-contrib/stylus-loader#options)

#### [`vue`](#vue-2)

See [vue-loader](https://github.com/vuejs/vue-loader) for available options.

##### `compilerOptions`

*   **Type**: `object`

##### `propsDestructure`

*   **Type**: `boolean`
*   **Default:** `true`

##### `transformAssetUrls`

*   **Type**: `object`
*   **Default**

```
{
  "video": [
    "src",
    "poster"
  ],
  "source": [
    "src"
  ],
  "img": [
    "src"
  ],
  "image": [
    "xlink:href",
    "href"
  ],
  "use": [
    "xlink:href",
    "href"
  ]
}

```


#### [`vueStyle`](#vuestyle)

*   **Default**

### [`optimization`](#optimization-1)

Configure [webpack optimization](https://webpack.js.org/configuration/optimization/).

#### [`minimize`](#minimize)

Set minimize to `false` to disable all minimizers. (It is disabled in development by default).

*   **Type**: `boolean`
*   **Default:** `true`

#### [`minimizer`](#minimizer)

You can set minimizer to a customized array of plugins.

#### [`runtimeChunk`](#runtimechunk)

*   **Type**: `string`
*   **Default:** `"single"`

#### [`splitChunks`](#splitchunks)

##### `automaticNameDelimiter`

*   **Type**: `string`
*   **Default:** `"/"`

##### `cacheGroups`

##### `chunks`

*   **Type**: `string`
*   **Default:** `"all"`

### [`optimizeCSS`](#optimizecss)

OptimizeCSSAssets plugin options.

Defaults to true when `extractCSS` is enabled.

*   **Type**: `boolean`
*   **Default:** `false`

**See**: [css-minimizer-webpack-plugin documentation](https://github.com/webpack-contrib/css-minimizer-webpack-plugin).

### [`plugins`](#plugins-3)

Add webpack plugins.

*   **Type**: `array`

**Example**:

```
import webpack from 'webpack'
import { version } from './package.json'
// ...
plugins: [
  new webpack.DefinePlugin({
    'process.VERSION': version
  })
]

```


### [`postcss`](#postcss-1)

Customize PostCSS Loader. same options as [`postcss-loader` options](https://github.com/webpack-contrib/postcss-loader#options)

#### [`postcssOptions`](#postcssoptions)

##### `plugins`

*   **Type**: `object`
*   **Default**

```
{
  "autoprefixer": {},
  "cssnano": {}
}

```


### [`profile`](#profile)

Enable the profiler in webpackbar.

It is normally enabled by CLI argument `--profile`.

*   **Type**: `boolean`
*   **Default:** `false`

**See**: [webpackbar](https://github.com/unjs/webpackbar#profile).

### [`serverURLPolyfill`](#serverurlpolyfill)

The polyfill library to load to provide URL and URLSearchParams.

Defaults to `'url'` ([see package](https://www.npmjs.com/package/url)).

*   **Type**: `string`
*   **Default:** `"url"`

### [`warningIgnoreFilters`](#warningignorefilters)

Filters to hide build warnings.

*   **Type**: `array`

Define the workspace directory of your application.

Often this is used when in a monorepo setup. Nuxt will attempt to detect your workspace directory automatically, but you can override it here. It is normally not needed to configure this option.

*   **Type**: `string`
*   **Default:** `"/<workspaceDir>"`