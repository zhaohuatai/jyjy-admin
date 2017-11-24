import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from './store';
import Router from './router';

import './utils/ueditor/ueditor.config';
import './utils/ueditor/ueditor.all.min';
import './utils/ueditor/zh-cn';

ReactDOM.render(
  <Provider store={store}>
    <Router />
  </Provider>,
  document.getElementById('app')
);