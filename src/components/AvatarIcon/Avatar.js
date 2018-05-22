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
    marginRight: 10,
    
    backgroundColor: "white",
    color: "white",
    src: "blank-avatar.png"
  },
};


function ImageAvatars(props) {
  const { classes } = props;
  return (
    <div className={classes.row}>
      <Avatar img="blank-avatar.png" className={classes.avatar} />
      
    </div>
  );
}



export default withStyles(styles)(ImageAvatars);
