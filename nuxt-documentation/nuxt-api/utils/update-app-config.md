# updateAppConfig · Nuxt Utils
[Nuxt UI Pro v3 is out! Get 20% OFF until Friday](https://ui.nuxt.com/pro/pricing)

Update the App Config at runtime.

Updates the

[`app.config`](https://nuxt.com/docs/guide/directory-structure/app-config)

using deep assignment. Existing (nested) properties will be preserved.

```
const appConfig = useAppConfig() // { foo: 'bar' }

const newAppConfig = { foo: 'baz' }

updateAppConfig(newAppConfig)

console.log(appConfig) // { foo: 'baz' }

```


Read more in Docs > Guide > Directory Structure > App Config.

* * *