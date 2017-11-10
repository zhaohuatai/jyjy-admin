import React from 'react';
import {Router, Route, hashHistory, IndexRoute} from 'react-router';
import App from './routes/App';
import Content from './routes/content/Content';
import User from './routes/user/User';
import Money from './routes/trading/Trading';
import Dashboard from './routes/dashboard/Dashboard';
import Login from './routes/login/Login';
import Order from './routes/order/Order';
import Category from './routes/category/Category';
import Setting from './routes/setting/Setting';
import Product from './routes/product/Product';
import AuthMenu from './routes/auth/menu/AuthMenu';
import AuthPermission from './routes/auth/permission/AuthPermission';
import AuthRole from './routes/auth/role/AuthRole';
import AuthUser from './routes/auth/user/AuthUser';
import AuthApplication from './routes/auth/application/AuthApplication';

import {checkLogin} from './utils/utils';

const Routers = function(){
  return(
    <Router history={hashHistory}>
      <Route path='/' onEnter={checkLogin} component={App}>
        <IndexRoute component={Dashboard} />
        <Route path='/content' component={Content} />
        <Route path='/member' component={User} />
        <Route path='/trading' component={Money} />
        <Route path='/order' component={Order} />
        <Route path='/setting' component={Setting} />
        <Route path='/product' component={Product} />
        <Route path='/dashboard' component={Dashboard} />
        <Route path='/category' component={Category} />

        <Route path='/auth' >
          <Route path='menu' component={AuthMenu} />
          <Route path='permission' component={AuthPermission} />
          <Route path='user' component={AuthUser} />
          <Route path='application' component={AuthApplication} />
          <Route path='role' component={AuthRole} />
        </Route>
      </Route>

      <Route path='/login' component={Login} />
    </Router>
  );
};

export default Routers;