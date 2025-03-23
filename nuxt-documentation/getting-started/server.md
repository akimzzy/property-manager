# Server · Get Started with Nuxt

Read more in Docs > Guide > Directory Structure > Server.

![Server engine](https://nuxt.com/_vercel/image?url=%2Fassets%2Fdocs%2Fgetting-started%2Fserver.svg&w=1536&q=100)

Nuxt's server is [Nitro](https://github.com/nitrojs/nitro). It was originally created for Nuxt but is now part of [UnJS](https://unjs.io/) and open for other frameworks - and can even be used on its own.

Using Nitro gives Nuxt superpowers:

- Full control of the server-side part of your app
- Universal deployment on any provider (many zero-config)
- Hybrid rendering

Nitro is internally using [h3](https://github.com/unjs/h3), a minimal H(TTP) framework built for high performance and portability.

Watch a video from Alexander Lichter to understand the responsibilities of Nuxt and Nitro in your application.

You can easily manage the server-only part of your Nuxt app, from API endpoints to middleware.

Both endpoints and middleware can be defined like this:

server/api/test.ts

```
export default
defineEventHandler(async (
event) => {
  // ... Do whatever you want here
})

```

And you can directly return `text`, `json`, `html` or even a `stream`.

Out-of-the-box, it supports **hot module replacement** and **auto-import** like the other parts of your Nuxt application.

Read more in Docs > Guide > Directory Structure > Server.

Nitro offers the ability to deploy your Nuxt app anywhere, from a bare metal server to the edge network, with a start time of just a few milliseconds. That's fast!

Read more in Blog > Nuxt On The Edge.

There are more than 15 presets to build your Nuxt app for different cloud providers and servers, including:

- [Cloudflare Workers](https://workers.cloudflare.com/)
- [Netlify Functions](https://www.netlify.com/products/functions)
- [Vercel Edge Network](https://vercel.com/docs/edge-network)

Or for other runtimes:

Read more in Docs > Getting Started > Deployment.

Nitro has a powerful feature called `routeRules` which allows you to define a set of rules to customize how each route of your Nuxt app is rendered (and more).

nuxt.config.ts

```
export default
defineNuxtConfig({

routeRules: {
    // Generated at build time for SEO purpose
    '/': {
prerender: true },
    // Cached for 1 hour
    '/api/*': {
cache: {
maxAge: 60 * 60 } },
    // Redirection to avoid 404
    '/old-page': {

redirect: {
to: '/new-page',
statusCode: 302 }
    }
    // ...
  }
})

```

Learn about all available route rules are available to customize the rendering mode of your routes.

In addition, there are some route rules (for example, `ssr`, `appMiddleware`, and `noScripts`) that are Nuxt specific to change the behavior when rendering your pages to HTML.

Some route rules (`appMiddleware`, `redirect` and `prerender`) also affect client-side behavior.

Nitro is used to build the app for server side rendering, as well as pre-rendering.

Read more in Docs > Guide > Concepts > Rendering.
