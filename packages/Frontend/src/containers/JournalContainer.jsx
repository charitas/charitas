import React, { Component, Fragment } from 'react';
import firebase from 'firebase';
import { List, Map } from 'immutable';
import { Link } from 'react-router-dom';

export default class JournalContainer extends Component {
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
        <button><a href="/journals/create">Create Journal</a></button>
        { this.state.journals.map((journal) => {
          const href = `/journals/${journal.get('id')}`;
          return (
            <div key={journal.get('id')} >
              <Link
                to={href}
                href={href}
              >
                {journal.get('title')}
              </Link>
            </div>
          );
        })}
      </Fragment>
    );
  }
}
