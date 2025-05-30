# Nuxt Lifecycle · Nuxt Concepts

The goal of this chapter is to provide a high-level overview of the different parts of the framework, their execution order, and how they work together.

On the server, the following steps are executed for every initial request to your application:

### [Step 1: Setup Nitro Server and Nitro Plugins (Once)](#step-1-setup-nitro-server-and-nitro-plugins-once)

Nuxt is powered by [Nitro](https://nitro.build/), a modern server engine.

When Nitro starts, it initializes and executes the plugins under the `/server/plugins` directory. These plugins can:

- Capture and handle application-wide errors.
- Register hooks that execute when Nitro shuts down.
- Register hooks for request lifecycle events, such as modifying responses.

Nitro plugins are executed only once when the server starts. In a serverless environment, the server boots on each incoming request, and so do the Nitro plugins. However, they are not awaited.

Read more in Docs > Guide > Directory Structure > Server#server Plugins.

### [Step 2: Nitro Server Middleware](#step-2-nitro-server-middleware)

After initializing the Nitro server, middleware under `server/middleware/` is executed for every request. Middleware can be used for tasks such as authentication, logging, or request transformation.

Returning a value from middleware will terminate the request and send the returned value as the response. This behavior should generally be avoided to ensure proper request handling!

Read more in Docs > Guide > Directory Structure > Server#server Middleware.

### [Step 3: Initialize Nuxt and Execute Nuxt App Plugins](#step-3-initialize-nuxt-and-execute-nuxt-app-plugins)

The Vue and Nuxt instances are created first. Afterward, Nuxt executes its server plugins. This includes:

- Built-in plugins, such as Vue Router and `unhead`.
- Custom plugins located in the `plugins/` directory, including those without a suffix (e.g., `myPlugin.ts`) and those with the `.server` suffix (e.g., `myServerPlugin.server.ts`).

Plugins execute in a specific order and may have dependencies on one another. For more details, including execution order and parallelism, refer to the [Plugins documentation](https://nuxt.com/docs/guide/directory-structure/plugins).

After this step, Nuxt calls the

[`app:created`](about:/docs/api/advanced/hooks#app-hooks-runtime)

hook, which can be used to execute additional logic.

Read more in Docs > Guide > Directory Structure > Plugins.

### [Step 4: Route Validation](#step-4-route-validation)

After initializing plugins and before executing middleware, Nuxt calls the `validate` method if it is defined in the `definePageMeta` function. The `validate` method, which can be synchronous or asynchronous, is often used to validate dynamic route parameters.

- The `validate` function should return `true` if the parameters are valid.
- If validation fails, it should return `false` or an object containing a `statusCode` and/or `statusMessage` to terminate the request.

For more information, see the [Route Validation documentation](about:/docs/getting-started/routing#route-validation).

Read more in Docs > Getting Started > Routing#route Validation.

### [Step 5: Execute Nuxt App Middleware](#step-5-execute-nuxt-app-middleware)

Middleware allows you to run code before navigating to a particular route. It is often used for tasks such as authentication, redirection, or logging.

In Nuxt, there are three types of middleware:

- **Global route middleware**
- **Named route middleware**
- **Anonymous (or inline) route middleware**

Nuxt automatically executes global middleware for first time enter to the application and every time before route navigation. Named and anonymous middleware are executed only on the routes specified in the middleware property of the page(route) meta defined in the corresponding page components.

For details about each type and examples, see the [Middleware documentation](https://nuxt.com/docs/guide/directory-structure/middleware).

Any redirection on the server will result in a `Location:` header being sent to the browser; the browser then makes a fresh request to this new location. All application state will be reset when this happens, unless persisted in a cookie.

Read more in Docs > Guide > Directory Structure > Middleware.

### [Step 6: Setup Page and Components](#step-6-setup-page-and-components)

Nuxt initializes the page and its components during this step and fetches any required data with `useFetch` and `useAsyncData`. Since there are no dynamic updates and no DOM operations occur on the server, Vue lifecycle hooks such as `onBeforeMount`, `onMounted`, and subsequent hooks are **NOT** executed during SSR.

You should avoid code that produces side effects that need cleanup in root scope of `<script setup>`. An example of such side effects is setting up timers with `setInterval`. In client-side only code we may setup a timer and then tear it down in `onBeforeUnmount` or `onUnmounted`. However, because the unmount hooks will never be called during SSR, the timers will stay around forever. To avoid this, move your side-effect code into `onMounted` instead.

### [Step 7: Render and Generate HTML Output](#step-7-render-and-generate-html-output)

After all components are initialized and data is fetched, Nuxt combines the components with settings from `unhead` to generate a complete HTML document. This HTML, along with the associated data, is sent back to the client to complete the SSR process.

After rendering the Vue application to HTML, Nuxt calls the

[`app:rendered`](about:/docs/api/advanced/hooks#app-hooks-runtime)

hook.

Before finalizing and sending the HTML, Nitro will call the

[`render:html`](about:/docs/api/advanced/hooks#nitro-app-hooks-runtime-server-side)

hook. This hook allows you to manipulate the generated HTML, such as injecting additional scripts or modifying meta tags.

This part of the lifecycle is fully executed in the browser, no matter which Nuxt mode you've chosen.

### [Step 1: Initialize Nuxt and Execute Nuxt App Plugins](#step-1-initialize-nuxt-and-execute-nuxt-app-plugins)

This step is similar to the server-side execution and includes both built-in and custom plugins.

Custom plugins in the `plugins/` directory, such as those without a suffix (e.g., `myPlugin.ts`) and with the `.client` suffix (e.g., `myClientPlugin.client.ts`), are executed on the client side.

After this step, Nuxt calls the

[`app:created`](about:/docs/api/advanced/hooks#app-hooks-runtime)

hook, which can be used to execute additional logic.

Read more in Docs > Guide > Directory Structure > Plugins.

### [Step 2: Route Validation](#step-2-route-validation)

This step is the same as the server-side execution and includes the `validate` method if defined in the `definePageMeta` function.

### [Step 3: Execute Nuxt App Middleware](#step-3-execute-nuxt-app-middleware)

Nuxt middleware runs on both the server and the client. If you want certain code to run in specific environments, consider splitting it by using `import.meta.client` for the client and `import.meta.server` for the server.

Read more in Docs > Guide > Directory Structure > Middleware#when Middleware Runs.

### [Step 4: Mount Vue Application and Hydration](#step-4-mount-vue-application-and-hydration)

Calling `app.mount('#__nuxt')` mounts the Vue application to the DOM. If the application uses SSR or SSG mode, Vue performs a hydration step to make the client-side application interactive. During hydration, Vue recreates the application (excluding [Server Components](about:/docs/guide/directory-structure/components#server-components)), matches each component to its corresponding DOM nodes, and attaches DOM event listeners.

To ensure proper hydration, it's important to maintain consistency between the data on the server and the client. For API requests, it is recommended to use `useAsyncData`, `useFetch`, or other SSR-friendly composables. These methods ensure that the data fetched on the server side is reused during hydration, avoiding repeated requests. Any new requests should only be triggered after hydration, preventing hydration errors.

Before mounting the Vue application, Nuxt calls the

[`app:beforeMount`](about:/docs/api/advanced/hooks#app-hooks-runtime)

hook.

After mounting the Vue application, Nuxt calls the

[`app:mounted`](about:/docs/api/advanced/hooks#app-hooks-runtime)

hook.

### [Step 5: Vue Lifecycle](#step-5-vue-lifecycle)

Unlike on the server, the browser executes the full [Vue lifecycle](https://vuejs.org/guide/essentials/lifecycle).
