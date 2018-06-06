/* eslint-env jest */
import { createAssertWithPropsToMatchSnapshot } from '../../test-utils';
import FirepadContainer from './FirepadContainer';

describe('FirepadContainer', () => {
  const defaultProps = {
    history: {
      replace: () => {},
    },
    isAuthenticated: false,
    match: {
      url: '',
      params: {
        phase: '',
      },
    },
  };

  const assertWithPropsToMatchSnapshot =
    createAssertWithPropsToMatchSnapshot(FirepadContainer.WrappedComponent, defaultProps);

  it('should pass loading true props when not authenticated', () => {
    assertWithPropsToMatchSnapshot();
  });

  it('should render when authenticated', () => {
    assertWithPropsToMatchSnapshot({ isAuthenticated: true });
  });
});
