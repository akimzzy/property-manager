# <NuxtImg> · Nuxt Components

[Nuxt UI Pro v3 is out! Get 20% OFF until Friday](https://ui.nuxt.com/pro/pricing)

Nuxt provides a <NuxtImg> component to handle automatic image optimization.

`<NuxtImg>` is a drop-in replacement for the native `<img>` tag.

- Uses built-in provider to optimize local and remote images
- Converts `src` to provider-optimized URLs
- Automatically resizes images based on `width` and `height`
- Generates responsive sizes when providing `sizes` option
- Supports native lazy loading as well as other `<img>` attributes

In order to use `<NuxtImg>` you should install and enable the Nuxt Image module:

Terminal

```
npx nuxi@latest module add image

```

`<NuxtImg>` outputs a native `img` tag directly (without any wrapper around it). Use it like you would use the `<img>` tag:

```
<NuxtImg src="/nuxt-icon.png" />

```

Will result in:

```
<img src="/nuxt-icon.png" />

```

Read more about the `<NuxtImg>` component.

---
