# TypeScript · Nuxt Concepts
By default, Nuxt doesn't check types when you run [`nuxi dev`](https://nuxt.com/docs/api/commands/dev) or [`nuxi build`](https://nuxt.com/docs/api/commands/build), for performance reasons.

To enable type-checking at build or development time, install `vue-tsc` and `typescript` as development dependency:

```
npm install --save-dev vue-tsc typescript

```


Then, run [`nuxi typecheck`](https://nuxt.com/docs/api/commands/typecheck) command to check your types:

Terminal

```
npx nuxi typecheck

```


To enable type-checking at build or development time, you can also use the [`typescript.typeCheck`](about:/docs/api/nuxt-config#typecheck) option in your `nuxt.config` file:

nuxt.config.ts

```
export default 
defineNuxtConfig({
  
typescript: {
    
typeCheck: true
  }
})

```


When you run `nuxi dev` or `nuxi build`, Nuxt generates the following files for IDE type support (and type checking):

### [`.nuxt/nuxt.d.ts`](#nuxtnuxtdts)

This file contains the types of any modules you are using, as well as the key types that Nuxt requires. Your IDE should recognize these types automatically.

Some of the references in the file are to files that are only generated within your `buildDir` (`.nuxt`) and therefore for full typings, you will need to run `nuxi dev` or `nuxi build`.

### [`.nuxt/tsconfig.json`](#nuxttsconfigjson)

This file contains the recommended basic TypeScript configuration for your project, including resolved aliases injected by Nuxt or modules you are using, so you can get full type support and path auto-complete for aliases like `~/file` or `#build/file`.

[Read more about how to extend this configuration](https://nuxt.com/docs/guide/directory-structure/tsconfig).

Watch a video from Daniel Roe explaining built-in Nuxt aliases.

Nitro also

[auto-generates types](about:/docs/guide/concepts/server-engine#typed-api-routes)

for API routes. Plus, Nuxt also generates types for globally available components and

[auto-imports from your composables](https://nuxt.com/docs/guide/directory-structure/composables)

, plus other core functionality.

Keep in mind that all options extended from `./.nuxt/tsconfig.json` will be overwritten by the options defined in your `tsconfig.json`. Overwriting options such as `"compilerOptions.paths"` with your own configuration will lead TypeScript to not factor in the module resolutions from `./.nuxt/tsconfig.json`. This can lead to module resolutions such as `#imports` not being recognized.

In case you need to extend options provided by `./.nuxt/tsconfig.json` further, you can use the

[`alias` property](about:/docs/api/nuxt-config#alias)

within your `nuxt.config`. `nuxi` will pick them up and extend `./.nuxt/tsconfig.json` accordingly.

TypeScript comes with certain checks to give you more safety and analysis of your program.

[Strict checks](https://www.typescriptlang.org/docs/handbook/migrating-from-javascript.html#getting-stricter-checks) are enabled by default in Nuxt to give you greater type safety.

If you are currently converting your codebase to TypeScript, you may want to temporarily disable strict checks by setting `strict` to `false` in your `nuxt.config`:

nuxt.config.ts

```
export default 
defineNuxtConfig({
  
typescript: {
    
strict: false
  }
})

```
