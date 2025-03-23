# Lifecycle Hooks · Nuxt Advanced

Nuxt provides a powerful hooking system to expand almost every aspect using hooks.

The hooking system is powered by

[unjs/hookable](https://github.com/unjs/hookable)

.

These hooks are available for [Nuxt Modules](https://nuxt.com/docs/guide/going-further/modules) and build context.

### [Within `nuxt.config.ts`](#within-nuxtconfigts)

nuxt.config.ts

```
export default defineNuxtConfig({
  hooks: {
    close: () => { }
  }
})

```

### [Within Nuxt Modules](#within-nuxt-modules)

```
import { defineNuxtModule } from '@nuxt/kit'

export default defineNuxtModule({
  setup (options, nuxt) {
    nuxt.hook('close', async () => { })
  }
})

```

Explore all available Nuxt hooks.

App hooks can be mainly used by [Nuxt Plugins](https://nuxt.com/docs/guide/directory-structure/plugins) to hook into rendering lifecycle but could also be used in Vue composables.

plugins/test.ts

```
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('page:start', () => {
    /* your code goes here */
  })
})

```

Explore all available App hooks.

These hooks are available for [server plugins](about:/docs/guide/directory-structure/server#server-plugins) to hook into Nitro's runtime behavior.

~/server/plugins/test.ts

```
export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('render:html', (html, { event }) => {
    console.log('render:html', html)
    html.bodyAppend.push('<hr>Appended by custom plugin')
  })

  nitroApp.hooks.hook('render:response', (response, { event }) => {
    console.log('render:response', response)
  })
})

```

Learn more about available Nitro lifecycle hooks.

You can add additional hooks by augmenting the types provided by Nuxt. This can be useful for modules.

```
import { HookResult } from "@nuxt/schema";

declare module '#app' {
  interface RuntimeNuxtHooks {
    'your-nuxt-runtime-hook': () => HookResult
  }
  interface NuxtHooks {
    'your-nuxt-hook': () => HookResult
  }
}

declare module 'nitropack' {
  interface NitroRuntimeHooks {
    'your-nitro-hook': () => void;
  }
}

```

---
