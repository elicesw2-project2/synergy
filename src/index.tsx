import React from 'react';
import ReactDOM from 'react-dom/client';
import App from 'App';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Reset } from 'styled-reset';

import { BrowserRouter } from 'react-router-dom';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Reset />
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
