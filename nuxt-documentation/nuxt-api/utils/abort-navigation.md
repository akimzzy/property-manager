# abortNavigation · Nuxt Utils
[Nuxt UI Pro v3 is out! Get 20% OFF until Friday](https://ui.nuxt.com/pro/pricing)

abortNavigation is a helper function that prevents navigation from taking place and throws an error if one is set as a parameter.

`abortNavigation` is only usable inside a

[route middleware handler](https://nuxt.com/docs/guide/directory-structure/middleware)

.

```
abortNavigation(err?: Error | string): false

```


### [`err`](#err)

*   **Type**: [`Error`](https://developer.mozilla.org/pl/docs/Web/JavaScript/Reference/Global_Objects/Error) | `string`  
    Optional error to be thrown by `abortNavigation`.

The example below shows how you can use `abortNavigation` in a route middleware to prevent unauthorized route access:

middleware/auth.ts

```
export default defineNuxtRouteMiddleware((to, from) => {
  const user = useState('user')

  if (!user.value.isAuthorized) {
    return abortNavigation()
  }

  if (to.path !== '/edit-post') {
    return navigateTo('/edit-post')
  }
})

```


### [`err` as a String](#err-as-a-string)

You can pass the error as a string:

middleware/auth.ts

```
export default defineNuxtRouteMiddleware((to, from) => {
  const user = useState('user')

  if (!user.value.isAuthorized) {
    return abortNavigation('Insufficient permissions.')
  }
})

```


### [`err` as an Error Object](#err-as-an-error-object)

You can pass the error as an [`Error`](https://developer.mozilla.org/pl/docs/Web/JavaScript/Reference/Global_Objects/Error) object, e.g. caught by the `catch`\-block:

middleware/auth.ts

```
export default defineNuxtRouteMiddleware((to, from) => {
  try {
    /* code that might throw an error */
  } catch (err) {
    return abortNavigation(err)
  }
})

```


* * *