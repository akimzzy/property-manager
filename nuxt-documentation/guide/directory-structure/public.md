# public/ · Nuxt Directory Structure

[Nuxt UI Pro v3 is out! Get 20% OFF until Friday](https://ui.nuxt.com/pro/pricing)

The public/ directory is used to serve your website's static assets.

Files contained within the `public/` directory are served at the root and are not modified by the build process. This is suitable for files that have to keep their names (e.g. `robots.txt`) _or_ likely won't change (e.g. `favicon.ico`).

Directory structure

```
-| public/
---| favicon.ico
---| og-image.png
---| robots.txt

```

app.vue

```
<script setup lang="ts">
useSeoMeta({
  ogImage: '/og-image.png'
})
</script>

```

This is known as the `static/` directory in Nuxt 2.

---
