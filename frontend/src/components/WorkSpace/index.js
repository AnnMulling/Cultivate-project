import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { fetchAllBoard } from '../../store/board';
import OpenModalButton from '../OpenModalButton';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import CreateBoardModal from '../ModalCreate/CreateBoard';

import './WorkSpace.css';

export default function WorkSpace() {
    //get all boards
    const ulRef = useRef();
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector((state) => state.session.user);
    const allBoards = useSelector((state) => state.boards);
    const [ isLoaded, setIsLoaded ] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    //add board



    console.log('user', user);
    console.log('all boards', allBoards)

    useEffect(() => {

        dispatch(fetchAllBoard())
        .then(() => setIsLoaded(true));

    }, [dispatch, showMenu]);


    if(!user) {
        history.push("/")
    };



    return isLoaded && (
        <>
            <h1>{user.firstName}'s Work Space</h1>
            {Object.values(allBoards).reverse().map((board) =>
                <div key={board.id} style={{marginBottom:20}}>

                    <Link to={`/boards/${board.id}`}>
                        <div>{board.name}</div>
                    </Link>

                    <OpenModalButton
                        modalComponent={<CreateBoardModal board={board} formType="Edit Board" />}
                        buttonText={"Edit Board"}
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
