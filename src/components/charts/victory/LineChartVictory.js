import React from 'react';
import { VictoryChart, VictoryLine, VictoryTheme } from 'victory';

const LineChartVictory = ({ data }) => {
  const chartData = data.map((y, x) => ({ x, y }));

  return (
    <VictoryChart
      theme={VictoryTheme.material}
      width={1000} // Scaled width to maintain aspect ratio
      height={300} // Scaled height to maintain aspect ratio
    >
      <VictoryLine
        data={chartData}
        style={{
          data: { stroke: 'steelblue' },
        }}
      />
    </VictoryChart>
  );
};

export default LineChartVictory;