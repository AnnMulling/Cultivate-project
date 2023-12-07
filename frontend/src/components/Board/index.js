import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link, useParams } from 'react-router-dom';
import { fetchAllLists } from '../../store/list';
import { fetchABoard, fetchAllBoard } from '../../store/board';
import CreateListModal from '../ModalCreate/CreateList';
import OpenModalButton from '../OpenModalButton';
import DeleteListModal from '../ModalDelete/DeleteList';

import './Board.css'
import WorkSpace from '../WorkSpace';

export default function BoardDetails(){
    //toggle side bar menu
    const [ isOpen, setIsOpen ] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();
    const { boardId } = useParams();
    const board = useSelector((state) => state.boards[boardId]);
    const user = useSelector((state) => state.session.user);
    const allLists =  useSelector((state) => state.lists);
    const listArr = Object.values(allLists);
    const [ isLoaded, setIsLoaded ] = useState(false);


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

    const handleBar = () => {
        setIsOpen(!isOpen); //set to true
    };


    if(!user) {
        history.push("/")
    };

    return isLoaded && (
        <>
            <div className={`sidebar ${isOpen ? "sidebar--open" : ""}`}>
                <div className="trigger-bar" onClick={handleBar}>
                    {isOpen ?
                     <i class="fa-solid fa-chevron-left"></i> : <i class="fa-solid fa-chevron-right"></i>}
                </div>

                <Link to="/" style={{textDecoration: 'none'}}>
                    <div className="sidebar-content">
                        <i class="fa-solid fa-house"></i>
                        <span style={{marginLeft:10}}>Home</span>
                    </div>
                </Link>

                <Link to="/workspace" style={{textDecoration: 'none'}}>
                    <div className="sidebar-content">
                            <i class="fa-solid fa-grip"></i>
                            <span style={{marginLeft:10}}>Boards</span>
                    </div>
                </Link>
                <Link to="" style={{textDecoration: 'none'}}>
                    <div className="sidebar-content">
                        <i class="fa-solid fa-star"></i>
                        <span style={{marginLeft:10}}>Starred Board</span>
                    </div>
                </Link>
                <Link to="" style={{textDecoration: 'none'}}>
                    <div className="sidebar-content">
                        <i class="fa-solid fa-clock"></i>
                        <span style={{marginLeft:10}}>Focus Mode</span>
                    </div>
                </Link>
            </div>
            <div className="board-details-container">
                <h1>{board?.name}</h1>
                <h2>Tasks</h2>
                {listArr.reverse().map((list) =>
                    <div key={list.id}>
                        <span></span>
                        <p>{list.title}</p>
                        <p>Created By {user.firstName}</p>

                        <OpenModalButton
                        modalComponent={<CreateListModal board={board} formType="Edit List" list={list}  />}
                        buttonText={<i class="fa-solid fa-pen-to-square"></i>}
                        modalClasses={["list-btn-edt"]}
                        />

                        <OpenModalButton
                        modalComponent={<DeleteListModal board={board} list={list} />}
                        buttonText={<i class="fa-solid fa-trash"></i>}
                        modalClasses={["list-btn-delete"]}
                        />
                    </div>


                )}
                <OpenModalButton
                modalComponent={<CreateListModal board={board} formType="Create List" />}
                buttonText={<i class="fa-solid fa-circle-plus"></i>}
                modalClasses={["list-btn"]}
                />

            </div>
        </>
    );
};
