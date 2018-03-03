/* eslint-env jest */
import React from 'react';
import { shallow } from 'enzyme';
import { createAssertWithPropsToMatchSnapshot } from '../../test-utils';
import SignIn from './SignIn';

describe('SignIn', () => {
  const noOp = () => {};
  const defaultProps = {
    error: false,
    loading: false,
    signIn: noOp,
    submitIfEnter: noOp,
    updateFormByKey: noOp,
  };
  const assertWithPropsToMatchSnapshot =
    createAssertWithPropsToMatchSnapshot(SignIn, defaultProps);
  it('should render', () => {
    assertWithPropsToMatchSnapshot();
  });

  it('should render an error when passed as a prop', () => {
    assertWithPropsToMatchSnapshot({ error: 'test error' });
  });

  it('should render a loading message when passed loading as a prop', () => {
    assertWithPropsToMatchSnapshot({ loading: true });
  });
});
