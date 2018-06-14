import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { database } from 'firebase';
import { List, Map } from 'immutable';
import { connect } from 'react-redux';
import { APPROVE, CREATE, DOCUMENTS, EDIT, PHASE, PUBLISHED } from '@the-source-of-truth/shared/constants';
import Loading from '../components/Loading';
import TasksCard from '../components/TasksCard';

class DocumentsContainer extends Component {
  static propTypes = {
    claims: PropTypes.shape({
      editor: PropTypes.bool,
      author: PropTypes.bool,
    }),
    phase: PropTypes.oneOf([APPROVE, CREATE, EDIT, PUBLISHED]).isRequired,
    setCount: PropTypes.func,
  }

  static defaultProps = {
    claims: {},
    setCount: () => {},
  }

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      documents: List([]),
    };
  }

  componentDidMount() {
    this.ref = database()
      .ref(DOCUMENTS);
    this.setListener();
  }

  componentWillUnmount() {
    this.ref.off();
  }

  setListener() {
    this.ref
      .orderByChild(PHASE)
      .equalTo(this.props.phase)
      .on('value', this.handleSnapshot, this.handleError);
  }

  handleError = (error) => {
    // eslint-disable-next-line no-console
    console.error(error);
  }

  handleSnapshot = (snapshot) => {
    if (this.state.loading) {
      this.setState({ loading: false });
    }
    const data = snapshot.val();
    if (data) {
      const documents = Object.keys(data)
        .reduce((cur, acc) => cur.push(new Map({ id: acc, ...data[acc] })), new List([]))
        .sort((a, b) => a > b);
      this.props.setCount(documents.size);
      this.setState({ documents });
    }
  }

  render() {
    if (this.state.loading) {
      return (<Loading />);
    }

    return (
      <Fragment>
        {
          this.state.documents.map((doc) => {
            const id = doc.get('id');
            return (
              <TasksCard claims={this.props.claims} doc={doc} id={id} key={id} />
            );
          })
        }
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  claims: state.user.claims,
});

export default connect(mapStateToProps)(DocumentsContainer);
