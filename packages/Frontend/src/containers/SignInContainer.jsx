import React, { Component } from 'react';
import { Auth } from 'aws-amplify';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router';
import PropTypes from 'prop-types';
import SignIn from '../components/SignIn';
import login from '../actions/login';

class SignInContainer extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    login: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      error: '',
      loading: false,
      password: '',
      username: '',
    };
  }

  updateFormByKey = key => ({ target }) => this.setState({ [key]: target.value });

  signIn = () => {
    const { username, password } = this.state;
    this.setState({ error: '', loading: true }, () => {
      Auth.signIn(username, password)
        .then(() => Auth.currentAuthenticatedUser())
        .then(user => this.props.login(user))
        .catch(error => this.setState({ error }))
        .finally(() => this.setState({ loading: false }));
    });
  }

  submitIfEnter = ({ key }) => {
    if (key === 'Enter') {
      this.signIn();
    }
  }

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />;
    }

    const { error, loading } = this.state;
    let errMessage;
    if (error) { errMessage = typeof error === 'string' ? error : error.message; }
    return (<SignIn
      error={errMessage || false}
      loading={loading}
      signIn={this.signIn}
      submitIfEnter={this.submitIfEnter}
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignInContainer));
