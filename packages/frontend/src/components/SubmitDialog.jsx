import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { APPROVE, DELETE, ENG, REJECT, SUBMIT } from '@the-source-of-truth/shared/constants';
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

const areYouSure = action => `Are you sure you want to ${action}?`;

const getTitle = (type, taskComplete) => {
  const isSubmit = type === SUBMIT;
  const isDelete = type === DELETE;
  const isApprove = type === APPROVE;
  const isReject = type === REJECT;

  if (taskComplete) {
    if (isSubmit) {
      return 'Content Submitted';
    }
    if (isDelete) {
      return 'Content Deleted';
    }
    if (isApprove) {
      return 'Content Approved';
    }
    if (isReject) {
      return 'Content Sent Back to Editing';
    }
  }
  if (isSubmit || isDelete || isApprove) {
    return areYouSure(type);
  }
  if (isReject) {
    return areYouSure('send to editing');
  }
  return 'Are you sure?';
};

const SubmitDialog = ({
  classes,
  dialogIsOpen,
  handleClose,
  handleAccept,
  history,
  taskComplete,
  taskInProgress,
  type,
}) => {
  const buttonClassname = classNames({
    [classes.buttonSuccess]: taskComplete,
  });

  const title = getTitle(type, taskComplete);

  const submitButtons = [
    {
      label: 'Cancel',
      action: handleClose,
    },
    <div key="Submit">
      <Button
        className={buttonClassname}
        disabled={taskInProgress}
        onClick={handleAccept}
        style={{ color: `${colors.blue}` }}
      >
        Okay
      </Button>
      {taskInProgress && <CircularProgress size={24} className={classes.buttonProgress} />}
    </div>,
  ];

  const submittedButtons = [{
    label: 'Back to tasks',
    action: () => { history.push(`/${ENG}/tasks`); },
  }];
  return (
    <Dialog
      dialogIsOpen={dialogIsOpen}
      onClose={handleClose}
      title={title}
      buttons={!taskComplete ? submitButtons : submittedButtons}
    />
  );
};

SubmitDialog.propTypes = {
  classes: PropTypes.shape({
    buttonProgress: PropTypes.string.isRequired,
  }).isRequired,
  dialogIsOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleAccept: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  taskComplete: PropTypes.bool.isRequired,
  taskInProgress: PropTypes.bool.isRequired,
  type: PropTypes.oneOf([APPROVE, DELETE, REJECT, SUBMIT]).isRequired,
};

export default withStyles(styles)(withRouter(SubmitDialog));
