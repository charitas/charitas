/* eslint-env jest */
import { createAssertWithPropsToMatchSnapshot } from '../../test-utils';
import Tasks from './Tasks';

jest.mock('firebase');

describe('TasksContainer', () => {
  const defaultProps = {};

  const assertWithPropsToMatchSnapshot =
    createAssertWithPropsToMatchSnapshot(Tasks.WrappedComponent, defaultProps);
  it('should render', () => {
    assertWithPropsToMatchSnapshot();
  });
});
