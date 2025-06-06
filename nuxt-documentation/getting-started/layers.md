# Layers · Get Started with Nuxt
Nuxt provides a powerful system that allows you to extend the default files, configs, and much more.

One of the core features of Nuxt is the layers and extending support. You can extend a default Nuxt application to reuse components, utils, and configuration. The layers structure is almost identical to a standard Nuxt application which makes them easy to author and maintain.

*   Share reusable configuration presets across projects using `nuxt.config` and `app.config`
*   Create a component library using [`components/`](https://nuxt.com/docs/guide/directory-structure/components) directory
*   Create utility and composable library using [`composables/`](https://nuxt.com/docs/guide/directory-structure/composables) and [`utils/`](https://nuxt.com/docs/guide/directory-structure/utils) directories
*   Create Nuxt module presets
*   Share standard setup across projects
*   Create Nuxt themes
*   Enhance code organization by implementing a modular architecture and support Domain-Driven Design (DDD) pattern in large scale projects.

By default, any layers within your project in the `~~/layers` directory will be automatically registered as layers in your project.

Layer auto-registration was introduced in Nuxt v3.12.0.

In addition, named layer aliases to the `srcDir` of each of these layers will automatically be created. For example, you will be able to access the `~~/layers/test` layer via `#layers/test`.

Named layer aliases were introduced in Nuxt v3.16.0.

In addition, you can extend from a layer by adding the [extends](about:/docs/api/nuxt-config#extends) property to your [`nuxt.config`](https://nuxt.com/docs/guide/directory-structure/nuxt-config) file.

nuxt.config.ts

```
export default defineNuxtConfig({
  extends: [
    '../base',                     // Extend from a local layer
    '@my-themes/awesome',          // Extend from an installed npm package
    'github:my-themes/awesome#v1', // Extend from a git repository
  ]
})

```


You can also pass an authentication token if you are extending from a private GitHub repository:

nuxt.config.ts

```
export default defineNuxtConfig({
  extends: [
    // per layer configuration
    ['github:my-themes/private-awesome', { auth: process.env.GITHUB_TOKEN }]
  ]
})

```


You can override a layer's alias by specifying it in the options next to the layer source.

nuxt.config.ts

```
export default defineNuxtConfig({
  extends: [
    [
      'github:my-themes/awesome',
      { 
        meta: {
          name: 'my-awesome-theme',
        },
      },
    ],
  ]
})

```


Nuxt uses [unjs/c12](https://c12.unjs.io/) and [unjs/giget](https://giget.unjs.io/) for extending remote layers. Check the documentation for more information and all available options.

Read more about layers in the **Layer Author Guide**.

Watch a video from Learn Vue about Nuxt Layers.

Watch a video from Alexander Lichter about Nuxt Layers.

* * *