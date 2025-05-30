# useCookie · Nuxt Composables

Within your pages, components and plugins you can use `useCookie`, an SSR-friendly composable to read and write cookies.

```
const cookie = useCookie(name, options)

```

`useCookie` only works in the

[Nuxt context](about:/docs/guide/going-further/nuxt-app#the-nuxt-context)

.

`useCookie` ref will automatically serialize and deserialize cookie value to JSON.

The example below creates a cookie called `counter`. If the cookie doesn't exist, it is initially set to a random value. Whenever we update the `counter` variable, the cookie will be updated accordingly.

app.vue

```
<script setup lang="ts">
const counter = useCookie('counter')

counter.value = counter.value || Math.round(Math.random() * 1000)
</script>

<template>
  <div>
    <h1>Counter: {{ counter || '-' }}</h1>
    <button @click="counter = null">reset</button>
    <button @click="counter--">-</button>
    <button @click="counter++">+</button>
  </div>
</template>

```

Refresh `useCookie` values manually when a cookie has changed with

[`refreshCookie`](https://nuxt.com/docs/api/utils/refresh-cookie)

.

Cookie composable accepts several options which let you modify the behavior of cookies.

Most of the options will be directly passed to the [cookie](https://github.com/jshttp/cookie) package.

### [`maxAge` / `expires`](#maxage-expires)

Use these options to set the expiration of the cookie.

`maxAge`: Specifies the `number` (in seconds) to be the value for the [`Max-Age` `Set-Cookie` attribute](https://tools.ietf.org/html/rfc6265#section-5.2.2). The given number will be converted to an integer by rounding down. By default, no maximum age is set.

`expires`: Specifies the `Date` object to be the value for the [`Expires` `Set-Cookie` attribute](https://tools.ietf.org/html/rfc6265#section-5.2.1). By default, no expiration is set. Most clients will consider this a "non-persistent cookie" and will delete it on a condition like exiting a web browser application.

The

[cookie storage model specification](https://tools.ietf.org/html/rfc6265#section-5.3)

states that if both `expires` and `maxAge` is set, then `maxAge` takes precedence, but not all clients may obey this, so if both are set, they should point to the same date and time!

If neither of `expires` and `maxAge` is set, the cookie will be session-only and removed when the user closes their browser.

### [`httpOnly`](#httponly)

Specifies the `boolean` value for the [`HttpOnly` `Set-Cookie` attribute](https://tools.ietf.org/html/rfc6265#section-5.2.6). When truthy, the `HttpOnly` attribute is set; otherwise it is not. By default, the `HttpOnly` attribute is not set.

Be careful when setting this to `true`, as compliant clients will not allow client-side JavaScript to see the cookie in `document.cookie`.

### [`secure`](#secure)

Specifies the `boolean` value for the [`Secure` `Set-Cookie` attribute](https://tools.ietf.org/html/rfc6265#section-5.2.5). When truthy, the `Secure` attribute is set; otherwise it is not. By default, the `Secure` attribute is not set.

Be careful when setting this to `true`, as compliant clients will not send the cookie back to the server in the future if the browser does not have an HTTPS connection. This can lead to hydration errors.

### [`partitioned`](#partitioned)

Specifies the `boolean` value for the [`Partitioned` `Set-Cookie`](https://datatracker.ietf.org/doc/html/draft-cutler-httpbis-partitioned-cookies#section-2.1) attribute. When truthy, the `Partitioned` attribute is set, otherwise it is not. By default, the `Partitioned` attribute is not set.

This is an attribute that has not yet been fully standardized, and may change in the future. This also means many clients may ignore this attribute until they understand it.More information can be found in the

[proposal](https://github.com/privacycg/CHIPS)

.

### [`domain`](#domain)

Specifies the value for the [`Domain` `Set-Cookie` attribute](https://tools.ietf.org/html/rfc6265#section-5.2.3). By default, no domain is set, and most clients will consider applying the cookie only to the current domain.

### [`path`](#path)

Specifies the value for the [`Path` `Set-Cookie` attribute](https://tools.ietf.org/html/rfc6265#section-5.2.4). By default, the path is considered the ["default path"](https://tools.ietf.org/html/rfc6265#section-5.1.4).

### [`sameSite`](#samesite)

Specifies the `boolean` or `string` value for the [`SameSite` `Set-Cookie` attribute](https://tools.ietf.org/html/draft-ietf-httpbis-rfc6265bis-03#section-4.1.2.7).

- `true` will set the `SameSite` attribute to `Strict` for strict same-site enforcement.
- `false` will not set the `SameSite` attribute.
- `'lax'` will set the `SameSite` attribute to `Lax` for lax same-site enforcement.
- `'none'` will set the `SameSite` attribute to `None` for an explicit cross-site cookie.
- `'strict'` will set the `SameSite` attribute to `Strict` for strict same-site enforcement.

More information about the different enforcement levels can be found in [the specification](https://tools.ietf.org/html/draft-ietf-httpbis-rfc6265bis-03#section-4.1.2.7).

### [`encode`](#encode)

Specifies a function that will be used to encode a cookie's value. Since the value of a cookie has a limited character set (and must be a simple string), this function can be used to encode a value into a string suited for a cookie's value.

The default encoder is the `JSON.stringify` + `encodeURIComponent`.

### [`decode`](#decode)

Specifies a function that will be used to decode a cookie's value. Since the value of a cookie has a limited character set (and must be a simple string), this function can be used to decode a previously encoded cookie value into a JavaScript string or other object.

The default decoder is `decodeURIComponent` + [destr](https://github.com/unjs/destr).

If an error is thrown from this function, the original, non-decoded cookie value will be returned as the cookie's value.

### [`default`](#default)

Specifies a function that returns the cookie's default value. The function can also return a `Ref`.

### [`readonly`](#readonly)

Allows _accessing_ a cookie value without the ability to set it.

### [`watch`](#watch)

Specifies the `boolean` or `string` value for [watch](https://vuejs.org/api/reactivity-core.html#watch) cookie ref data.

- `true` - Will watch cookie ref data changes and its nested properties (default).
- `shallow` - Will watch cookie ref data changes for only top level properties
- `false` - Will not watch cookie ref data changes.

Refresh `useCookie` values manually when a cookie has changed with

[`refreshCookie`](https://nuxt.com/docs/api/utils/refresh-cookie)

.

**Example 1:**

```
<script setup lang="ts">
const user = useCookie(
  'userInfo',
  {
    default: () => ({ score: -1 }),
    watch: false
  }
)

if (user.value && user.value !== null) {
  user.value.score++; // userInfo cookie not update with this change
}
</script>

<template>
  <div>User score: {{ user?.score }}</div>
</template>

```

**Example 2:**

```
<script setup lang="ts">
const list = useCookie(
  'list',
  {
    default: () => [],
    watch: 'shallow'
  }
)

function add() {
  list.value?.push(Math.round(Math.random() * 1000))
  // list cookie not update with this change
}

function save() {
  if (list.value && list.value !== null) {
    list.value = [...list.value]
    // list cookie update with this change
  }
}
</script>

<template>
  <div>
    <h1>List</h1>
    <pre>{{ list }}</pre>
    <button @click="add">Add</button>
    <button @click="save">Save</button>
  </div>
</template>

```

You can use `getCookie` and `setCookie` from [`h3`](https://github.com/unjs/h3) package to set cookies in server API routes.

server/api/counter.ts

```
export default defineEventHandler(event => {
  // Read counter cookie
  let counter = getCookie(event, 'counter') || 0

  // Increase counter cookie by 1
  setCookie(event, 'counter', ++counter)

  // Send JSON response
  return { counter }
})

```
