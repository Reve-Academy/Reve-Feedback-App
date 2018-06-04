import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import { Star, Stars } from '@material-ui/icons';
let moment = require('moment');

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
        marginBottom: '30px',
        border: '1px solid #D8441C',
        borderRadius: '25px',
        width: '400',
        marginRight: '80px'
	},
	btn: {
		borderRadius: '15px',
		border: '1px solid #D8441C'
	},
	likedBtn: {
		fontSize: '55px',
		color: '#D8441C'
	},
	likeBtn: {
		border: '1px solid #D4D4D4',
		borderRadius: '50%',
		fontSize: '39px',
		color: 'D4D4D4',
		margin: '4px',
		padding: '3px'
	},
	commentCenter: {
		display: 'flex',
		justifyContent: 'center'
	}

};
const mapStateToProps = (state) => ({
	state,
});

class StudentFeedbackItem extends Component {

	state = {
		open: false,
		commentItem: {
			person_id: this.props.comments.person_id,
			comment_id: this.props.comments.id
		}
	};


	//LOGIC FOR LIKING COMMENT

	likeCommentMethod = () => {
		console.log('Clicked');
		this.props.dispatch({
			type: 'ADD_STUDENT_COMMENT_LIKE',
			payload: {
				person_id: this.props.comments.person_id,
				comment_id: this.props.comments.id
			}

		});

	};
	//END LIKE LOGIC

	//LOGIC FOR UNLIKING COMMENT
	unlikeCommentMethod = () => {
		this.props.dispatch({
			type: 'REMOVE_COMMENT_LIKE',
			payload: this.props.comments.id,
		})
	}
	//END UNLIKE LOGIC

	render() {
		
		let itemId = this.props.comments.id;
		let likeButton = null;
		let commentInfo;
		

		if (this.props.commentsLiked.find(function (val) {
			return (val.comment_id === itemId);
		})
		) {
			likeButton =
				<Stars style={itemStyle.likedBtn} onClick={this.unlikeCommentMethod} />

		} else {
			likeButton =
				<Star style={itemStyle.likeBtn} onClick={this.likeCommentMethod} />
		}


	

		if (this.props.comments.instructor === true) {
			commentInfo = (
				<p style={{ marginLeft: '70px' }} className="commentInstructorDates"> Instructor: {this.props.comments.first} {this.props.comments.last} | <i className="commentNamesAndDates">{moment(new Date(this.props.comments.date)).format("MMMM DD, YYYY")}</i></p>
			)
		} else {
			commentInfo = (
				<p style={{ marginLeft: '70px' }} className="commentDates"> Student comment | <i className="commentNamesAndDates">{moment(new Date(this.props.comments.date)).format("MMMM DD, YYYY")}</i></p>
			)	
		}



		return (
			<Grid style={itemStyle.commentCenter} item xs={12}>
				<Grid item xs={10} sm={8}>
					<div >
 						{commentInfo}
					
						<div style={{ float: 'left', marginRight: '15px', }}>
							{likeButton}
						</div>
						<Card style={itemStyle.feedbackField}>
							<CardContent>
								<div>
									{' '}
									{this.props.comments.comment}
									<br />
								</div>
							</CardContent>
						</Card>
					</div>
				</Grid>
			</Grid>
		);
	}
}

export default connect(mapStateToProps)(StudentFeedbackItem);
