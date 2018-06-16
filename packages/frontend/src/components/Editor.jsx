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
import 'quill/dist/quill.snow.css';
import './Editor.css';
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

const StyledEditor = styled.div`
  height: '100%';
  width: '100%';
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
            <StyledEditor style={{ border: 'none', fontSize: '20px' }}id={this.props.elementId} />
          </TaskContentBody>
        </div>
      </Fragment>
    );
  }
}

Firepad.propTypes = {
  claims: PropTypes.shape({
    editor: PropTypes.bool,
    author: PropTypes.bool,
  }),
  elementId: PropTypes.string.isRequired,
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
