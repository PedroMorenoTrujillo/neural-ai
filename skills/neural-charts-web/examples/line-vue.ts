import { defineComponent, h, shallowRef } from 'vue';
import { Chart, type ChartData, type ChartOptions } from '@neural-charts/vue';

const data: ChartData = {
  type: 'line',
  axes: { x: { type: 'linear' }, y: { type: 'linear' } },
  series: [
    { id: 'current', name: 'This week', data: [{ id: 'mon', x: 1, y: 12 }, { id: 'tue', x: 2, y: 18 }] },
    { id: 'previous', name: 'Last week', data: [{ id: 'mon', x: 1, y: 9 }, { id: 'tue', x: 2, y: 11 }] },
  ],
};

export const VisitsChart = defineComponent({
  setup() {
    const options = shallowRef<ChartOptions>({
      title: 'Weekly visits',
      accessibility: { description: 'Daily visits for the current and previous week.' },
      tooltip: { enabled: true },
      legend: { visible: true },
      hiddenSeriesIds: [],
    });
    function applyVisibility(ids: readonly string[]) {
      options.value = { ...options.value, hiddenSeriesIds: ids };
    }
    return () => h(Chart, { data, options: options.value, onHiddenSeriesChange: applyVisibility });
  },
});
