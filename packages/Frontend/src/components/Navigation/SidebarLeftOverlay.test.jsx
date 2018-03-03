/* eslint-env jest */
import React from 'react';
import { shallow } from 'enzyme';
import SidebarLeftOverlay from './SidebarLeftOverlay';
import { createAssertWithPropsToMatchSnapshot } from '../../../test-utils';

describe('SidebarLeftOverlay', () => {
  const noOp = () => {};
  const defaultProps = Object.freeze({
    isAuthenticated: false,
    logout: noOp,
    sideBarVisibility: true,
    toggleMenu: noOp,
  });
  describe('rendering', () => {
    const assertWithPropsToMatchSnapshot =
      createAssertWithPropsToMatchSnapshot(SidebarLeftOverlay, defaultProps);

    it('should render a sign in menu item when not authenticated', () => {
      assertWithPropsToMatchSnapshot();
    });

    it('should render a sign out menu item when authenticated', () => {
      assertWithPropsToMatchSnapshot({ isAuthenticated: true });
    });

    it('should not render a sidebar when sideBarVisibility is false', () => {
      assertWithPropsToMatchSnapshot({ sideBarVisibility: false });
    });

    it('should render a sidebar when sideBarVisibility is true', () => {
      assertWithPropsToMatchSnapshot({ sideBarVisibility: true });
    });
  });

  describe('event listeners', () => {
    it('should add an event listener on mousedown', () => {
      document.addEventListener = jest.fn();
      const inst = shallow(<SidebarLeftOverlay {...defaultProps} />).instance();
      expect(document.addEventListener).toHaveBeenCalledWith('mousedown', inst.handleOffClick);
    });

    it('should remove an event listener on mousedown when unmounted', () => {
      document.removeEventListener = jest.fn();
      const inst = shallow(<SidebarLeftOverlay {...defaultProps} />).instance();
      inst.componentWillUnmount();
      expect(document.removeEventListener).toHaveBeenCalledWith('mousedown', inst.handleOffClick);
    });
  });

  describe('handleOffClick', () => {
    it('should call toggleMenu, when it\'s ref does not contain the event target', () => {
      const toggleMenu = jest.fn();
      const inst = shallow(<SidebarLeftOverlay
        {...defaultProps}
        toggleMenu={toggleMenu}
      />).instance();
      const containingDiv = document.createElement('div');
      const outsideDiv = document.createElement('div');
      inst.ref = containingDiv;
      inst.handleOffClick({ target: outsideDiv });
      expect(toggleMenu).toHaveBeenCalled();
    });

    it('should not call toggleMenu, when it\'s ref contains the event target', () => {
      const toggleMenu = jest.fn();
      const inst = shallow(<SidebarLeftOverlay
        {...defaultProps}
        toggleMenu={toggleMenu}
      />).instance();
      const containingDiv = document.createElement('div');
      const childDiv = document.createElement('div');
      containingDiv.appendChild(childDiv);
      inst.ref = containingDiv;
      inst.handleOffClick({ target: childDiv });
      expect(toggleMenu).toHaveBeenCalledTimes(0);
    });
  });

  describe('handleRef', () => {
    it('should set this.ref to the passed in element', () => {
      const inst = shallow(<SidebarLeftOverlay {...defaultProps} />).instance();
      inst.handleRef('mock el');
      expect(inst.ref).toBe('mock el');
    });
  });

  describe('handleLogout', () => {
    it('should be a method on SidebarLeftOverlay', () => {
      const inst = shallow(<SidebarLeftOverlay {...defaultProps} />).instance();
      expect(typeof inst.handleLogout).toBe('function');
    });

    it('should call props.logout', () => {
      const logout = jest.fn();
      const inst = shallow(<SidebarLeftOverlay
        {...defaultProps}
        logout={logout}
      />).instance();
      inst.handleLogout();
      expect(logout).toHaveBeenCalledTimes(1);
    });

    it('should call props.toggleMenu', () => {
      const toggleMenu = jest.fn();
      const inst = shallow(<SidebarLeftOverlay
        {...defaultProps}
        toggleMenu={toggleMenu}
      />).instance();
      inst.handleLogout();
      expect(toggleMenu).toHaveBeenCalledTimes(1);
    });
  });
});
