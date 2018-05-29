import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import 'codemirror/lib/codemirror.css';
import 'firepad/dist/firepad.css';
import Button from '@material-ui/core/Button';
import Dialog from './Dialog';
import TaskContentBody from './TaskContentBody';
import TaskHeader from './TaskHeader';

const StyledFirepad = styled.div`
  height: '100%';
  width: '100%';
  .firepad {
    border: 1px solid #DCDCDC;
  }
  .firepad-btn {
    border: 0;
    color: #3d4347;
    &:hover {
    background-color: grey;
    }
  }
  .powered-by-firepad {
    display: none;
  }
`;

export default function Firepad({
  dialogIsOpen,
  handleClose,
  handleSubmit,
  handleTitleChange,
  openDialog,
  readOnly,
  title,
}) {
  return (
    <div>
      <Dialog
        dialogIsOpen={dialogIsOpen}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
      />
      <TaskContentBody>
        <TaskHeader>
          <div>Add New Post</div>
          { !readOnly &&
            <Button onClick={openDialog} className="buttons">Submit</Button>
          }
        </TaskHeader>
        { readOnly ?
            (<h1>{title}</h1>) :
            <input
              onChange={handleTitleChange}
              placeholder="Add New Title Here"
              style={{ width: '100%' }}
              value={title}
            />
        }
        <StyledFirepad id="firepad-container" />
      </TaskContentBody>
    </div>
  );
}

Firepad.propTypes = {
  dialogIsOpen: PropTypes.bool,
  handleClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleTitleChange: PropTypes.func.isRequired,
  openDialog: PropTypes.func.isRequired,
  title: PropTypes.string,
  readOnly: PropTypes.bool,
};

Firepad.defaultProps = {
  dialogIsOpen: false,
  readOnly: true,
  title: '',
};
