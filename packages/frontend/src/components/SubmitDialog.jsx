import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Dialog from './Dialog';
import colors from '../constants/colors';

const styles = () => ({
  buttonProgress: {
    color: `${colors.grey}`,
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
});

const SubmitDialog = ({
  classes,
  dialogIsOpen,
  handleClose,
  handleSubmit,
  history,
  submitted,
  submitting,
}) => {
  const buttonClassname = classNames({
    [classes.buttonSuccess]: submitted,
  });

  const title = submitted ? 'Content Submitted' : 'Are you sure you want to submit?';

  const submitButtons = [
    {
      label: 'Cancel',
      action: handleClose,
    },
    <div key="Submit">
      <Button
        className={buttonClassname}
        disabled={submitting}
        onClick={handleSubmit}
        style={{ color: `${colors.blue}` }}
      >
        Submit
      </Button>
      {submitting && <CircularProgress size={24} className={classes.buttonProgress} />}
    </div>,
  ];

  const submittedButtons = [{
    label: 'Back to tasks',
    action: () => { history.push('/tasks'); },
  }];

  return (
    <Dialog
      dialogIsOpen={dialogIsOpen}
      onClose={handleClose}
      title={title}
      buttons={!submitted ? submitButtons : submittedButtons}
    />
  );
};

SubmitDialog.propTypes = {
  classes: PropTypes.shape({
    buttonProgress: PropTypes.string.isRequired,
  }).isRequired,
  dialogIsOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  submitted: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
};

export default withStyles(styles)(withRouter(SubmitDialog));
