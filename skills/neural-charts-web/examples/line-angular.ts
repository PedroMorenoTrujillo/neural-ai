import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { NeuralChart, type ChartData, type ChartOptions } from '@neural-charts/angular';

@Component({
  selector: 'example-visits-chart',
  imports: [NeuralChart],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button type="button" (click)="showPreviousWeek()">Show previous week</button>
    <nc-chart [data]="data()" [options]="options()" [instanceId]="instanceId()" />
  `,
})
export class VisitsChart {
  readonly instanceId = input.required<string>();
  readonly data = signal<ChartData>({
    type: 'line',
    axes: { x: { type: 'linear' }, y: { type: 'linear' } },
    series: [{
      id: 'visits', name: 'Visits',
      data: [{ id: 'mon', x: 1, y: 26 }, { id: 'tue', x: 2, y: 32 }],
    }],
  });

  readonly options = signal<ChartOptions>({
    title: 'Daily visits',
    accessibility: { description: 'Visits went from 26 on Monday to 32 on Tuesday.' },
  });

  showPreviousWeek(): void {
    this.data.set({
      type: 'line',
      axes: { x: { type: 'linear' }, y: { type: 'linear' } },
      series: [{
        id: 'visits', name: 'Visits',
        data: [{ id: 'mon', x: 1, y: 18 }, { id: 'tue', x: 2, y: 23 }],
      }],
    });
    this.options.set({
      title: 'Previous week',
      accessibility: { description: 'Visits went from 18 on Monday to 23 on Tuesday.' },
    });
  }
}
