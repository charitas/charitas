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
      title: 'CREATING IN PROGRESS',
    };
  } else if (phase === EDIT) {
    return {
      style: {
        backgroundColor: '#E91E63',
      },
      title: 'EDITING IN PROGRESS',
    };
  }
  return {
    style: {
      backgroundColor: '#43A047',
    },
    title: 'AWAITING APPROVAL',
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
      <div
        style={{
          color: `${colors.white}`,
          height: '70px',
          textAlign: 'center',
        }}
      >
        <h3 style={{ marginBottom: '0', marginTop: '4px' }}>
          {phaseStyle.title}
        </h3>
        <div style={{ fontStyle: 'italic' }}>
          <p style={{ marginBottom: '0' }}>10 current viewers</p>
          <p>2 current editors</p>
        </div>
      </div>
    </Paper>
  );
}

PhaseBar.propTypes = {
  phase: PropTypes.string.isRequired,
};
