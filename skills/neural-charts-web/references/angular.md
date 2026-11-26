# Charts Angular 1.1.1

Install with `npm install @neural-charts/angular @neural-charts/web`. The reviewed host runs Angular 22.3.0. The adapter declares `^22.2.3` peers for Angular Core and Common and `^1.2.0` for Charts Web.

Import the standalone `NeuralChart` into an Angular component and render `nc-chart` with `data` and a unique `instanceId`. Update `data` and `options` via Angular state. Use outputs such as `pointActivate` and `hiddenSeriesChange` when the application needs to respond to chart interaction. Let the adapter manage rendering and cleanup.

[Complete example](../examples/line-angular.ts) · [Documentation](https://charts.neuralui.org/)
