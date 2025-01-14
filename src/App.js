import React, { useState } from 'react';
import LineChart from './LineChart';
import ChartWithSubscription from './ChartWithSubscription';
import PaginatedListView from './PaginatedListView';
import ApexChart from './ApexChart';
import './App.css';

function App() {
  const [data, setData] = useState([0, 1, 2, 0, 0, 1, 1, 1]);
  const [showChartJS, setShowChartJS] = useState(false);

  const changeChart = () => {
    setShowChartJS(!showChartJS);
  };

  const updateData = () => {
    const newData = data.map(() => Math.floor(Math.random() * 3)); // Gera valores aleatórios
    setData(newData);
  };

  return (
    <div>
      <div>
        <h1>React + Chart.js Line Chart</h1>
        <LineChart data={data} />
        <button className='button' onClick={updateData}>Update Data</button>
        <button className='button' onClick={changeChart}>Show ChartJS</button>
      </div>
      <hr />
      {showChartJS ?
        <div>
          <ChartWithSubscription />
          <hr />
          <PaginatedListView />
        </div>
        :
        <div>
          {
            Array.from({ length: 100}).map((_, i) => (
              <ApexChart key={i} data={data} />
            ))
          }
        </div>
      }
    </div>
  );
}

export default App;