# Charts React 1.0.0

Install with `npm install @neural-charts/react` in a React 19 application. npm resolves Web and Core automatically. Render `Chart` with typed `data` and `options`. With React Server Components, import the chart from a client component.

Use `onHiddenSeriesChange` together with `options.hiddenSeriesIds` to control legend visibility from React state. Pass `ref` if you need `ChartHandle.getController()` after mount. The adapter updates the controller from new props and disposes of its owner on unmount.

[Complete example](../examples/line-react.tsx) · [React documentation](https://charts.neuralui.org/docs/react?framework=react)
