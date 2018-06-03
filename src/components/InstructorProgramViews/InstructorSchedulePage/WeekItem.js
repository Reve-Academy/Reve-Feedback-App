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
        this.props.dispatch({
            type: 'WEEK_DESCRIPTION',
            payload: week.description
        })
    }

    render(){
        return(
                <Button style={itemStyle.weekBtn} onClick={() => this.storeWeekInfo(this.props.week)}>{this.props.week.number}</Button>
        )
    }
}

export default connect(mapStateToProps)(WeekItem);