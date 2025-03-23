# <NuxtClientFallback> · Nuxt Components
Nuxt provides the <NuxtClientFallback> component to render its content on the client if any of its children trigger an error in SSR

Nuxt provides the `<NuxtClientFallback>` component to render its content on the client if any of its children trigger an error in SSR.

This component is experimental and in order to use it you must enable the `experimental.clientFallback` option in your `nuxt.config`.

pages/example.vue

```
<template>
  <div>
    <Sidebar />
    <!-- this component will be rendered on client-side -->
    <NuxtClientFallback fallback-tag="span">
      <Comments />
      <BrokeInSSR />
    </NuxtClientFallback>
  </div>
</template>

```


*   `@ssr-error`: Event emitted when a child triggers an error in SSR. Note that this will only be triggered on the server.
    
    ```
<template>
  <NuxtClientFallback @ssr-error="logSomeError">
    <!-- ... -->
  </NuxtClientFallback>
</template>

```

    

*   `placeholderTag` | `fallbackTag`: Specify a fallback tag to be rendered if the slot fails to render on the server.
    *   **type**: `string`
    *   **default**: `div`
*   `placeholder` | `fallback`: Specify fallback content to be rendered if the slot fails to render.
    *   **type**: `string`
*   `keepFallback`: Keep the fallback content if it failed to render server-side.
    *   **type**: `boolean`
    *   **default**: `false`

```
  <template>
    <!-- render <span>Hello world</span> server-side if the default slot fails to render -->
    <NuxtClientFallback fallback-tag="span" fallback="Hello world">
      <BrokeInSsr />
    </NuxtClientFallback>
  </template>

```


*   `#fallback`: specify content to be displayed server-side if the slot fails to render.

```
<template>
  <NuxtClientFallback>
    <!-- ... -->
    <template #fallback>
      <!-- this will be rendered on server side if the default slot fails to render in ssr -->
      <p>Hello world</p>
    </template>
  </NuxtClientFallback>
</template>

```


* * *