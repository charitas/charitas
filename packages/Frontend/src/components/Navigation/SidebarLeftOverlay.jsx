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

  handleLogout = () => {
    this.props.logout();
    this.props.toggleMenu();
  };

  handleOffClick = (e) => {
    if (this.ref && !this.ref.contains(e.target) && this.props.sideBarVisibility) {
      this.props.toggleMenu();
    }
  };

  handleRef = (el) => { this.ref = el; }

  renderLogout = () => (
    <Menu.Item
      as="div"
      name="logout"
      onClick={this.handleLogout}
    >
      Sign Out
    </Menu.Item>
  )


  renderMenuItem = (name, label, path) => (
    <Link href={path} to={path}>
      <Menu.Item as="div" name={name} onClick={this.props.toggleMenu}>
        {label}
      </Menu.Item>
    </Link>
  );

  render() {
    const { renderMenuItem } = this;
    return (
      <div ref={this.handleRef}>
        <Sidebar as={Menu} animation="overlay" width="thin" visible={this.props.sideBarVisibility} icon="labeled" vertical inverted>
          {renderMenuItem('home', 'Home', '/')}
          {renderMenuItem('library', 'Library', '/library')}
          {renderMenuItem('new journal', 'New Journal', '/')}
          <Menu.Item as="div" name="journal" onClick={this.props.toggleMenu}>
            Journal
            <Menu.Menu>
              <Link href="/journal" to="/journal">
                <Menu.Item>
                  Read
                </Menu.Item>
              </Link>
              <Link
                href="/newJournal"
                to="/newJournal"
              >
                <Menu.Item>
                  Create
                </Menu.Item>
              </Link>
            </Menu.Menu>
          </Menu.Item>
          { this.props.isAuthenticated
              ? this.renderLogout()
              : renderMenuItem('signin', 'Sign In', '/signin')
          }
        </Sidebar>
      </div>
    );
  }
}
