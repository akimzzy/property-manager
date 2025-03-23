# clearError · Nuxt Utils
[Nuxt UI Pro v3 is out! Get 20% OFF until Friday](https://ui.nuxt.com/pro/pricing)

The clearError composable clears all handled errors.

Within your pages, components, and plugins, you can use `clearError` to clear all errors and redirect the user.

**Parameters:**

*   `options?: { redirect?: string }`

You can provide an optional path to redirect to (for example, if you want to navigate to a 'safe' page).

```
// Without redirect
clearError()

// With redirect
clearError({ redirect: '/homepage' })

```


Errors are set in state using [`useError()`](https://nuxt.com/docs/api/composables/use-error). The `clearError` composable will reset this state and calls the `app:error:cleared` hook with the provided options.

Read more in Docs > Getting Started > Error Handling.

* * *