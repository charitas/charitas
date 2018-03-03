/* eslint-env jest */
import React from 'react';
import { shallow } from 'enzyme';
import Home from './Home';

describe('Home', () => {
  it('should render', () => {
    expect(shallow(<Home />)).toMatchSnapshot();
  });
});
