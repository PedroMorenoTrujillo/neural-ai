---
name: neural-charts-native
description: Integrate and troubleshoot @neural-charts/native charts in Angular Native apps for iOS and Android. Use for typed chart data and options, tooltips, labels, legends, point colours, coordinated panels, drilldown and accessibility. Neural UI controls and browser chart renderers have separate APIs.
license: MIT
compatibility: Angular 22, Angular Native 0.19.1 and an Expo 58 app configured with the Angular Native Metro preset.
metadata:
  version: "0.1.0"
  library-version: "0.1.0-beta.3"
---

# Neural Charts Native

The examples and MCP catalogue use `@neural-charts/native@0.1.0-beta.3` with Core `0.1.3`. Check the installed package and peer versions before generating code. For another release, use its exported declarations and its documentation.

1. Identify the chart family and the data shape it accepts. Read the [official chart catalog](https://charts-native.neuralui.org/docs/catalog) for that family. Use the public `Native…Data` type and `NativeChartOptions<'family'>` so unsupported options fail at compile time.
2. In a native standalone screen, import `NativeDataChart`, add it to the component's `imports` and bind `data` and `options` to `<neu-c-chart>`. Keep stable IDs for series and points across updates. Preserve a known zero as `0` and use `null` only where the data contract accepts an unknown value.
3. Choose supported presentation and interaction options from the [integration guide](references/integration.md). Use the native tooltip directive for docked content and callbacks for labels. Match every named import to a public entrypoint.
4. Check the screen with Angular's template compiler and test touch, tooltips and accessibility with the [testing guide](https://charts-native.neuralui.org/docs/testing). A browser demo helps inspect configuration. Use an installed app to verify device behaviours such as haptics.

## Examples

- [Line chart with stable IDs](examples/line.ts) is a complete standalone screen.
- [Customisation](examples/customization.ts) adds a tooltip template, label formatters, numbered points and colours by value.
- [Heatmap](examples/heatmap.ts) defines both continuous and interval colour scales.
- [Panels](examples/panels.ts) and [drilldown](examples/drilldown.ts) show separate composition contracts.

## MCP

In the shared `neural-ui-mcp`, pass `library: "charts-native"` and `version: "0.1.0-beta.3"`. Start with `list_components` or `search_documentation`. Use `get_api` for the exact declaration, `get_example` for a complete screen and `validate_usage` for static checks of inline source. Type-check and run the screen after static validation.
