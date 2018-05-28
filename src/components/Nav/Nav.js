import React from 'react';
import { Link } from 'react-router-dom';
import reveLogo from '../../styles/images/ReveAcademy_Logo.png'


const Nav = () => (
  <div className="navbar">
    <div>
    <img className="logo" src={reveLogo} alt="Reve logo" />

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
