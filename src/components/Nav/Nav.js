import React from 'react';
import { Link } from 'react-router-dom';


const Nav = () => (
  <div className="navbar">
    <div>
   <a href="/user"> <img className="logo" src="images/academylogo_white.png" alt="Reve logo"  /> </a>

      <ul>

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
