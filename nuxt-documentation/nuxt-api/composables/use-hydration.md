# useHydration · Nuxt Composables
Allows full control of the hydration cycle to set and receive data from the server.

`useHydration` is a built-in composable that provides a way to set data on the server side every time a new HTTP request is made and receive that data on the client side. This way `useHydration` allows you to take full control of the hydration cycle.

This is an advanced composable and is mostly used internally (`useAsyncData`) or by Nuxt modules.

signature

```
useHydration <T> (key: string, get: () => T, set: (value: T) => void) => {}

```


You can use `useHydration()` within composables, plugins and components.

`useHydration` accepts three parameters:

*   `key`: unique key that identifies the data in your Nuxt application
    *   **Type**: `String`
*   `get`: function that returns the value to set the initial data
    *   **Type**: `Function`
*   `set`: function that receives the data on the client-side
    *   **Type**: `Function`

Once the initial data is returned using the `get` function on the server side, you can access that data within `nuxtApp.payload` using the unique key that is passed as the first parameter in `useHydration` composable.

Read more in Docs > Getting Started > Data Fetching.

* * *