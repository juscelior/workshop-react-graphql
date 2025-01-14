import React, { useEffect, useState } from 'react';
import LineChartVictory from '../charts/victory/LineChartVictory';

const JustChart = () => {
  const [data, setData] = useState([0, 1, 2, 0, 0, 1, 1, 1]);

  const updateData = () => {
    const newData = data.map(() => Math.floor(Math.random() * 3)); // Gera valores aleatórios
    setData(newData);
  };

  return (
  <div>
    <h1>React + Victory Line Chart</h1>
    <LineChartVictory data={data} />
    <button onClick={updateData}>Update Data</button>
  </div>
  );
};

export default JustChart;
