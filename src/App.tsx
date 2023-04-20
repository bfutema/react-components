import React from 'react';

import { LineChart } from './components/atoms/LineChart';

const data = [10, 20, 30, 40, 50, 60, 70];
const width = 400;
const height = 300;

export const App: React.FC = () => {
  return (
    <div>
      <LineChart
        data={[
          { x: 0, y: 20 },
          { x: 1, y: 30 },
          { x: 2, y: 25 },
          { x: 3, y: 35 },
          { x: 4, y: 45 },
          { x: 5, y: 40 },
        ]}
        width={500}
        height={250}
        // stroke="#ff0000"
      />
    </div>
  );
};
