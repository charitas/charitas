import React, { Component, Fragment } from 'react';
import firebase from 'firebase';
import Editor from '../components/Editor';

export default class EditorContainer extends Component {
  constructor(props) {
    super(props);
    this.db = firebase.firestore();
    this.state = {
      loading: true,
      title: '',
      value: '',
    };
  }

  componentDidMount() {
    this.db.collection('editor').doc('test').get()
      .then((doc) => {
        if (doc.exists) {
          const { title, value } = doc.data();
          this.setState({
            loading: false,
            title,
            value,
          }, () => {
            if (this.quill) {
              this.quill.focus();
              const editor = this.quill.getEditor();
              editor.setSelection(editor.getLength());
            }
          });
        } else {
          this.setState({ loading: false });
        }
      });
  }


  onChangeSelection = (range, source, editor) => {
    if (!this.state.loading) {
      const getRange = () => {
        if (range === null) {
          return range;
        }
        const { index, length } = range;
        return { index, length };
      };

      this.setState({ value: editor.getHTML(), range: getRange() }, () => {
        this.updateDb({
          value: this.state.value,
          range: this.state.range,
        });
      });
    }
  }

  setRef = (ref) => { this.quill = ref; };

  updateDb = (value) => {
    this.db.collection('editor').doc('test').update(value)
      .catch(err => console.log('err writing value to firebase: ', err));
  }

  handleTitleChange = ({ target: { value } }) => {
    const update = { title: value };
    this.setState(update, () => {
      this.updateDb(update);
    });
  }

  render() {
    return (
      <Fragment>
        <input onChange={this.handleTitleChange} value={this.state.title} />
        <Editor
          onChangeSelection={this.onChangeSelection}
          setRef={this.setRef}
          value={this.state.value}
        />
      </Fragment>
    );
  }
}
