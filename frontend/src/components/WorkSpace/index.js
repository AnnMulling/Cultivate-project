import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { fetchAllBoard } from '../../store/board';
import OpenModalButton from '../OpenModalButton';
import CreateBoardModal from '../ModalCreate/CreateBoard';
import DeleteBoardModal from '../ModalDelete/DeleteBoard';

import './WorkSpace.css';

export default function WorkSpace() {
    //get all boards

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


    if(!user) {
        history.push("/")
    };



    return isLoaded && (
        <>
            <h1>{user.firstName}'s Work Space</h1>
            {boardsArr.reverse().map((board) =>
                <div key={board.id} style={{marginBottom:20}}>

                    <Link to={`/boards/${board.id}`}>
                        <div>{board.name}</div>
                    </Link>

                    <OpenModalButton
                        modalComponent={<CreateBoardModal board={board} formType="Edit Board" />}
                        buttonText={"Edit Board"}
                        modalClasses={["board-btn"]}
                    />

                    <OpenModalButton
                        modalComponent={<DeleteBoardModal board={board}  />}
                        buttonText={"Delete Board"}
                        modalClasses={["board-btn"]}
                    />

                </div>
             )}

             <OpenModalButton
                 modalComponent={<CreateBoardModal formType="Create Board" />}
                 buttonText={"Add Board"}
                 modalClasses={["board-btn"]}
             />

        </>
    );
};
