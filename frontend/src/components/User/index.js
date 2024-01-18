import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import Sidebar from '../Navigation/Sidebar_';
import DateTime from './DateTime';

//img
import kitty from '../../assets/splash/kitty.png'

import './User.css';

export default function UserPage () {
    const user = useSelector((state) => state.session.user);
    const history = useHistory();

    if (!user) {
        return history.push("/")
    }
    return (
        <div className="user-page">
            <Sidebar user={user} />
            <div className="user-inner">
                    <div className="user-hello">
                        <h1 style={{ fontSize: "55px", fontWeight: "lighter"}}>Hi, {user.firstName}!</h1>
                        <p style={{ color: "#B4B4B4", fontSize: "30px"}}>How are you doing today?</p>
                        <DateTime/>
                        <img style={{ marginLeft: "220px", position: "reletive"}} src={kitty} alt="kitty" />

                    </div>
             </div>
        </div>
    );
}
