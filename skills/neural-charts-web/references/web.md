# Charts Web 1.2.2

Install with `npm install @neural-charts/web`. It includes Charts Core 0.1.6 as a dependency. The main entrypoint exports `createChart`, `ChartData`, `ChartOptions`, `planWebChart`, `describeChartData` and the export utilities.

Mount into a visible browser element with an available width. Pass a unique, stable `instanceId` and inspect the result before using the controller. The controller supports `update`, `updateOptions`, export methods and `destroy`. Destroy it when the owning view is removed. For a text or table alternative, use the data behind the chart or the `describeChartData` API.

Specialized public entrypoints include `/cartesian`, `/panels`, `/drilldown` and `/financial`.

[Complete example](../examples/line-web.ts) · [Documentation](https://charts.neuralui.org/)
