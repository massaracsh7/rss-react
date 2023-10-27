import React from 'react';

import ReactDOM from 'react-dom/client';

import App from './App.tsx';
import './index.css';
import './libs/normalize.css';
import { ErrorBoundary } from './utils/ErrorBoundary.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
);
