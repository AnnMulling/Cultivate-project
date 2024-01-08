import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
import Sidebar from '../Navigation/Sidebar_';

import './Starred.css'

export default function Starred () {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector((state) => state.session.user);


    return (
        <>
            <Sidebar user={user}/>
            <h1>Hello from starred</h1>
        </>
    );
}
