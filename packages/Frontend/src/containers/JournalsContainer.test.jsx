/* eslint-env jest */
import { createAssertWithPropsToMatchSnapshot } from '../../test-utils';
import JournalsContainer from './JournalsContainer';

jest.mock('firebase');

describe('JournalsContainer', () => {
  const defaultProps = {};

  const assertWithPropsToMatchSnapshot =
    createAssertWithPropsToMatchSnapshot(JournalsContainer, defaultProps);
  it('should render', () => {
    assertWithPropsToMatchSnapshot();
  });
});
