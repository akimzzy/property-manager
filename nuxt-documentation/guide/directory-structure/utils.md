# utils/ · Nuxt Directory Structure

[Nuxt UI Pro v3 is out! Get 20% OFF until Friday](https://ui.nuxt.com/pro/pricing)

Use the utils/ directory to auto-import your utility functions throughout your application.

The main purpose of the [`utils/` directory](https://nuxt.com/docs/guide/directory-structure/utils) is to allow a semantic distinction between your Vue composables and other auto-imported utility functions.

**Method 1:** Using named export

utils/index.ts

```
export const {
format:
formatNumber } =
Intl.
NumberFormat('en-GB', {

notation: 'compact',

maximumFractionDigits: 1
})

```

**Method 2:** Using default export

utils/random-entry.ts or utils/randomEntry.ts

```
// It will be available as randomEntry() (camelCase of file name without extension)
export default function (
arr:
Array<any>) {
  return
arr[
Math.
floor(
Math.
random() *
arr.
length)]
}

```

You can now use auto imported utility functions in `.js`, `.ts` and `.vue` files

app.vue

```
<template>
  <p>{{ formatNumber(1234) }}</p>
</template>

```

Read more in Docs > Guide > Concepts > Auto Imports.

The way `utils/` auto-imports work and are scanned is identical to the

[`composables/`](https://nuxt.com/docs/guide/directory-structure/composables)

directory.

These utils are only available within the Vue part of your app.  
Only `server/utils` are auto-imported in the

[`server/`](about:/docs/guide/directory-structure/server#server-utilities)

directory.

---
