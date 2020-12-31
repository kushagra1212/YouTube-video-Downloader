import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'

import App from './App';

import { createStore } from 'redux';
import Netreducers from './components/reducers/Netreducers'

const store=createStore(Netreducers);

//console.log(store.getState())
ReactDOM.render(
  <React.StrictMode>
    <Provider  store={store} >
    <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


