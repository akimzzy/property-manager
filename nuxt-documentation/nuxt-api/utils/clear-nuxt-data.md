# clearNuxtData · Nuxt Utils
[Nuxt UI Pro v3 is out! Get 20% OFF until Friday](https://ui.nuxt.com/pro/pricing)

Delete cached data, error status and pending promises of useAsyncData and useFetch.

This method is useful if you want to invalidate the data fetching for another page.

```
clearNuxtData (keys?: string | string[] | ((key: string) => boolean)): void

```


*   `keys`: One or an array of keys that are used in [`useAsyncData`](https://nuxt.com/docs/api/composables/use-async-data) to delete their cached data. If no keys are provided, **all data** will be invalidated.

* * *