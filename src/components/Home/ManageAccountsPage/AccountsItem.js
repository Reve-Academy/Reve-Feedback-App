import React, { Component } from 'react';
import { connect } from 'react-redux';

//import material-ui
import CheckBox from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlank from '@material-ui/icons/CheckBoxOutlineBlank'

//Recieve from redux
const mapStateToProps = state => ({
    state,
});

class AccountsItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.aItem.id,
            instructor: this.props.aItem.instructor,
            active: this.props.aItem.active_profile
        }
    }

    //Dispatch account ACTIVE STATUS
    handleActive = () => {
        this.props.dispatch({
            type: 'UPDATE_ACTIVE_STATUS',
            payload: this.state
        })

    }

    //Dispatch account INSTRUCTOR STATUS
    handleInstructor = () => {
        this.props.dispatch({
            type: 'UPDATE_ADMIN_STATUS',
            payload: this.state
        })
    }

    render() {
        //True and false to be displayed as checkboxes
        let active;

        if (this.props.aItem.active_profile === true) {
            active = (<CheckBox onClick={() => this.handleActive()}/>)

        } else {
            active = (<CheckBoxOutlineBlank onClick={() => this.handleActive()}/>)
        }

        let instructor;

        if (this.props.aItem.instructor === true) {
            instructor = (<CheckBox onClick={() => this.handleIntructor()}/>)

        } else {
            instructor = (<CheckBoxOutlineBlank onClick={() => this.handleInstructor()}/>)
        }




        return (
            <tbody>
                <tr>
                    <td>{this.props.aItem.first}</td>
                    <td>{this.props.aItem.last}</td>
                    <td >{instructor}</td>
                    <td >{active}</td>
                    <td>{this.props.aItem.name}</td>
                    <td>{this.props.aItem.high_school}</td>
                    <td>{this.props.aItem.team}</td>
                    <td><button>Delete</button></td>
                </tr>
            </tbody>
        )
    }
}

export default connect(mapStateToProps)(AccountsItem)


