import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Modal from '@material-ui/core/Modal';
import { withStyles } from '@material-ui/core/styles';
import star from '../../styles/images/star.png';

const mapStateToProps = (state) => ({
	state
});

const styles = theme => ({
    paper: {
      position: 'relative',
      width: 20,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing.unit * 4,
    },

    card: {
        maxidth: 15,
    }
  });

    class StudentComments extends Component {
   
    

    render() {

        return(
            <div>
            <img className = "star" src={star} /> 
           

            <Card style={{width:120}}>
                <CardContent>
                    <div> Student: {this.props.comments.comment}<br/></div> 
                    <div> Week: {this.props.comments.week_id}<br/></div>

                    
                </CardContent>
            </Card>
            </div>
        )
    }
}

export default connect(mapStateToProps) (StudentComments);