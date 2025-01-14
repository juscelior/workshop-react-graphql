import React, { useState, useEffect } from 'react';
import { useQuery, useSubscription } from '@apollo/client';
import {GET_CHART_DATA_PAGED, CHART_DATA_UPDATED} from './graphqlQueries';
import LineChart from './LineChart'; // Componente de gráfico criado anteriormente
import { FixedSizeList as List } from 'react-window';
import LazyLineChart from './LazyLineChart';


const PaginatedListView = () => {
  const [page, setPage] = useState(1);
  const pageSize = 1000;
  const [items, setItems] = useState([]);


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

  return (
    <div>
      <h3>Page {data.chartDataPaged.currentPage} of {data.chartDataPaged.totalPages}</h3>
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
            <div style={{ display: 'table-cell', padding: '8px' }}>
                <LazyLineChart key={index} data={item.points} />
            </div>            
            <div style={{ display: 'table-cell', padding: '8px' }}>{item.points.join(', ')}</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '10px' }}>
        <button onClick={handlePreviousPage} disabled={page === 1}>Previous</button>
        <button onClick={handleNextPage} disabled={page === data.chartDataPaged.totalPages}>Next</button>
      </div>
    </div>
  );
};

export default PaginatedListView;