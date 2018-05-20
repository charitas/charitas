import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { BrowserRouter } from 'react-router-dom';
import { auth } from 'firebase';
import App from '../components/App';
import logout from '../actions/logout';
import login from '../actions/login';

class AppContainer extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  componentDidMount() {
    auth().onAuthStateChanged((user) => {
      if (user) {
        const {
          displayName, email, emailVerified, isAnonymous, metadata, providerData, uid,
        } = user;
        this.props.login({
          displayName, email, emailVerified, isAnonymous, metadata, providerData, uid,
        });
      } else {
        this.props.logout();
      }
    });
  }

  toggleVisibility = () => this.setState({ visible: !this.state.visible })

  render() {
    return (
      <BrowserRouter>
        <App
          isAuthenticated={this.props.isAuthenticated}
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
  login: user => dispatch(login(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
