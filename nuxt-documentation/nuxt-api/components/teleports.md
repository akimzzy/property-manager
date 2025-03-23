# <Teleport> · Nuxt Components
[Nuxt UI Pro v3 is out! Get 20% OFF until Friday](https://ui.nuxt.com/pro/pricing)

The <Teleport> component teleports a component to a different location in the DOM.

The `to` target of

[`<Teleport>`](https://vuejs.org/guide/built-ins/teleport.html)

expects a CSS selector string or an actual DOM node. Nuxt currently has SSR support for teleports to `#teleports` only, with client-side support for other targets using a `<ClientOnly>` wrapper.

[Body Teleport](#body-teleport)
-------------------------------

```
<template>
  <button @click="open = true">
    Open Modal
  </button>
  <Teleport to="#teleports">
    <div v-if="open" class="modal">
      <p>Hello from the modal!</p>
      <button @click="open = false">
        Close
      </button>
    </div>
  </Teleport>
</template>

```


```
<template>
  <ClientOnly>
    <Teleport to="#some-selector">
      <!-- content -->
    </Teleport>
  </ClientOnly>
</template>

```


* * *