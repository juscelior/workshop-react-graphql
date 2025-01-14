import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import LineChartVictory from './LineChartVictory';

interface LazyLineVictoryProps {
  data: number[];
}

const LazyLineVictory: React.FC<LazyLineVictoryProps> = ({ data }) => {
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
      {isRendered ? <LineChartVictory data={data} /> : null}
    </div>
  );
};

export default LazyLineVictory;
