/* eslint-env jest */
import { createAssertWithPropsToMatchSnapshot, makeShallowCreateWrapper } from '../../test-utils';
import EditorContainer from './EditorContainer';

jest.mock('firebase');

describe('EditorContainer', () => {
  const defaultProps = {
    history: {
      replace: () => {},
    },
    match: {
      url: '',
      params: {
        id: '',
      },
    },
  };


  it('should render', () => {
    createAssertWithPropsToMatchSnapshot(EditorContainer, defaultProps)();
  });

  describe('journals', () => {
    const createWrapper = makeShallowCreateWrapper(EditorContainer, defaultProps);

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
