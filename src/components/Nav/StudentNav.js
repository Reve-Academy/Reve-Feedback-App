import React from 'react';
import { Link } from 'react-router-dom';

const StudentNav = () => (
  <div className="navbar">
    <div>
      <ul>
        <li>
          <Link to="/user">
            Home
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
          <Link to="/program_name">
           Program Name
          </Link>
        </li>
        <li>
          <Link to="/info">
            Info Page
          </Link>
        </li>
      </ul>
    </div>
  </div>
);

export default StudentNav;
