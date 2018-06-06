import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import Dialog from '../Dialog';

function GenericError({ history }) {
  return (
    <Dialog
      dialogIsOpen
      title="System Error"
      content="Something went wrong. Please try again later."
      buttons={[
        {
          label: 'Back to Home',
          action: () => { history.push('/'); },
        },
      ]}
    />
  );
}

GenericError.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(GenericError);
