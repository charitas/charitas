import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { APPROVE, CREATE, DOCUMENTS, EDIT, LIBRARY, PHASE, VIEW } from '@the-source-of-truth/shared/constants';
import { SidebarLeftOverlay, SidebarTopOverlay } from './Navigation';
import AuthenticateContainer from '../containers/AuthenticateContainer';
import ConnectionError from './errors/ConnectionError';
import Home from './Home';
import FirepadContainer from '../containers/FirepadContainer';
import Tasks from './Tasks';
import Library from './Library';
import NotFound from '../components/NotFound';
import View from './View';
import '../constants/Font';

const generatePhaseRoutes = phase => (
  <Route
    exact
    key={`phase_route_${phase}`}
    path={`/${DOCUMENTS}/:${PHASE}(${phase})/:${phase === CREATE ? 'id?' : 'id'}`}
    render={props => (<ConnectionError {...props} component={FirepadContainer} />)}
  />);

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
        <View>
          { [EDIT, VIEW, APPROVE, CREATE].map(generatePhaseRoutes) }
          <Route exact path={`/${LIBRARY}`} component={Library} />
          <Route exact path="/sign(up|in)" component={AuthenticateContainer} />
          <Route exact path="/tasks" component={Tasks} />
        </View>
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
