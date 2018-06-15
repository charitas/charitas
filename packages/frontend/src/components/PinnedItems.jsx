import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import colors from '../constants/colors';

const tutorialSteps = [
  {
    label: 'How to be happy :)',
    imgPath: '/static/images/steppers/1-happy.jpg',
  },
  {
    label: '1. Work with something that you like, like…',
    imgPath: '/static/images/steppers/2-work.jpg',
  },
  {
    label: '2. Keep your friends close to you and hangout with them',
    imgPath: '/static/images/steppers/3-friends.jpg',
  },
  {
    label: '3. Travel everytime that you have a chance',
    imgPath: '/static/images/steppers/4-travel.jpg',
  },
  {
    label: '4. And contribute to Material-UI :D',
    imgPath: '/static/images/steppers/5-mui.png',
  },
];

const styles = ({
  overrides: {
    MuiMobileStepper: {
      dotsActive: {
        backgroundColor: `${colors.blue}`,
      },
    },
  },
  root: {
    maxWidth: 400,
    flexGrow: 1,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    height: 50,
    marginBottom: 20,
  },
  img: {
    height: 255,
    maxWidth: 400,
    overflow: 'hidden',
    width: '100%',
  },
});

class PinnedItems extends Component {
  state = {
    activeStep: 0,
  };

  handleNext = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep + 1,
    }));
  };

  handleBack = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep - 1,
    }));
  };

  handleStepChange = (activeStep) => {
    this.setState({ activeStep });
  };

  render() {
    const { classes } = this.props;
    const { activeStep } = this.state;

    const maxSteps = tutorialSteps.length;

    return (
      <div className={classes.root} style={{ margin: 'auto' }}>
        <Paper square elevation={0} className={classes.header}>
          <Typography>{tutorialSteps[activeStep].label}</Typography>
        </Paper>
        <SwipeableViews
          axis="x"
          index={this.state.activeStep}
          onChangeIndex={this.handleStepChange}
          enableMouseEvents
        >
          {tutorialSteps.map(step => (
            <img key={step.label} className={classes.img} src={step.imgPath} alt={step.label} />
          ))}
        </SwipeableViews>
        <MobileStepper
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          nextButton={
            <Button size="small" onClick={this.handleNext} disabled={activeStep === maxSteps - 1}>
              <KeyboardArrowRight />
            </Button>
          }
          backButton={
            <Button size="small" onClick={this.handleBack} disabled={activeStep === 0}>
              <KeyboardArrowLeft />
            </Button>
          }
          type="dots"
        />
      </div>
    );
  }
}

PinnedItems.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string.isRequired,
    header: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
  }).isRequired,
};

export default withStyles(styles)(PinnedItems);
