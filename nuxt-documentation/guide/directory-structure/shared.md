# shared/ · Nuxt Directory Structure

Use the shared/ directory to share functionality between the Vue app and the Nitro server.

The `shared/` directory allows you to share code that can be used in both the Vue app and the Nitro server.

The `shared/` directory is available in Nuxt v3.14+.

Code in the `shared/` directory cannot import any Vue or Nitro code.

Auto-imports are not enabled by default in Nuxt v3 to prevent breaking changes in existing projects.To use these auto-imported utils and types, you must first

[set `future.compatibilityVersion: 4` in your `nuxt.config.ts`](about:/docs/getting-started/upgrade#opting-in-to-nuxt-4)

.

**Method 1:** Named export

shared/utils/capitalize.ts

```
export const
capitalize = (
input: string) => {
  return
input[0] ?
input[0].
toUpperCase() +
input.
slice(1) : ''
}

```

**Method 2:** Default export

shared/utils/capitalize.ts

```
export default function (
input: string) {
  return
input[0] ?
input[0].
toUpperCase() +
input.
slice(1) : ''
}

```

You can now use [auto-imported](about:/docs/guide/directory-structure/shared#auto-imports) utilities in your Nuxt app and `server/` directory.

app.vue

```
<script setup lang="ts">
const hello = capitalize('hello')
</script>

<template>
  <div>
    {{ hello }}
  </div>
</template>

```

server/api/hello.get.ts

```
export default defineEventHandler((event) => {
  return {
    hello: capitalize('hello')
  }
})

```

Only files in the `shared/utils/` and `shared/types/` directories will be auto-imported. Files nested within subdirectories of these directories will not be auto-imported unless you add these directories to `imports.dirs` and `nitro.imports.dirs`.

The way `shared/utils` and `shared/types` auto-imports work and are scanned is identical to the

[`composables/`](https://nuxt.com/docs/guide/directory-structure/composables)

and

[`utils/`](https://nuxt.com/docs/guide/directory-structure/utils)

directories.

Read more in Docs > Guide > Directory Structure > Composables#how Files Are Scanned.

Directory Structure

```
-| shared/
---| capitalize.ts        # Not auto-imported
---| formatters
-----| lower.ts           # Not auto-imported
---| utils/
-----| lower.ts           # Auto-imported
-----| formatters
-------| upper.ts         # Not auto-imported
---| types/
-----| bar.d.ts           # Auto-imported

```

Any other files you create in the `shared/` folder must be manually imported using the `#shared` alias (automatically configured by Nuxt):

```
// For files directly in the shared directory
import capitalize from '#shared/capitalize'

// For files in nested directories
import lower from '#shared/formatters/lower'

// For files nested in a folder within utils
import upper from '#shared/utils/formatters/upper'

```

This alias ensures consistent imports across your application, regardless of the importing file's location.

Read more in Docs > Guide > Concepts > Auto Imports.

---
