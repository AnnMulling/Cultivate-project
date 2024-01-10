import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link, useParams } from 'react-router-dom';

import './Sidebar.css';

export default function Sidebar({ user }) {
    const [ isOpen, setIsOpen ] = useState(false);

    const history = useHistory();


     //handle bar
     const handleBar = () => {
        setIsOpen(!isOpen); //set to true
    };

    if(!user) {
        history.push("/")
    };


    return (

        <div className={`sidebar ${isOpen ? "sidebar--open" : ""}`}>
            <div className="trigger-bar" onClick={handleBar}>
                {isOpen ?
                    <i className="fa-solid fa-chevron-left"></i> : <i className="fa-solid fa-chevron-right"></i>}
            </div>


            <div className="sidebar-content">
                <i className="fa-solid fa-user"></i>
                <span style={{ marginLeft: 15 }}>Hello, {user.firstName}</span>
            </div>
            <Link to="/" style={{ textDecoration: 'none' }}>
                <div className="sidebar-content">
                    <i className="fa-solid fa-house"></i>
                    <span style={{ marginLeft: 10 }}>Home</span>
                </div>
            </Link>

            <Link to="/workspace" style={{ textDecoration: 'none' }}>
                <div className="sidebar-content">
                    <i className="fa-solid fa-grip"></i>
                    <span style={{ marginLeft: 13 }}>Boards</span>
                </div>
            </Link>
            <Link to="/starred" style={{ textDecoration: 'none' }}>
                <div className="sidebar-content">
                    <i className="fa-solid fa-star"></i>
                    <span style={{ marginLeft: 9 }}>Starred Board</span>
                </div>
            </Link>
            <Link to="/timer" style={{ textDecoration: 'none' }}>
                <div className="sidebar-content">
                    <i className="fa-solid fa-clock"></i>
                    <span style={{ marginLeft: 12 }}>Focus Mode</span>
                </div>
            </Link>
        </div>
    )
}
