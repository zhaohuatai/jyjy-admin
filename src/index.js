import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import AppReducer from './reducer';
import thunkMiddleware from 'redux-thunk';

import Router from './router';

ReactDOM.render(
  <Provider store={createStore(
    AppReducer,
    applyMiddleware(
      thunkMiddleware
    )
  )}>
    <Router/>
  </Provider>,
  document.getElementById('app')
);