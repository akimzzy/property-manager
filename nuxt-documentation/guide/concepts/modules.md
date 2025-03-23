# Modules · Nuxt Concepts

When developing production-grade applications with Nuxt you might find that the framework's core functionality is not enough. Nuxt can be extended with configuration options and plugins, but maintaining these customizations across multiple projects can be tedious, repetitive and time-consuming. On the other hand, supporting every project's needs out of the box would make Nuxt very complex and hard to use.

This is one of the reasons why Nuxt provides a module system that makes it possible to extend the core. Nuxt modules are async functions that sequentially run when starting Nuxt in development mode using [`nuxi dev`](https://nuxt.com/docs/api/commands/dev) or building a project for production with [`nuxi build`](https://nuxt.com/docs/api/commands/build). They can override templates, configure webpack loaders, add CSS libraries, and perform many other useful tasks.

Best of all, Nuxt modules can be distributed in npm packages. This makes it possible for them to be reused across projects and shared with the community, helping create an ecosystem of high-quality add-ons.

Once you have installed the modules you can add them to your [`nuxt.config.ts`](https://nuxt.com/docs/guide/directory-structure/nuxt-config) file under the `modules` property. Module developers usually provide additional steps and details for usage.

nuxt.config.ts

```
export default
defineNuxtConfig({

modules: [
    // Using package name (recommended usage)
    '@nuxtjs/example',

    // Load a local module
    './modules/example',

    // Add module with inline-options
    ['./modules/example', {
token: '123' }],

    // Inline module definition
    async (
inlineOptions,
nuxt) => { }
  ]
})

```

Nuxt modules are now build-time-only, and the `buildModules` property used in Nuxt 2 is deprecated in favor of `modules`.

Everyone has the opportunity to develop modules and we cannot wait to see what you will build.

Read more in Module Author Guide.

---
