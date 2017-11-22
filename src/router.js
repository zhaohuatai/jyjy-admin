import React from 'react';
import {hashHistory, IndexRoute, Route, Router} from 'react-router';
import App from './routes/App';
import Dashboard from './routes/dashboard/Dashboard';
import School from './routes/base/school';
import Career from './routes/base/career';
import Profession from './routes/base/profession';
import Login from './routes/login/Login';
import AuthMenu from './routes/auth/menu/AuthMenu';
import AuthPermission from './routes/auth/permission/AuthPermission';
import AuthRole from './routes/auth/role/AuthRole';
import AuthUser from './routes/auth/user/AuthUser';
import AuthApplication from './routes/auth/application/AuthApplication';
import Slide from './routes/slide';
import Customize from './routes/customize';
import {checkLogin} from './utils/utils';
import Course from './routes/course/course/index';
import CourseItem from './routes/course/courseItem';
import Column from './routes/column/column';
import ColumnItem from './routes/column/columnitem';
import ScoreLine from "./routes/base/scoreLine/index";
import ScoreLineProvince from "./routes/base/scoreLineProvice/index";

const Routers = () => (
  <Router history={hashHistory}>
    <Route path="/" onEnter={checkLogin} component={App}>
      <IndexRoute component={Dashboard}/>
      <Route path="/dashboard" component={Dashboard}/>

      <Route path="/base">
        <Route path="school" component={School}/>
        <Route path="career" component={Career}/>
        <Route path="profession" component={Profession}/>
        <Route path="score-line" component={ScoreLine}/>
        <Route path="score-line-province" component={ScoreLineProvince}/>
      </Route>

      <Route path="course">
        <Route path="course-list" component={Course}/>
        <Route path="course-item" component={CourseItem}/>
        {/*<Route path="course-category" component={CourseCategory}/>*/}
      </Route>

      <Route path="column">
        <Route path="column-list" component={Column}/>
        <Route path="column-item" component={ColumnItem}/>
      </Route>

      {/*<Route path="entrance" component={entrance}>*/}
      {/*<Route path="category" component={entranceCategory}/>*/}
      {/*<Route path="appointment" component={entranceAppointment}/>*/}
      {/*</Route>*/}

      <Route path="slide" component={Slide}/>

      <Route path="customize" component={Customize}/>

      <Route path="/auth">
        <Route path="menu" component={AuthMenu}/>
        <Route path="permission" component={AuthPermission}/>
        <Route path="user" component={AuthUser}/>
        <Route path="application" component={AuthApplication}/>
        <Route path="role" component={AuthRole}/>
      </Route>
    </Route>

    <Route path="/login" component={Login}/>
  </Router>
);

export default Routers;
