import React, { useEffect, useState } from 'react';
import { useQuery, useSubscription } from '@apollo/client';
import { GET_CHART_DATA, CHART_DATA_UPDATED } from '../../services/graphqlQueries';
import LineChart from '../charts/chartjs/LineChart'; // Componente de gráfico criado anteriormente

const ChartWithSubscription = () => {
  const [chartData, setChartData] = useState([]);

  // Query inicial para buscar os dados
  const { data: queryData, loading: queryLoading } = useQuery(GET_CHART_DATA);

  // Subscription para atualizações em tempo real
  const { data: subscriptionData, error: subscriptionError } = useSubscription(CHART_DATA_UPDATED);

  // Atualizar os dados após a query inicial
  useEffect(() => {
    if (queryData) {
      setChartData(queryData.chartData.points);
    }
  }, [queryData]);

  // Atualizar os dados em tempo real via subscription
  useEffect(() => {
    if (subscriptionData) {
      setChartData(subscriptionData.updatedData.points);
    }
  }, [subscriptionData]);

  if (queryLoading) return <p>Loading...</p>;
  if (subscriptionError) return <p>Error: {subscriptionError.message}</p>;

  return (
    <div>
      <h1>GraphQL Subscription Example</h1>
      <LineChart data={chartData} />
    </div>
  );
};

export default ChartWithSubscription;
