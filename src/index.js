import React, { Profiler } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloProvider } from '@apollo/client';
import client from './apolloClient';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Profiler id="LineChart" onRender={(id, phase, actualDuration, baseDuration, startTime, commitTime, interactions) => {
    console.log({ id, phase, actualDuration, baseDuration, startTime, commitTime, interactions });
  }}>
    <React.StrictMode>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </React.StrictMode>
  </Profiler>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
