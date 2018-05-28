import React from 'react';
import PropTypes from 'prop-types';
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
    src: "account_circle.png"
  },
};


function ImageAvatars(props) {
  const { classes } = props;
  return (
    <div className={classes.row}>
      <Avatar src="styles/images/avatar.png" />
      
    </div>
  );
}



export default withStyles(styles)(ImageAvatars);
