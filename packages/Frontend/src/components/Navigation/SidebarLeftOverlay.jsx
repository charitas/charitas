import React, { Component } from 'react';
import { Sidebar, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class SidebarLeftOverlay extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired,
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

  renderLogout = () => (
    <Menu.Item
      as="div"
      name="logout"
      onClick={() => {
        this.props.logout();
        this.props.toggleMenu();
      }}
    >
      Log Out
    </Menu.Item>
  )


  renderMenuItem = (name, label, path) => (
    <Menu.Item as="div" name={name} onClick={this.props.toggleMenu}>
      <Link href={path} to={path}>{label}</Link>
    </Menu.Item>
  );

  render() {
    const { renderMenuItem } = this;
    return (
      <div ref={(el) => { this.ref = el; }}>
        <Sidebar as={Menu} animation="overlay" width="thin" visible={this.props.sideBarVisibility} icon="labeled" vertical inverted>
          {renderMenuItem('home', 'Home', '/')}
          {renderMenuItem('library', 'Library', '/library')}
          {renderMenuItem('journal', 'Journal', '/journal')}
          { this.props.isAuthenticated
              ? this.renderLogout()
              : renderMenuItem('signin', 'Sign In', '/signin')
          }
        </Sidebar>
      </div>
    );
  }
}
