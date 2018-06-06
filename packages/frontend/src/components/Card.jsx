import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Divider, Header, Icon, Image, Segment } from 'semantic-ui-react';

const StyledSegment = styled(Segment)`
  @media (max-width: 600px) {
    height: 150px;
  }

  @media (min-width: 600px) {
    height: 400px;
    width: 300px;
  }
`;

const StyledBody = styled.div`
  @media (max-width: 600px) {
    margin-left: 142px;
    margin-right: 17px;
    position: absolute;
    top: 40px;
    width: 500px;
  }
`;

const StyledDiv = styled.div`
  bottom: 0px;
  opacity: 0.5;
  position: absolute;

  @media (max-width: 600px) {
    margin-left: 142px;

  }

  @media (min-width: 600px) {
    width: 90%;
  }
`;

const StyledImage = styled(Image)`
  object-fit: cover;

  @media (max-width: 600px) {
    height: 150px;
    left: -14px;
    position: absolute;
    top: -14px;
    width: 137px;
  }
`;

export default function Card(props) {
  return (
    <StyledSegment>
      <Icon
        name="star"
        onClick={props.toggleFav}
        size="huge"
        style={{
          color: props.starFilled ? 'yellow' : 'whitesmoke',
          position: 'absolute',
          zIndex: 1,
          right: 0,
          top: 9,
        }}
      />
      <StyledImage />
      <StyledBody>
        <Header>
            props.title
        </Header>
        <p>
          This is the description
        </p>
      </StyledBody>
      <StyledDiv>
        <Divider />
        <p style={{ display: 'inline-block' }} >
          <Icon name="file text outline" />
          Read Time
        </p>
        <p style={{ display: 'inline-block', float: 'right' }}>
          Published 06/16/18
        </p>
      </StyledDiv>
    </StyledSegment>
  );
}

Card.propTypes = {
  toggleFav: PropTypes.func.isRequired,
  starFilled: PropTypes.bool.isRequired,
};
