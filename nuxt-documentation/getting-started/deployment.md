# Deployment · Get Started with Nuxt

A Nuxt application can be deployed on a Node.js server, pre-rendered for static hosting, or deployed to serverless or edge (CDN) environments.

If you are looking for a list of cloud providers that support Nuxt 3, see the

[Hosting providers](https://nuxt.com/deploy)

section.

Discover the Node.js server preset with Nitro to deploy on any Node hosting.

- **Default output format** if none is specified or auto-detected
- Loads only the required chunks to render the request for optimal cold start timing
- Useful for deploying Nuxt apps to any Node.js hosting

### [Entry Point](#entry-point)

When running `nuxt build` with the Node server preset, the result will be an entry point that launches a ready-to-run Node server.

Terminal

```
node .output/server/index.mjs

```

This will launch your production Nuxt server that listens on port 3000 by default.

It respects the following runtime environment variables:

- `NITRO_PORT` or `PORT` (defaults to `3000`)
- `NITRO_HOST` or `HOST` (defaults to `'0.0.0.0'`)
- `NITRO_SSL_CERT` and `NITRO_SSL_KEY` - if both are present, this will launch the server in HTTPS mode. In the vast majority of cases, this should not be used other than for testing, and the Nitro server should be run behind a reverse proxy like nginx or Cloudflare which terminates SSL.

### [PM2](#pm2)

[PM2](https://pm2.keymetrics.io/) (Process Manager 2) is a fast and easy solution for hosting your Nuxt application on your server or VM.

To use `pm2`, use an `ecosystem.config.cjs`:

ecosystem.config.cjs

```
module.exports = {
  apps: [
    {
      name: 'NuxtAppName',
      port: '3000',
      exec_mode: 'cluster',
      instances: 'max',
      script: './.output/server/index.mjs'
    }
  ]
}

```

### [Cluster Mode](#cluster-mode)

You can use `NITRO_PRESET=node_cluster` in order to leverage multi-process performance using Node.js [cluster](https://nodejs.org/dist/latest/docs/api/cluster.html) module.

By default, the workload gets distributed to the workers with the round robin strategy.

### [Learn More](#learn-more)

Read more in the Nitro documentation for node-server preset.

Watch Daniel Roe's short video on the topic.

There are two ways to deploy a Nuxt application to any static hosting services:

- Static site generation (SSG) with `ssr: true` pre-renders routes of your application at build time. (This is the default behavior when running `nuxi generate`.) It will also generate `/200.html` and `/404.html` single-page app fallback pages, which can render dynamic routes or 404 errors on the client (though you may need to configure this on your static host).
- Alternatively, you can prerender your site with `ssr: false` (static single-page app). This will produce HTML pages with an empty `<div id="__nuxt"></div>` where your Vue app would normally be rendered. You will lose many SEO benefits of prerendering your site, so it is suggested instead to use [`<ClientOnly>`](https://nuxt.com/docs/api/components/client-only) to wrap the portions of your site that cannot be server rendered (if any).

Read more in Nuxt prerendering.

### [Client-side Only Rendering](#client-side-only-rendering)

If you don't want to pre-render your routes, another way of using static hosting is to set the `ssr` property to `false` in the `nuxt.config` file. The `nuxi generate` command will then output an `.output/public/index.html` entrypoint and JavaScript bundles like a classic client-side Vue.js application.

nuxt.config.ts

```
export default
defineNuxtConfig({

ssr: false
})

```

Nuxt can be deployed to several cloud providers with a minimal amount of configuration:

In addition to Node.js servers and static hosting services, a Nuxt project can be deployed with several well-tested presets and minimal amount of configuration.

You can explicitly set the desired preset in the [`nuxt.config.ts`](https://nuxt.com/docs/guide/directory-structure/nuxt-config) file:

nuxt.config.ts

```
export default
defineNuxtConfig({

nitro: {

preset: 'node-server'
  }
})

```

... or use the `NITRO_PRESET` environment variable when running `nuxt build`:

Terminal

```
NITRO_PRESET=node-server nuxt build

```

🔎 Check [the Nitro deployment](https://nitro.unjs.io/deploy) for all possible deployment presets and providers.

In most cases, Nuxt can work with third-party content that is not generated or created by Nuxt itself. But sometimes such content can cause problems, especially Cloudflare's "Minification and Security Options".

Accordingly, you should make sure that the following options are unchecked / disabled in Cloudflare. Otherwise, unnecessary re-rendering or hydration errors could impact your production application.

1.  Speed > Optimization > Content Optimization > Disable "Rocket Loader™"
2.  Speed > Optimization > Image Optimization > Disable "Mirage"
3.  Scrape Shield > Disable "Email Address Obfuscation"

With these settings, you can be sure that Cloudflare won't inject scripts into your Nuxt application that may cause unwanted side effects.

Their location on the Cloudflare dashboard sometimes changes so don't hesitate to look around.
