import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
	state
});

class AlertDialog extends Component {

    render() {

        return (
            <div>
                <Button>
                </Button>

                {/* Modal Edit */}
                <Modal
                aria-labelledby="Edit Program"
                open={this.state.open}
                onClose={this.handleClose}
                > 
                    <div 
                    style={getModalStyle()} 
                    className={classes.paper}
                    >
                    <h3>You cannot undo this delete, please confirm you would like to delete.</h3> 
                    <Button>Cancel</Button>
                    <Button>Confirm</Button>
                

                    </div>
                </Modal>
                {/* End Modal Edit */}
            </div>
        )
    }

}


export default connect(mapStateToProps)(AlertDialog);