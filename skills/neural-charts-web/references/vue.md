# Charts Vue 1.0.0

Run `npm install @neural-charts/vue` inside a Vue 3.5 application. npm installs the compatible Web renderer and Core automatically.

Import `Chart` and the `ChartData` and `ChartOptions` types from `@neural-charts/vue`. Bind `:data` and `:options` in the template. Use `shallowRef` or `computed` to pass a new reference on updates, and keep observation and series IDs stable.

Listen to `@point-activate`, `@selection-change`, `@hidden-series-change`, `@viewport-change` and `@diagnostic`. When the application controls a value through options, use the event to update that value. A template ref typed with `ChartHandle` gives access to `getController()` after mount for export and imperative operations.

The adapter mounts the chart in the browser and disposes of it on unmount. Server rendering emits the initial container. Provide a text summary or data table when readers need the chart information before mount.

[Complete example](../examples/line-vue.ts) · [Vue documentation](https://charts.neuralui.org/docs/vue?framework=vue)
