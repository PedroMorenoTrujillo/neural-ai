import { createChart, type ChartData } from '@neural-charts/web';

const data: ChartData = {
  type: 'line',
  axes: { x: { type: 'linear' }, y: { type: 'linear' } },
  series: [{
    id: 'visits', name: 'Visits',
    data: [{ id: 'mon', x: 1, y: 26 }, { id: 'tue', x: 2, y: 32 }],
  }],
};

export function mountVisits(host: HTMLElement, instanceId: string): () => void {
  const result = createChart(host, data, {
    title: 'Daily visits',
    accessibility: { description: 'Visits went from 26 on Monday to 32 on Tuesday.' },
  }, { instanceId });
  if (result.status !== 'ok') {
    host.textContent = 'Daily visits: Monday 26, Tuesday 32.';
    return () => host.replaceChildren();
  }
  return () => result.value.destroy();
}
