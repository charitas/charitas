import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import 'codemirror/lib/codemirror.css';
import 'firepad/dist/firepad.css';
import Button from '@material-ui/core/Button';
import colors from '../constants/colors';
import GenericError from './errors/GenericError';
import Loading from './Loading';
import NotFound from '../components/NotFound';
import PhaseError from './errors/PhaseError';
import SubmitDialog from './SubmitDialog';
import TaskContentBody from './TaskContentBody';
import TaskHeader from './TaskHeader';
import ImageUploader from '../containers/ImageUploader';

const StyledFirepad = styled.div`
  height: '100%';
  width: '100%';
  .CodeMirror {
    background-color: ${colors.white};
  }
  .firepad-with-toolbar .CodeMirror {
    bottom: 0px;
    @media(max-width: 386px) {
      top: 98px;
    }
    @media(min-width: 387px) and (max-width: 695px) {
      top: 72px;
    }
    @media(min-width: 696px) and (max-width: 800px) {
      top: 46px;
    }
    @media(min-width: 800px) and (max-width: 974px) {
      top: 72px;
    }
    @media(min-width: 975px) {
      top: 46px;
    }
  }
  .CodeMirror-vscrollbar {
    display: none !important;
  }
  .firepad-toolbar {
    border-bottom: 1px solid ${colors.grey};
    line-height: 15px;
    @media(max-width: 386px) {
      height: 98px;
    }
    @media(min-width: 387px) and (max-width: 639px) {
      height: 72px;
    }
    @media(min-width: 640px) and (max-width: 800px) {
      height: 46px;
    }
    @media(min-width: 800px) and (max-width: 975px) {
      height: 72px;
    }
    @media(min-width: 975px) {
      height: 46px;
    }
  }
  .firepad-btn {
    border: 0;
    color: ${colors.darkGrey};
    background-color: ${colors.white};
    &:hover {
    background-color: ${colors.darkGrey};
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
  firepadInst,
  handleClose,
  handleSubmit,
  handleTitleChange,
  loading,
  notFound,
  openDialog,
  phase,
  readOnly,
  submitted,
  submitting,
  title,
}) {
  if (error && error.code !== 'phase-mismatch') {
    return (<GenericError />);
  }
  if (changingPhase && !readOnly) {
    return (<p>Currently moving this document to the next phase</p>);
  }
  if (notFound) {
    return (<NotFound />);
  }
  if (!loading) {
    const child = document.querySelector('.firepad-btn.firepad-dropdown');
    if (child) {
      child.parentNode.style.display = 'none';
    }
  }
  const displayStyle = loading ? { display: 'none' } : {};
  return (
    <Fragment>
      { error && <PhaseError phase={phase} />}
      { loading && (<Loading />) }
      <ImageUploader firepadInst={firepadInst} />
      <div style={displayStyle}>
        <SubmitDialog
          dialogIsOpen={dialogIsOpen}
          handleClose={handleClose}
          handleSubmit={handleSubmit}
          submitted={submitted}
          submitting={submitting}
        />
        <TaskContentBody>
          <TaskHeader>
            <h2>Add New Post</h2>
            { !readOnly &&
            <Button onClick={openDialog} className="buttons">Submit</Button>
                }
          </TaskHeader>
          { readOnly ?
            (<h4>{title}</h4>) :
            <textarea
              onChange={handleTitleChange}
              placeholder="Add New Title Here"
              style={{
                backgroundColor: colors.white,
                border: 'none',
                borderBottom: `1px solid ${colors.grey}`,
                fontStyle: 'italic',
                height: '40px',
                resize: 'none',
                width: '100%',
              }}
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
      message: PropTypes.string.isRequired,
      code: PropTypes.string.isRequired,
    }),
  ]),
  firepadInst: PropTypes.shape({
    firepadWrapper_: PropTypes.shape({
      removeChild: PropTypes.func.isRequired,
    }),
    makeImageDialog_: PropTypes.func.isRequired,
  }),
  handleClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleTitleChange: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  notFound: PropTypes.bool.isRequired,
  openDialog: PropTypes.func.isRequired,
  phase: PropTypes.string.isRequired,
  readOnly: PropTypes.bool,
  submitted: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  title: PropTypes.string,
};

Firepad.defaultProps = {
  dialogIsOpen: false,
  error: false,
  firepadInst: null,
  readOnly: true,
  title: '',
};
