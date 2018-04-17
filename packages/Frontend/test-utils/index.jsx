/* eslint-env jest */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { shallow } from 'enzyme';

export const makeShallowCreateWrapper = (Component, defaultProps) =>
  (extraProps) => {
    const props = { ...defaultProps, ...extraProps };
    return shallow(<Component {...props} />);
  };

export const createAssertWithPropsToMatchSnapshot = (Component, defaultProps) => {
  const createWrapper = makeShallowCreateWrapper(Component, defaultProps);
  return (extraProps) => {
    expect(createWrapper(extraProps)).toMatchSnapshot();
  };
};
