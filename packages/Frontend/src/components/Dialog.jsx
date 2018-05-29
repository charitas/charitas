import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import MDialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function Dialog(props) {
  const {
    dialogIsOpen,
    handleClose,
    handleSubmit,
  } = props;

  return (
    <div>
      <MDialog
        open={dialogIsOpen}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">Are you sure you want to submit?</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
              Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary" autoFocus>
              Submit
          </Button>
        </DialogActions>
      </MDialog>
    </div>
  );
}

Dialog.propTypes = {
  dialogIsOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};
