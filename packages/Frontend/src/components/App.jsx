import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { SidebarLeftOverlay, SidebarTopOverlay } from './Navigation';
import Home from './Home';
import JournalsContainer from '../containers/JournalsContainer';
import Library from './Library';
import AuthenticateContainer from '../containers/AuthenticateContainer';
import FirepadContainer from '../containers/FirepadContainer';
import NotFound from '../components/NotFound';
import Tasks from '../components/Tasks';

function App({
  isAnonymous, toggleVisibility, visible,
}) {
  return (
    <Fragment>
      <SidebarTopOverlay toggleMenu={toggleVisibility} />
      <SidebarLeftOverlay
        isAnonymous={isAnonymous}
        sideBarVisibility={visible}
        toggleMenu={toggleVisibility}
      />
      <div style={{ height: '40px' }} />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/journals" component={JournalsContainer} />
        <Route exact path="/journals/:phase(edit|view)/:id" component={FirepadContainer} />
        <Route exact path="/journals/:phase(create)/:id?" component={FirepadContainer} />
        <Route exact path="/library" component={Library} />
        <Route exact path="/sign(up|in)" component={AuthenticateContainer} />
        <Route exact path="/tasks" component={Tasks} />
        <Route component={NotFound} />
      </Switch>
    </Fragment>
  );
}

App.propTypes = {
  isAnonymous: PropTypes.bool.isRequired,
  toggleVisibility: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
};

export default withRouter(App);
