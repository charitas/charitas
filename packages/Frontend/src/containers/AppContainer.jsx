import React, { Component } from 'react';
import Amplify from 'aws-amplify';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { BrowserRouter } from 'react-router-dom';
import App from '../components/App';
import logout from '../actions/logout';

Amplify.configure({
  Auth: {
    identityPoolId: process.env.AWS_AUTH_IDENTITYPOOLID,
    region: process.env.AWS_AUTH_REGION,
    userPoolId: process.env.AWS_AUTH_USERPOOLID,
    userPoolWebClientId: process.env.AWS_AUTH_USERPOOLWEBCLIENTID,
    mandatorySignIn: false,
  },
});

class AppContainer extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  toggleVisibility = () => this.setState({ visible: !this.state.visible })

  render() {
    return (
      <BrowserRouter>
        <App
          isAuthenticated={this.props.isAuthenticated}
          logout={this.props.logout}
          toggleVisibility={this.toggleVisibility}
          visible={this.state.visible}
        />
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.user.isAuthenticated,
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
