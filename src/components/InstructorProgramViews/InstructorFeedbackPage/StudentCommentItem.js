import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Modal from '@material-ui/core/Modal';
import IconButton from '@material-ui/core/IconButton';
import { withStyles} from '@material-ui/core/styles';
import star from '../../../styles/images/star.png';
import {Delete, StarBorder, Stars} from '@material-ui/icons';
import Badge from '@material-ui/core/Badge';
let moment = require('moment');


const mapStateToProps = (state) => ({
	state
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
                       
                        <p className="commentDates">{this.props.comment.first} {this.props.comment.last} </p>
                        <p className="commentNamesAndDates"><i>{moment(new Date(this.props.comment.date)).format("MMMM DD, YYYY")}</i></p>
                        <br/>
                        <p className="commentFont">{this.props.comment.comment}</p>
                        
                          <div style={{marginTop: '35px'}}>
                          <Badge badgeContent={this.props.comment.like_count}>
                            <Stars style={{fontSize:'55px', color: 'black', marginTop: '6px', float: 'left'}}/>
                          </Badge>
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