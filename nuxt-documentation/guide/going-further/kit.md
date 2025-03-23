# Nuxt Kit · Nuxt Advanced

@nuxt/kit provides features for module authors.

Nuxt Kit provides composable utilities to make interacting with [Nuxt Hooks](https://nuxt.com/docs/api/advanced/hooks), the [Nuxt Interface](about:/docs/guide/going-further/internals#the-nuxt-interface) and developing [Nuxt Modules](https://nuxt.com/docs/guide/going-further/modules) super easy.

Discover all Nuxt Kit utilities.

### [Install Dependency](#install-dependency)

You can install the latest Nuxt Kit by adding it to the `dependencies` section of your `package.json`. However, please consider always explicitly installing the `@nuxt/kit` package even if it is already installed by Nuxt.

`@nuxt/kit` and `@nuxt/schema` are key dependencies for Nuxt. If you are installing it separately, make sure that the versions of `@nuxt/kit` and `@nuxt/schema` are equal to or greater than your `nuxt` version to avoid any unexpected behavior.

package.json

```
{
  "dependencies": {
    "@nuxt/kit": "npm:@nuxt/kit-nightly@latest"
  }
}

```

### [Import Kit Utilities](#import-kit-utilities)

test.mjs

```
import { useNuxt } from '@nuxt/kit'

```

Read more in Docs > API > Kit.

Nuxt Kit utilities are only available for modules and not meant to be imported in runtime (components, Vue composables, pages, plugins, or server routes).

Nuxt Kit is an [esm-only package](https://nuxt.com/docs/guide/concepts/esm) meaning that you **cannot** `require('@nuxt/kit')`. As a workaround, use dynamic import in the CommonJS context:

test.cjs

```
// This does NOT work!
// const kit = require('@nuxt/kit')
async function main() {
  const kit = await import('@nuxt/kit')
}
main()

```

---
