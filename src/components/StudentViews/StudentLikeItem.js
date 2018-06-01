import React, { Component } from 'react';
import { connect } from 'react-redux';
import StudentFeedbackItem from '../StudentViews/StudentFeedbackItem'


const mapStateToProps = (state) => ({
	state
});

const styles = (theme) => ({
	paper: {
		position: 'relative',
		width: 20,
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
		padding: theme.spacing.unit * 4
	}
});

const itemStyle = {
	feedbackField: {
		padding: '10px',
		margin: '10px',
		border: '1px solid #D8441C',
		borderRadius: '25px',
		width: 400
	},
	btn: {
		borderRadius: '15px',
		border: '1px solid #D8441C'
	}
};


class StudentLikeItem extends Component {
    
    
    componentDidMount() {
        this.props.dispatch
        ({ type: 
            
            'GET_COMMENT_LIKE'

        });
    }


    render() {
        let likes = this.props.state.getLikeReducer.getLikeReducer.map(like => {
            return (

             <StudentFeedbackItem key = {like.id} likes = {likes} currentView = {this.props.currentView} />
       
            )
        
        })




    
        return(

            <div style={styles.root}>
                    {likes}
            </div>
        )
    
    }
    


}

    

export default connect(mapStateToProps)(StudentLikeItem);















	



