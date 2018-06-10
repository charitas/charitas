import React, { Component } from 'react';
import AppContainer from '../containers/AppContainer';
import ComingSoon from '../components/ComingSoon';

const KEY = 'abcd';

export default class ComingSoonContainer extends Component {
  constructor(props) {
    super(props);
    const key = localStorage.getItem('key');
    this.state = {
      key: key || '',
    };
  }


  addCharToKey = (char) => {
    this.setState(
      prevState => ({ key: prevState.key + char }),
      () => {
        if (this.state.key === KEY) {
          localStorage.setItem('key', KEY);
        }
      },
    );
  }

  render() {
    if (this.state.key === KEY) {
      return (<AppContainer />);
    }
    return (<ComingSoon addCharToKey={this.addCharToKey} />);
  }
}
