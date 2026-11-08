import { Component } from '@angular/core';
import { NativeDataChart, type NativeChartOptions, type NativeLineData } from '@neural-charts/native';

export const activity = {
  type: 'line',
  axes: { x: { type: 'category', values: [{ id: 'mon', label: 'Mon' }, { id: 'tue', label: 'Tue' }] }, y: { type: 'linear' } },
  series: [{ id: 'visits', name: 'Visits', data: [{ id: 'mon', x: 'mon', y: 28 }, { id: 'tue', x: 'tue', y: 64 }] }],
} as const satisfies NativeLineData;

@Component({
  selector: 'app-activity-chart',
  imports: [NativeDataChart],
  template: '<neu-c-chart [data]="data" [options]="options" />',
})
export class ActivityChart {
  readonly data = activity;
  readonly options = {
    title: 'Weekly activity',
    appearance: { series: [{ id: 'visits', name: 'Visits', color: '#2460B3' }] },
    tooltip: { content: 'point' },
  } as const satisfies NativeChartOptions<'line'>;
}
