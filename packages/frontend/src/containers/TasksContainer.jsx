import React, { Component, Fragment } from 'react';
import { database } from 'firebase';
import { fromJS, List, Map } from 'immutable';
import { Link } from 'react-router-dom';
import { CREATE, DOCUMENTS, EDIT, PHASE, VIEW } from '@the-source-of-truth/shared/constants';
import Loading from '../components/Loading';

export default class TasksContainer extends Component {
  static createDocumentLinks(doc) {
    const title = doc.get('title');
    const phase = doc.get(PHASE);
    const viewHref = `/${DOCUMENTS}/${VIEW}/${doc.get('id')}`;
    const editHref = `/${DOCUMENTS}/${phase}/${doc.get('id')}`;
    return (
      <div key={doc.get('id')} >
        <Link
          to={viewHref}
          href={viewHref}
        >
          {title || 'Untitled'}
        </Link>
        <Link
          to={editHref}
          href={editHref}
        >
          {'    (continue)'}
        </Link>
      </div>
    );
  }

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      documents: fromJS({
        [CREATE]: [],
        [EDIT]: [],
      }),
    };
  }

  componentDidMount() {
    this.ref = database()
      .ref(DOCUMENTS);
    this.setListenerByPhase(CREATE);
    this.setListenerByPhase(EDIT);
  }

  componentWillUnmount() {
    this.ref.off();
  }

  setListenerByPhase(phase) {
    this.ref
      .orderByChild(PHASE)
      .equalTo(phase)
      .on('value', this.handleSnapshot(phase), this.handleError);
  }

  handleError = (error) => {
    // eslint-disable-next-line no-console
    console.error(error);
  }

  handleSnapshot = phase => (snapshot) => {
    if (this.state.loading) {
      this.setState({ loading: false });
    }
    const data = snapshot.val();

    const documents = Object.keys(data)
      .reduce((cur, acc) => cur.push(new Map({ id: acc, ...data[acc] })), new List([]));

    this.setState({ documents: this.state.documents.set(phase, documents) });
  }

  render() {
    if (this.state.loading) {
      return (<Loading />);
    }
    return (
      <Fragment>
        <button><a href={`/${DOCUMENTS}/create`}>Create Document</a></button>
        <h3>Create Tasks</h3>
        { this.state.documents.get(CREATE).map(TasksContainer.createDocumentLinks) }
        <h3>Edit Tasks</h3>
        { this.state.documents.get(EDIT).map(TasksContainer.createDocumentLinks) }
      </Fragment>
    );
  }
}
