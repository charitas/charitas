import React from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import { withStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Backup from '@material-ui/icons/Backup';
import LinearProgress from '@material-ui/core/LinearProgress';
import colors from '../constants/colors';

const styles = {
  barColorPrimary: {
    backgroundColor: `${colors.blue}`,
  },
  root: {
    backgroundColor: `${colors.grey}`,
  },
};

const StyledDiv = styled.div`
  background-color: #FAFAFA;
  border: 1px solid #E0E0E0;
  box-shadow: 0 0 0 0.75pt #d1d1d1, 0 0 12pt 0.75pt #ccc;
  height: 286px;
  left: 0;
  margin: auto;
  max-width: 500px;
  padding: 10px;
  position: absolute;
  right: 0;
  top: 178px;
  width: 100%;
  z-index: 10;
`;

function ImageUploaderModal({
  classes,
  closeModal,
  handleImage,
  modalOpen,
  uploading,
}) {
  if (modalOpen) {
    return (
      <StyledDiv>
        {
          uploading && <LinearProgress
            classes={{
              root: classes.root,
              barColorPrimary: classes.barColorPrimary,
            }}
          />
        }
        <Dropzone
          accept="image/gif, image/jpeg, image/png, image/svg+xml"
          className="dropzone"
          onDrop={handleImage}
          style={{
            border: `1px dotted ${colors.grey}`,
            display: 'grid',
            gridTemplateColumns: '1fr',
            height: '225px',
            justifyItems: 'center',
            width: '100%',
            maxWidth: '500px',
          }}
        >
          <Backup style={{ color: `${colors.grey}`, height: '90px', width: '90px' }} />
          <div style={{ color: `${colors.grey}`, textAlign: 'center' }}>
            <h4>DRAG & DROP</h4>
            <p>or</p>
          </div>
          <Button style={{ backgroundColor: `${colors.blue}`, color: `${colors.white}`, marginBottom: '14px' }}>Browse Files</Button>
        </Dropzone>
        <Button
          onClick={closeModal}
          className="firepad-btn"
          style={{
            backgroundColor: `${colors.purple}`,
            color: `${colors.white}`,
            float: 'right',
            marginTop: '5px',
          }}
        >
            Cancel
        </Button>
      </StyledDiv>
    );
  }
  return null;
}

ImageUploaderModal.propTypes = {
  classes: PropTypes.shape({
    barColorPrimary: PropTypes.string.isRequired,
    root: PropTypes.string.isRequired,
  }).isRequired,
  closeModal: PropTypes.func.isRequired,
  handleImage: PropTypes.func.isRequired,
  modalOpen: PropTypes.bool.isRequired,
  uploading: PropTypes.bool.isRequired,
};

export default withStyles(styles)(ImageUploaderModal);
