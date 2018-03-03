/* eslint-env jest */
import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

describe('App', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<App.WrappedComponent
      isAuthenticated
      logout={() => {}}
      toggleVisibility={() => {}}
      visible
    />);
    expect(wrapper).toMatchSnapshot();
  });
});
