/* eslint-env jest */
import { createAssertWithPropsToMatchSnapshot } from '../../test-utils';
import JournalContainer from './JournalContainer';

jest.mock('firebase');

describe('JournalContainer', () => {
  const defaultProps = {};

  const assertWithPropsToMatchSnapshot =
    createAssertWithPropsToMatchSnapshot(JournalContainer, defaultProps);
  it('should render', () => {
    assertWithPropsToMatchSnapshot();
  });
});
