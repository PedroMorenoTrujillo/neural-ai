'use client';

import { useState } from 'react';
import { Chart, type ChartData } from '@neural-charts/react';

const data: ChartData = {
  type: 'line',
  axes: { x: { type: 'linear' }, y: { type: 'linear' } },
  series: [{
    id: 'visits', name: 'Visits',
    data: [{ id: 'mon', x: 1, y: 26 }, { id: 'tue', x: 2, y: 32 }],
  }, {
    id: 'previous', name: 'Previous week',
    data: [{ id: 'mon', x: 1, y: 18 }, { id: 'tue', x: 2, y: 23 }],
  }],
};

export function VisitsChart() {
  const [hiddenSeriesIds, setHiddenSeriesIds] = useState<readonly string[]>([]);
  return (
    <Chart data={data} options={{
      title: 'Daily visits',
      hiddenSeriesIds,
      accessibility: { description: 'Daily visits are higher than the previous week on both days.' },
    }} onHiddenSeriesChange={setHiddenSeriesIds} />
  );
}
