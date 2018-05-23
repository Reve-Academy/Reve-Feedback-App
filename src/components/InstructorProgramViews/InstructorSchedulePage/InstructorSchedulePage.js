// react, redux imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

//library import
import RGL, { WidthProvider } from 'react-grid-layout';
import _ from 'lodash';

import InstructorNav from '../../Nav/InstructorNav';
import { USER_ACTIONS } from '../../../redux/actions/userActions';

const ReactGridLayout = WidthProvider(RGL);

const mapStateToProps = state => ({
  user: state.user,
});

class InstructorSchedulePage extends Component {

  static defaultProps = {
    className: "layout",
    items: 10,
    rowHeight: 20,
    onLayoutChange: function() {},
    cols: 8
  };

  constructor(props) {
    super(props);

    const layout = this.generateLayout();
    this.state = { layout };
  }

  generateDOM() {
    return _.map(_.range(this.props.items), function(i) {
      return (
        <div key={i}>
          <span className="text">{i}</span>
        </div>
      );
    });
  }

  generateLayout() {
    const p = this.props;
    return _.map(new Array(p.items), function(item, i) {
      const y = _.result(p, "y") || Math.ceil(Math.random() * 4) + 1;
      return {
        x: (i * 2) % 12,
        y: Math.floor(i / 6) * y,
        w: 2,
        h: y,
        i: i.toString()
      };
    });
  }

  onLayoutChange(layout) {
    this.props.onLayoutChange(layout);
  }


  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
  }


  render() {

    let content = null;

    if (this.props.user.userName && this.props.user.userName.instructor) {
      content = (
        <div>
        
        {/* client-side routes for navbar */}

          <div>
          <ul>
          
            <li>
              <Link to="/InstructorStudent">
                Students
              </Link>
            </li>
            <li>
              <Link to="/InstructorFeedback">
                Feedback
              </Link>
            </li>
            <li>
              <Link to="/InstructorSchedule">
                Schedule
              </Link>
            </li>
      
          </ul>
          </div>
        {/* End navbar routes */}


          <h1>
            INSTRUCTOR SCHEDULE PAGE
          </h1>

          {/* Schedule Container */}
            <ReactGridLayout
            layout={this.state.layout}
            onLayoutChange={this.onLayoutChange}
            {...this.props}
            >
            {this.generateDOM()}
            </ReactGridLayout>
          {/* End Schedule Container */}

        </div>
      );
    }

    return (
      <div>
        <InstructorNav />
        {content}
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(InstructorSchedulePage);