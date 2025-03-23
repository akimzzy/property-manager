# useError · Nuxt Composables
[Nuxt UI Pro v3 is out! Get 20% OFF until Friday](https://ui.nuxt.com/pro/pricing)

useError composable returns the global Nuxt error that is being handled.

The composable returns the global Nuxt error that is being handled and it is available on both client and server.

`useError` sets an error in the state and creates a reactive as well as SSR-friendly global Nuxt error across components.

Nuxt errors have the following properties:

```
interface {
  //  HTTP response status code
  statusCode: number
  // HTTP response status message
  statusMessage: string
  // Error message
  message: string
}

```


Read more in Docs > Getting Started > Error Handling.

* * *