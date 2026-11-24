import { Component, input } from '@angular/core';
import {
  NativeChartNavigator,
  NativeDataChart,
  type NativeChartOptions,
  type NativeLineData,
} from '@neural-charts/native';

@Component({
  selector: 'native-energy-history',
  imports: [NativeDataChart, NativeChartNavigator],
  template: `
    <neu-c-chart #chart [data]="history()" [options]="options" />
    <neu-c-navigator [chart]="chart" />
  `,
})
export class NativeEnergyHistory {
  readonly history = input.required<NativeLineData>();
  protected readonly options = { viewport: { axes: 'x' } } satisfies NativeChartOptions<'line'>;
}
