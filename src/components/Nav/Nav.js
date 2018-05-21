import React from 'react';
import { Link } from 'react-router-dom';


const Nav = () => (
  <div className="navbar">
    <div>
      <ul>
        <li className="logo">
          {/* Reve Academy logo */}
          <img src="images/academylogo_white.png" alt="Reve logo" />
        </li>
        <li>
          
          <Link to="/user">
            Home
          </Link>
        </li>
      </ul>
    </div>
  </div>
);

export default Nav;
