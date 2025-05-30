# Authoring Nuxt Layers · Nuxt Advanced

Nuxt layers are a powerful feature that you can use to share and reuse partial Nuxt applications within a monorepo, or from a git repository or npm package. The layers structure is almost identical to a standard Nuxt application, which makes them easy to author and maintain.

Read more in Docs > Getting Started > Layers.

A minimal Nuxt layer directory should contain a [`nuxt.config.ts`](https://nuxt.com/docs/guide/directory-structure/nuxt-config) file to indicate it is a layer.

base/nuxt.config.ts

```
export default defineNuxtConfig({})

```

Additionally, certain other files in the layer directory will be auto-scanned and used by Nuxt for the project extending this layer.

- [`components/*`](https://nuxt.com/docs/guide/directory-structure/components) - Extend the default components
- [`composables/*`](https://nuxt.com/docs/guide/directory-structure/composables) - Extend the default composables
- [`layouts/*`](https://nuxt.com/docs/guide/directory-structure/layouts) - Extend the default layouts
- [`pages/*`](https://nuxt.com/docs/guide/directory-structure/pages) - Extend the default pages
- [`plugins/*`](https://nuxt.com/docs/guide/directory-structure/plugins) - Extend the default plugins
- [`server/*`](https://nuxt.com/docs/guide/directory-structure/server) - Extend the default server endpoints & middleware
- [`utils/*`](https://nuxt.com/docs/guide/directory-structure/utils) - Extend the default utils
- [`nuxt.config.ts`](https://nuxt.com/docs/guide/directory-structure/nuxt-config)\- Extend the default nuxt config
- [`app.config.ts`](https://nuxt.com/docs/guide/directory-structure/app-config) - Extend the default app config

```
export default defineNuxtConfig({
  extends: [
    './base'
  ]
})

```

To get started you can initialize a layer with the [nuxt/starter/layer template](https://github.com/nuxt/starter/tree/layer). This will create a basic structure you can build upon. Execute this command within the terminal to get started:

Terminal

```
npm create nuxt --template layer nuxt-layer

```

Follow up on the README instructions for the next steps.

You can publish and share layers by either using a remote source or an npm package.

### [Git Repository](#git-repository)

You can use a git repository to share your Nuxt layer. Some examples:

nuxt.config.ts

```
export default defineNuxtConfig({
  extends: [
    'github:username/repoName',        // GitHub Remote Source
    'github:username/repoName/base',   // GitHub Remote Source within /base directory
    'github:username/repoName#dev',    // GitHub Remote Source from dev branch
    'github:username/repoName#v1.0.0', // GitHub Remote Source from v1.0.0 tag
    'gitlab:username/repoName',        // GitLab Remote Source example
    'bitbucket:username/repoName',     // Bitbucket Remote Source example
  ]
})

```

If you want to extend a private remote source, you need to add the environment variable `GIGET_AUTH=<token>` to provide a token.

If you want to extend a remote source from a self-hosted GitHub or GitLab instance, you need to supply its URL with the `GIGET_GITHUB_URL=<url>` or `GIGET_GITLAB_URL=<url>` environment variable - or directly configure it with

[the `auth` option](https://github.com/unjs/c12#extending-config-layer-from-remote-sources)

in your `nuxt.config`.

Bear in mind that if you are extending a remote source as a layer, you will not be able to access its dependencies outside of Nuxt. For example, if the remote layer depends on an eslint plugin, this will not be usable in your eslint config. That is because these dependencies will be located in a special location (`node_modules/.c12/layer_name/node_modules/`) that is not accessible to your package manager.

When using git remote sources, if a layer has npm dependencies and you wish to install them, you can do so by specifying `install: true` in your layer options.

nuxt.config.ts

```
export default defineNuxtConfig({
  extends: [
    ['github:username/repoName', { install: true }]
  ]
})

```

### [npm Package](#npm-package)

You can publish Nuxt layers as an npm package that contains the files and dependencies you want to extend. This allows you to share your config with others, use it in multiple projects or use it privately.

To extend from an npm package, you need to make sure that the module is published to npm and installed in the user's project as a devDependency. Then you can use the module name to extend the current nuxt config:

nuxt.config.ts

```
export default defineNuxtConfig({
  extends: [
    // Node Module with scope
    '@scope/moduleName',
    // or just the module name
    'moduleName'
  ]
})

```

To publish a layer directory as an npm package, you want to make sure that the `package.json` has the correct properties filled out. This will make sure that the files are included when the package is published.

package.json

```
{
  "name": "my-theme",
  "version": "1.0.0",
  "type": "module",
  "main": "./nuxt.config.ts",
  "dependencies": {},
  "devDependencies": {
    "nuxt": "^3.0.0"
  }
}

```

Make sure any dependency imported in the layer is **explicitly added** to the `dependencies`. The `nuxt` dependency, and anything only used for testing the layer before publishing, should remain in the `devDependencies` field.

Now you can proceed to publish the module to npm, either publicly or privately.

When publishing the layer as a private npm package, you need to make sure you log in, to authenticate with npm to download the node module.

### [Named Layer Aliases](#named-layer-aliases)

Auto-scanned layers (from your `~~/layers` directory) automatically create aliases. For example, you can access your `~~/layers/test` layer via `#layers/test`.

If you want to create named layer aliases for other layers, you can specify a name in the configuration of the layer.

nuxt.config.ts

```
export default defineNuxtConfig({
  $meta: {
    name: 'example',
  },
})

```

This will produce an alias of `#layers/example` which points to your layer.

### [Relative Paths and Aliases](#relative-paths-and-aliases)

When importing using global aliases (such as `~/` and `@/`) in a layer components and composables, note that these aliases are resolved relative to the user's project paths. As a workaround, you can **use relative paths** to import them, or use named layer aliases.

Also when using relative paths in `nuxt.config` file of a layer, (with exception of nested `extends`) they are resolved relative to user's project instead of the layer. As a workaround, use full resolved paths in `nuxt.config`:

nuxt.config.ts

```
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const currentDir = dirname(fileURLToPath(import.meta.url))

export default defineNuxtConfig({
  css: [
    join(currentDir, './assets/main.css')
  ]
})

```

You can use the internal array `nuxt.options._layers` to support custom multi-layer handling for your modules.

modules/my-module.ts

```
export default defineNuxtModule({
  setup(_options, nuxt) {
    for (const layer of nuxt.options._layers) {
      // You can check for a custom directory existence to extend for each layer
      console.log('Custom extension for', layer.cwd, layer.config)
    }
  }
})

```

**Notes:**

- Earlier items in the `_layers` array have higher priority and override later ones
- The user's project is the first item in the `_layers` array

Configuration loading and extends support is handled by [unjs/c12](https://github.com/unjs/c12), merged using [unjs/defu](https://github.com/unjs/defu) and remote git sources are supported using [unjs/giget](https://github.com/unjs/giget). Check the docs and source code to learn more.

Checkout our ongoing development to bring more improvements for layers support on GitHub.
