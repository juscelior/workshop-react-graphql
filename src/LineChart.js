import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({ data }) => {
  const chartData = {
    labels: data.map((_, index) => index),
    datasets: [
      {
        label: 'Dataset',
        data: data,
        fill: false,
        borderColor: 'steelblue',
        borderWidth: 2,
        tension: 0.4, // Suaviza a curva
        pointBackgroundColor: 'steelblue',
        pointRadius: 3,
      },
    ],
  };

  const options = {
    responsive: false,
    maintainAspectRatio: false,
    plugins: {
        legend: {
          display: false,
        },
        tooltip: {
            enabled: false,
        }
      },
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
  };

  return <Line data={chartData} options={options} width={100} height={30} />;
};

export default LineChart;
