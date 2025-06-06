# Debugging · Nuxt Advanced
Sourcemaps are enabled for your server build by default, and for the client build in dev mode, but you can enable them more specifically in your configuration.

```
export default defineNuxtConfig({
  // or sourcemap: true
  sourcemap: {
    server: true,
    client: true
  }
})

```


You can use [Node inspector](https://nodejs.org/en/learn/getting-started/debugging) to debug Nuxt server-side.

This will start Nuxt in `dev` mode with debugger active. If everything is working correctly a Node.js icon will appear on your Chrome DevTools and you can attach to the debugger.

Note that the Node.js and Chrome processes need to be run on the same platform. This doesn't work inside of Docker.

It is possible to debug your Nuxt app in your IDE while you are developing it.

### [Example VS Code Debug Configuration](#example-vs-code-debug-configuration)

You may need to update the config below with a path to your web browser. For more information, visit the [VS Code documentation about debug configuration](https://go.microsoft.com/fwlink/?linkid=830387).

If you use `pnpm`, you will need to have `nuxi` installed as a devDependency for the configuration below to work.

```
{
  // Use IntelliSense to learn about possible attributes.
  // Hover to view descriptions of existing attributes.
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "client: chrome",
      "url": "http://localhost:3000",
      "webRoot": "${workspaceFolder}"
    },
    {
      "type": "node",
      "request": "launch",
      "name": "server: nuxt",
      "outputCapture": "std",
      "program": "${workspaceFolder}/node_modules/nuxt/bin/nuxt.mjs",
      "args": [
        "dev"
      ],
    }
  ],
  "compounds": [
    {
      "name": "fullstack: nuxt",
      "configurations": [
        "server: nuxt",
        "client: chrome"
      ]
    }
  ]
}

```


If you prefer your usual browser extensions, add this to the _chrome_ configuration above:

### [Example JetBrains IDEs Debug Configuration](#example-jetbrains-ides-debug-configuration)

You can also debug your Nuxt app in JetBrains IDEs such as IntelliJ IDEA, WebStorm, or PhpStorm.

1.  Create a new file in your project root directory and name it `nuxt.run.xml`.
2.  Open the `nuxt.run.xml` file and paste the following debug configuration:

```
<component name="ProjectRunConfigurationManager">
  <configuration default="false" name="client: chrome" type="JavascriptDebugType" uri="http://localhost:3000" useFirstLineBreakpoints="true">
    <method v="2" />
  </configuration>

  <configuration default="false" name="server: nuxt" type="NodeJSConfigurationType" application-parameters="dev" path-to-js-file="$PROJECT_DIR$/node_modules/nuxt/bin/nuxt.mjs" working-dir="$PROJECT_DIR$">
    <method v="2" />
  </configuration>

  <configuration default="false" name="fullstack: nuxt" type="CompoundRunConfigurationType">
    <toRun name="client: chrome" type="JavascriptDebugType" />
    <toRun name="server: nuxt" type="NodeJSConfigurationType" />
    <method v="2" />
  </configuration>
</component>

```


### [Other IDEs](#other-ides)

If you have another IDE and would like to contribute sample configuration, feel free to [open a PR](https://github.com/nuxt/nuxt/edit/main/docs/2.guide/3.going-further/9.debugging.md)!