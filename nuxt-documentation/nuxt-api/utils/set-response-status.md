# setResponseStatus · Nuxt Utils
setResponseStatus sets the statusCode (and optionally the statusMessage) of the response.

Nuxt provides composables and utilities for first-class server-side-rendering support.

`setResponseStatus` sets the statusCode (and optionally the statusMessage) of the response.

`setResponseStatus` can only be called in the

[Nuxt context](about:/docs/guide/going-further/nuxt-app#the-nuxt-context)

.

```
const event = useRequestEvent()

// event will be undefined in the browser
if (event) {
  // Set the status code to 404 for a custom 404 page
  setResponseStatus(event, 404)

  // Set the status message as well
  setResponseStatus(event, 404, 'Page Not Found')
}

```


In the browser, `setResponseStatus` will have no effect.

Read more in Docs > Getting Started > Error Handling.

* * *