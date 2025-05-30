# prefetchComponents · Nuxt Utils
Nuxt provides utilities to give you control over prefetching components.

Prefetching component downloads the code in the background, this is based on the assumption that the component will likely be used for rendering, enabling the component to load instantly if and when the user requests it. The component is downloaded and cached for anticipated future use without the user making an explicit request for it.

Use `prefetchComponents` to manually prefetch individual components that have been registered globally in your Nuxt app. By default Nuxt registers these as async components. You must use the Pascal-cased version of the component name.

```
await prefetchComponents('MyGlobalComponent')

await prefetchComponents(['MyGlobalComponent1', 'MyGlobalComponent2'])

```


Current implementation behaves exactly the same as

[`preloadComponents`](https://nuxt.com/docs/api/utils/preload-components)

by preloading components instead of just prefetching we are working to improve this behavior.

On server, `prefetchComponents` will have no effect.

* * *