import React, { Component } from 'react';
import App from '../components/App';

export default class AppContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  toggleVisibility = () => this.setState({ visible: !this.state.visible })

  render() {
    return (
      <App
        toggleVisibility={this.toggleVisibility}
        visible={this.state.visible}
      />);
  }
}
