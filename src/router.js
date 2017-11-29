import React from 'react';
import {hashHistory, IndexRoute, Redirect, Route, Router} from 'react-router';
import App from './routes/App';
import Dashboard from './routes/dashboard/index';
import School from './routes/base/school';
import Career from './routes/base/career';
import Profession from './routes/base/profession';
import Login from './routes/Login'

import AuthMenu from './routes/auth/menu/AuthMenu';
import AuthPermission from './routes/auth/permission/AuthPermission';
import AuthRole from './routes/auth/role/AuthRole';
import AuthUser from './routes/auth/user/AuthUser';

import AuthApplication from './routes/auth/application/AuthApplication';
import Slide from './routes/customize/slide';

import Course from './routes/course/course/index';
import CourseItem from './routes/course/courseItem';
import CourseCategory from './routes/course/coursecategory';

import Column from './routes/column/column';
import ColumnItem from './routes/column/columnitem';

import ScoreLine from "./routes/base/scoreLine/index";
import ScoreLineProvince from "./routes/base/scoreLineProvice/index";

import Setting from "./routes/setting/config/index";

import Page from "./routes/customize/page/index";
import Partner from "./routes/setting/partner";
import ServiceContent from './routes/entrance/service';
import Success from "./routes/customize/success/index";

import Member from "./routes/member/member";
import Teacher from "./routes/member/teacher/index";
import Coupon from "./routes/member/coupon";

import TeacherAppointment from "./routes/member/appointment";
import VipCard from "./routes/setting/card";

import Appointment from "./routes/entrance/appointment/index";


const Routers = () => (
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Dashboard}/>
      <Route path="/index" component={Dashboard}/>

      <Route path="/base">
        <Route path="school" component={School}/>
        <Route path="career" component={Career}/>
        <Route path="profession" component={Profession}/>
        <Route path="score-line" component={ScoreLine}/>
        <Route path="score-line-province" component={ScoreLineProvince}/>
      </Route>

      <Route path="/course">
        <Route path="course-list" component={Course}/>
        <Route path="course-item" component={CourseItem}/>
        <Route path="course-category" component={CourseCategory}/>
      </Route>

      <Route path="/column">
        <Route path="column-list" component={Column}/>
        <Route path="column-item" component={ColumnItem}/>
      </Route>

      <Route path='/entrance'>
        <Route path="service" component={ServiceContent}/>
        <Route path="appointment" component={Appointment}/>
      </Route>

      {/*<Route path='/enroll-self'>*/}
      {/*<Route path="award" component={Award}/>*/}
      {/*<Route path="question" component={Question}/>*/}
      {/*<Route path="big-data" component={BigData}/>*/}
      {/*<Route path="admission-brochures" component={AdmissionBrochures}/>*/}
      {/*</Route>*/}

      {/*<Route path='/qa'>*/}
      {/*<Route path="entrance-service" component={Entrance}/>*/}
      {/*<Route path="enroll-self" component={EnrollSelf}/>*/}
      {/*</Route>*/}

      <Route path='/member'>
        <Route path="management" component={Member}/>
        <Route path="teacher" component={Teacher}/>
        <Route path="appointment" component={TeacherAppointment}/>
        <Route path="coupon" component={Coupon}/>
      </Route>

      <Route path='/customize'>
        <Route path="slide" component={Slide}/>
        <Route path="page" component={Page}/>
        <Route path="case-success" component={Success}/>
      </Route>

      <Route path="/auth">
        <Route path="menu" component={AuthMenu}/>
        <Route path="permission" component={AuthPermission}/>
        <Route path="user" component={AuthUser}/>
        <Route path="application" component={AuthApplication}/>
        <Route path="role" component={AuthRole}/>
      </Route>

      <Route path="/system">
        <Route path="config" component={Setting}/>
        <Route path="partner" component={Partner}/>
        <Route path="vip-card" component={VipCard}/>
      </Route>

    </Route>

    <Route path="/login" component={Login}/>

    <Redirect path="*" to='/'/>

    {/*<Route path="*" component={PageNotFound} />*/}

  </Router>
);

export default Routers;
