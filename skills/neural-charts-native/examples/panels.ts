import { Component } from '@angular/core';
import { NativeChartPanels, type NativeChartPanelsData, type NativeChartPanelsOptions } from '@neural-charts/native';

const data = {
  panels: [
    {
      id: 'north',
      data: { type: 'line', axes: { x: { type: 'linear' }, y: { type: 'linear' } },
        series: [{ id: 'visits', name: 'Visits', data: [{ id: 'mon', x: 1, y: 12 }, { id: 'tue', x: 2, y: 18 }] }] },
    },
    {
      id: 'south',
      data: { type: 'line', axes: { x: { type: 'linear' }, y: { type: 'linear' } },
        series: [{ id: 'visits', name: 'Visits', data: [{ id: 'mon', x: 1, y: 10 }, { id: 'tue', x: 2, y: 15 }] }] },
    },
  ],
  links: [{ id: 'visits', members: [{ panelId: 'north', seriesId: 'visits' }, { panelId: 'south', seriesId: 'visits' }] }],
} as const satisfies NativeChartPanelsData;

@Component({
  selector: 'app-regional-charts',
  imports: [NativeChartPanels],
  template: '<neu-c-panels [data]="data" [options]="options" />',
})
export class RegionalCharts {
  readonly data = data;
  readonly options = {
    layout: { columns: 'auto', minPanelWidth: 240 },
    panels: { north: { title: 'North' }, south: { title: 'South' } },
  } as const satisfies NativeChartPanelsOptions<typeof data>;
}
