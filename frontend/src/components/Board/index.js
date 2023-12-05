import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link, useParams } from 'react-router-dom';
import { fetchAllLists } from '../../store/list';
import { fetchABoard, fetchAllBoard } from '../../store/board';
import CreateListModal from '../ModalCreate/CreateList';
import OpenModalButton from '../OpenModalButton';
import DeleteListModal from '../ModalDelete/DeleteList';

import './Board.css'

export default function BoardDetails(){

    const dispatch = useDispatch();
    const history = useHistory();
    const { boardId } = useParams();
    const board = useSelector((state) => state.boards ? state.boards[boardId] : null);
    const user = useSelector((state) => state.session.user);
    const allLists =  useSelector((state) => state.lists);
    const listArr = Object.values(allLists);
    const [ isLoaded, setIsLoaded ] = useState(false)

    // console.log('user', user);
    console.log('entering board...');
    console.log('board id', boardId)
    console.log('board', board)
    console.log('lists', listArr)




    useEffect(() => {
        dispatch(fetchABoard(boardId))
        dispatch(fetchAllLists(boardId))
        .then(() => setIsLoaded(true));

    }, [dispatch]);



    if(!user) {
        history.push("/")
    };

    return isLoaded && (
        <>
            <h1>In board {board.name}</h1>
            {listArr.reverse().map((list) =>

                <div key={list.id}>
                    <p>{list.title}</p>
                    <p>Created By {user.firstName}</p>

                    <OpenModalButton
                    modalComponent={<CreateListModal board={board} formType="Edit List" list={list}  />}
                    buttonText={"Edit List"}
                    modalClasses={["list-btn"]}
                    />

                    <OpenModalButton
                    modalComponent={<DeleteListModal board={board} list={list} />}
                    buttonText={"Delete List"}
                    modalClasses={["list-btn"]}
                    />
                </div>


            )}
            <OpenModalButton
             modalComponent={<CreateListModal board={board} formType="Create List" />}
             buttonText={"Add List"}
             modalClasses={["list-btn"]}
            />
            <Link to="/workspace">
                <button>Back to Work Space</button>
            </Link>
        </>
    );
};
