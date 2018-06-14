import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import colors from '../constants/colors';
import { CREATE, EDIT, APPROVE } from '../../../shared/constants/index';

const styles = {
  [CREATE]: { backgroundColor: `${colors.purple}` },
  [EDIT]: { backgroundColor: `${colors.pink}` },
  [APPROVE]: { backgroundColor: `${colors.green}` },
};

export default function Badge({ count, phase }) {
  return (
    <Paper style={{
        backgroundColor: styles[phase].backgroundColor,
        color: `${colors.white}`,
        height: '25px',
        width: '25px',
        position: 'absolute',
        right: '55px',
        top: '17px',
      }}
    >
      <p style={{
      margin: 'auto',
      right: '0',
      left: '0',
      textAlign: 'center',
      position: 'absolute',
      paddingTop: '3px',
      }}
      >
        {count}
      </p>
    </Paper>
  );
}


Badge.propTypes = {
  count: PropTypes.number.isRequired,
  phase: PropTypes.oneOf([
    CREATE, EDIT, APPROVE,
  ]).isRequired,
};
