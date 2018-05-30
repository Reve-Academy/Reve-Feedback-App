import React from 'react';
import { Link } from 'react-router-dom';
import reveLogo from '../../styles/images/ReveAcademy_Logo.png';

const StudentNav = () => (

  <div className="navbar">
   
      {/* Reve Academy logo */}
			<img className="logo" src={reveLogo} alt="Reve logo" />
     

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
