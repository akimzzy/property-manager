# refreshCookie · Nuxt Utils
[Nuxt UI Pro v3 is out! Get 20% OFF until Friday](https://ui.nuxt.com/pro/pricing)

Refresh useCookie values manually when a cookie has changed

This utility is available since

[Nuxt v3.10](https://nuxt.com/blog/v3-10)

.

The `refreshCookie` function is designed to refresh cookie value returned by `useCookie`.

This is useful for updating the `useCookie` ref when we know the new cookie value has been set in the browser.

app.vue

```
<script setup lang="ts">
const tokenCookie = useCookie('token')

const login = async (username, password) => {
  const token = await $fetch('/api/token', { ... }) // Sets `token` cookie on response
  refreshCookie('token')
}

const loggedIn = computed(() => !!tokenCookie.value)
</script>

```


You can enable experimental `cookieStore` option to automatically refresh `useCookie` value when cookie changes in the browser.

```
refreshCookie(name: string): void

```


* * *