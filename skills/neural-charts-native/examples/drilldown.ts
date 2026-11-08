import { Component } from '@angular/core';
import { NativeChartDrilldown, type NativeChartDrilldownData, type NativeChartDrilldownOptions } from '@neural-charts/native';

const data = {
  rootId: 'regions',
  nodes: [
    { id: 'regions', data: { type: 'donut', data: [{ id: 'north', label: 'North', value: 40 }, { id: 'south', label: 'South', value: 60 }] } },
    { id: 'north', data: { type: 'donut', data: [{ id: 'city-a', label: 'City A', value: 24 }, { id: 'city-b', label: 'City B', value: 16 }] } },
  ],
  links: [{ fromNodeId: 'regions', datumId: { seriesId: 'north', pointId: 'north' }, toNodeId: 'north' }],
} as const satisfies NativeChartDrilldownData;

@Component({
  selector: 'app-regional-detail',
  imports: [NativeChartDrilldown],
  template: '<neu-c-drilldown [data]="data" [options]="options" />',
})
export class RegionalDetail {
  readonly data = data;
  readonly options = {
    nodes: { regions: { title: 'Regions' }, north: { title: 'North' } },
  } as const satisfies NativeChartDrilldownOptions<typeof data>;
}
