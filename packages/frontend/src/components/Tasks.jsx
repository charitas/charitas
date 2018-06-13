import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Add from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Tooltip from '@material-ui/core/Tooltip';
import { APPROVE, CREATE, DOCUMENTS, EDIT } from '@the-source-of-truth/shared/constants';
import { checkPermissions } from '@the-source-of-truth/shared/helpers';
import colors from '../constants/colors';
import DocumentsContainer from '../containers/DocumentsContainer';

const styles = {
  root: {
    display: 'grid',
    justifyContent: 'center',
    gridGap: '20px',
    gridTemplateColumns: 'repeat(auto-fit, 250px)',
  },
};

function Tasks({ claims, classes }) {
  const isAuthor = checkPermissions(claims, CREATE);

  return (
    <Fragment>
      <h2>Tasks</h2>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <h3>New Publications (Creations)</h3>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.root}>
          { isAuthor &&
          <Tooltip id="tooltip-icon" title="Create New Publication">
            <Card className={classes.card}>
              <Button
                style={{
                      height: '100%',
                      width: '100%',
                    }}
              >
                <a href={`/${DOCUMENTS}/create`} style={{ color: `${colors.darkGrey}` }}>
                  <Add style={{ height: '100px', width: '100px' }} />
                </a>
              </Button>
            </Card>
          </Tooltip>
            }
          <DocumentsContainer phase={CREATE} />
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <h3>Publications in Progress (Editing)</h3>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.root}>
          <DocumentsContainer phase={EDIT} />
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <h3>Publications Awaiting Approval</h3>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.root}>
          <DocumentsContainer phase={APPROVE} />
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </Fragment>
  );
}

Tasks.propTypes = {
  claims: PropTypes.shape({
    editor: PropTypes.bool,
    author: PropTypes.bool,
  }),
  classes: PropTypes.shape({
    root: PropTypes.string.isRequired,
    card: PropTypes.string.isRequired,
  }).isRequired,
};

Tasks.defaultProps = {
  claims: {},
};

const mapStateToProps = state => ({
  claims: state.user.claims,
});

export default connect(mapStateToProps)(withStyles(styles)(Tasks));
