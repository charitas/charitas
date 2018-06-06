import React, { Component } from 'react';
import { database } from 'firebase';
import PropTypes from 'prop-types';
import CodeMirror from 'codemirror';
import { connect } from 'react-redux';
import { CHANGING_PHASE, CREATE, DOCUMENTS, PHASE, VIEW } from '@the-source-of-truth/shared/constants';
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
      loading: true,
      notFound: false,
      [PHASE]: '',
      submitted: false,
      submitting: false,
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
  }

  componentWillUnmount() {
    this.ref.off();
  }

  getOrCreateFirepadDocument() {
    const { phase, id } = this.props.match.params;
    if (phase === CREATE && !id) {
      return this.createFirepadDocument();
    }
    this.ref = database().ref(DOCUMENTS).child(id);
    this.listenForDocChanges();
    return Promise.resolve();
  }

  createFirepadDocument() {
    this.ref = database().ref(DOCUMENTS).push();
    return Promise.all([
      this.ref.child(PHASE).set(CREATE),
      this.ref.child('title').set(''),
      this.ref.child(CHANGING_PHASE).set(false),
    ])
      .then(() => {
        this.props.history.replace(`/${DOCUMENTS}/${CREATE}/${this.ref.key}`);
        this.listenForDocChanges();
      })
      .catch(this.handleError);
  }

  listenForDocChanges() {
    this.ref.on('value', this.handleSnapshot, this.handleError);
  }

  handleError = (error) => {
    // eslint-disable-next-line no-console
    console.error(error);
    this.setState({ error });
  }

  handleSnapshot = (snapshot) => {
    const data = snapshot.val();
    if (data !== null) {
      const { changingPhase, phase, title } = data;
      if (this.verifyPhase(phase)) {
        if (!this.state.firepadInitialized) {
          this.setState({ firepadInitialized: true }, this.initFirepad);
        }
      }
      this.setState({
        changingPhase,
        phase,
        title,
      });
    } else {
      this.setState({ notFound: true });
    }
  }

  init() {
    this.getOrCreateFirepadDocument()
      .then(() => {
        this.listenForDocChanges();
      });
  }

  verifyPhase(dbPhase) {
    const { phase } = this.props.match.params;
    if (phase === VIEW || phase === dbPhase) {
      return true;
    }
    this.setState({
      error: {
        message: `You are trying to ${phase} a document,
            but it's currently in the ${dbPhase} phase`,
        code: 'phase-mismatch',
      },
    });
    return false;
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
      this.ref.update(newTitle)
        .catch(this.handleError);
    });
  }

  handleSubmit = () => {
    this.setState({ submitting: true }, () => {
      this.ref.off();
      Promise.all([
        database()
          .ref('tasks').push({
            type: 'submit',
            payload: {
              id: this.ref.key,
            },
          }),
        this.ref.update({
          [CHANGING_PHASE]: true,
        }),
      ])
        .then(() => {
          this.setState({
            submitting: false,
            submitted: true,
          });
        })
        .catch(this.handleError);
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
        phase={this.state.phase}
        readOnly={this.isReadOnly()}
        submitting={this.state.submitting}
        submitted={this.state.submitted}
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
