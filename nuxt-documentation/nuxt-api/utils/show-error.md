# showError · Nuxt Utils
[Nuxt UI Pro v3 is out! Get 20% OFF until Friday](https://ui.nuxt.com/pro/pricing)

Nuxt provides a quick and simple way to show a full screen error page if needed.

Within the [Nuxt context](about:/docs/guide/going-further/nuxt-app#the-nuxt-context) you can use `showError` to show an error.

**Parameters:**

*   `error`: `string | Error | Partial<{ cause, data, message, name, stack, statusCode, statusMessage }>`

```
showError("😱 Oh no, an error has been thrown.")
showError({
  statusCode: 404,
  statusMessage: "Page Not Found"
})

```


The error is set in the state using [`useError()`](https://nuxt.com/docs/api/composables/use-error) to create a reactive and SSR-friendly shared error state across components.

`showError` calls the `app:error` hook.

Read more in Docs > Getting Started > Error Handling.

* * *