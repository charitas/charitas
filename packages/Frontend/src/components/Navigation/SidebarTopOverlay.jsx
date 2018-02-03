import React, { Fragment } from 'react';
import { Search, Sidebar, Menu, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';

export default function SidebarTopOverlay({ toggleMenu }) {
  return (
    <Fragment>
      <Sidebar as={Menu} animation="overlay" direction="top" visible inverted>
        <Menu.Item name="Menu" onClick={toggleMenu}>
          <Icon name="content" />
        </Menu.Item>
        <Menu.Item name="Language">
          <Icon name="flag" />
          Language
        </Menu.Item>
        <Menu.Item name="Settings">
          <Icon name="setting" />
        </Menu.Item>
        <Menu.Item name="Sign in">
          <Icon name="user" />
        </Menu.Item>
        <Search />
      </Sidebar>
    </Fragment>
  );
}

SidebarTopOverlay.propTypes = {
  toggleMenu: PropTypes.func.isRequired,
};
