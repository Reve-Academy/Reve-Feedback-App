import React from 'react';
import { Link } from 'react-router-dom';
import reveLogo from '../../styles/images/ReveAcademy_Logo.png';
import avatarLogo from '../../styles/images/avatar.png'
const Nav = () => (
	<div className="navbar">
		<div>
			{/* Reve Academy logo */}
			<img className="logo" src={reveLogo} alt="Reve logo" />
			<img className = "avatar" src={avatarLogo} />
		</div>
	</div>
);

export default Nav;
