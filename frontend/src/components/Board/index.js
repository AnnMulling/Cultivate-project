import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link, useParams } from 'react-router-dom';
import { fetchAllLists } from '../../store/list';
import { fetchABoard, fetchAllBoard } from '../../store/board';
import CreateListModal from '../ModalCreate/CreateList';
import OpenModalButton from '../OpenModalButton';
import DeleteListModal from '../ModalDelete/DeleteList';
import Sidebar from '../Navigation/Sidebar_';

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

    //toggle list
    const [ editList, setEditList ] = useState(false);
    const [ addCard , setAddCard ] = useState(false);



    console.log('board', board)
    console.log('all lists', listArr)



    useEffect(() => {

        dispatch(fetchABoard(boardId))
        dispatch(fetchAllLists(boardId))
        .then(() => setIsLoaded(true));

    }, [dispatch]);

    //handle bar
    const handleBar = () => {
        setIsOpen(!isOpen); //set to true
    };



    if(!user) {
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
                <div  className="list-main-container">
                    {listArr.map((list) =>
                        <div key={list.id} className="list-container">
                            <h3>{list.title}</h3>

                            <div className="card-btn-crt"><i className="fa-solid fa-circle-plus"></i>Add task</div>
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
                        <div>
                            <OpenModalButton
                            modalComponent={<CreateListModal board={board} formType="Create List" />}
                            buttonText={<i class="fa-solid fa-circle-plus"></i>}
                            modalClasses={["list-btn-crt"]}
                            />
                        </div>
                </div>

            </div>
        </div>
    );
};
