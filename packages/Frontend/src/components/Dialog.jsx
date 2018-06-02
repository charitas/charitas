import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import MDialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import colors from '../constants/colors';

export default function Dialog({
  buttons,
  dialogIsOpen,
  content,
  handleClose,
  title,
}) {
  return (
    <div>
      <MDialog
        open={dialogIsOpen}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="responsive-dialog-title">
          {title}
        </DialogTitle>
        { content &&
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {content}
            </DialogContentText>
          </DialogContent>
        }
        <DialogActions>
          {buttons.map(button =>
            (React.isValidElement(button) ? button : (
              <Button key={button.label} onClick={button.action} style={{ color: `${colors.blue}` }}>
                {button.label}
              </Button>)))}
        </DialogActions>
      </MDialog>
    </div>
  );
}

Dialog.propTypes = {
  buttons: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      action: PropTypes.func.isRequired,
    }).isRequired,
    PropTypes.element.isRequired,
  ]).isRequired).isRequired,
  content: PropTypes.string,
  dialogIsOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func,
  title: PropTypes.string.isRequired,
};

Dialog.defaultProps = {
  content: '',
  handleClose: () => {},
};
