import React, { Component } from 'react';
import { Sidebar, Menu } from 'semantic-ui-react';
import PropTypes from 'prop-types';

export default class SidebarLeftOverlay extends Component {
  static propTypes = {
    sideBarVisibility: PropTypes.bool.isRequired,
    toggleMenu: PropTypes.func.isRequired,
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleOffClick);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleOffClick);
  }

  handleOffClick = (e) => {
    if (this.ref && !this.ref.contains(e.target) && this.props.sideBarVisibility) {
      this.props.toggleMenu();
    }
  };

  render() {
    return (
      <div ref={(el) => { this.ref = el; }}>
        <Sidebar as={Menu} animation="overlay" width="thin" visible={this.props.sideBarVisibility} icon="labeled" vertical inverted>
          <Menu.Item name="home">
            Home
          </Menu.Item>
          <Menu.Item name="humanityParty">
            Humanity Party
          </Menu.Item>
          <Menu.Item name="formatting">
            Formatting
          </Menu.Item>
          <Menu.Item name="transcription">
            Transcription
          </Menu.Item>
          <Menu.Item name="questions">
            Questions
          </Menu.Item>
          <Menu.Item name="journal">
            Journal
          </Menu.Item>
        </Sidebar>
      </div>
    );
  }
}
