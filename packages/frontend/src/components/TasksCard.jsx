import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { withRouter } from 'react-router';
import { withStyles } from '@material-ui/core/styles';
import { truncate } from 'lodash';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Edit from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import { DOCUMENTS, PHASE, VIEW } from '@the-source-of-truth/shared/constants';
import { checkPermissions } from '@the-source-of-truth/shared/helpers';
import colors from '../constants/colors';

const styles = {
  card: {
    maxheight: 265,
    maxwidth: 240,
  },
};

function TasksCard({
  doc,
  classes,
  history,
  id,
  claims,
}) {
  const title = doc.get('title');
  const phase = doc.get(PHASE);
  const viewHref = `/${DOCUMENTS}/${VIEW}/${id}`;
  const editHref = `/${DOCUMENTS}/${phase}/${id}`;
  const desc = '';
  const hasPermissions = checkPermissions(claims, phase);

  return (
    <div key={id} >
      <Card className={classes.card}>
        <Button
          onClick={() => { history.push(viewHref); }}
          style={{
            height: '100%',
            padding: '0',
            textAlign: 'left',
            width: '100%',
        }}
        >
          <CardContent style={{ color: `${colors.darkGrey}` }}>
            <h4 style={{ fontSize: '16px' }}>{ truncate(title, { length: 90 }) || 'Untitled'}</h4>
            <p>{truncate(desc, { length: 170 })}</p>
          </CardContent>
        </Button>
        <Divider />
        <CardActions style={{ justifyContent: 'flex-end' }}>
          { hasPermissions &&
            <IconButton onClick={() => { history.push(editHref); }} style={{ color: `${colors.darkGrey}`, height: '35px', width: '35px' }} >
              <Edit />
            </IconButton>
          }
        </CardActions>
      </Card>
    </div>
  );
}

TasksCard.propTypes = {
  claims: PropTypes.shape({
    editor: PropTypes.bool,
    author: PropTypes.bool,
  }).isRequired,
  classes: PropTypes.shape({
    card: PropTypes.string.isRequired,
    media: PropTypes.string,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  id: PropTypes.string.isRequired,
  doc: ImmutablePropTypes.mapContains({
    title: PropTypes.string.isRequired,
    phase: PropTypes.string.isRequired,
  }).isRequired,
};

export default withStyles(styles)(withRouter(TasksCard));
