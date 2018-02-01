import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

class ProtectedRoute extends Component {
  protectRoute = () => {
    // eslint-disable-next-line no-unused-vars
    const { component = Component, isAuthenticated, ...props } = this.props;
    return (
      isAuthenticated === true
        ? <Component {...props} />
        : <Redirect to="/login" />
    );
  };

  render() {
    return (
      <Route
        render={this.protectRoute}
      />
    );
  }
}

ProtectedRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.appState.isAuthenticated,
});

export default connect(mapStateToProps)(ProtectedRoute);
