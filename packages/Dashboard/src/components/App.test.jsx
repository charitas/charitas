/* eslint-env mocha */
/* eslint-disable no-unused-expressions */
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { Route } from 'react-router-dom';
import App from './App';
import Login from './Login';
import Nav from './Nav';
import ProtectedRoute from '../containers/ProtectedRoute';

describe('App', () => {
  it('should a render', () => {
    shallow(<App />);
  });

  it('should render a Route with a login path that renders Login', () => {
    const wrapper = shallow(<App />);
    const loginRoute = wrapper.find(Route);
    expect(loginRoute).to.exist;
    expect(loginRoute.props().path).to.equal('/login');
    expect(loginRoute.props().component).to.equal(Login);
  });

  it('should render a ProtectedRoute with exact path / that renders Nav', () => {
    const wrapper = shallow(<App />);
    const rootRoute = wrapper.find(ProtectedRoute);
    expect(rootRoute).to.exist;
    expect(rootRoute.props().path).to.equal('/');
    expect(rootRoute.props().exact).to.equal(true);
    expect(rootRoute.props().component).to.equal(Nav);
  });
});
