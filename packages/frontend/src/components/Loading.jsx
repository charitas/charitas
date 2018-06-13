import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import colors from '../constants/colors';

const styles = {
  root: {
    backgroundColor: `${colors.grey}`,
    flexGrow: 1,
    left: 0,
    position: 'fixed',
    top: '40px',
    width: '100%',
  },
  barColorPrimary: {
    backgroundColor: `${colors.blue}`,
  },
};

function LinearIndeterminate(props) {
  const { classes } = props;
  return (
    <div >
      <LinearProgress
        classes={{
          root: classes.root,
          barColorPrimary: classes.barColorPrimary,
        }}
      />
    </div>
  );
}

LinearIndeterminate.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string.isRequired,
    barColorPrimary: PropTypes.string.isRequired,
  }).isRequired,
};

export default withStyles(styles)(LinearIndeterminate);
