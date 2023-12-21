import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { fetchAllBoard } from '../../store/board';
import OpenModalButton from '../OpenModalButton';
import CreateBoardModal from '../ModalCreate/CreateBoard';
import DeleteBoardModal from '../ModalDelete/DeleteBoard';
import Sidebar from '../Navigation/Sidebar_';

import './WorkSpace.css';

export default function WorkSpace() {
    //side bar
    const [ isOpen, setIsOpen ] = useState(false);

    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector((state) => state.session.user);
    const allBoards = useSelector((state) => state.boards);
    const boardsArr = Object.values(allBoards);
    const [ isLoaded, setIsLoaded] = useState(false);
    const [ starClass, setStarClass ] = useState("fa-regular fa-star")

    console.log('user', user);
    console.log('all boards', allBoards)
    console.log('star class', starClass)

    useEffect(() => {

        dispatch(fetchAllBoard())
            .then(() => setIsLoaded(true));

    }, [dispatch]);



    const handleStar = () => {
        if (starClass === "fa-regular fa-star" ) {
            setStarClass("fa-solid fa-star")
        }else if (starClass === "fa-solid fa-star") {
            setStarClass("fa-regular fa-star");
        }
    };

    if (!user) {
        history.push("/")
    };


    return isLoaded && (
     <>
         <Sidebar
          user={user}
         />

        <div className="workspace">

            <div className="heading">
                <span className="name">{user?.firstName}</span>
                <span style={{ fontSize:30, color:'#313c67', marginLeft:5 }}>'s Work Space</span>
            </div>
            <div className="inner-workspace">
                    {boardsArr.reverse().map((board) =>
                    <div className="boards-container" key={board.id}>
                        <Link to={`/boards/${board.id}`} style={{ textDecoration: 'none', color: '#313c67' }}>
                            <div className="board-card-container">
                                <div style={{ marginBottom: 20 }} className="board-card">
                                    {board.name}
                                </div>
                            </div>
                        </Link>

                        <div className="board-btn">
                            {/* <div className="starred-container" >
                                <i className={starClass} onClick={handleStar}></i>
                            </div> */}
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
    </>

    );
};
