import React from 'react';
import { Link } from 'react-router-dom';

const StudentNav = () => (

  <div className="navbar">
   
      {/* Reve Academy logo */}
			<img className="logo" src="images/academylogo_white.png" alt="Reve logo" />
     

      <ul>
        <li className="navItem">
          <Link to="/StudentFeedback">
            Feedback
          </Link>
        </li>
        <li className="navItem">
          <Link to="/StudentSchedule">
            Schedule
          </Link>
        </li>
        <li className="navItem">
          <Link to="/program">
            Program Name
          </Link>
        </li>
      </ul>
  </div>
);

export default StudentNav;
