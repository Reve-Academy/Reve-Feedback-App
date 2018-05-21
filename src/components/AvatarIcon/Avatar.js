import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const styles = {
  row: {
    display: 'flex',
    justifyContent: 'center',
  },
  avatar: {
    margin: 10,
  },
  
  bigAvatar: {
    width: 30,
    height: 60,
  },
};

function ImageAvatars(props) {
  const { classes } = props;
  return (
    <div className={classes.row}>
      <Avatar img="/static/images/remy.jpg" className={classes.avatar} />
      
    </div>
  );
}

 ImageAvatars.propTypes = {
   classes: PropTypes.object.isRequired,
 };

export default withStyles(styles)(ImageAvatars);
