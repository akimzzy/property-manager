# server/ · Nuxt Directory Structure

Nuxt automatically scans files inside these directories to register API and server handlers with Hot Module Replacement (HMR) support.

Directory structure

```
-| server/
---| api/
-----| hello.ts      # /api/hello
---| routes/
-----| bonjour.ts    # /bonjour
---| middleware/
-----| log.ts        # log all requests

```

Each file should export a default function defined with `defineEventHandler()` or `eventHandler()` (alias).

The handler can directly return JSON data, a `Promise`, or use `event.node.res.end()` to send a response.

server/api/hello.ts

```
export default
defineEventHandler((
event) => {
  return {

hello: 'world'
  }
})

```

You can now universally call this API in your pages and components:

pages/index.vue

```
<script setup lang="ts">
const { data } = await useFetch('/api/hello')
</script>

<template>
  <pre>{{ data }}</pre>
</template>

```

Files inside the `~/server/api` are automatically prefixed with `/api` in their route.

To add server routes without `/api` prefix, put them into `~/server/routes` directory.

**Example:**

server/routes/hello.ts

```
export default defineEventHandler(() => 'Hello World!')

```

Given the example above, the `/hello` route will be accessible at [http://localhost:3000/hello](http://localhost:3000/hello).

Note that currently server routes do not support the full functionality of dynamic routes as

[pages](about:/docs/guide/directory-structure/pages#dynamic-routes)

do.

Nuxt will automatically read in any file in the `~/server/middleware` to create server middleware for your project.

Middleware handlers will run on every request before any other server route to add or check headers, log requests, or extend the event's request object.

Middleware handlers should not return anything (nor close or respond to the request) and only inspect or extend the request context or throw an error.

**Examples:**

server/middleware/log.ts

```
export default defineEventHandler((event) => {
  console.log('New request: ' + getRequestURL(event))
})

```

server/middleware/auth.ts

```
export default defineEventHandler((event) => {
  event.context.auth = { user: 123 }
})

```

Nuxt will automatically read any files in the `~/server/plugins` directory and register them as Nitro plugins. This allows extending Nitro's runtime behavior and hooking into lifecycle events.

**Example:**

server/plugins/nitroPlugin.ts

```
export default defineNitroPlugin((nitroApp) => {
  console.log('Nitro plugin', nitroApp)
})

```

Read more in Nitro Plugins.

Server routes are powered by [unjs/h3](https://github.com/unjs/h3) which comes with a handy set of helpers.

Read more in Available H3 Request Helpers.

You can add more helpers yourself inside the `~/server/utils` directory.

For example, you can define a custom handler utility that wraps the original handler and performs additional operations before returning the final response.

**Example:**

server/utils/handler.ts

```
import type { EventHandler, EventHandlerRequest } from 'h3'

export const defineWrappedResponseHandler = <T extends EventHandlerRequest, D> (
  handler: EventHandler<T, D>
): EventHandler<T, D> =>
  defineEventHandler<T>(async event => {
    try {
      // do something before the route handler
      const response = await handler(event)
      // do something after the route handler
      return { response }
    } catch (err) {
      // Error handling
      return { err }
    }
  })

```

This feature is available from Nuxt >= 3.5

To improve clarity within your IDE between the auto-imports from 'nitro' and 'vue', you can add a `~/server/tsconfig.json` with the following content:

server/tsconfig.json

```
{
  "extends": "../.nuxt/tsconfig.server.json"
}

```

Currently, these values won't be respected when type checking ([`nuxi typecheck`](https://nuxt.com/docs/api/commands/typecheck)), but you should get better type hints in your IDE.

### [Route Parameters](#route-parameters)

Server routes can use dynamic parameters within brackets in the file name like `/api/hello/[name].ts` and be accessed via `event.context.params`.

server/api/hello/\[name\].ts

```
export default defineEventHandler((event) => {
  const name = getRouterParam(event, 'name')

  return `Hello, ${name}!`
})

```

Alternatively, use `getValidatedRouterParams` with a schema validator such as Zod for runtime and type safety.

You can now universally call this API on `/api/hello/nuxt` and get `Hello, nuxt!`.

### [Matching HTTP Method](#matching-http-method)

Handle file names can be suffixed with `.get`, `.post`, `.put`, `.delete`, ... to match request's [HTTP Method](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods).

server/api/test.get.ts

```
export default defineEventHandler(() => 'Test get handler')

```

server/api/test.post.ts

```
export default defineEventHandler(() => 'Test post handler')

```

Given the example above, fetching `/test` with:

- **GET** method: Returns `Test get handler`
- **POST** method: Returns `Test post handler`
- Any other method: Returns 405 error

You can also use `index.[method].ts` inside a directory for structuring your code differently, this is useful to create API namespaces.

```
export default defineEventHandler((event) => {
  // handle GET requests for the `api/foo` endpoint
})

```

### [Catch-all Route](#catch-all-route)

Catch-all routes are helpful for fallback route handling.

For example, creating a file named `~/server/api/foo/[...].ts` will register a catch-all route for all requests that do not match any route handler, such as `/api/foo/bar/baz`.

server/api/foo/\[...\].ts

```
export default defineEventHandler((event) => {
  // event.context.path to get the route path: '/api/foo/bar/baz'
  // event.context.params._ to get the route segment: 'bar/baz'
  return `Default foo handler`
})

```

You can set a name for the catch-all route by using `~/server/api/foo/[...slug].ts` and access it via `event.context.params.slug`.

server/api/foo/\[...slug\].ts

```
export default defineEventHandler((event) => {
  // event.context.params.slug to get the route segment: 'bar/baz'
  return `Default foo handler`
})

```

### [Body Handling](#body-handling)

server/api/submit.post.ts

```
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  return { body }
})

```

Alternatively, use `readValidatedBody` with a schema validator such as Zod for runtime and type safety.

You can now universally call this API using:

app.vue

```
<script setup lang="ts">
async function submit() {
  const { body } = await $fetch('/api/submit', {
    method: 'post',
    body: { test: 123 }
  })
}
</script>

```

We are using `submit.post.ts` in the filename only to match requests with `POST` method that can accept the request body. When using `readBody` within a GET request, `readBody` will throw a `405 Method Not Allowed` HTTP error.

### [Query Parameters](#query-parameters)

Sample query `/api/query?foo=bar&baz=qux`

server/api/query.get.ts

```
export default defineEventHandler((event) => {
  const query = getQuery(event)

  return { a: query.foo, b: query.baz }
})

```

Alternatively, use `getValidatedQuery` with a schema validator such as Zod for runtime and type safety.

### [Error Handling](#error-handling)

If no errors are thrown, a status code of `200 OK` will be returned.

Any uncaught errors will return a `500 Internal Server Error` HTTP Error.

To return other error codes, throw an exception with [`createError`](https://nuxt.com/docs/api/utils/create-error):

server/api/validation/\[id\].ts

```
export default defineEventHandler((event) => {
  const id = parseInt(event.context.params.id) as number

  if (!Number.isInteger(id)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'ID should be an integer',
    })
  }
  return 'All good'
})

```

### [Status Codes](#status-codes)

To return other status codes, use the [`setResponseStatus`](https://nuxt.com/docs/api/utils/set-response-status) utility.

For example, to return `202 Accepted`

server/api/validation/\[id\].ts

```
export default defineEventHandler((event) => {
  setResponseStatus(event, 202)
})

```

### [Runtime Config](#runtime-config)

```
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)

  const repo = await $fetch('https://api.github.com/repos/nuxt/nuxt', {
    headers: {
      Authorization: `token ${config.githubToken}`
    }
  })

  return repo
})

```

Giving the `event` as argument to `useRuntimeConfig` is optional, but it is recommended to pass it to get the runtime config overwritten by

[environment variables](about:/docs/guide/going-further/runtime-config#environment-variables)

at runtime for server routes.

### [Request Cookies](#request-cookies)

server/api/cookies.ts

```
export default defineEventHandler((event) => {
  const cookies = parseCookies(event)

  return { cookies }
})

```

### [Forwarding Context & Headers](#forwarding-context-headers)

By default, neither the headers from the incoming request nor the request context are forwarded when making fetch requests in server routes. You can use `event.$fetch` to forward the request context and headers when making fetch requests in server routes.

server/api/forward.ts

```
export default defineEventHandler((event) => {
  return event.$fetch('/api/forwarded')
})

```

Headers that are **not meant to be forwarded** will **not be included** in the request. These headers include, for example: `transfer-encoding`, `connection`, `keep-alive`, `upgrade`, `expect`, `host`, `accept`

### [Awaiting Promises After Response](#awaiting-promises-after-response)

When handling server requests, you might need to perform asynchronous tasks that shouldn't block the response to the client (for example, caching and logging). You can use `event.waitUntil` to await a promise in the background without delaying the response.

The `event.waitUntil` method accepts a promise that will be awaited before the handler terminates, ensuring the task is completed even if the server would otherwise terminate the handler right after the response is sent. This integrates with runtime providers to leverage their native capabilities for handling asynchronous operations after the response is sent.

server/api/background-task.ts

```
const timeConsumingBackgroundTask = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
};

export default eventHandler((event) => {
  // schedule a background task without blocking the response
  event.waitUntil(timeConsumingBackgroundTask())

  // immediately send the response to the client
  return 'done'
});

```

### [Nitro Config](#nitro-config)

You can use `nitro` key in `nuxt.config` to directly set [Nitro configuration](https://nitro.unjs.io/config).

This is an advanced option. Custom config can affect production deployments, as the configuration interface might change over time when Nitro is upgraded in semver-minor versions of Nuxt.

nuxt.config.ts

```
export default defineNuxtConfig({
  // https://nitro.unjs.io/config
  nitro: {}
})

```

Read more in Docs > Guide > Concepts > Server Engine.

### [Nested Router](#nested-router)

server/api/hello/\[...slug\].ts

```
import { createRouter, defineEventHandler, useBase } from 'h3'

const router = createRouter()

router.get('/test', defineEventHandler(() => 'Hello World'))

export default useBase('/api/hello', router.handler)

```

### [Sending Streams](#sending-streams)

This is an experimental feature and is available in all environments.

server/api/foo.get.ts

```
import fs from 'node:fs'
import { sendStream } from 'h3'

export default defineEventHandler((event) => {
  return sendStream(event, fs.createReadStream('/path/to/file'))
})

```

### [Sending Redirect](#sending-redirect)

server/api/foo.get.ts

```
export default defineEventHandler(async (event) => {
  await sendRedirect(event, '/path/redirect/to', 302)
})

```

### [Legacy Handler or Middleware](#legacy-handler-or-middleware)

server/api/legacy.ts

```
export default fromNodeMiddleware((req, res) => {
  res.end('Legacy handler')
})

```

Legacy support is possible using

[unjs/h3](https://github.com/unjs/h3)

, but it is advised to avoid legacy handlers as much as you can.

server/middleware/legacy.ts

```
export default fromNodeMiddleware((req, res, next) => {
  console.log('Legacy middleware')
  next()
})

```

Never combine `next()` callback with a legacy middleware that is `async` or returns a `Promise`.

### [Server Storage](#server-storage)

Nitro provides a cross-platform [storage layer](https://nitro.unjs.io/guide/storage). In order to configure additional storage mount points, you can use `nitro.storage`, or [server plugins](#server-plugins).

**Example of adding a Redis storage:**

Using `nitro.storage`:

nuxt.config.ts

```
export default defineNuxtConfig({
  nitro: {
    storage: {
      redis: {
        driver: 'redis',
        /* redis connector options */
        port: 6379, // Redis port
        host: "127.0.0.1", // Redis host
        username: "", // needs Redis >= 6
        password: "",
        db: 0, // Defaults to 0
        tls: {} // tls/ssl
      }
    }
  }
})

```

Then in your API handler:

server/api/storage/test.ts

```
export default defineEventHandler(async (event) => {
  // List all keys with
  const keys = await useStorage('redis').getKeys()

  // Set a key with
  await useStorage('redis').setItem('foo', 'bar')

  // Remove a key with
  await useStorage('redis').removeItem('foo')

  return {}
})

```

Read more about Nitro Storage Layer.

Alternatively, you can create a storage mount point using a server plugin and runtime config:

```
import redisDriver from 'unstorage/drivers/redis'

export default defineNitroPlugin(() => {
  const storage = useStorage()

  // Dynamically pass in credentials from runtime configuration, or other sources
  const driver = redisDriver({
      base: 'redis',
      host: useRuntimeConfig().redis.host,
      port: useRuntimeConfig().redis.port,
      /* other redis connector options */
    })

  // Mount driver
  storage.mount('redis', driver)
})

```
