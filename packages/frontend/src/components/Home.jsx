import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import colors from '../constants/colors';

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
  height: 100%;
  min-height: 100vh;
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

function Home({ classes }) {
  return (
    <StyledDiv>
      <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', height: '100vh', width: '100%' }} >
        <CenteredDiv>
          <StyledHeader className="StyledHome">
          MARVELOUS WORK AND A WONDER®
          </StyledHeader>
          <div style={{ fontStyle: 'italic', padding: '25px' }}>insert short desc, scripture, or quote of MWAW here</div>
          <div>
            <Button className={classes.button} >Introduction</Button>
            <Button color="default" className={classes.button}>Journal</Button>
          </div>
        </CenteredDiv>
      </div>
    </StyledDiv>
  );
}

Home.propTypes = {
  classes: PropTypes.shape({
    button: PropTypes.string.isRequired,
    input: PropTypes.string.isRequired,
  }).isRequired,
};

export default withStyles(styles)(Home);
