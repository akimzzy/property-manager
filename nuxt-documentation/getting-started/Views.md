# Views · Get Started with Nuxt

![The app.vue file is the entry point of your application](https://nuxt.com/_vercel/image?url=%2Fassets%2Fdocs%2Fgetting-started%2Fviews%2Fapp.svg&w=1536&q=100)

By default, Nuxt will treat this file as the **entrypoint** and render its content for every route of the application.

app.vue

```
<template>
  <div>
   <h1>Welcome to the homepage</h1>
  </div>
</template>

```

If you are familiar with Vue, you might wonder where `main.js` is (the file that normally creates a Vue app). Nuxt does this behind the scene.

![Components are reusable pieces of UI](https://nuxt.com/_vercel/image?url=%2Fassets%2Fdocs%2Fgetting-started%2Fviews%2Fcomponents.svg&w=1536&q=100)

Most components are reusable pieces of the user interface, like buttons and menus. In Nuxt, you can create these components in the [`components/`](https://nuxt.com/docs/guide/directory-structure/components) directory, and they will be automatically available across your application without having to explicitly import them.

```
<template>
  <div>
    <h1>Welcome to the homepage</h1>
    <AppAlert>
      This is an auto-imported component.
    </AppAlert>
  </div>
</template>

```

## [Pages](#pages)

![Pages are views tied to a specific route](https://nuxt.com/_vercel/image?url=%2Fassets%2Fdocs%2Fgetting-started%2Fviews%2Fpages.svg&w=1536&q=100)

Pages represent views for each specific route pattern. Every file in the [`pages/`](https://nuxt.com/docs/guide/directory-structure/pages) directory represents a different route displaying its content.

To use pages, create `pages/index.vue` file and add `<NuxtPage />` component to the [`app.vue`](https://nuxt.com/docs/guide/directory-structure/app) (or remove `app.vue` for default entry). You can now create more pages and their corresponding routes by adding new files in the [`pages/`](https://nuxt.com/docs/guide/directory-structure/pages) directory.

```
<template>
  <div>
    <h1>Welcome to the homepage</h1>
    <AppAlert>
      This is an auto-imported component
    </AppAlert>
  </div>
</template>

```

Read more in Routing Section.

![Layouts are wrapper around pages](https://nuxt.com/_vercel/image?url=%2Fassets%2Fdocs%2Fgetting-started%2Fviews%2Flayouts.svg&w=1536&q=100)

Layouts are wrappers around pages that contain a common User Interface for several pages, such as a header and footer display. Layouts are Vue files using `<slot />` components to display the **page** content. The `layouts/default.vue` file will be used by default. Custom layouts can be set as part of your page metadata.

If you only have a single layout in your application, we recommend using

[`app.vue`](https://nuxt.com/docs/guide/directory-structure/app)

with

[`<NuxtPage />`](https://nuxt.com/docs/api/components/nuxt-page)

instead.

```
<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

```

If you want to create more layouts and learn how to use them in your pages, find more information in the [Layouts section](https://nuxt.com/docs/guide/directory-structure/layouts).

If you only need to modify the `<head>`, you can refer to the

[SEO and meta section](https://nuxt.com/docs/getting-started/seo-meta)

.

You can have full control over the HTML template by adding a Nitro plugin that registers a hook. The callback function of the `render:html` hook allows you to mutate the HTML before it is sent to the client.

server/plugins/extend-html.ts

```
export default
defineNitroPlugin((
nitroApp) => {

nitroApp.
hooks.
hook('render:html', (
html, {
event }) => {
    // This will be an object representation of the html template.

console.
log(
html)

html.
head.
push(`<meta name="description" content="My custom description" />`)
  })
  // You can also intercept the response here.

nitroApp.
hooks.
hook('render:response', (
response, {
event }) => {
console.
log(
response) })
})

```

Read more in Docs > Guide > Going Further > Hooks.
