/* eslint-env jest */
import { createAssertWithPropsToMatchSnapshot } from '../../test-utils';
import Loading from './Loading';

describe('Loading', () => {
  it('should render', () => {
    createAssertWithPropsToMatchSnapshot(Loading, {})();
  });
});
