import React, { Fragment } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const height = 'height: 200px;';
const width = 'width: 200px;';
const absolute = 'position: absolute;';

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
    </Fragment>
  );
}

ComingSoon.propTypes = {
  addCharToKey: PropTypes.func.isRequired,
};
