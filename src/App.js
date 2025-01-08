import React, { useState } from 'react';
import LineChart from './LineChart';
import ChartWithSubscription from './ChartWithSubscription'
import PaginatedListView from './PaginatedListView';


function App() {
  const [data, setData] = useState([0, 1, 2, 0, 0, 1, 1, 1]);

  const updateData = () => {
    const newData = data.map(() => Math.floor(Math.random() * 3)); // Gera valores aleatórios
    setData(newData);
  };

  return (
    <div>
    <div>
      <h1>React + Chart.js Line Chart</h1>
      <LineChart data={data} />
      <button onClick={updateData}>Update Data</button>
    </div>
    <hr />
    <ChartWithSubscription />
    <hr />
    <PaginatedListView />
    </div>
  );
}

export default App;