import React, { useEffect, useState, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import cookieDone from '../../assets/cookieDone.png';
import smallTree from '../../assets/smallTree.png'
import star from '../../assets/star.png'

import './SetTime.css';

export default function SetTime() {
    const user = useSelector((state) => state.session.user);
    const history = useHistory();
    const [isOpen, setIsOpen] = useState(false);

    const handleBar = () => {
        setIsOpen(!isOpen); //set to true
    };

    if (!user) {
        history.push("/")
    };

    return (
        <>
            <div className={`sidebar ${isOpen ? "sidebar--open" : ""}`}>
                <div className="trigger-bar" onClick={handleBar}>
                    {isOpen ?
                        <i class="fa-solid fa-chevron-left"></i> : <i class="fa-solid fa-chevron-right"></i>}
                </div>


                <div className="sidebar-content">
                    <i class="fa-solid fa-user"></i>
                    <span style={{ marginLeft: 15 }}>Hello, {user.firstName}</span>
                </div>
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <div className="sidebar-content">
                        <i class="fa-solid fa-house"></i>
                        <span style={{ marginLeft: 10 }}>Home</span>
                    </div>
                </Link>

                <Link to="/workspace" style={{ textDecoration: 'none' }}>
                    <div className="sidebar-content">
                        <i class="fa-solid fa-grip"></i>
                        <span style={{ marginLeft: 13 }}>Boards</span>
                    </div>
                </Link>
                <Link to="/workspace" style={{ textDecoration: 'none' }}>
                    <div className="sidebar-content">
                        <i class="fa-solid fa-star"></i>
                        <span style={{ marginLeft: 9 }}>Starred Board</span>
                    </div>
                </Link>
                <Link to="/timer" style={{ textDecoration: 'none' }}>
                    <div className="sidebar-content">
                        <i class="fa-solid fa-clock"></i>
                        <span style={{ marginLeft: 12 }}>Focus Mode</span>
                    </div>
                </Link>
            </div>
            <div className="set-time-main">
                <div className="set-time-heading">
                    <h1> Baking or Planting ? </h1>
                </div>
                <div className="set-time-cards">
                    <Link to="/timer/cookie" style={{ textDecoration: 'none', color: '#fffefe' }}>
                        <img src={cookieDone} alt="cookie"/>
                        <div>Baking</div>
                    </Link>
                </div>
                <div className="set-time-cards">
                    <Link to="/timer/tree" style={{ textDecoration: 'none', color: '#fffefe' }}>
                        <img src={smallTree} alt="tree"/>
                        <div>Planting</div>
                    </Link>
                </div>
                <div className="set-time-cards">
                    <Link to="/timer/reg" style={{ textDecoration: 'none', color: '#fffefe' }}>
                        <img src={star} alt="tree"/>
                        <div>Just Focus</div>
                    </Link>
                </div>
            </div>
        </>
    );
}
