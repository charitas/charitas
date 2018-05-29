/* eslint-env jest */
import React from 'react';
import { shallow } from 'enzyme';
import Dialog from './Dialog';

describe('Dialog Component', () => {
  it('should be a function', () => {
    expect(typeof Dialog).toBe('function');
  });

  it('should render Dialog when dialogIsOpen is true', () => {
    const wrapper = shallow(<Dialog
      dialogIsOpen
      handleClose={() => {}}
      handleSubmit={() => {}}
    />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should not render Dialog when dialogIsOpen is false', () => {
    const wrapper = shallow(<Dialog
      dialogIsOpen={false}
      handleClose={() => {}}
      handleSubmit={() => {}}
    />);
    expect(wrapper).toMatchSnapshot();
  });
});
