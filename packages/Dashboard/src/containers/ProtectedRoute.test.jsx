/* eslint-env mocha */
/* eslint-disable no-unused-expressions */
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

describe('ProtectedRoute', () => {
  it('should a render', () => {
    shallow(<ProtectedRoute.WrappedComponent />);
  });

  it('should render one Route', () => {
    const wrapper = shallow(<ProtectedRoute.WrappedComponent />);
    expect(wrapper.find(Route).length).to.equal(1);
  });
});
