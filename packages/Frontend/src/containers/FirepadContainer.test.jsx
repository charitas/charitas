/* eslint-env jest */
import { createAssertWithPropsToMatchSnapshot, makeShallowCreateWrapper } from '../../test-utils';
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
        id: '',
      },
    },
  };

  const assertWithPropsToMatchSnapshot =
    createAssertWithPropsToMatchSnapshot(FirepadContainer.WrappedComponent, defaultProps);

  it('should render loading when not authenticated', () => {
    assertWithPropsToMatchSnapshot();
  });

  it('should render when authenticated', () => {
    assertWithPropsToMatchSnapshot({ isAuthenticated: true });
  });

  describe('journals', () => {
    const createWrapper = makeShallowCreateWrapper(FirepadContainer.WrappedComponent, defaultProps);

    it('should set it\'s collection to journals when the url contains journals', () => {
      const extraProps = {
        match: {
          url: '/journals/edit/',
          params: {
            id: '',
          },
        },
      };

      const wrapper = createWrapper(extraProps);
      expect(wrapper.state().collection).toEqual('journals');
    });
  });
});
