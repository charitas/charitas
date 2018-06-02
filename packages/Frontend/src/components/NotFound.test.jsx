/* eslint-env jest */
import { createAssertWithPropsToMatchSnapshot } from '../../test-utils';
import NotFound from './NotFound';

describe('NotFound', () => {
  it('should render', () => {
    createAssertWithPropsToMatchSnapshot(NotFound.WrappedComponent, {})();
  });
});
