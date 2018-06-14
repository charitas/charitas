import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { CREATE, EDIT, PUBLISHED } from '@the-source-of-truth/shared/constants';
import colors from '../constants/colors';

const getPhaseStyle = (phase) => {
  if (phase === CREATE) {
    return {
      style: {
        backgroundColor: `${colors.purple}`,
      },
      title: 'Creating in Progress',
    };
  } else if (phase === EDIT) {
    return {
      style: {
        backgroundColor: '#E91E63',
      },
      title: 'Editing in Progress',
    };
  }
  return {
    style: {
      backgroundColor: '#43A047',
    },
    title: 'Awaiting Approval',
  };
};

export default function PhaseBar(props) {
  const { phase } = props;
  if (!phase || phase === PUBLISHED) {
    return null;
  }
  const phaseStyle = getPhaseStyle(phase);
  return (
    <Paper style={phaseStyle.style}>
      <h3 style={{
          color: `${colors.white}`,
          height: '40px',
          margin: '8px',
          textAlign: 'center',
        }}
      >
        {phaseStyle.title}
      </h3>
    </Paper>
  );
}

PhaseBar.propTypes = {
  phase: PropTypes.string.isRequired,
};
