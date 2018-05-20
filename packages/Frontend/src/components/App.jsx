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
        <Route
          path="/journals/edit/:id"
          render={props => <FirepadContainer readOnly={false} {...props} />}
        />
        <Route path="/journals/view/:id" component={FirepadContainer} />
        <Route path="/library" component={Library} />
        <Route path="/sign(up|in)" component={AuthenticateContainer} />
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
