import React from 'react';
import { NavLink } from 'react-router-dom';
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

        <li >
          Search <i class="fa-solid fa-magnifying-glass" style={{color:'#405c86'}}></i>
        </li>
    
      {isLoaded && (
        <li>
          <ProfileButton user={sessionUser} />
        </li>
      )}
    </ul>
  );
}

export default Navigation;
