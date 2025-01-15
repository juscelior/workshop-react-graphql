import React, { useState, useEffect } from 'react';
import { useQuery, useSubscription } from '@apollo/client';
import { GET_CHART_DATA_PAGED, CHART_DATA_UPDATED } from './services/graphqlQueries';
import LazyLineChart from './components/charts/chartjs/LazyLineChart';
import LazyLineVictory from './components/charts/victory/LazyLineVictory';
import LazyLineApexChart from './components/charts/apexchart/LazyLineApexChart';

const PaginatedListView = () => {
  const [page, setPage] = useState(1);
  const pageSize = 1000;
  const [items, setItems] = useState([]);
  const [selectedChart, setselectedChart] = useState('victory');


  const { loading, error, data } = useQuery(GET_CHART_DATA_PAGED, {
    variables: { page, pageSize },
    onCompleted: (data) => {
      setItems(data.chartDataPaged.data);
    },
  });

  const { data: subscriptionData } = useSubscription(CHART_DATA_UPDATED);

  useEffect(() => {
    if (subscriptionData) {
      console.log(subscriptionData)
      const updatedItem = subscriptionData.updatedData;
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === updatedItem.id ? updatedItem : item
        )
      );
    }
  }, [subscriptionData]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleNextPage = () => {
    if (page < data.chartDataPaged.totalPages) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleRadioChange = (event) => {
    setselectedChart(event.target.value);
  };

  const renderComponent = (item, index) => {
    switch (selectedChart) {
      case 'chartJS':
        return <LazyLineChart key={index} data={item.points} />;
      case 'victory':
        return <LazyLineVictory key={index} data={item.points} />;
      case 'apexChart':
        return <LazyLineApexChart key={index} data={item.points} />;
      default:
        return null;
    }
  };

  return (
    <div>
      <h3>Page {data.chartDataPaged.currentPage} of {data.chartDataPaged.totalPages}</h3>

      <div>
        <label>
          <input
            type="radio"
            value="chartJS"
            checked={selectedChart === 'chartJS'}
            onChange={handleRadioChange}
          />
          Chart.JS
        </label>
        <label>
          <input
            type="radio"
            value="victory"
            checked={selectedChart === 'victory'}
            onChange={handleRadioChange}
          />
          Victory
        </label>
        <label>
          <input
            type="radio"
            value="apexChart"
            checked={selectedChart === 'apexChart'}
            onChange={handleRadioChange}
          />
          ApexChart
        </label>
      </div>


      <div style={{ marginTop: '10px' }}>
        <button onClick={handlePreviousPage} disabled={page === 1}>Previous</button>
        <button onClick={handleNextPage} disabled={page === data.chartDataPaged.totalPages}>Next</button>
      </div>
      <div style={{ display: 'table', width: '100%', borderCollapse: 'collapse' }}>
        <div style={{ display: 'table-row', fontWeight: 'bold', borderBottom: '1px solid #ccc' }}>
          <div style={{ display: 'table-cell', padding: '8px' }}>ID</div>
          <div style={{ display: 'table-cell', padding: '8px' }}>Label</div>
          <div style={{ display: 'table-cell', padding: '8px' }}>Points</div>
        </div>
        {items.map((item, index) => (
          <div key={item.id} style={{ display: 'table-row', borderBottom: '1px solid #ccc' }}>
            <div style={{ display: 'table-cell', padding: '8px' }}>{item.id}</div>
            <div style={{ display: 'table-cell', padding: '8px' }}>{item.label}</div>
            <div style={{ display: 'table-cell', padding: '8px', width: '100px', height: '30px' }}>
                {renderComponent(item, index)}
            </div>            
            <div style={{ display: 'table-cell', padding: '8px' }}>{item.points.join(', ')}</div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default PaginatedListView;