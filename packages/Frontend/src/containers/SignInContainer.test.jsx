/* eslint-env jest */
import React from 'react';
import { shallow } from 'enzyme';
import { Auth } from 'aws-amplify';
import { createAssertWithPropsToMatchSnapshot } from '../../test-utils';
import SignInContainer from './SignInContainer';

jest.mock('aws-amplify', () => ({
  Auth: {
    currentAuthenticatedUser: jest.fn(() => Promise.resolve({ username: 'user' })),
    signIn: jest.fn((username, password) => new Promise((resolve, reject) => {
      if (username === 'user' && password === 'password') {
        resolve();
      }
      reject();
    })),
  },
}));

describe('SignInContainer', () => {
  const defaultProps = {
    isAuthenticated: false,
    login: () => {},
  };
  const assertWithPropsToMatchSnapshot =
    createAssertWithPropsToMatchSnapshot(SignInContainer.WrappedComponent, defaultProps);
  it('should render', () => {
    assertWithPropsToMatchSnapshot();
  });

  it('should render a Redirect when authenticated', () => {
    assertWithPropsToMatchSnapshot({ isAuthenticated: true });
  });

  describe('submitIfEnter', () => {
    it('should call SignIn if the key is Enter', () => {
      const inst = shallow(<SignInContainer.WrappedComponent {...defaultProps} />).instance();
      inst.signIn = jest.fn();
      inst.submitIfEnter({ key: 'Enter' });
      expect(inst.signIn).toHaveBeenCalledTimes(1);
    });

    it('should not call SignIn if the key is not Enter', () => {
      const inst = shallow(<SignInContainer.WrappedComponent {...defaultProps} />).instance();
      inst.signIn = jest.fn();
      inst.submitIfEnter({ key: 'J' });
      expect(inst.signIn).toHaveBeenCalledTimes(0);
    });
  });

  describe('updateFormByKey', () => {
    it('should return a function', () => {
      const inst = shallow(<SignInContainer.WrappedComponent {...defaultProps} />).instance();
      const res = inst.updateFormByKey('key');
      expect(typeof res).toBe('function');
    });

    it('should return a function that calls setState with the key and target', () => {
      const key = 'key';
      const value = 'val';
      const inst = shallow(<SignInContainer.WrappedComponent {...defaultProps} />).instance();
      inst.setState = jest.fn();
      const res = inst.updateFormByKey(key);
      res({ target: { value } });
      expect(inst.setState).toHaveBeenCalledWith({ key: value });
    });
  });

  describe('signIn', () => {
    it('should call setState with { error: \'\', loading: true } and a callback', () => {
      const inst = shallow(<SignInContainer.WrappedComponent {...defaultProps} />).instance();
      inst.setState = jest.fn();
      inst.signIn();
      expect(inst.setState.mock.calls[0][0]).toEqual({ error: '', loading: true });
      expect(typeof inst.setState.mock.calls[0][1]).toBe('function');
    });

    describe('callback', () => {
      it('should call Auth.signIn, Auth.currentAuthenticatedUser, props.login, then set loading false', () => {
        const login = jest.fn();
        const wrapper =
          shallow(<SignInContainer.WrappedComponent {...defaultProps} login={login} />);
        const inst = wrapper.instance();
        wrapper.setState({ username: 'user', password: 'password' });
        inst.setState = jest.fn();
        inst.signIn();
        const callback = inst.setState.mock.calls[0][1];
        callback();
        expect(Auth.signIn).toHaveBeenCalledWith('user', 'password');
      });
    });
  });
});
