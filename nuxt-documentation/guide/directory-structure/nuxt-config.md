# nuxt.config.ts · Nuxt Directory Structure
[Nuxt UI Pro v3 is out! Get 20% OFF until Friday](https://ui.nuxt.com/pro/pricing)

Nuxt can be easily configured with a single nuxt.config file.

The `nuxt.config` file extension can either be `.js`, `.ts` or `.mjs`.

nuxt.config.ts

```
export default 
defineNuxtConfig({
  // My Nuxt config
})

```


`defineNuxtConfig` helper is globally available without import.

You can explicitly import `defineNuxtConfig` from `nuxt/config` if you prefer:

nuxt.config.ts

```
import { 
defineNuxtConfig } from 'nuxt/config'

export default 
defineNuxtConfig({
  // My Nuxt config
})

```


Discover all the available options in the **Nuxt configuration** documentation.

To ensure your configuration is up to date, Nuxt will make a full restart when detecting changes in the main configuration file, the [`.env`](https://nuxt.com/docs/guide/directory-structure/env), [`.nuxtignore`](https://nuxt.com/docs/guide/directory-structure/nuxtignore) and [`.nuxtrc`](https://nuxt.com/docs/guide/directory-structure/nuxtrc) dotfiles.

* * *