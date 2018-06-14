import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import 'codemirror/lib/codemirror.css';
import 'firepad/dist/firepad.css';
import Button from '@material-ui/core/Button';
import Delete from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { SUBMIT, DELETE } from '@the-source-of-truth/shared/constants';
import { checkDeletePermissions } from '@the-source-of-truth/shared/helpers';
import colors from '../constants/colors';
import GenericError from './errors/GenericError';
import Loading from './Loading';
import NotFound from '../components/NotFound';
import PhaseError from './errors/PhaseError';
import PhaseBar from './PhaseBar';
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


export default class Firepad extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submitDialogIsOpen: false,
      deleteDialogIsOpen: false,
    };
  }

  handleDialog = (dialog, value) => () => {
    this.setState({ [`${dialog}DialogIsOpen`]: value });
  }

  render() {
    const {
      changingPhase,
      claims,
      error,
      firepadInst,
      handleTask,
      taskComplete,
      taskInProgress,
      handleTitleChange,
      loading,
      notFound,
      phase,
      readOnly,
      title,
    } = this.props;

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
            dialogIsOpen={this.state.submitDialogIsOpen}
            handleClose={this.handleDialog(SUBMIT, false)}
            handleAccept={handleTask(SUBMIT)}
            taskComplete={taskComplete}
            taskInProgress={taskInProgress}
            type={SUBMIT}
          />
          <SubmitDialog
            dialogIsOpen={this.state.deleteDialogIsOpen}
            handleClose={this.handleDialog(DELETE, false)}
            handleAccept={handleTask(DELETE)}
            taskComplete={taskComplete}
            taskInProgress={taskInProgress}
            type={DELETE}
          />
          <TaskContentBody>
            <TaskHeader>
              {(!readOnly && checkDeletePermissions(claims, phase)) ?
                <Tooltip id="tooltip-icon" style={{ justifySelf: 'center' }} title="Delete">
                  <IconButton onClick={this.handleDialog(DELETE, true)} style={{ justifySelf: 'center' }}>
                    <Delete style={{ height: '2em', width: '3em' }} />
                  </IconButton>
                </Tooltip>
                  : <div />}
              <PhaseBar phase={phase} />
              { !readOnly &&
              <Button onClick={this.handleDialog(SUBMIT, true)} className="buttons">Submit</Button>
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
}

Firepad.propTypes = {
  changingPhase: PropTypes.bool.isRequired,
  claims: PropTypes.shape({
    editor: PropTypes.bool,
    author: PropTypes.bool,
  }),
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
  handleTask: PropTypes.func.isRequired,
  handleTitleChange: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  notFound: PropTypes.bool.isRequired,
  phase: PropTypes.string.isRequired,
  readOnly: PropTypes.bool,
  taskComplete: PropTypes.bool.isRequired,
  taskInProgress: PropTypes.bool.isRequired,
  title: PropTypes.string,
};

Firepad.defaultProps = {
  claims: {},
  error: false,
  firepadInst: null,
  readOnly: true,
  title: '',
};
