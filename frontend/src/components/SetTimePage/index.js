import React, { useEffect, useState, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import cookieDone from '../../assets/cookieDone.png';
import smallTree from '../../assets/smallTree.png'
import star from '../../assets/star.png'
import Sidebar from '../Navigation/Sidebar_';

import './SetTime.css';

export default function SetTime() {
    const user = useSelector((state) => state.session.user);
    const history = useHistory();
  



    if (!user) {
        history.push("/")
    };

    return (
        <>
            <Sidebar
              user={user}
            />

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
