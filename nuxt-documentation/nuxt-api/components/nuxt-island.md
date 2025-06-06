# <NuxtIsland> · Nuxt Components

Nuxt provides the <NuxtIsland> component to render a non-interactive component without any client JS.

When rendering an island component, the content of the island component is static, thus no JS is downloaded client-side.

Changing the island component props triggers a refetch of the island component to re-render it again.

Global styles of your application are sent with the response.

Server only components use `<NuxtIsland>` under the hood

- `name` : Name of the component to render.
  - **type**: `string`
  - **required**
- `lazy`: Make the component non-blocking.
  - **type**: `boolean`
  - **default**: `false`
- `props`: Props to send to the component to render.
  - **type**: `Record<string, any>`
- `source`: Remote source to call the island to render.
  - **type**: `string`
- **dangerouslyLoadClientComponents**: Required to load components from a remote source.
  - **type**: `boolean`
  - **default**: `false`

Remote islands need `experimental.componentIslands` to be `'local+remote'` in your `nuxt.config`. It is strongly discouraged to enable `dangerouslyLoadClientComponents` as you can't trust a remote server's javascript.

By default, component islands are scanned from the `~/components/islands/` directory. So the `~/components/islands/MyIsland.vue` component could be rendered with `<NuxtIsland name="MyIsland" />`.

Slots can be passed to an island component if declared.

Every slot is interactive since the parent component is the one providing it.

Some slots are reserved to `NuxtIsland` for special cases.

- `#fallback`: Specify the content to be rendered before the island loads (if the component is lazy) or if `NuxtIsland` fails to fetch the component.

- `refresh()`

  - **type**: `() => Promise<void>`
  - **description**: force refetch the server component by refetching it.

- `error`
  - **parameters**:
    - **error**:
      - **type**: `unknown`
  - **description**: emitted when when `NuxtIsland` fails to fetch the new island.

---
