# onNuxtReady · Nuxt Utils
[Nuxt UI Pro v3 is out! Get 20% OFF until Friday](https://ui.nuxt.com/pro/pricing)

The onNuxtReady composable allows running a callback after your app has finished initializing.

`onNuxtReady` only runs on the client-side.  
It is ideal for running code that should not block the initial rendering of your app.

plugins/ready.client.ts

```
export default defineNuxtPlugin(() => {
  onNuxtReady(async () => {
    const myAnalyticsLibrary = await import('my-big-analytics-library')
    // do something with myAnalyticsLibrary
  })
})

```


It is 'safe' to run even after your app has initialized. In this case, then the code will be registered to run in the next idle callback.

* * *