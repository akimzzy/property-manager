# useServerSeoMeta · Nuxt Composables
[Nuxt UI Pro v3 is out! Get 20% OFF until Friday](https://ui.nuxt.com/pro/pricing)

The useServerSeoMeta composable lets you define your site's SEO meta tags as a flat object with full TypeScript support.

Just like [`useSeoMeta`](https://nuxt.com/docs/api/composables/use-seo-meta), `useServerSeoMeta` composable lets you define your site's SEO meta tags as a flat object with full TypeScript support.

Read more in Docs > API > Composables > Use Seo Meta.

In most instances, the meta doesn't need to be reactive as robots will only scan the initial load. So we recommend using [`useServerSeoMeta`](https://nuxt.com/docs/api/composables/use-server-seo-meta) as a performance-focused utility that will not do anything (or return a `head` object) on the client.

app.vue

```
<script setup lang="ts">
useServerSeoMeta({
  robots: 'index, follow'
})
</script>

```


Parameters are exactly the same as with [`useSeoMeta`](https://nuxt.com/docs/api/composables/use-seo-meta)

Read more in Docs > Getting Started > Seo Meta.

* * *