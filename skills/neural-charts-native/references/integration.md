# Integrate Neural Charts Native

## Install and bind a chart

Configure the Angular Native Expo host and place the screen under its gesture root. Install the pinned [chart package and peers](https://charts-native.neuralui.org/docs/installation). The Core dependency is installed with the chart package.

Use `@neural-charts/native` for the component and typed inputs. The `/plan` subpath provides the pure scene planner. The `/interaction` subpath provides the selection session for projected scenes. [Component API](https://charts-native.neuralui.org/docs/api)

## Customise tooltip, labels, legend and axes

Add `NativeChartTooltipTemplate` to the screen's imports and project `<ng-template neuChartTooltip>` inside the chart. Set `tooltip.mode` to `'docked'` for this template. The implicit context is an observation. The template also exposes `shared`, `pinned`, `scrubbing`, `unit` and `locale`.

Bind `[labelFormatters]` for data labels, legend labels and X/Y labels. Return `undefined` to keep the default text. Enable the corresponding labels or legend in the chart options. Use the stable `seriesId` and `pointId` pair in `appearance.points` where the family supports per-point colours. Use the family's `appearance.series` for sector colours in pie and donut. Cartesian axis callbacks apply when that chart has the corresponding axes.

Place plot lines in `axes.x.referenceLines` or `axes.y.referenceLines` where the family supports them. The axis options type shows the supported value type and the line style exposes colour, width, dash and label text. Read the [customisation guide](https://charts-native.neuralui.org/docs/customization) before reusing options across families.

## Set heatmap colours

Set `colorAxis.scale` to a continuous scale with stops or a set of ordered value intervals. A missing value is distinct from a zero and an absent cell. Use `colorAxis.visible` for the quantitative legend. [Heatmap demos](https://charts-native.neuralui.org/charts/heatmap/basic)

## Coordinate charts and navigate levels

Use `NativeChartPanels` and `NativeChartPanelsData` for a group of supported charts. Give each panel its own ID and data. Link series visibility or X viewports explicitly where needed. Each panel keeps its own axes and units.

Use `NativeChartDrilldown` with `NativeChartDrilldownData` for hierarchical navigation. Set a root node and explicit datum-to-node links. Listen to `navigationChange` for the selected node and trail. [Component API](https://charts-native.neuralui.org/docs/api)

## Verify touch and accessibility

Check `interactionChange` and `planningError` with typed fixtures. Turn on `interaction.selectionControls` when the screen needs accessible previous, next and clear controls. Keep a text summary or data view available for comparing exact values. [Accessibility guide](https://charts-native.neuralui.org/docs/accessibility) · [Testing guide](https://charts-native.neuralui.org/docs/testing)
