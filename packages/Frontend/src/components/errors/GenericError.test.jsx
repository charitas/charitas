/* eslint-env jest */
import { createAssertWithPropsToMatchSnapshot } from '../../../test-utils';
import GenericError from './GenericError';

describe('GenericError', () => {
  const defaultProps = {
    history: {
      push: () => {},
    },
  };
  it('should render', () => {
    createAssertWithPropsToMatchSnapshot(GenericError, defaultProps)();
  });
});
