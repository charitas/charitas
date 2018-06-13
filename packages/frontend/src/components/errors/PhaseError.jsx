import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { APPROVE, DOCUMENTS, PUBLISHED, TASKS, VIEW } from '@the-source-of-truth/shared/constants';
import Dialog from '../Dialog';

const getPhaseString = (phase) => {
  if (phase === 'create') {
    return 'being created.';
  }
  if (phase === 'edit') {
    return 'in editing.';
  }
  if (phase === APPROVE) {
    return 'awaiting approval';
  }
  if (phase === PUBLISHED) {
    return 'published.';
  }
  return 'in an unknown phase';
};

function PhaseError({ history, match, phase }) {
  return (
    <Dialog
      dialogIsOpen
      title={`This content is now ${getPhaseString(phase)}`}
      buttons={[
        {
          label: 'View',
          action: () => {
            history.push(`/${DOCUMENTS}/${VIEW}/${match.params.id}`);
          },
        },
        {
          label: 'Back to Tasks',
          action: () => { history.push(`/${TASKS}`); },
        },
      ]}
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
