import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import colors from '../constants/colors';

const StyledDiv = styled.div`
  background-color: ${colors.white};
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-rows: 100%;
  min-height: 100vh;
  @media(max-width: 800px) {
    grid-template-columns: 0 5fr 0;
  }
  @media(min-width: 800px) {
    grid-template-columns: 1fr 5fr 1fr;
  }
  .sides {
    background-color: ${colors.grey};
    box-shadow: inset 0 0 0 0.75pt #d1d1d1, inset 0 0 12pt 0.75pt #ccc;
    height: 100%;
  }
  .content {
    padding: 20px;
    background-color: ${colors.white};
  }
`;

export default function View(props) {
  return (
    <StyledDiv>
      <div className="sides" />
      <div className="content">
        { props.children }
      </div>
      <div className="sides" />
    </StyledDiv>
  );
}

View.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};
