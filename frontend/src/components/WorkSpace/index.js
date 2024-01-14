import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { fetchAllBoard, fetchEditBoard } from '../../store/board';
import OpenModalButton from '../OpenModalButton';
import CreateBoardModal from '../ModalCreate/CreateBoard';
import DeleteBoardModal from '../ModalDelete/DeleteBoard';
import Sidebar from '../Navigation/Sidebar_';

import './WorkSpace.css';

export default function WorkSpace() {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector((state) => state.session.user);
    const allBoards = useSelector((state) => state.boards);

    const boardsArr = Object.values(allBoards);
    const [ isLoaded, setIsLoaded ] = useState(false);


    console.log('user', user);
    console.log('all boards', allBoards)


    useEffect(() => {

        dispatch(fetchAllBoard())
            .then(() => setIsLoaded(true));

    }, [dispatch]);



    const handleStar = async (e, id, name, isPublic) => {
        e.preventDefault();

        if (e.target.className === "fa-solid fa-star") {
            e.target.className = "fa-regular fa-star"

            const boardDetails = {
                name: name,
                is_public: isPublic,
                star: false
            };
            console.log('detail star false', boardDetails)
            dispatch(fetchEditBoard(id, boardDetails))

        }else if (e.target.className === "fa-regular fa-star"){
            e.target.className = "fa-solid fa-star"

            const boardDetails = {
                name: name,
                is_public: isPublic,
                star: true
            };
            console.log('detail star true', boardDetails)
            dispatch(fetchEditBoard(id, boardDetails))
        }


    };

    if (!user) {
        history.push("/")
    };


    return isLoaded && (
        <div className="workspace">
             <Sidebar user={user} />
            <div className="inner-workspace">
            <div className="heading">
                <span className="name">{user?.firstName}</span>
                <span style={{ fontSize:30, color:'#313c67', marginLeft:5 }}>'s Work Space</span>
            </div>
                    {boardsArr.map((board) =>
                    <div className="boards-container" key={board.id}>
                        <Link to={`/boards/${board.id}`} style={{ textDecoration: 'none', color: '#313c67' }}>
                            <div className="board-card-container">
                                <div style={{ marginBottom: 20 }} className="board-card">
                                    {board.name}
                                </div>
                            </div>
                        </Link>

                        <div className="board-btn">
                            <div className="starred-container" onClick={(e) => handleStar(e, board.id, board.name, board.is_public)}>
                                { board.star === true ?
                                <i className="fa-solid fa-star"></i> :
                                <i className="fa-regular fa-star"></i> }
                            </div>

                            <OpenModalButton
                                modalComponent={<CreateBoardModal board={board} formType="Edit Board" />}
                                buttonText={<i className="fa-solid fa-pen-to-square"></i>}
                                modalClasses={["board-btn-edt"]}
                            />
                            <OpenModalButton
                                modalComponent={<DeleteBoardModal board={board} />}
                                buttonText={<i className="fa-solid fa-trash"></i>}
                                modalClasses={["board-btn-dlt"]}
                            />
                        </div>

                    </div>

                    )}
                    <div className='create-board-container'>
                        <OpenModalButton
                            modalComponent={<CreateBoardModal formType="Create Board" />}
                            buttonText={<i className="fa-solid fa-circle-plus"></i>}
                            modalClasses={["board-btn-crt"]}
                        />
                    </div>


            </div>

        </div>
    );
};
