import React from 'react';
import { Link } from 'react-router-dom';

const InstructorNav = () => (
  <div className="navbar">
    <div>
      <ul>
        <li>
          <Link to="/user">
            Home
          </Link>
        </li>
        <li>
          <Link to="/students">
            Students
          </Link>
        </li>
        <li>
          <Link to="/feedback">
            Feedback
          </Link>
        </li>
        <li>
          <Link to="/schedule">
            Schedule
          </Link>
        </li>
        <li>
          <Link to="">
          Program Name
          </Link>
        </li>
      </ul>
    </div>
  </div>
);

export default InstructorNav;
