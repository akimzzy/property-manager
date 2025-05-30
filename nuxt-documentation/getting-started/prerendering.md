# Prerendering · Get Started with Nuxt

Nuxt allows for select pages from your application to be rendered at build time. Nuxt will serve the prebuilt pages when requested instead of generating them on the fly.

Read more in Nuxt rendering modes.

Use the [`nuxi generate` command](https://nuxt.com/docs/api/commands/generate) to build and pre-render your application using the [Nitro](https://nuxt.com/docs/guide/concepts/server-engine) crawler. This command is similar to `nuxt build` with the `nitro.static` option set to `true`, or running `nuxt build --prerender`.

This will build your site, stand up a nuxt instance, and, by default, prerender the root page `/` along with any of your site's pages it links to, any of your site's pages they link to, and so on.

You can now deploy the `.output/public` directory to any static hosting service or preview it locally with `npx serve .output/public`.

Working of the Nitro crawler:

1.  Load the HTML of your application's root route (`/`), any non-dynamic pages in your `~/pages` directory, and any other routes in the `nitro.prerender.routes` array.
2.  Save the HTML and `payload.json` to the `~/.output/public/` directory to be served statically.
3.  Find all anchor tags (`<a href="...">`) in the HTML to navigate to other routes.
4.  Repeat steps 1-3 for each anchor tag found until there are no more anchor tags to crawl.

This is important to understand since pages that are not linked to a discoverable page can't be pre-rendered automatically.

Read more about the `nuxi generate` command.

### [Selective Pre-rendering](#selective-pre-rendering)

You can manually specify routes that [Nitro](https://nuxt.com/docs/guide/concepts/server-engine) will fetch and pre-render during the build or ignore routes that you don't want to pre-render like `/dynamic` in the `nuxt.config` file:

nuxt.config.ts

```
export default
defineNuxtConfig({

nitro: {

prerender: {

routes: ["/user/1", "/user/2"],

ignore: ["/dynamic"],
    },
  },
});

```

You can combine this with the `crawlLinks` option to pre-render a set of routes that the crawler can't discover like your `/sitemap.xml` or `/robots.txt`:

nuxt.config.ts

```
export default
defineNuxtConfig({

nitro: {

prerender: {

crawlLinks: true,

routes: ["/sitemap.xml", "/robots.txt"],
    },
  },
});

```

Setting `nitro.prerender` to `true` is similar to `nitro.prerender.crawlLinks` to `true`.

Read more about pre-rendering in the Nitro documentation.

Lastly, you can manually configure this using routeRules.

nuxt.config.ts

```
export default
defineNuxtConfig({

routeRules: {
    // Set prerender to true to configure it to be prerendered
    "/rss.xml": {
prerender: true },
    // Set it to false to configure it to be skipped for prerendering
    "/this-DOES-NOT-get-prerendered": {
prerender: false },
    // Everything under /blog gets prerendered as long as it
    // is linked to from another page
    "/blog/**": {
prerender: true },
  },
});

```

Read more about Nitro's `routeRules` configuration.

As a shorthand, you can also configure this in a page file using [`defineRouteRules`](https://nuxt.com/docs/api/utils/define-route-rules).

This feature is experimental and in order to use it you must enable the `experimental.inlineRouteRules` option in your `nuxt.config`.

pages/index.vue

```
<script setup>
// Or set at the page level
defineRouteRules({
  prerender: true,
});
</script>

<template>
  <div>
    <h1>Homepage</h1>
    <p>Pre-rendered at build time</p>
  </div>
</template>

```

This will be translated to:

nuxt.config.ts

```
export default defineNuxtConfig({
  routeRules: {
    "/": { prerender: true },
  },
});

```

### [`prerenderRoutes`](#prerenderroutes)

You can use this at runtime within a [Nuxt context](about:/docs/guide/going-further/nuxt-app#the-nuxt-context) to add more routes for Nitro to prerender.

pages/index.vue

```
<script setup>
prerenderRoutes(["/some/other/url"]);
</script>

<template>
  <div>
    <h1>This will register other routes for prerendering when prerendered</h1>
  </div>
</template>

```

Read more in prerenderRoutes.

### [`prerender:routes` Nuxt hook](#prerenderroutes-nuxt-hook)

This is called before prerendering for additional routes to be registered.

nuxt.config.ts

```
export default defineNuxtConfig({
  hooks: {
    async "prerender:routes"(ctx) {
      const { pages } = await fetch("https://api.some-cms.com/pages").then(
        (res) => res.json(),
      );
      for (const page of pages) {
        ctx.routes.add(`/${page.name}`);
      }
    },
  },
});

```

### [`prerender:generate` Nitro hook](#prerendergenerate-nitro-hook)

This is called for each route during prerendering. You can use this for fine grained handling of each route that gets prerendered.

nuxt.config.ts

```
export default defineNuxtConfig({
  nitro: {
    hooks: {
      "prerender:generate"(route) {
        if (route.route?.includes("private")) {
          route.skip = true;
        }
      },
    },
  },
});

```
