import React, { Fragment } from 'react';
import styled from 'styled-components';
import { PUBLISHED } from '@the-source-of-truth/shared/constants';
import DocumentsContainer from '../containers/DocumentsContainer';

const StyledDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 250px);
  grid-gap: 20px;
  justify-content: center;
`;

export default function Library() {
  return (
    <Fragment>
      <h3>Library</h3>
      <StyledDiv>
        <DocumentsContainer phase={PUBLISHED} />
      </StyledDiv>
    </Fragment>
  );
}
