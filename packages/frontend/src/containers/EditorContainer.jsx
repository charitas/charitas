import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { database } from 'firebase';
import { DOCUMENTS } from '@the-source-of-truth/shared/constants';
import Loading from '../components/Loading';
import FirepadContainer from '../containers/FirepadContainer';
import UrimContainer from '../containers/UrimContainer';

export default class EditorContainer extends Component {
  static propTypes = {
    match: PropTypes.shape({
      url: PropTypes.string.isRequired,
      params: PropTypes.shape({
        id: PropTypes.string,
        phase: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      firepad: false,
      urim: !props.match.params.id,
    };
  }

  componentDidMount() {
    if (this.hasNoEditor()) {
      this.ref = database().ref(DOCUMENTS).child(this.props.match.params.id);
      this.ref.once('value', this.handleSnapshot);
    }
  }

  handleSnapshot = (snapshot) => {
    const data = snapshot.val();
    if (data && data.editor === 'urim') {
      this.setState({
        urim: true,
      });
    } else {
      this.setState({
        firepad: true,
      });
    }
  }

  hasNoEditor = () => {
    const { firepad, urim } = this.state;
    return !firepad && !urim;
  }

  render() {
    if (this.hasNoEditor()) {
      return <Loading />;
    }
    if (this.state.firepad) {
      return (<FirepadContainer {...this.props} />);
    }
    return (<UrimContainer {...this.props} />);
  }
}
