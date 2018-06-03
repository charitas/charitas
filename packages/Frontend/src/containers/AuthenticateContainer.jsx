import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router';
import { auth } from 'firebase';
import PropTypes from 'prop-types';
import Authenticate from '../components/Authenticate';

const signInRoute = '/signin';

class AuthenticateContainer extends Component {
  static propTypes = {
    isAnonymous: PropTypes.bool,
    match: PropTypes.shape({
      isExact: PropTypes.bool.isRequired,
      path: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }).isRequired,
  }

  static defaultProps = {
    isAnonymous: true,
  }

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      error: false,
      loading: false,
      password: '',
    };
  }

  componentDidMount = () => {
    this.setState({ loading: true }, () => {
      auth().getRedirectResult().then(() => {
        this.setState({ loading: false });
      }, (error) => {
        this.setState({ loading: false });
        if (error.code === 'auth/account-exists-with-different-credential') {
          // eslint-disable-next-line no-unused-vars
          auth().fetchProvidersForEmail(error.email).then((providers) => {
            // this means that they are trying to sign up for an account but
            // they already have one with a different provider. providers here
            // is an array of all of the providers they have an account through.
            // We need to follow the guide here:
            // https://firebase.google.com/docs/auth/web/account-linking
            // to offer to link to their other accounts if they want, or just
            // let them sign in with the other provider(s).
          });
        }
      });
    });
  };

  updateFormByKey = key => ({ target }) => {
    this.setState({ [key]: target.value });
  };

  authenticate = (provider) => {
    if (provider === 'google') {
      return this.authenticateWithProvider(new auth.GoogleAuthProvider());
    }
    if (provider === 'facebook') {
      return this.authenticateWithProvider(new auth.FacebookAuthProvider());
    }
    if (this.props.match.url === signInRoute) {
      return this.signIn();
    }
    return this.signUp();
  }

  signIn = () => {
    this.setState({ loading: true, error: false }, () => {
      auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => this.setState({ loading: false }))
        .catch(error => this.setState({ loading: false, error }));
    });
  }

  signUp = () => {
    auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
      .catch(error => this.setState({ error }));
  }

  authenticateWithProvider = (provider) => {
    auth().useDeviceLanguage();
    auth().signInWithRedirect(provider);
  };

  render() {
    if (!this.props.isAnonymous) {
      return <Redirect to="/" />;
    }

    const { error, loading } = this.state;
    return (<Authenticate
      authenticate={this.authenticate}
      error={error || false}
      loading={loading}
      signingin={this.props.match.url === signInRoute}
      updateFormByKey={this.updateFormByKey}
    />);
  }
}

const mapStateToProps = state => ({
  isAnonymous: state.user.isAnonymous,
});

export default withRouter(connect(mapStateToProps)(AuthenticateContainer));
