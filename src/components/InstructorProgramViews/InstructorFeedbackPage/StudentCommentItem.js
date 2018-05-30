import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Modal from '@material-ui/core/Modal';
import { withStyles } from '@material-ui/core/styles';

const mapStateToProps = (state) => ({
	state
});

const styles = theme => ({
    paper: {
      position: 'absolute',
      width: theme.spacing.unit * 50,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing.unit * 4,
    },
  });

class StudentComment extends Component {
    deleteComment = () => {
        this.props.dispatch({
            type: 'DELETE_COMMENT',
            payload: {
                item: this.props.comment
            }
        });
    };
    
    render(){
        return(
            <Card>
                <CardContent>
                    <div> Author: {this.props.comment.first} {this.props.comment.last} <br/> <h2>{this.props.comment.comment}</h2></div> <br/> <button onClick={this.deleteComment}>delete</button> 
                </CardContent>
            </Card>
        )
    }
}

export default connect(mapStateToProps) (StudentComment);