import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
  width: 560px;
  height: 315px;
  margin: 0 auto;

  @media(min-width: 798px) {
    width: 800px;
    height: 450px;
  }
  @media(min-width: 596px) and (max-width: 796px) {
    width: 683px;
    height: 385px;
  }

  @media(min-width: 401px) and (max-width: 595px) {
    width: 430px;
    height: 240px;
    padding: 0;
  }

  @media(max-width: 400px) {
    width: 360px;
    height: 200px;
    padding: 0;
  }
`;

export default function HomeIntroductionVideo() {
  return (
    <StyledDiv>
      <iframe title="Introduction Video" src="https://www.youtube.com/embed/HDA2c0PvKWQ?rel=0&amp;showinfo=0" frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen style={{ height: '100%', width: '100%', marginRight: '-20px' }} />
    </StyledDiv>
  );
}
