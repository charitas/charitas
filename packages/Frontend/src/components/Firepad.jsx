import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import 'codemirror/lib/codemirror.css';
import 'firepad/dist/firepad.css';
import Button from '@material-ui/core/Button';
import Dialog from './Dialog';
import TaskContentBody from './TaskContentBody';
import TaskHeader from './TaskHeader';
import NotFound from '../components/NotFound';

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
  changingPhase,
  dialogIsOpen,
  error,
  handleClose,
  handleSubmit,
  handleTitleChange,
  loading,
  notFound,
  openDialog,
  readOnly,
  title,
}) {
  if (error) {
    return (<p>{error.message}</p>);
  }
  if (changingPhase) {
    return (<p>Currently moving this document to the next phase</p>);
  }
  if (notFound) {
    return (<NotFound />);
  }
  const displayStyle = loading ? { display: 'none' } : {};
  return (
    <Fragment>
      { loading && (<p>Loading...</p>) }
      <div style={displayStyle}>
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
    </Fragment>
  );
}

Firepad.propTypes = {
  changingPhase: PropTypes.bool.isRequired,
  dialogIsOpen: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      message: PropTypes.string,
      code: PropTypes.string,
    }),
  ]),
  handleClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleTitleChange: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  notFound: PropTypes.bool.isRequired,
  openDialog: PropTypes.func.isRequired,
  title: PropTypes.string,
  readOnly: PropTypes.bool,
};

Firepad.defaultProps = {
  dialogIsOpen: false,
  error: false,
  readOnly: true,
  title: '',
};
