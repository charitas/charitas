import React, { Fragment } from 'react';
import { Icon, Menu, Sidebar } from 'semantic-ui-react';
import PropTypes from 'prop-types';

export default function SidebarTopOverlay({ toggleMenu }) {
  return (
    <Fragment>
      <Sidebar animation="overlay" as={Menu} direction="top" inverted visible >
        <Menu.Item name="Menu" onClick={toggleMenu}>
          <Icon name="content" />
        </Menu.Item>
      </Sidebar>
    </Fragment>
  );
}

SidebarTopOverlay.propTypes = {
  toggleMenu: PropTypes.func.isRequired,
};
