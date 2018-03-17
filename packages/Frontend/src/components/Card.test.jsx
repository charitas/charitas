/* eslint-env jest */
import { createAssertWithPropsToMatchSnapshot } from '../../test-utils';
import Card from './Card';

describe('Card', () => {
  const defaultProps = {
    starFilled: false,
    toggleFav: () => {},
  };
  const assertWithPropsToMatchSnapshot =
    createAssertWithPropsToMatchSnapshot(Card, defaultProps);
  it('should render', () => {
    assertWithPropsToMatchSnapshot();
  });

  it('should render as star filled when passed starFilled as a prop', () => {
    assertWithPropsToMatchSnapshot({ starFilled: true });
  });
});
