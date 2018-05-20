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
    isAnonymous: PropTypes.bool,
    logout: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
  }

  static defaultProps = {
    isAnonymous: true,
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
        auth().signInAnonymously().catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // eslint-disable-next-line no-console
          return console.log(errorCode, errorMessage);
        });
      }
    });
  }

  toggleVisibility = () => this.setState({ visible: !this.state.visible })

  render() {
    return (
      <BrowserRouter>
        <App
          isAnonymous={this.props.isAnonymous}
          toggleVisibility={this.toggleVisibility}
          visible={this.state.visible}
        />
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => ({
  isAnonymous: state.user.isAnonymous,
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  login: user => dispatch(login(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
