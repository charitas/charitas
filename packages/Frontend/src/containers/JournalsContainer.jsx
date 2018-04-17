import React, { Component, Fragment } from 'react';
import firebase from 'firebase';
import { List, Map } from 'immutable';
import { Link } from 'react-router-dom';

export default class JournalsContainer extends Component {
  constructor(props) {
    super(props);
    this.db = firebase.firestore();
    this.state = {
      loading: true,
      journals: new List([]),
    };
  }

  componentDidMount() {
    this.db.collection('journals')
      .get()
      .then(querySnapshot =>
        querySnapshot.docs.reduce((journals, journal) =>
          journals.push(new Map({ id: journal.id, ...journal.data() })), new List([])))
      .then(journals => this.setState({ journals, loading: false }));
  }

  render() {
    if (this.state.loading) {
      return (<p>Loading</p>);
    }
    return (
      <Fragment>
        <button><a href="/journals/edit/create">Create Journal</a></button>
        { this.state.journals.map((journal) => {
          const viewHref = `/journals/view/${journal.get('id')}`;
          const editHref = `/journals/edit/${journal.get('id')}`;
          return (
            <div key={journal.get('id')} >
              <Link
                to={viewHref}
                href={viewHref}
              >
                {journal.get('title')}
              </Link>
              <Link
                to={editHref}
                href={editHref}
              >
                (edit)
              </Link>
            </div>
          );
        })}
      </Fragment>
    );
  }
}
