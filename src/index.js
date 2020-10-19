import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import CategoryStore from './Category/Store';

ReactDOM.render(
  <Provider store={CategoryStore}>
    <App />
  </Provider>,
  document.getElementById('root')
);