import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import colors from '../constants/colors';

const styles = {
  root: {
    flexGrow: 1,
    backgroundColor: `${colors.grey}`,
    top: '-20px',
    width: '100vw',
    right: '20px',
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
