import React, { Fragment } from 'react';
import styled from 'styled-components';
import Divider from '@material-ui/core/Divider';
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
      <Divider style={{ marginBottom: '20px', width: '100%' }} />
      <StyledDiv>
        <DocumentsContainer phase={PUBLISHED} />
      </StyledDiv>
    </Fragment>
  );
}
