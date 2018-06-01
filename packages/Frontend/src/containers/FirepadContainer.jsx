import React, { Component } from 'react';
import { database, firestore } from 'firebase';
import PropTypes from 'prop-types';
import CodeMirror from 'codemirror';
import { connect } from 'react-redux';
import { CHANGING_PHASE, CREATE, JOURNALS, REALTIME_DATABASE_ID, VIEW } from '../constants';
import Firepad from '../components/Firepad';

global.CodeMirror = CodeMirror;
const { fromCodeMirror } = require('firepad/dist/firepad');

class FirepadContainer extends Component {
  static propTypes = {
    history: PropTypes.shape({
      replace: PropTypes.func.isRequired,
    }).isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    match: PropTypes.shape({
      url: PropTypes.string.isRequired,
      params: PropTypes.shape({
        id: PropTypes.string,
        phase: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    uid: PropTypes.string,
  }

  static defaultProps = {
    uid: '',
  }

  constructor(props) {
    super(props);
    this.state = {
      [CHANGING_PHASE]: false,
      dialogIsOpen: false,
      firepadInitialized: false,
      loading: true,
      notFound: false,
      realtimeDatabaseReady: false,
      title: '',
    };
  }

  componentDidMount() {
    if (this.props.isAuthenticated) {
      this.init();
    }
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.isAuthenticated && this.props.isAuthenticated) {
      this.init();
    }
    if (
      this.props.isAuthenticated &&
      this.state.realtimeDatabaseReady &&
      !this.state.firepadInitialized
    ) {
      this.initFirepad();
    }
  }

  getOrCreatePrimaryDocument() {
    const { id, phase } = this.props.match.params;
    if (phase === CREATE && !id) {
      return firestore()
        .collection(JOURNALS)
        .add({
          phase,
        });
    }
    const primaryDoc = firestore()
      .collection(JOURNALS)
      .doc(id);
    return primaryDoc
      .get()
      .then((doc) => {
        if (doc.exists) {
          return primaryDoc;
        }
        this.setState({
          notFound: true,
        });
        return null;
      });
  }

  getOrCreateFirepadDocument(primaryDoc) {
    const { phase, id } = this.props.match.params;
    if (phase === CREATE && !id) {
      this.createFirepadDocument(primaryDoc);
    } else {
      const realTimeId = primaryDoc.data()[REALTIME_DATABASE_ID];
      this.ref = database().ref(JOURNALS).child(realTimeId);
      this.ref.child('title').once('value', (snapshot) => {
        this.setState({ title: snapshot.val() });
      }, error => this.setState({ error }));
      this.setState({
        realtimeDatabaseReady: true,
      });
    }
  }

  init() {
    this.getOrCreatePrimaryDocument()
      .then((primaryDocRef) => {
        if (primaryDocRef) {
          this.primaryDocRef = primaryDocRef;
          primaryDocRef
            .onSnapshot(this.handleSnapshot);
        }
      });
  }

  createFirepadDocument(primaryDoc) {
    this.ref = database().ref(JOURNALS).push();
    this.ref.child('phase')
      .set(CREATE)
      .catch(error => this.setState({ error }));
    this.primaryDocRef.update({
      [REALTIME_DATABASE_ID]: this.ref.key,
    })
      .then(() => {
        this.props.history.replace(`/${JOURNALS}/${CREATE}/${primaryDoc.id}`);
        this.setState({
          realtimeDatabaseReady: true,
        });
      });
  }

  handleSnapshot = (primaryDoc) => {
    if (primaryDoc.exists) {
      this.primaryDoc = primaryDoc;
      const changingPhase = primaryDoc.data()[CHANGING_PHASE];
      if (changingPhase) {
        this.setState({
          changingPhase,
          realtimeDatabaseReady: false,
          creatingFirepad: false,
        });
      } else if (
        this.verifyPhases(primaryDoc) &&
        !this.state.realtimeDatabaseReady &&
        !this.state.creatingFirepad
      ) {
        this.setState({ creatingFirepad: true }, () => {
          this.getOrCreateFirepadDocument(primaryDoc);
        });
      }
    } else {
      this.setState({ notFound: true });
    }
  }

  verifyPhases(primaryDoc) {
    const { phase } = this.props.match.params;
    const dbPhase = primaryDoc.data().phase;
    if (phase === VIEW || phase === dbPhase) {
      return primaryDoc;
    }
    this.setState({
      error: {
        message: `You are trying to ${phase} a document,
            but it's currently in the ${dbPhase} phase`,
        code: 'phase-mismatch',
      },
    });
    return null;
  }

  initFirepad() {
    const { uid } = this.props;
    const readOnly = this.isReadOnly();
    const cm = CodeMirror(document.getElementById('firepad-container'), {
      lineWrapping: true,
      readOnly: readOnly ? 'nocursor' : false,
    });
    this.firepadInst = fromCodeMirror(
      this.ref, cm,
      {
        richTextToolbar: !readOnly,
        richTextShortcuts: !readOnly,
        userId: uid,
      },
    );
    this.setState({
      firepadInitialized: true,
    });
    this.firepadInst.on('ready', () => {
      this.setState({
        loading: false,
      }, () => {
        // we call refresh here because we get a blank editor until we click on it otherwise
        // see https://github.com/codemirror/CodeMirror/issues/2469
        cm.refresh();
      });
    });
  }

  handleClose = () => {
    this.setState({ dialogIsOpen: false });
  };

  openDialog = () => {
    this.setState({ dialogIsOpen: true });
  }

  isReadOnly = () => this.props.match.params.phase === VIEW

  handleTitleChange = ({ target: { value } }) => {
    const newTitle = { title: value };
    this.setState(newTitle, () => {
      this.ref.update(newTitle);
    });
  }

  handleSubmit = () => {
    this.primaryDocRef
      .update({
        [CHANGING_PHASE]: true,
      })
      .catch((error) => {
        this.setState({ error });
      });
  }

  render() {
    const loading = !this.props.isAuthenticated || this.state.loading;
    return (
      <Firepad
        changingPhase={this.state.changingPhase}
        dialogIsOpen={this.state.dialogIsOpen}
        error={this.state.error}
        handleClose={this.handleClose}
        handleSubmit={this.handleSubmit}
        handleTitleChange={this.handleTitleChange}
        loading={loading}
        notFound={this.state.notFound}
        openDialog={this.openDialog}
        readOnly={this.isReadOnly()}
        title={this.state.title}
      />
    );
  }
}

const mapStateToProps = state => ({
  uid: state.user.uid,
  isAuthenticated: state.user.isAuthenticated,
});

export default connect(mapStateToProps)(FirepadContainer);
