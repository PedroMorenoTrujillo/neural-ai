import { Component } from '@angular/core';
import { NativeDataChart, type NativeChartOptions, type NativeHeatmapData } from '@neural-charts/native';

export const continuous = {
  colorAxis: {
    visible: true,
    scale: { type: 'continuous', domain: [0, 12], stops: [{ at: 0, color: '#DCE9FA' }, { at: 1, color: '#245DC1' }], missingColor: '#CBD5E1' },
  },
} as const satisfies NativeChartOptions<'heatmap'>;

export const intervals = {
  colorAxis: {
    visible: true,
    scale: {
      type: 'classes',
      classes: [
        { id: 'low', label: 'Below 8', maxExclusive: 8, color: '#DCE9FA' },
        { id: 'high', label: '8 and above', minInclusive: 8, color: '#245DC1' },
      ],
      missingColor: '#CBD5E1',
      unclassifiedColor: '#D2D9E4',
    },
  },
} as const satisfies NativeChartOptions<'heatmap'>;

@Component({
  selector: 'app-shift-heatmap',
  imports: [NativeDataChart],
  template: '<neu-c-chart [data]="data" [options]="options" />',
})
export class ShiftHeatmap {
  readonly data = {
    type: 'heatmap',
    axes: {
      x: { type: 'category', values: [{ id: 'mon', label: 'Mon' }, { id: 'tue', label: 'Tue' }] },
      y: { type: 'category', values: [{ id: 'am', label: 'Morning' }] },
    },
    data: [
      { id: 'mon-am', rowId: 'am', columnId: 'mon', value: 0 },
      { id: 'tue-am', rowId: 'am', columnId: 'tue', value: 12 },
    ],
  } as const satisfies NativeHeatmapData;
  readonly options = intervals;
}
