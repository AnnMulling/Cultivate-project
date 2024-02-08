import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import Sidebar from '../Navigation/Sidebar_';
import DateTime from './DateTime';
import Weather from '../Weather/Weather';
import { LOGGOUT_USER } from "../../store/session";
import { fetchAllBoard } from '../../store/board';

//img
import kitty from '../../assets/splash/kitty.png'

import './User.css';

export default function UserPage () {
    const user = useSelector((state) => state.session.user);
    const allBoards = useSelector((state) => state.boards);
    const boardsArr = Object.values(allBoards);
    const [isLoaded, setIsLoaded] = useState(false);
    const history = useHistory();
    const dispatch = useDispatch();

    console.log('all Boards', allBoards)
    console.log('board Arr', boardsArr)

    useEffect(() => {
        if (user ) {
            dispatch(fetchAllBoard())
                .then(() => setIsLoaded(true));
        }else {
            dispatch(LOGGOUT_USER)
                .then(() => history.push("/"))
        }

    }, [dispatch]);

    return isLoaded && user ? (
        <>
            <Sidebar user={user} />
            <div className="user-page">
                {/* <div className="user-inner"> */}
                        <div className="user-hello">
                            <h1>Hi, {user.firstName}!</h1>
                            <p style={{ color: "#B4B4B4"}}>How are you doing today?</p>
                            <DateTime/>
                            <div className="user-hello-kitty">
                                <img src={kitty} alt="kitty" />
                            </div>

                        </div>
                {/* </div> */}

                    {/* <Weather /> */}
                    <div className="user-page-boards">
                    {boardsArr.map((board) =>
                        <Link to={`/boards/${board.id}`} style={{ textDecoration: 'none', color: '#313c67' }}>
                            <div className="user-page-board" key={board.id}>
                                    <p style={{ paddingTop: "40px"}}>Board: {board.name}</p>
                                    {board.Lists.length > 0 && (
                                        <div className="indicator">
                                            <div className="notification" >{board.Lists.length}</div>
                                        </div>
                                    )}
                                </div>
                        </Link>


                    )}

                    </div>

            </div>
        </>
    ) : null && history.push("/")
}
