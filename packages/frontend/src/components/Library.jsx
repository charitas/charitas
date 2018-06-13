import React, { Fragment } from 'react';
import { PUBLISHED } from '@the-source-of-truth/shared/constants';
import DocumentsContainer from '../containers/DocumentsContainer';

export default function Library() {
  return (
    <Fragment>
      <h3>Library</h3>
      <DocumentsContainer phase={PUBLISHED} />
    </Fragment>
  );
}
