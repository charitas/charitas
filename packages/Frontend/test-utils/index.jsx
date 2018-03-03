/* eslint-env jest */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { shallow } from 'enzyme';

// eslint-disable-next-line import/prefer-default-export
export const createAssertWithPropsToMatchSnapshot = (Component, defaultProps) =>
  (extraProps) => {
    const props = { ...defaultProps, ...extraProps };
    const wrapper = shallow(<Component {...props} />);
    expect(wrapper).toMatchSnapshot();
  };
