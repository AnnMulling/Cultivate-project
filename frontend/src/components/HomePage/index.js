import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';

import './HomePage.css';

export  default function HomePage () {
    const user = useSelector((state) => state.session.user);


    return (
        <>
            <h1>Homepage</h1>
            {user && (
                <Link to="/workspace">
                    <button>Your WorkSpace</button>
                </Link>
            )}
        </>
    );
};
