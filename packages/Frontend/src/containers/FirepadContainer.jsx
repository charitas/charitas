import React, { Component } from 'react';
import { database } from 'firebase';
import PropTypes from 'prop-types';
import CodeMirror from 'codemirror';
import { connect } from 'react-redux';
import Firepad from '../components/Firepad';
import { getCollection, getDocumentId } from '../helpers/firestore';

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
        id: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    readOnly: PropTypes.bool,
    uid: PropTypes.string,
  }

  static defaultProps = {
    readOnly: true,
    uid: '',
  }

  constructor(props) {
    super(props);
    this.state = {
      collection: getCollection(props.match.url),
      dialogIsOpen: false,
      documentId: getDocumentId(props.match.params.id),
      title: '',
    };
    this.setRef();
    this.ref.once('value', (snapshot) => {
      this.setState({ title: snapshot.val().title });
    });
  }

  componentDidMount() {
    if (this.props.isAuthenticated && this.props.uid) {
      this.initFirepad();
    }
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.isAuthenticated && this.props.isAuthenticated && this.props.uid) {
      this.initFirepad();
    }
  }

  setRef() {
    const collectionRef = database().ref(this.state.collection);
    if (this.state.documentId) {
      this.ref = collectionRef.child(this.state.documentId);
    } else {
      const docRef = collectionRef.push();
      this.props.history.replace(`/${this.state.collection}/edit/${docRef.key}`);
      this.ref = docRef;
    }
  }

  initFirepad() {
    const { readOnly, uid } = this.props;
    const cm = CodeMirror(document.getElementById('firepad-container'), {
      lineWrapping: true,
      readOnly: readOnly ? 'nocursor' : false,
    });
    fromCodeMirror(
      this.ref, cm,
      {
        richTextToolbar: !readOnly,
        richTextShortcuts: !readOnly,
        userId: uid,
      },
    );
  }

  handleClose = () => {
    this.setState({ dialogIsOpen: false });
  };

  handleSubmit = () => {}

  openDialog = () => {
    this.setState({ dialogIsOpen: true });
  }

  handleTitleChange = ({ target: { value } }) => {
    const newTitle = { title: value };
    this.setState(newTitle, () => {
      this.ref.update(newTitle);
    });
  }

  render() {
    if (!this.props.isAuthenticated) {
      return (<p>Loading...</p>);
    }
    return (
      <Firepad
        title={this.state.title}
        handleClose={this.handleClose}
        handleSubmit={this.handleSubmit}
        handleTitleChange={this.handleTitleChange}
        dialogIsOpen={this.state.dialogIsOpen}
        openDialog={this.openDialog}
        readOnly={this.props.readOnly}
      />
    );
  }
}

const mapStateToProps = state => ({
  uid: state.user.uid,
  isAuthenticated: state.user.isAuthenticated,
});

export default connect(mapStateToProps)(FirepadContainer);
