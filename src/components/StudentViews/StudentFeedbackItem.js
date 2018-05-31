import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Modal from '@material-ui/core/Modal';
import { withStyles } from '@material-ui/core/styles';
import outline_star from '../../styles/images/outline_star.png';

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

class StudentComments extends Component {
	constructor() {
		super();
	}

	handleStarClick = (event) => {
		console.log('Clicked');
		this.props.dispatch({
			type: 'SET_COMMENT_LIKE',
			payload: 
				this.props.person_id
			
		});
	};

	render() {
		return (
			<div>
				<img
					src={outline_star}
					onClick={() => {
						this.handleStarClick();
					}}
				/>

				<Card style={itemStyle.feedbackField}>
					<CardContent>
						<div>
							{' '}
							{/* Theme:  {this.props.week.theme}, */}
							Student: {this.props.comments.comment}
							<br />
						</div>
					</CardContent>
				</Card>
			</div>
		);
	}
}

export default connect(mapStateToProps)(StudentComments);
