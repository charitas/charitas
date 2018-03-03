/* eslint-env jest */
import React from 'react';
import { shallow } from 'enzyme';
import SignUp from './SignUp';

describe('SignUp', () => {
  it('should render', () => {
    expect(shallow(<SignUp />)).toMatchSnapshot();
  });
});
