import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button'

const mapStateToProps = (state) => ({
	state
});

const itemStyle = {
    weekBtn: {
        border: '1px solid #D4D4D4',
        borderRadius: '50%',
        minWidth: '36px',
        maxWidth: '37px',
        margin: '5px',
      }
};

class WeekItem extends Component{

    componentDidMount() {
        // If props exist when the component mounts, check for the week id
        if(this.props && this.props.state && this.props.state.scheduleReducer) {
            console.log('CURRENT PROPS', this.props);
            if(this.props.state.scheduleReducer.thisWeekReducer.weekId == 0){
                this.props.dispatch({
                    type: 'THIS_WEEK',
                    payload: this.props.state.scheduleReducer.weekReducer[0].id
                })
            }
        }
    }

    // If props are updated after the component mounts, also check for the week id
    shouldComponentUpdate = (nextProps, nextState) => {
        if(nextProps.state.scheduleReducer.thisWeekReducer.weekId == 0){
            console.log('NEXT PROPS', nextProps);

            this.props.dispatch({
                type: 'THIS_WEEK',
                payload: nextProps.state.scheduleReducer.weekReducer[0].id
            })
            return false;
        }
        return true;
    }

    //function to dispatch action to save week
    storeWeekInfo = (week) => {
        this.props.dispatch({
            type: 'THIS_WEEK',
            payload: week.id
        })
        this.props.dispatch({
            type: 'WEEK_NUMBER',
            payload: week.number
        })
        this.props.dispatch({
            type: 'WEEK_THEME', 
            payload: week.theme
        })
    }

    render(){
        return(
                <Button style={itemStyle.weekBtn} onClick={() => this.storeWeekInfo(this.props.week)}>{this.props.week.number}</Button>
        )
    }
}

export default connect(mapStateToProps)(WeekItem);