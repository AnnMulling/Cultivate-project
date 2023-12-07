import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { fetchAllBoard } from '../../store/board';
import OpenModalButton from '../OpenModalButton';
import CreateBoardModal from '../ModalCreate/CreateBoard';
import DeleteBoardModal from '../ModalDelete/DeleteBoard';

import './WorkSpace.css';

export default function WorkSpace() {
    //side bar
    const [ isOpen, setIsOpen ] = useState(false);

    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector((state) => state.session.user);
    const allBoards = useSelector((state) => state.boards);
    const boardsArr = Object.values(allBoards);
    const [isLoaded, setIsLoaded] = useState(false);

    console.log('user', user);
    console.log('all boards', allBoards)

    useEffect(() => {

        dispatch(fetchAllBoard())
            .then(() => setIsLoaded(true));

    }, [dispatch]);

    const handleBar = () => {
        setIsOpen(!isOpen); //set to true
    };

    if (!user) {
        history.push("/")
    };


    return isLoaded && (
        <div className="workspace">
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

            <div className="inner-workspace">
                <div className="heading">
                    <span className="name">{user?.firstName}</span>
                    <span style={{ fontSize:30, color:'#405c86', marginLeft:5 }}>'s Work Space</span>
                </div>
                <div className='boards-container'>
                    {boardsArr.reverse().map((board) =>
                        <div className="board-card-container">
                            <Link to={`/boards/${board.id}`} style={{ textDecoration: 'none', color: '#405c86' }}>
                                <div key={board.id} style={{ marginBottom: 20 }} className="board-card">
                                    {board.name}
                                </div>

                            </Link>

                            <div className='board-btn'>
                                <OpenModalButton
                                    modalComponent={<CreateBoardModal board={board} formType="Edit Board" />}
                                    buttonText={<i class="fa-solid fa-pen-to-square"></i>}
                                    modalClasses={["board-btn-edt"]}
                                />
                                <OpenModalButton
                                    modalComponent={<DeleteBoardModal board={board} />}
                                    buttonText={<i class="fa-solid fa-trash"></i>}
                                    modalClasses={["board-btn-dlt"]}
                                />
                            </div>
                        </div>
                    )}
                     <div className='create-board-container'>
                        <OpenModalButton
                            modalComponent={<CreateBoardModal formType="Create Board" />}
                            buttonText={<i class="fa-solid fa-circle-plus"></i>}
                            modalClasses={["board-btn-crt"]}
                        />
                    </div>
                </div>

            </div>

        </div>

    );
};
