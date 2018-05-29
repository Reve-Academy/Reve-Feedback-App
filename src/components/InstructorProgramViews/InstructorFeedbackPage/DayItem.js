import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Modal from '@material-ui/core/Modal';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const mapStateToProps = (state) => ({
	state
});

class DayItem extends Component {

    newComment = () =>{
        console.log('HERE IS THE ID: ', this.props.week.id);
        this.props.dispatch({
            type:'GET_COMMENTS',
            payload: this.props.week.id
        })
        this.props.dispatch({
            type:'WEEK_ID_LOCALSTATE',
            payload: this.props.week
        })
        this.props.dispatch({
            type:'ID_FOR_THE_WEEK',
            payload: this.props.week.number
        })
    }
    render(){
        return(
            <Button variant="fab" color="primary" onClick={this.newComment}>{this.props.week.number} </Button>
        )
    }
}

export default connect(mapStateToProps)(DayItem);