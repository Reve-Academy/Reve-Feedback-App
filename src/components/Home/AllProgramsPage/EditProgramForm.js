import React, { Component } from 'react';
import { connect } from 'react-redux';

//import material-ui
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import { Typography } from '@material-ui/core';

const mapStateToProps = state => ({
    state,
  });

class EditProgramForm extends Component{
    constructor(props){
        super(props);
        this.state = {
          open: false,
          editProgram: {
              id: this.props.pItem.id,
              name: this.props.pItem.name,
              description: this.props.pItem.description,
              start: this.props.pItem.start,
              finish: this.props.pItem.finish
          }
        }
      }

    // this handles editing property of each input field. note onBlur is when this is fired
    handleChangeFor = propertyName => (event) => {
        this.setState({
            editProgram: {
                ...this.state.editProgram,
                [propertyName]: event.target.value
            }
        })   
    }


    // FUNCTION FOR DISPATCHING ACTION TO PUT PROGRAM
    putProgram = () => {
        this.props.dispatch({
            type: 'UPDATE_PROGRAM_SAGA',
            payload: this.state.editProgram
        })
    };

    // FUNCTION FOR DISPATCHING ACTION TO PUT PROGRAM
    delProgram = () => {
        this.props.dispatch({
            type: 'DELETE_PROGRAM_SAGA',
            payload: this.state.editProgram
        })
    };

    render(){

        return(
            <div>
                <Typography variant="headline" component="h2">
                    Edit Program
                </Typography>
                {/* Program Name */}
                <TextField
                    id="programName"
                    label={this.props.pItem.name}
                    placeholder="New Program Title"
                    margin="normal"
                    defaultValue={this.props.pItem.name}
                    onChange={this.handleChangeFor("name")}
                />
                <br />
                {/* Description of Program */}
                <TextField
                    id="description"
                    label={this.props.pItem.description}
                    placeholder="New Description"
                    margin="normal"
                    defaultValue={this.props.pItem.description}
                    onChange={this.handleChangeFor("description")}
                />
                <br />
                {/* Start Date of Program */}
                <TextField
                    id="startDate"
                    label="Program Start"
                    type="date"
                    defaultValue={this.props.pItem.start}
                    InputLabelProps={{
                    shrink: true,
                    }}
                    onChange={this.handleChangeFor("start")}
                />
                <br />
                {/* End Date of Program */}
                <TextField
                    id="endDate"
                    label="Program End"
                    type="date"
                    defaultValue={this.props.pItem.finish}
                    InputLabelProps={{
                    shrink: true,
                    }}
                    onChange={this.handleChangeFor("finish")}
                />
                <br />

                <Button variant="outlined" onClick={() => this.putProgram()}>
                    Save
                </Button>
                <Button variant="outlined" onClick={() => this.delProgram()}>
                    Delete
                </Button>
            </div>
        )
    }
}

export default connect(mapStateToProps)(EditProgramForm);