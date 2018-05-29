import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button'

const mapStateToProps = (state) => ({
	state
});

class WeekItem extends Component{

    //function to dispatch action to save week
    storeWeekId = (week) => {
        this.props.dispatch({
            type: 'THIS_WEEK',
            payload: week.id
        })
    }

    render(){
        return(
                <Button variant="fab" color="primary" onClick={() => this.storeWeekId(this.props.week)}>{this.props.week.number}</Button>
        )
    }
}

export default connect(mapStateToProps)(WeekItem);