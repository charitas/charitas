import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import colors from '../constants/colors';

const StyledHeader = styled.div`
  display: grid;
  grid-template-columns: 4fr 1fr;
  align-content: center;

  .buttons {
    width: 30px;
    justify-self: end;
    background-color: ${colors.blue};
    color: ${colors.white};
  }
`;

export default function TaskHeader(props) {
  return (
    <StyledHeader>
      { props.children }
    </StyledHeader>
  );
}

TaskHeader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
