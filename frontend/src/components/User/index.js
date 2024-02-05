import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import Sidebar from '../Navigation/Sidebar_';
import DateTime from './DateTime';
import Weather from '../Weather/Weather';

//img
import kitty from '../../assets/splash/kitty.png'

import './User.css';

export default function UserPage () {
    const user = useSelector((state) => state.session.user);
    const history = useHistory();

    // if (!user) {
    //     return history.push("/")
    // }
    return user ? (
        <>
            <Sidebar user={user} />
            <div className="user-page">
                {/* <div className="user-inner"> */}
                        <div className="user-hello">
                            <h1 style={{ fontSize: "55px", fontWeight: "lighter" , marginLeft: "150px"}}>Hi, {user.firstName}!</h1>
                            <p style={{ color: "#B4B4B4", fontSize: "30px"}}>How are you doing today?</p>
                            <DateTime/>
                            <div className="user-hello-kitty">
                                <img src={kitty} alt="kitty" />
                            </div>

                        </div>
                {/* </div> */}

                    <Weather />

            </div>
        </>
    ) : null && history.push("/")
}
