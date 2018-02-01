import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import ProtectedRoute from '../containers/ProtectedRoute';
import Login from './Login';
import Nav from './Nav';

export default function App() {
  return (
    <Fragment>
      <Route path="/login" component={Login} />
      <ProtectedRoute exact path="/" component={Nav} />
    </Fragment>
  );
}
