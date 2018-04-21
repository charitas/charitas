import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledBody = styled.div`
  padding-top: 20px;
  display: grid;
  grid-template-columns: 1fr;

  @media(max-width: 600px) {
    padding-right: 20px;
    padding-left: 20px;
    grid-gap: 10px;
    grid-template-rows: 25px 455px;
  }

  @media(min-width: 600px) and (max-width: 950px) {
    padding-right: 75px;
    padding-left: 75px;
    grid-gap: 20px;
    grid-template-rows: 40px 600px;
  }

  @media(min-width: 950px) {
    padding-right: 175px;
    padding-left: 175px;
    grid-gap: 20px;
    grid-template-rows: 40px 600px;
  }
`;

export default function ContentBody(props) {
  return (
    <StyledBody>
      { props.children }
    </StyledBody>
  );
}

ContentBody.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};
