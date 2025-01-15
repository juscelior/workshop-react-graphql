import React, { useMemo } from 'react';
import Chart from "react-apexcharts";

let counter = 1;
const ApexChart = ({ data }) => {
    const state = useMemo(() => ({
        options: {
          chart: {
            type: 'line',
            toolbar: {
              show: false // Disable the toolbar
            }
          },
          xaxis: {
            labels: {
              show: false // Hide x-axis labels
            }
          },
          yaxis: {
            labels: {
              show: false // Hide y-axis labels
            }
          },
          grid: {
            show: false // Hide grid
          },
          markers: {
            size: 1, // Size of the markers
            colors: ['#FFA41B'],
            // hover: {
            //   size: 5 // Size of the markers on hover
            // }
          }
        },
        stroke: {
          width: 6 // Change the thickness of the line
        },
        series: [
          {
            name: `graph ${counter++}`,
            data: data.map((value, _) => value)
          }
        ]
      }), [data]);

  return <Chart data={state} options={state.options} series={state.series} width={130} />;
};

export default React.memo(ApexChart);
