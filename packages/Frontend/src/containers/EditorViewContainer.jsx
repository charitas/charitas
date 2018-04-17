import React, { Component, Fragment } from 'react';
import firebase from 'firebase';
import PropTypes from 'prop-types';
import Editor from '../components/Editor';
import { getCollection, getDocumentId } from '../helpers/firestore';

export default class EditorViewContainer extends Component {
  static propTypes = {
    match: PropTypes.shape({
      url: PropTypes.string.isRequired,
      params: PropTypes.shape({
        id: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }

  constructor(props) {
    super(props);
    this.unsubscribe = firebase
      .firestore()
      .collection(getCollection(props.match.url))
      .doc(getDocumentId(props.match.params.id))
      .onSnapshot(this.handleSnapshot);
    this.state = {
      range: { index: 0, length: 0 },
      title: '',
      value: '',
    };
  }

  componentDidMount() {
    if (this.quill) {
      this.setCursor();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.range === null && this.state.range !== null) {
      this.setCursor();
    }
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  setCursor = () => {
    if (this.quill) {
      this.quill.getEditor().getModule('cursors').setCursor(
        1,
        this.state.range,
        'bill',
        'blue',
      );
    }
  }

  setRef = (ref) => { this.quill = ref; };

  handleSnapshot = (doc) => {
    const data = doc.data();
    this.setState({
      range: data.range,
      title: data.title,
      value: data.value,
    }, () => {
      const cursors = this.quill.getEditor().getModule('cursors');
      if (this.state.range) {
        cursors.moveCursor(1, this.state.range);
      } else {
        cursors.removeCursor(1);
      }
    });
  }

  render() {
    return (
      <Fragment>
        <h1>{this.state.title}</h1>
        <Editor
          modules={{
            toolbar: false,
            cursors: true,
          }}
          readOnly
          setRef={this.setRef}
          value={this.state.value}
        />
      </Fragment>
    );
  }
}
