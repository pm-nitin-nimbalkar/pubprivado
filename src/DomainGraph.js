// import * as React from 'react';
// import { BarChart } from '@mui/x-charts/BarChart';


// export default function SimpleBarChart({countData}) {
//     const total = [], error = [], domains = [];
//     Object.keys(countData).map((domain) => {
//         domains.push(domain);
//         total.push(countData[domain].total);
//         error.push(countData[domain].error);
//     });

//   return (
//     <BarChart
//       width={500}
//       height={500}
//       series={[
//         { data: total, label: 'Total hits', id: 'pvId' },
//         { data: error, label: 'Violations', id: 'uvId' },
//       ]}
//       xAxis={[{ data: Object.keys(countData), scaleType: 'band' }]}
//     />
//   );
// }

import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

const uData = [40, 20, 30, 17, 29, 3, 9];
// const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
const xLabels = [
  'Page A',
  'Page B',
  'Page C',
  'Page D',
  'Page E',
  'Page F',
  'Page G',
];

export default function SimpleBarChart() {
  return (
    <BarChart
      width={500}
      height={500}
      series={[
        // { data: pData, label: 'pv', id: 'pvId' },
        { data: uData, label: 'Violations', id: 'uvId' },
      ]}
      xAxis={[{ data: xLabels, scaleType: 'band' }]}
    />
  );
}