import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { database } from 'firebase';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import colors from '../../constants/colors';

const styles = theme => ({
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4,
  },
  root: {
    background: `${colors.darkGrey}`,
  },
});

class SimpleSnackbar extends React.Component {
  state = {
    open: false,
  };

  componentDidMount() {
    const connectedRef = database().ref('.info/connected');
    setTimeout(() => {
      connectedRef.on('value', (snap) => {
        if (snap.val() === true) {
          this.setState({ open: false });
        } else {
          this.setState({ open: true });
        }
      });
    }, 5000);
  }

  handleClick = () => {
    this.setState({ open: true });
  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ open: false });
  };

  refreshPage = () => {
    window.location.reload();
  }

  render() {
    const { component: Component, classes, ...rest } = this.props;

    return (
      <Fragment>
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          ContentProps={{
            classes: {
              root: classes.root,
            },
          }}
          open={this.state.open}
          onClose={this.handleClose}
          message={<span id="message-id">CONNECTION LOST: Live updates unavailable</span>}
          action={[
            <Button key="undo" style={{ color: `${colors.green}` }} size="small" onClick={this.refreshPage}>
              REFRESH
            </Button>,
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.handleClose}
            >
              <CloseIcon />
            </IconButton>,
          ]}
          style={{ top: '40px' }}
        />
        <Component {...rest} />
      </Fragment>
    );
  }
}

SimpleSnackbar.propTypes = {
  component: PropTypes.func.isRequired,
  classes: PropTypes.shape({
    root: PropTypes.string.isRequired,
    close: PropTypes.string.isRequired,
  }).isRequired,
};

export default withStyles(styles)(SimpleSnackbar);
