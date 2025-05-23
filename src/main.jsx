import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom'; // ← import this
import store from './redux/store';

import App from './App.jsx';

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter> {/* ← wrap App with BrowserRouter */}
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);
