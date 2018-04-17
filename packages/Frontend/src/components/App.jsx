import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { SidebarLeftOverlay, SidebarTopOverlay } from './Navigation';
import Home from './Home';
import JournalsContainer from '../containers/JournalsContainer';
import Library from './Library';
import AuthenticateContainer from '../containers/AuthenticateContainer';
import EditorContainer from '../containers/EditorContainer';
import EditorViewContainer from '../containers/EditorViewContainer';

function App({
  isAuthenticated, toggleVisibility, visible,
}) {
  return (
    <Fragment>
      <SidebarTopOverlay toggleMenu={toggleVisibility} />
      <SidebarLeftOverlay
        isAuthenticated={isAuthenticated}
        sideBarVisibility={visible}
        toggleMenu={toggleVisibility}
      />
      <div style={{ height: '40px' }} />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/journals" component={JournalsContainer} />
        <Route path="/journals/edit/:id" component={EditorContainer} />
        <Route path="/journals/view/:id" component={EditorViewContainer} />
        <Route path="/library" component={Library} />
        <Route path="/sign(up|in)" component={AuthenticateContainer} />
      </Switch>
    </Fragment>
  );
}

App.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  toggleVisibility: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
};

export default withRouter(App);
