import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { ENG, LIBRARY } from '@the-source-of-truth/shared/constants';
import colors from '../constants/colors';
import HomeIntroduction from './HomeIntroduction';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    color: `${colors.white}`,
    backgroundColor: `${colors.blue}`,
  },
  input: {
    display: 'none',
  },
});

const StyledDiv = styled.div`
  background-image: url(${process.env.HERO_IMAGE_URL});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 95.5vh;
`;

const StyledHeader = styled.div`
  font-size: 40px;
  line-height: 48px;
  padding: 5px;
`;

const CenteredDiv = styled.div`
  color: ${colors.white};
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  text-align: center;
  top: 170px;
`;

class Home extends Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  scrollToIntro = () => { this.ref.current.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' }); }

  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <StyledDiv>
          <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', height: '95.5vh', width: '100%' }} >
            <CenteredDiv>
              <StyledHeader className="StyledHome">
                MARVELOUS WORK AND A WONDER
                <div className="StyledHome" style={{ display: 'inline-block', fontSize: '22px', verticalAlign: 'super' }}>®</div>
              </StyledHeader>
              <div>
                <Button className={classes.button} onClick={this.scrollToIntro}>
                  Introduction
                </Button>
                <Button color="default" className={classes.button} onClick={() => this.props.history.push(`/${ENG}/${LIBRARY}`)}>Library</Button>
              </div>
            </CenteredDiv>
          </div>
        </StyledDiv>
        <HomeIntroduction ref={this.ref} />
      </Fragment>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.shape({
    button: PropTypes.string.isRequired,
    input: PropTypes.string.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withStyles(styles)(withRouter(Home));
