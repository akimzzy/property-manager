# Using Vite Plugins in Nuxt · Recipes
[Nuxt UI Pro v3 is out! Get 20% OFF until Friday](https://ui.nuxt.com/pro/pricing)

Learn how to integrate Vite plugins into your Nuxt project.

While Nuxt modules offer extensive functionality, sometimes a specific Vite plugin might meet your needs more directly.

First, we need to install the Vite plugin, for our example, we'll use `@rollup/plugin-yaml`:

```
npm install @rollup/plugin-yaml

```


Next, we need to import and add it to our [`nuxt.config.ts`](https://nuxt.com/docs/guide/directory-structure/nuxt-config) file:

nuxt.config.ts

```
import yaml from '@rollup/plugin-yaml'

export default defineNuxtConfig({
  vite: {
    plugins: [
      yaml()
    ]
  }
})

```


Now we installed and configured our Vite plugin, we can start using YAML files directly in our project.

For example, we can have a `config.yaml` that stores configuration data and import this data in our Nuxt components:

```
greeting: "Hello, Nuxt with Vite!"

```


* * *