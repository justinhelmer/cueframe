import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from '../shared/PrivateRoute';
import Loadable from '../shared/Loadable';

export default () => (
  <Switch>
    <Route exact path="/" component={Loadable(() => import('./Home'))} />
    <Route path="/login" component={Loadable(() => import('./Login'))} />
    <PrivateRoute path="/dashboard" component={Loadable(() => import('./Dashboard'))} />
  </Switch>
);