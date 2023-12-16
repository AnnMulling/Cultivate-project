import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link, useParams } from 'react-router-dom';
import { fetchABoard } from '../../store/board';
import Sidebar from '../Navigation/Sidebar_';
import List from '../List/List';
import AddList from '../List/AddList';

import './Board.css'


export default function BoardDetails() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { boardId } = useParams();
    const board = useSelector((state) => state.boards[boardId]);
    const user = useSelector((state) => state.session.user);
    // const allLists = useSelector((state) => state.lists);
    const listArr = board?.Lists;
    const [isLoaded, setIsLoaded] = useState(false);
    //toggle adding list
    const [ addingList, setAddingList ] = useState(false);
    const [ show, setShow ] = useState(false);

    console.log('in board component')

    console.log('board', board)
    console.log('all lists', listArr)
     console.log('adding list', addingList)

    useEffect(()  => {

        dispatch(fetchABoard(boardId))
        .then(() => setIsLoaded(true));

    }, [dispatch]);


    const toggleAddingList = () => {
        setAddingList(!addingList);
        setShow(!show);
    };

    if (!user) {
        history.push("/")
    };

    return isLoaded && (
        <div className="board-page-main">
            <Sidebar
                user={user}
            />

            <h1 className='heading'>{board?.name}</h1>
            <div className="board-details-container">
                <h2>Tasks</h2>
                <div className="list-main-container" >
                    {listArr.map((list, index) => {
                        return <List boardId={boardId} list={list} index={index} isLoaded={isLoaded} />
                    })}

                <div className="add-List">
                    {addingList && show ? (
                         <AddList boardId={boardId} toggleAddingList={toggleAddingList}/>
                    ) : (
                        <button
                            onClick={toggleAddingList}
                            className="list-btn-crt"
                        >
                            <i className="fa-solid fa-circle-plus"></i>
                        </button>
                    )}
                </div>
                </div>
            </div>

        </div>

    );
};
