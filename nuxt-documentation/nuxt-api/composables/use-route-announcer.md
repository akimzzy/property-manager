# useRouteAnnouncer · Nuxt Composables
This composable observes the page title changes and updates the announcer message accordingly.

This composable is available in Nuxt v3.12+.

A composable which observes the page title changes and updates the announcer message accordingly. Used by [`<NuxtRouteAnnouncer>`](https://nuxt.com/docs/api/components/nuxt-route-announcer) and controllable. It hooks into Unhead's [`dom:rendered`](https://unhead.unjs.io/docs/guides/hooks) to read the page's title and set it as the announcer message.

*   `politeness`: Sets the urgency for screen reader announcements: `off` (disable the announcement), `polite` (waits for silence), or `assertive` (interrupts immediately). (default `polite`).

### [`message`](#message)

*   **type**: `Ref<string>`
*   **description**: The message to announce

### [`politeness`](#politeness)

*   **type**: `Ref<string>`
*   **description**: Screen reader announcement urgency level `off`, `polite`, or `assertive`

### [`set(message, politeness = "polite")`](#setmessage-politeness-polite)

Sets the message to announce with its urgency level.

### [`polite(message)`](#politemessage)

Sets the message with `politeness = "polite"`

### [`assertive(message)`](#assertivemessage)

Sets the message with `politeness = "assertive"`

pages/index.vue

```
<script setup lang="ts">
  const { message, politeness, set, polite, assertive } = useRouteAnnouncer({
    politeness: 'assertive'
  })
</script>

```


* * *