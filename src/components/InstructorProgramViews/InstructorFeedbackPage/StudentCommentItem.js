import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Modal from '@material-ui/core/Modal';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import star from '../../../styles/images/star.png';
import { Delete, StarBorder, Star } from '@material-ui/icons';
import Badge from '@material-ui/core/Badge';
import Grid from '@material-ui/core/Grid';
let moment = require('moment');


const mapStateToProps = (state) => ({
    state
});

const itemStyle = {
    feedbackField: {
        padding: '10px',
        marginBottom: '30px',
        border: '1px solid #D8441C',
        borderRadius: '25px',
        width: '400',
        marginRight: '60px'

    },
    commentBtn: {
        borderRadius: '50%',
        border: '1px solid #D8441C',
        fontSize: '35px',
        color: 'black',
        marginTop: '10px',
        marginRight: '10px',
      
    },
    likeCount: {
        fontSize: '30px',
    },
    commentCenter: {
        display: 'flex', 
        justifyContent: 'center'
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
    render() {
        const { classes } = this.props;
        //const { spacing } = this.state;
        return (
            <Grid style={itemStyle.commentCenter} item xs={12}>
                <Grid  item xs={6} lg={6} >

                    <div >
                        <p style={{ marginLeft: '90px' }} className="commentDates">{this.props.comment.first} {this.props.comment.last} | <i className="commentNamesAndDates">{moment(new Date(this.props.comment.date)).format("MMMM DD, YYYY")}</i></p>
                    </div>
                    <div>
                        <Badge style={{ float: 'left', marginRight: '30px', marginTop: '25px' }} badgeContent={this.props.comment.like_count} color="primary">
                            <Star style={{ fontSize: '55px', color: 'black', marginTop: '6px', float: 'left' }} />
                        </Badge>
                        <Card style={itemStyle.feedbackField}>
                            <CardContent><br />
                                <p className="commentFont">{this.props.comment.comment}</p>

                                <div style={{ float: 'right'}}>
                                    <IconButton style={itemStyle.commentBtn}>
                                        <Delete onClick={this.deleteComment} />
                                    </IconButton>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </Grid>
            </Grid>            

        )
    }
}

export default connect(mapStateToProps)(StudentComment);