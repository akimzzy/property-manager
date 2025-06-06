# tsconfig.json · Nuxt Directory Structure

Nuxt [automatically generates](https://nuxt.com/docs/guide/concepts/typescript) a `.nuxt/tsconfig.json` file with the resolved aliases you are using in your Nuxt project, as well as with other sensible defaults.

You can benefit from this by creating a `tsconfig.json` in the root of your project with the following content:

tsconfig.json

```
{
  "extends": "./.nuxt/tsconfig.json"
}

```

As you need to, you can customize the contents of this file. However, it is recommended that you don't overwrite `target`, `module` and `moduleResolution`.

If you need to customize your `paths`, this will override the auto-generated path aliases. Instead, we recommend that you add any path aliases you need to the

[`alias`](about:/docs/api/nuxt-config#alias)

property within your `nuxt.config`, where they will get picked up and added to the auto-generated `tsconfig`.

---
