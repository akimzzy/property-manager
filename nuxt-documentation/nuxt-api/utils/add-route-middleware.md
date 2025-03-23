# addRouteMiddleware · Nuxt Utils
[Nuxt UI Pro v3 is out! Get 20% OFF until Friday](https://ui.nuxt.com/pro/pricing)

addRouteMiddleware() is a helper function to dynamically add middleware in your application.

Route middleware are navigation guards stored in the

[`middleware/`](https://nuxt.com/docs/guide/directory-structure/middleware)

directory of your Nuxt application (unless

[set otherwise](about:/docs/api/nuxt-config#middleware)

).

```
function addRouteMiddleware (name: string, middleware: RouteMiddleware, options?: AddRouteMiddlewareOptions): void
function addRouteMiddleware (middleware: RouteMiddleware): void

interface AddRouteMiddlewareOptions {
  global?: boolean
}

```


### [`name`](#name)

*   **Type:** `string` | `RouteMiddleware`

Can be either a string or a function of type `RouteMiddleware`. Function takes the next route `to` as the first argument and the current route `from` as the second argument, both of which are Vue route objects.

Learn more about available properties of [route objects](https://nuxt.com/docs/api/composables/use-route).

### [`middleware`](#middleware)

*   **Type:** `RouteMiddleware`

The second argument is a function of type `RouteMiddleware`. Same as above, it provides `to` and `from` route objects. It becomes optional if the first argument in `addRouteMiddleware()` is already passed as a function.

### [`options`](#options)

*   **Type:** `AddRouteMiddlewareOptions`

An optional `options` argument lets you set the value of `global` to `true` to indicate whether the router middleware is global or not (set to `false` by default).

### [Named Route Middleware](#named-route-middleware)

Named route middleware is defined by providing a string as the first argument and a function as the second:

plugins/my-plugin.ts

```
export default defineNuxtPlugin(() => {
  addRouteMiddleware('named-middleware', () => {
    console.log('named middleware added in Nuxt plugin')
  })
})

```


When defined in a plugin, it overrides any existing middleware of the same name located in the `middleware/` directory.

### [Global Route Middleware](#global-route-middleware)

Global route middleware can be defined in two ways:

*   Pass a function directly as the first argument without a name. It will automatically be treated as global middleware and applied on every route change.
    
    plugins/my-plugin.ts
    
    ```
export default defineNuxtPlugin(() => {
  addRouteMiddleware((to, from) => {
    console.log('anonymous global middleware that runs on every route change')
  })
})

```

    
*   Set an optional, third argument `{ global: true }` to indicate whether the route middleware is global.
    
    plugins/my-plugin.ts
    
    ```
export default defineNuxtPlugin(() => {
  addRouteMiddleware('global-middleware', (to, from) => {
      console.log('global middleware that runs on every route change')
    },
    { global: true }
  )
})

```

    

* * *