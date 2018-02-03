import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { SidebarLeftOverlay, SidebarTopOverlay } from './Navigation';

export default function App({ toggleVisibility, visible }) {
  return (
    <Fragment>
      <SidebarTopOverlay toggleMenu={toggleVisibility} />
      <SidebarLeftOverlay
        sideBarVisibility={visible}
        toggleMenu={toggleVisibility}
      />
    </Fragment>
  );
}

App.propTypes = {
  toggleVisibility: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
};
