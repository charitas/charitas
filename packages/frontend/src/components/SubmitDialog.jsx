import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { ENG, SUBMIT, DELETE } from '@the-source-of-truth/shared/constants';
import upperFirst from 'lodash/upperFirst';
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

const getTitle = (type, taskComplete) => (taskComplete ?
  `Content ${type === SUBMIT ? 'Submitted' : 'Deleted'}`
  : `Are you sure you want to ${type}?`);

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
        {upperFirst(type)}
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
  type: PropTypes.oneOf([SUBMIT, DELETE]).isRequired,
};

export default withStyles(styles)(withRouter(SubmitDialog));
