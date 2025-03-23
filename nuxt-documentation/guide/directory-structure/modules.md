# modules/ · Nuxt Directory Structure

Use the modules/ directory to automatically register local modules within your application.

It is a good place to place any local modules you develop while building your application.

The auto-registered files patterns are:

- `modules/*/index.ts`
- `modules/*.ts`

You don't need to add those local modules to your [`nuxt.config.ts`](https://nuxt.com/docs/guide/directory-structure/nuxt-config) separately.

```
// `nuxt/kit` is a helper subpath import you can use when defining local modules
// that means you do not need to add `@nuxt/kit` to your project's dependencies
import {
createResolver,
defineNuxtModule,
addServerHandler } from 'nuxt/kit'

export default
defineNuxtModule({

meta: {

name: 'hello'
  },

setup () {
    const {
resolve } =
createResolver(import.meta.
url)

    // Add an API route

addServerHandler({

route: '/api/hello',

handler:
resolve('./runtime/api-route')
    })
  }
})

```

When starting Nuxt, the `hello` module will be registered and the `/api/hello` route will be available.

Modules are executed in the following sequence:

- First, the modules defined in [`nuxt.config.ts`](about:/docs/api/nuxt-config#modules-1) are loaded.
- Then, modules found in the `modules/` directory are executed, and they load in alphabetical order.

You can change the order of local module by adding a number to the front of each directory name:

Directory structure

```
modules/
  1.first-module/
    index.ts
  2.second-module.ts

```

Read more in Docs > Guide > Going Further > Modules.

Watch Vue School video about Nuxt private modules.

---
