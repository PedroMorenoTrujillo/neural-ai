import { Component } from '@angular/core';
import { Text } from '@ng-native/components';
import {
  NativeChartTooltipTemplate, NativeDataChart,
  type NativeChartLabelFormatters, type NativeChartOptions, type NativeLineData,
} from '@neural-charts/native';

@Component({
  selector: 'app-styled-chart',
  imports: [NativeDataChart, NativeChartTooltipTemplate, Text],
  template: `
    <neu-c-chart [data]="data" [options]="options" [labelFormatters]="formatters">
      <ng-template neuChartTooltip let-point let-unit="unit">
        <text>{{ point.label }} · {{ point.value }} {{ unit }}</text>
      </ng-template>
    </neu-c-chart>
  `,
})
export class StyledChart {
  readonly data = {
    type: 'line',
    axes: { x: { type: 'category', values: [{ id: 'mon', label: 'Mon' }, { id: 'tue', label: 'Tue' }] }, y: { type: 'linear' } },
    series: [{ id: 'visits', name: 'Visits', data: [{ id: 'mon', x: 'mon', y: 28 }, { id: 'tue', x: 'tue', y: 64 }] }],
  } as const satisfies NativeLineData;
  private readonly pointNumbers = new Map(this.data.series[0].data.map((point, index) => [String(point.id), index + 1]));

  readonly options = {
    format: { unit: 'visits' },
    tooltip: { mode: 'docked', content: 'point' },
    legend: { visible: true, position: 'bottom' },
    axes: { y: { referenceLines: [{ id: 'target', value: 50, color: '#803B73', dash: 'dash', label: 'Target' }] } },
    appearance: {
      markers: { visible: true },
      dataLabels: true,
      series: [{ id: 'visits', name: 'Visits', color: '#2460B3' }],
      points: this.data.series[0].data.map(point => ({
        seriesId: 'visits', pointId: point.id, color: point.y >= 50 ? '#B84431' : '#2460B3',
      })),
    },
  } as const satisfies NativeChartOptions<'line'>;
  readonly formatters: NativeChartLabelFormatters = {
    dataLabel: ({ point, text }) => {
      const index = this.pointNumbers.get(point.id.pointId);
      return index === undefined ? undefined : '#' + index + ' ' + text;
    },
    legendLabel: ({ text }) => 'Weekly ' + text,
    xAxisLabel: ({ text }) => text.toUpperCase(),
    yAxisLabel: ({ text, type }) => type === 'number' ? text + ' visits' : undefined,
  };
}
