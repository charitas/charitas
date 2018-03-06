import React, { Component } from 'react';
import { Auth } from 'aws-amplify';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router';
import PropTypes from 'prop-types';
import Authenticate from '../components/Authenticate';
import login from '../actions/login';

const signInRoute = '/signin';

class AuthenticateContainer extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    login: PropTypes.func.isRequired,
    match: PropTypes.shape({
      isExact: PropTypes.bool.isRequired,
      path: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }).isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      error: '',
      loading: false,
      password: '',
    };
  }

  updateFormByKey = key => ({ target }) => {
    this.setState({ [key]: target.value });
  };

  authenticate = () => {
    if (this.props.match.url === signInRoute) {
      return this.signIn();
    }
    return this.signUp();
  }

  signIn = () => {
    const { email, password } = this.state;
    this.setState({ error: '', loading: true }, () => {
      Auth.signIn(email, password)
        .then(() => Auth.currentAuthenticatedUser())
        .then(user => this.props.login(user))
        .catch(error => this.setState({ error }))
        .finally(() => this.setState({ loading: false }));
    });
  }

  signUp = () => {}

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />;
    }

    const { error, loading } = this.state;
    let errMessage;
    if (error) { errMessage = typeof error === 'string' ? error : error.message; }
    return (<Authenticate
      authenticate={this.authenticate}
      error={errMessage || false}
      loading={loading}
      signingin={this.props.match.url === signInRoute}
      updateFormByKey={this.updateFormByKey}
    />);
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.user.isAuthenticated,
});

const mapDispatchToProps = dispatch => ({
  login: user => dispatch(login(user)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AuthenticateContainer));
