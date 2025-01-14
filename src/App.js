import React, { useState } from 'react';
import LineChartVictory from './components/charts/victory/LineChartVictory';
import JustChart from './components/example01/JustChart'
import ChartWithSubscription from './components/example02/ChartWithSubscription';
import PaginatedListView from './PaginatedListView';

function App() {
  return (
    <div>
      <PaginatedListView />
    </div>
  );
}

export default App;