import React, { Component } from 'react';
import { connect } from 'react-redux';

//import material-ui
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';

const mapStateToProps = state => ({
    state,
});

class AccountsItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            accounts: {
                instructor: this.props.aItem.instructor,
                active: this.props.aItem.active_profile
            }
        }
    }


        handleActive = () => {
            this.setState({
                accounts: {
                    active: !this.props.aItem.active_profile
                }
            })
    
          
            this.props.dispatch({
                type: 'UPDATE_ACTIVE_STATUS', 
                payload: 
            })



            
        }

        // handleInstructor = () => {
        //     console.log('before active update', this.state.instructor)
        //     this.setState({
        //         accounts: {
        //             instructor: !this.props.aItem.instructor
        //         }
        //     })
        //     console.log('after you clicked update active', this.state.accounts.instructor);
        // }

        render(){
           

            console.log('this.state:', this.state.accounts.instructor)


            //True and false to be displayed as checkboxes
            let active;

            if (this.state.accounts.active_profile === true) {
                active = (<p>true</p>)

            } else {
                active = (<p>false</p>)
            }

            let instructor;

            if (this.state.accounts.instructor === true) {
                instructor = (<p>true</p>)

            } else {
                instructor = (<p>false</p>)
            }



            return (



                <tbody>
                    <tr>
                        <td>{this.props.aItem.first}</td>
                        <td>{this.props.aItem.last}</td>
                        <td onClick={() => this.handleInstructor()}>{instructor}</td>
                        <td onClick={() => this.handleActive()}>{active}</td>
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


