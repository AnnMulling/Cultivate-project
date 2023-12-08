import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  
  return (
    <ul className="nav-container">
        <li>
          <NavLink exact to="/">Home</NavLink>
        </li>
      {isLoaded && sessionUser && (
        <li>
          <NavLink to="/workspace" style={{textDecoration: 'none'}} className="workspace-btn">
              Your WorkSpace
          </NavLink>
        </li>
      )}
      {isLoaded && (
          <li>
            <ProfileButton user={sessionUser} />
          </li>

      )}

    </ul>
  );
}

export default Navigation;
