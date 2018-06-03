import React, { Component } from 'react';
import { connect } from 'react-redux';
//import Card from '@material-ui/core/Card';
//import CardContent from '@material-ui/core/CardContent';
//import Modal from '@material-ui/core/Modal';
//import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const mapStateToProps = (state) => ({
	state
});

const itemStyle = ({
    weekBtn: {
        border: '1px solid #D4D4D4',
        borderRadius: '50%',
        minWidth: '36px',
        maxWidth: '37px',
        margin: '5px',
    }
})


class DayItem extends Component {

    componentDidMount() {
        // If props exist when the component mounts, check for the week id
        if(this.props && this.props.state && this.props.state.instructorFeedBackReducer) {
            console.log('CURRENT PROPS', this.props);
            if(this.props.state.instructorFeedBackReducer.weekIdReducer === 0){
                this.props.dispatch({
                    type: 'ID_FOR_THE_WEEK',
                    payload: this.props.state.scheduleReducer.weekReducer[0].id
                })
            }
        }
    }
    
    // If props are updated after the component mounts, also check for the week id
    shouldComponentUpdate = (nextProps, nextState) => {
        if(nextProps.state.instructorFeedBackReducer.weekIdReducer === 0){
            console.log('NEXT PROPS', nextProps);

            this.props.dispatch({
                type: 'ID_FOR_THE_WEEK',
                payload: nextProps.state.scheduleReducer.weekReducer[0].id
            })
            return false;
        }
        return true;
    }

    newComment = () =>{
        this.props.dispatch({
            type:'GET_COMMENTS',
            payload: this.props.week.id
        })
        this.props.dispatch({
            type:'WEEK_ID_LOCALSTATE',
            payload: this.props.week.number
        })
        this.props.dispatch({
            type:'ID_FOR_THE_WEEK',
            payload: this.props.week.id
        })
        this.props.dispatch({
            type: 'WEEK_THEME', 
            payload: this.props.week.theme
        })
    
    }
   

    render(){
        return(
            <Button style={itemStyle.weekBtn} onClick={this.newComment}>{this.props.week.number} </Button>
        )
    }
}

export default connect(mapStateToProps) (DayItem);