import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { APPROVE, DELETED, DOCUMENTS, ENG, PUBLISHED, TASKS, VIEW } from '@the-source-of-truth/shared/constants';
import Dialog from '../Dialog';

const getPhaseString = (phase) => {
  if (phase === 'create') {
    return 'is now being created.';
  }
  if (phase === 'edit') {
    return 'is now in editing.';
  }
  if (phase === APPROVE) {
    return 'is now awaiting approval';
  }
  if (phase === PUBLISHED) {
    return 'is now published.';
  }
  if (phase === DELETED) {
    return 'has been deleted';
  }
  return 'in an unknown phase';
};

function PhaseError({ history, match, phase }) {
  const buttons = [
    {
      label: 'Back to Tasks',
      action: () => { history.push(`/${ENG}/${TASKS}`); },
    },
  ];
  if (phase !== 'deleted') {
    buttons.unshift({
      label: 'View',
      action: () => {
        history.push(`/${ENG}/${DOCUMENTS}/${VIEW}/${match.params.id}`);
      },
    });
  }
  return (
    <Dialog
      dialogIsOpen
      title={`This content ${getPhaseString(phase)}`}
      buttons={buttons}
    />
  );
}

PhaseError.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  phase: PropTypes.string.isRequired,
};

export default withRouter(PhaseError);
