import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Modal from '@material-ui/core/Modal';
import IconButton from '@material-ui/core/IconButton';
import { withStyles} from '@material-ui/core/styles';
import star from '../../../styles/images/star.png';
import {Delete, StarBorder, Stars} from '@material-ui/icons';


const mapStateToProps = (state) => ({
	state
});

const styles = theme => ({
    paper: {
      position: 'relative',
      width: 20,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing.unit * 4,
    },
  });

const itemStyle={
    feedbackField:{
        padding: '10px',
        margin: '10px',
        border: '1px solid #D8441C',
        borderRadius: '25px',
        width:400
    },
    commentBtn:{
        borderRadius: '50%',
        border: '1px solid #D8441C',
        margin: '10px',
        fontSize: '35px',
        color: 'black',
        float: 'left',
    }
};

class StudentComment extends Component {
    constructor(props){
        super(props);
        this.state={
          
        }
      }
    deleteComment = () => {
        this.props.dispatch({
            type: 'DELETE_COMMENT',
            payload: {
                item: this.props.comment
            }
        });
    };
    componentDidMount = () => {
        this.props.dispatch({
            type: 'GET_LIKES_INSTRUCTOR',
            payload: {
                commentId: this.props.comment.id
            }
        })
    }
    render(){
        return(
            <div>
                <Card style={itemStyle.feedbackField}>
                    <CardContent>
                        <div> Author: {this.props.comment.first} {this.props.comment.last}<br/><p>{this.props.comment.comment}</p></div>
                        <div>
                            <Stars style={{fontSize:'55px', color: 'black', marginTop: '8px', float: 'left'}}/>
                            {this.props.comment.like_count}
                        </div>
                        <div>
                        <IconButton style={itemStyle.commentBtn}>
                            <Delete onClick={this.deleteComment}/>
                        </IconButton> 
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }
}

export default connect(mapStateToProps) (StudentComment);