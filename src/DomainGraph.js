import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';


export default function SimpleBarChart({countData}) {
    const total = [], error = [], domains = [];
    Object.keys(countData).map((domain) => {
        domains.push(domain);
        total.push(countData[domain].total);
        error.push(countData[domain].error);
    });

  return (
    <BarChart
      width={500}
      height={500}
      series={[
        { data: total, label: 'Total hits', id: 'pvId' },
        { data: error, label: 'Violations', id: 'uvId' },
      ]}
      xAxis={[{ data: Object.keys(countData), scaleType: 'band' }]}
    />
  );
}
