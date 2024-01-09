import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link, useParams } from 'react-router-dom';
import { fetchABoard, fetchMoveList } from '../../store/board';
import Sidebar from '../Navigation/Sidebar_';
import List from '../List/List';
import AddList from '../List/AddList';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import './Board.css'




export default function BoardDetails() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { boardId } = useParams();
    const board = useSelector((state) => state.boards[boardId]);
    const user = useSelector((state) => state.session.user);
    // const allLists = useSelector((state) => state.lists);
    let listArr = board?.Lists;
    const [ isLoaded, setIsLoaded ] = useState(false);
    //toggle adding list
    const [ addingList, setAddingList ] = useState(false);
    const [ show, setShow ] = useState(false);

    console.log(board, '<==== board state')
    console.log(listArr,'<==== list array' )

    useEffect(() => {

    }, [listArr])


    useEffect(() => {

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

    //dnd
    const handleDragDrop =  (result) => {
        const { source, destination, type } = result;

        const newListOrder = [...listArr]
        const oldListIndex = source.index;
        const newListIndex = destination.index;

        console.log('new list order ===>', newListOrder)
        if (!destination || !source) return;

        if (type === "LIST") {
            // Prevent update if nothing has changed
            if (source.index !== destination.index ) {

                const [removedList] = newListOrder.splice(oldListIndex, 1);
                newListOrder.splice(newListIndex, 0, removedList);

                dispatch(fetchMoveList(newListOrder, boardId))

            };
        };
        return
    }

    return isLoaded && (
        <DragDropContext
            onDragEnd={handleDragDrop}>
            <div className="board-page-main">

                <Sidebar user={user} />

                <div className="heading">
                    <h1 >{board?.name}</h1>
                </div>

                    <Droppable droppableId={boardId} direction="horizontal" type="LIST">
                        {(provided) => (
                            <div
                                className="board-details-container"
                                ref={provided.innerRef}
                                {...provided.droppableProps}>

                                {/* <div className="list-main-container" > */}
                                    {listArr.map((list, index) =>
                                        <Draggable
                                            draggableId={list.id.toString()}
                                            index={index}
                                            key={list.id}
                                        >
                                            {(provided) => (
                                                <div
                                                    // className="list-main-container"
                                                    {...provided.dragHandleProps}
                                                    {...provided.draggableProps}
                                                    ref={provided.innerRef}
                                                >
                                                     <List boardId={boardId} list={list} isLoaded={isLoaded} />
                                                </div>
                                            )}
                                        </Draggable>

                                            )}

                                    <div className="add-List">
                                        {addingList && show ? (
                                            <AddList boardId={boardId} toggleAddingList={toggleAddingList} />
                                        ) : (
                                            <button
                                                onClick={toggleAddingList}
                                                className="list-btn-crt"
                                            >
                                                <i className="fa-solid fa-circle-plus"></i>
                                            </button>
                                        )}
                                    </div>
                                {provided.placeholder}
                                </div>
                            // </div>
                        )}
                    </Droppable>
            </div>
        </DragDropContext>
    );
};
