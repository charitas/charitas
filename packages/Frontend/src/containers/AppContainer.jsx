import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { BrowserRouter } from 'react-router-dom';
import { auth, database } from 'firebase';
import App from '../components/App';
import removeUser from '../actions/removeUser';
import setUser from '../actions/setUser';

class AppContainer extends Component {
  static propTypes = {
    isAnonymous: PropTypes.bool,
    removeUser: PropTypes.func.isRequired,
    setUser: PropTypes.func.isRequired,
  }

  static defaultProps = {
    isAnonymous: true,
  }

  static handleError(error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  componentDidMount() {
    auth().onAuthStateChanged((user) => {
      if (this.forceTokenRefresh && this.permissionsTimestampRef) {
        this.permissionsTimestampRef.off('value', this.forceTokenRefresh);
      }
      if (user) {
        this.handleLogin(user);
      } else {
        this.logoutAndSignInAnonymously();
      }
    });
  }

  setPermissionTimestampListener(uid) {
    this.permissionsTimestampRef = database().ref(`users/${uid}/permissionsTimestamp`);
    this.permissionsTimestampRef
      .on('value', this.handlePermissionsTimestampSnapshot, AppContainer.handleError);
  }

  getAndProcessIdToken = () => {
    auth().currentUser.getIdTokenResult()
      .then(({ issuedAtTime, claims }) => {
        const { author, editor } = claims;
        this.props.setUser({ claims: { author, editor } });
        this.setState({ issuedAtTime });
      })
      .catch(AppContainer.handleError);
  }

  handleLogin = (user) => {
    this.forceTokenRefresh = () => user.getIdToken(true);
    const {
      displayName, email, emailVerified, isAnonymous, metadata, providerData, uid,
    } = user;
    this.props.setUser({
      displayName, email, emailVerified, isAnonymous, metadata, providerData, uid,
    });
    this.setPermissionTimestampListener(user.uid);
    this.getAndProcessIdToken();
  }

  logoutAndSignInAnonymously = () => {
    this.user = null;
    this.props.removeUser();
    auth().signInAnonymously().catch(AppContainer.handleError);
  }

  handlePermissionsTimestampSnapshot = (snapshot) => {
    const permissionsTimestamp = snapshot.val();
    if (permissionsTimestamp > Date.parse(this.state.issuedAtTime)) {
      this.forceTokenRefresh().then(this.getAndProcessIdToken);
    }
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
  removeUser: () => dispatch(removeUser()),
  setUser: user => dispatch(setUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
