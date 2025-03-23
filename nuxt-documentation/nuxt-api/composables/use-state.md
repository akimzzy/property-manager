# useState · Nuxt Composables
```
// Create a reactive state and set default value
const count = useState('counter', () => Math.round(Math.random() * 100))

```


Read more in Docs > Getting Started > State Management.

Because the data inside `useState` will be serialized to JSON, it is important that it does not contain anything that cannot be serialized, such as classes, functions or symbols.

`useState` is a reserved function name transformed by the compiler, so you should not name your own function `useState`.

Watch a video from Alexander Lichter about why and when to use `useState()`.

If you don't need your state to be deeply reactive, you can combine `useState` with [`shallowRef`](https://vuejs.org/api/reactivity-advanced.html#shallowref). This can improve performance when your state contains large objects and arrays.

```
const state = useState('my-shallow-state', () => shallowRef({ deep: 'not reactive' }))
// isShallow(state) === true

```


```
useState<T>(init?: () => T | Ref<T>): Ref<T>
useState<T>(key: string, init?: () => T | Ref<T>): Ref<T>

```


*   `key`: A unique key ensuring that data fetching is properly de-duplicated across requests. If you do not provide a key, then a key that is unique to the file and line number of the instance of [`useState`](https://nuxt.com/docs/api/composables/use-state) will be generated for you.
*   `init`: A function that provides initial value for the state when not initiated. This function can also return a `Ref`.
*   `T`: (typescript only) Specify the type of state

* * *