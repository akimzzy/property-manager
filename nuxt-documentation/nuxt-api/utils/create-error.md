# createError · Nuxt Utils
[Nuxt UI Pro v3 is out! Get 20% OFF until Friday](https://ui.nuxt.com/pro/pricing)

Create an error object with additional metadata.

You can use this function to create an error object with additional metadata. It is usable in both the Vue and Nitro portions of your app, and is meant to be thrown.

*   `err`: `string | { cause, data, message, name, stack, statusCode, statusMessage, fatal }`

You can pass either a string or an object to the `createError` function. If you pass a string, it will be used as the error `message`, and the `statusCode` will default to `500`. If you pass an object, you can set multiple properties of the error, such as `statusCode`, `message`, and other error properties.

If you throw an error created with `createError`:

*   on server-side, it will trigger a full-screen error page which you can clear with `clearError`.
*   on client-side, it will throw a non-fatal error for you to handle. If you need to trigger a full-screen error page, then you can do this by setting `fatal: true`.

### [Example](#example)

pages/movies/\[slug\].vue

```
<script setup lang="ts">
const route = useRoute()
const { data } = await useFetch(`/api/movies/${route.params.slug}`)
if (!data.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page Not Found' })
}
</script>

```


Use `createError` to trigger error handling in server API routes.

### [Example](#example-1)

server/api/error.ts

```
export default eventHandler(() => {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page Not Found'
  })
})

```


In API routes, using `createError` by passing an object with a short `statusMessage` is recommended because it can be accessed on the client side. Otherwise, a `message` passed to `createError` on an API route will not propagate to the client. Alternatively, you can use the `data` property to pass data back to the client. In any case, always consider avoiding to put dynamic user input to the message to avoid potential security issues.

Read more in Docs > Getting Started > Error Handling.

* * *