import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { store } from './store'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

const root = ReactDOM.createRoot(document.getElementById('root'));
const persistor = persistStore(store)
const queryClient = new QueryClient()
root.render(
  <QueryClientProvider client={queryClient}>
      <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
  </QueryClientProvider>

);
