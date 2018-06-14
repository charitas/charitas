import React from 'react';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import IconButton from '@material-ui/core/IconButton';
import colors from '../constants/colors';

export default function Pagination() {
  return (
    <div
      style={{
        bottom: '0',
        color: `${colors.darkGrey}`,
        left: '0',
        margin: 'auto',
        position: 'absolute',
        right: '0',
        textAlign: 'center',
      }}
    >
      <IconButton>
        <ChevronLeft />
      </IconButton>
      <p style={{ display: 'inline-block', textAlign: 'center' }}>1 of 4</p>
      <IconButton>
        <ChevronRight />
      </IconButton>
    </div>
  );
}
