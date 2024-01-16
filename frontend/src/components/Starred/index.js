import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import Sidebar from '../Navigation/Sidebar_';
import OpenModalButton from '../OpenModalButton';
import CreateBoardModal from '../ModalCreate/CreateBoard';
import DeleteBoardModal from '../ModalDelete/DeleteBoard';

import './Starred.css'
import { fetchAllBoard } from '../../store/board';

export default function Starred () {
    const dispatch = useDispatch();
    const history = useHistory();
    const [ isLoaded, setIsLoaded ] = useState(false)
    const user = useSelector((state) => state.session.user);
    const allBoards = useSelector((state) => state.boards);
    const starredBoards = Object.values(allBoards).filter((board) => board.star === true )

    useEffect(() => {
        dispatch(fetchAllBoard())
        .then(() => setIsLoaded(true));

    },[dispatch])

    return isLoaded &&  (
        <div className="starred-workspace">
            <Sidebar user={user}/>
            <div className="starred-heading">
                <span>Highlights</span>
            </div>
            <div className="inner-workspace">
                <div className="boards-container">
                {starredBoards.map((board) =>
                        <div key={board.id}>
                            <Link to={`/boards/${board.id}`} style={{ textDecoration: 'none', color: '#313c67' }}>
                                <div className="board-card-container">
                                    <div style={{ marginBottom: 20 }} className="board-card">
                                        {board.name}
                                    </div>
                                </div>
                            </Link>

                            <div className="board-btn">
                            {/* <div className="starred-container" onClick={(e) => handleStar(e, board.id, board.name, board.is_public)}>
                                { board.star === true ?
                                <i className="fa-solid fa-star"></i> :
                                <i className="fa-regular fa-star"></i> }
                            </div> */}

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
                    </div>



            </div>

        </div>
    );
}
