import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { SidebarLeftOverlay, SidebarTopOverlay } from './Navigation';
import Home from './Home';
import Journal from './Journal';
import Library from './Library';
import SignInContainer from '../containers/SignInContainer';
import SignUp from './SignUp';

function App({
  isAuthenticated, logout, toggleVisibility, visible,
}) {
  return (
    <Fragment>
      <SidebarTopOverlay toggleMenu={toggleVisibility} />
      <SidebarLeftOverlay
        isAuthenticated={isAuthenticated}
        logout={logout}
        sideBarVisibility={visible}
        toggleMenu={toggleVisibility}
      />
      <div style={{ height: '40px' }} />
      <Route exact path="/" component={Home} />
      <Route path="/journal" component={Journal} />
      <Route path="/library" component={Library} />
      <Route path="/signin" component={SignInContainer} />
      <Route path="/signup" component={SignUp} />
    </Fragment>
  );
}

App.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
  toggleVisibility: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
};

export default withRouter(App);
