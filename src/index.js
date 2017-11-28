import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import AppReducer from './reducer';
import thunkMiddleware from 'redux-thunk';
import {siteName} from './utils/config';


import Router from './router';

import './utils/ueditor/ueditor.config';
import './utils/ueditor/ueditor.all.min';
import './utils/ueditor/zh-cn';

ReactDOM.render(
  document.title = `${siteName} - 后台管理`,
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