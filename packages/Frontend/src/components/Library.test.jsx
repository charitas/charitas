/* eslint-env jest */
import React from 'react';
import { shallow } from 'enzyme';
import Library from './Library';

describe('Library', () => {
  it('should render', () => {
    expect(shallow(<Library />)).toMatchSnapshot();
  });
});
