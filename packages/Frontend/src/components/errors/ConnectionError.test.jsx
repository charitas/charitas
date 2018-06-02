/* eslint-env jest */
import React from 'react';
import { createAssertWithPropsToMatchSnapshot } from '../../../test-utils';
import ConnectionError from './ConnectionError';

describe('ConnectionError', () => {
  const defaultProps = {
    component: () => (<div />),
    classes: {
      root: '',
      close: '',
    },
  };
  it('should render', () => {
    createAssertWithPropsToMatchSnapshot(ConnectionError, defaultProps)();
  });
});
