/* eslint-env jest */
import React from 'react';
import { shallow } from 'enzyme';
import SidebarTopOverlay from './SidebarTopOverlay';

describe('SidebarLeftOverlay', () => {
  it('should render', () => {
    const wrapper = shallow(<SidebarTopOverlay toggleMenu={() => {}} />);
    expect(wrapper).toMatchSnapshot();
  });
});
