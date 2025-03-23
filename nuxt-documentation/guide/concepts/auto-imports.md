# Auto-imports · Nuxt Concepts

Nuxt auto-imports components, composables and [Vue.js APIs](https://vuejs.org/api) to use across your application without explicitly importing them.

app.vue

```
<script setup lang="ts">
const
count =
ref(1) // ref is auto-imported
</script>

```

Thanks to its opinionated directory structure, Nuxt can auto-import your [`components/`](https://nuxt.com/docs/guide/directory-structure/components), [`composables/`](https://nuxt.com/docs/guide/directory-structure/composables) and [`utils/`](https://nuxt.com/docs/guide/directory-structure/utils).

Contrary to a classic global declaration, Nuxt preserves typings, IDEs completions and hints, and **only includes what is used in your production code**.

In the docs, every function that is not explicitly imported is auto-imported by Nuxt and can be used as-is in your code. You can find a reference for auto-imported components, composables and utilities in the

[API section](https://nuxt.com/docs/api)

.

In the

[`server`](https://nuxt.com/docs/guide/directory-structure/server)

directory, Nuxt auto-imports exported functions and variables from `server/utils/`.

You can also auto-import functions exported from custom folders or third-party packages by configuring the

[`imports`](about:/docs/api/nuxt-config#imports)

section of your `nuxt.config` file.

Nuxt auto-imports functions and composables to perform [data fetching](https://nuxt.com/docs/getting-started/data-fetching), get access to the [app context](https://nuxt.com/docs/api/composables/use-nuxt-app) and [runtime config](https://nuxt.com/docs/guide/going-further/runtime-config), manage [state](https://nuxt.com/docs/getting-started/state-management) or define components and plugins.

```
<script setup lang="ts">
/* useFetch() is auto-imported */
const {
data,
refresh,
status } = await
useFetch('/api/hello')
</script>

```

Vue 3 exposes Reactivity APIs like `ref` or `computed`, as well as lifecycle hooks and helpers that are auto-imported by Nuxt.

```
<script setup lang="ts">
/* ref() and computed() are auto-imported */
const
count =
ref(1)
const
double =
computed(() =>
count.
value * 2)
</script>

```

### [Vue and Nuxt Composables](#vue-and-nuxt-composables)

When you are using the built-in Composition API composables provided by Vue and Nuxt, be aware that many of them rely on being called in the right _context_.

During a component lifecycle, Vue tracks the temporary instance of the current component (and similarly, Nuxt tracks a temporary instance of `nuxtApp`) via a global variable, and then unsets it in same tick. This is essential when server rendering, both to avoid cross-request state pollution (leaking a shared reference between two users) and to avoid leakage between different components.

That means that (with very few exceptions) you cannot use them outside a Nuxt plugin, Nuxt route middleware or Vue setup function. On top of that, you must use them synchronously - that is, you cannot use `await` before calling a composable, except within `<script setup>` blocks, within the setup function of a component declared with `defineNuxtComponent`, in `defineNuxtPlugin` or in `defineNuxtRouteMiddleware`, where we perform a transform to keep the synchronous context even after the `await`.

If you get an error message like `Nuxt instance is unavailable` then it probably means you are calling a Nuxt composable in the wrong place in the Vue or Nuxt lifecycle.

Watch a video from Alexander Lichter about handling async code in composables and fixing `Nuxt instance is unavailable` in your app.

When using a composable that requires the Nuxt context inside a non-SFC component, you need to wrap your component with `defineNuxtComponent` instead of `defineComponent`

Checkout the `asyncContext` experimental feature to use Nuxt composables in async functions.

See the full explanation in this GitHub comment.

**Example of breaking code:**

composables/example.ts

```
// trying to access runtime config outside a composable
const
config =
useRuntimeConfig()

export const
useMyComposable = () => {
  // accessing runtime config here
}

```

**Example of working code:**

composables/example.ts

```
export const
useMyComposable = () => {
  // Because your composable is called in the right place in the lifecycle,
  // useRuntimeConfig will work here
  const
config =
useRuntimeConfig()

  // ...
}

```

Nuxt directly auto-imports files created in defined directories:

- `components/` for [Vue components](https://nuxt.com/docs/guide/directory-structure/components).
- `composables/` for [Vue composables](https://nuxt.com/docs/guide/directory-structure/composables).
- `utils/` for helper functions and other utilities.

**Auto-imported `ref` and `computed` won't be unwrapped in a component `<template>`.**  
This is due to how Vue works with refs that aren't top-level to the template. You can read more about it

[in the Vue documentation](https://vuejs.org/guide/essentials/reactivity-fundamentals.html#caveat-when-unwrapping-in-templates)

.

### [Explicit Imports](#explicit-imports)

Nuxt exposes every auto-import with the `#imports` alias that can be used to make the import explicit if needed:

```
<script setup lang="ts">
import { ref, computed } from '#imports'

const count = ref(1)
const double = computed(() => count.value * 2)
</script>

```

### [Disabling Auto-imports](#disabling-auto-imports)

If you want to disable auto-importing composables and utilities, you can set `imports.autoImport` to `false` in the `nuxt.config` file.

nuxt.config.ts

```
export default
defineNuxtConfig({

imports: {

autoImport: false
  }
})

```

This will disable auto-imports completely but it's still possible to use [explicit imports](#explicit-imports) from `#imports`.

### [Partially Disabling Auto-imports](#partially-disabling-auto-imports)

If you want framework-specific functions like `ref` to remain auto-imported but wish to disable auto-imports for your own code (e.g., custom composables), you can set the `imports.scan` option to `false` in your `nuxt.config.ts` file:

```
export default defineNuxtConfig({
  imports: {
    scan: false
  }
})

```

With this configuration:

- Framework functions like `ref`, `computed`, or `watch` will still work without needing manual imports.
- Custom code, such as composables, will need to be manually imported in your files.

**Caution:** This setup has certain limitations:

- If you structure your project with layers, you will need to explicitly import the composables from each layer, rather than relying on auto-imports.
- This breaks the layer system’s override feature. If you use `imports.scan: false`, ensure you understand this side-effect and adjust your architecture accordingly.

Nuxt also automatically imports components from your `~/components` directory, although this is configured separately from auto-importing composables and utility functions.

Read more in Docs > Guide > Directory Structure > Components.

To disable auto-importing components from your own `~/components` directory, you can set `components.dirs` to an empty array (though note that this will not affect components added by modules).

nuxt.config.ts

```
export default
defineNuxtConfig({

components: {

dirs: []
  }
})

```

Nuxt also allows auto-importing from third-party packages.

If you are using the Nuxt module for that package, it is likely that the module has already configured auto-imports for that package.

For example, you could enable the auto-import of the `useI18n` composable from the `vue-i18n` package like this:

nuxt.config.ts

```
export default
defineNuxtConfig({

imports: {

presets: [
      {

from: 'vue-i18n',

imports: ['useI18n']
      }
    ]
  }
})

```

Watch a video from Alexander Lichter on how to easily set up custom auto imports.
