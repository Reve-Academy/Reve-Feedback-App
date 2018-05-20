import React from 'react';
import { Link } from 'react-router-dom';

const studentNav = () => (
  <div className="navbar">
    <div>
      <ul>
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
          <Link to="/program">
            Program Name
          </Link>
        </li>
      </ul>
    </div>
  </div>
);

export default studentNav;
