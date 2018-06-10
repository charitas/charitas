import React, { Fragment } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Divider from '@material-ui/core/Divider';
import colors from '../constants/colors';

const height = 'height: 200px;';
const width = 'width: 200px;';
const absolute = 'position: absolute;';


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

const TopLeft = styled.div`
  ${height}
  ${width}
`;

const TopRight = styled.div`
  ${absolute}
  ${height}
  ${width}
  top: 0;
  right: 0;
`;

const BottomRight = styled.div`
  ${absolute}
  ${height}
  ${width}
  bottom: 0;
  right: 0;
`;

const BottomLeft = styled.div`
  ${absolute}
  ${height}
  ${width}
  bottom: 0;
  left: 0;
`;

export default function ComingSoon({ addCharToKey }) {
  return (
    <Fragment>
      <StyledDiv>
        <StyledHeader>
          <p
            style={{
              fontSize: '90px',
              lineHeight: '87px',
              margin: '0 0 0em',
              padding: '20px',
            }}
          >
          COMING SOON
          </p>
          <Divider style={{ backgroundColor: `${colors.white}` }} />
          <p style={{ fontSize: '25px', padding: '20px' }}>June 16, 2018</p>
        </StyledHeader>
        <TopLeft
          onClick={() => addCharToKey('a')}
        />
        <TopRight
          onClick={() => addCharToKey('b')}
        />
        <BottomRight
          onClick={() => addCharToKey('c')}
        />
        <BottomLeft
          onClick={() => addCharToKey('d')}
        />
      </StyledDiv>
    </Fragment>
  );
}

ComingSoon.propTypes = {
  addCharToKey: PropTypes.func.isRequired,
};
