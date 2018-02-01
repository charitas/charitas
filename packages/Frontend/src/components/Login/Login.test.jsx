/* eslint-env mocha */
import React from 'react';
import { shallow } from 'enzyme';
import Login from './Login';

describe('Login', () => {
  it('should a render', () => {
    shallow(<Login />);
  });
});
