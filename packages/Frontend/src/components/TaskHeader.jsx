import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledHeader = styled.div`
  display: grid;
  font-size: 24px;
  grid-template-columns: 4fr 1fr;
  align-content: center;

  .buttons {
    width: 30px;
    justify-self: end;
    background-color: #2196F3;
    color: white;
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
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};
