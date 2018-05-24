import React, { Component } from 'react';
import { connect } from 'react-redux';

//import material-ui
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';

const mapStateToProps = state => ({
    state,
  });

class AddLessonForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            newFocus: {
                name: '',
                summary: '',
                weekId: '',
                startDay: '',
                x: 0,
                y: 0,
                w: 2,
                h: 1
            },
            newStrategy: {
                title: '',
                summary: '',
                focusId: ''
            },
            newResource: {
                link: '',
                strategyId: ''
            }
        }
    }
}