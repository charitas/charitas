import React from 'react';
import styled from 'styled-components';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import colors from '../constants/colors';

const StyledDiv = styled.div`
  background-color: ${colors.darkGrey};
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  height: 100vh;
`;

const StyledHeader = styled.div`
  text-align: center;
  font-size: 50px;
  color: ${colors.white}
  font-family: 'Noto Sans', sans-serif;
  position: absolute;
  margin: auto;
  right: 0;
  left: 0;
  top: 25%;
`;

export default function NotFound() {
  return (
    <StyledDiv>
      <StyledHeader>
        <p style={{ fontSize: '150px', margin: '0 0 0em' }}>404</p>
        <p style={{ fontSize: '25px' }}>Oops, something went wrong</p>
        <Divider style={{ backgroundColor: `${colors.white}` }} />
        <p style={{ margin: '0 0 0em' }}>PAGE NOT FOUND</p>
        <Button variant="raised" style={{ backgroundColor: `${colors.blue}`, color: `${colors.white}`, top: '10px' }}>
          Return to Home
        </Button>
      </StyledHeader>
    </StyledDiv>
  );
}
