# app.vue · Nuxt Directory Structure
The app.vue file is the main component of your Nuxt application.

With Nuxt 3, the [`pages/`](https://nuxt.com/docs/guide/directory-structure/pages) directory is optional. If not present, Nuxt won't include [vue-router](https://router.vuejs.org/) dependency. This is useful when working on a landing page or an application that does not need routing.

app.vue

```
<template>
  <h1>Hello World!</h1>
</template>

```


Read and edit a live example in [Docs > Examples > Hello World](https://nuxt.com/docs/examples/hello-world).

[Usage with Pages](#usage-with-pages)
-------------------------------------

If you have a [`pages/`](https://nuxt.com/docs/guide/directory-structure/pages) directory, to display the current page, use the [`<NuxtPage>`](https://nuxt.com/docs/api/components/nuxt-page) component:

app.vue

```
<template>
  <div>
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
  </div>
</template>

```


Since

[`<NuxtPage>`](https://nuxt.com/docs/api/components/nuxt-page)

internally uses Vue's

[`<Suspense>`](https://vuejs.org/guide/built-ins/suspense.html#suspense)

component, it cannot be set as a root element.

Remember that `app.vue` acts as the main component of your Nuxt application. Anything you add to it (JS and CSS) will be global and included in every page.

If you want to have the possibility to customize the structure around the page between pages, check out the `layouts/` directory.

* * *