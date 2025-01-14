import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import LineChart from './LineChart';

interface LazyLineChartProps {
  data: number[];
}

const LazyLineChart: React.FC<LazyLineChartProps> = ({ data }) => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Renderiza apenas uma vez
    threshold: 0.1, // Renderiza quando 10% do componente estiver visível
  });

  const [isRendered, setIsRendered] = useState(false);

  if (inView && !isRendered) {
    setIsRendered(true); // Define como renderizado quando visível
  }

  return (
    <div ref={ref} style={{ minHeight: '50px' }}>
      {isRendered ? <LineChart data={data} /> : null}
    </div>
  );
};

export default LazyLineChart;
