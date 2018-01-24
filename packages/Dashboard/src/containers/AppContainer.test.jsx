/* eslint-env mocha */
/* eslint-disable no-unused-expressions */
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import AppContainer from './AppContainer';
import App from '../components/App';

describe('AppContainer', () => {
  it('should a render', () => {
    shallow(<AppContainer />);
  });

  it('should render app', () => {
    const wrapper = shallow(<AppContainer />);
    expect(wrapper.find(App).length).to.equal(1);
  });
});
