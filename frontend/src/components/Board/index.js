import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link, useParams } from 'react-router-dom';
import { fetchABoard } from '../../store/board';
import Sidebar from '../Navigation/Sidebar_';
import List from '../List/List';
import AddList from '../List/AddList';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import './Board.css'
import { fetchAllLists } from '../../store/list';


export default function BoardDetails() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { boardId } = useParams();
    const board = useSelector((state) => state.boards[boardId]);
    const user = useSelector((state) => state.session.user);
    // const allLists = useSelector((state) => state.lists);
    let listArr = board?.Lists;
    const [ stores, setStores ] = useState(board?.Lists);
    const [ isLoaded, setIsLoaded ] = useState(false);
    //toggle adding list
    const [ addingList, setAddingList ] = useState(false);
    const [ show, setShow ] = useState(false);

    // console.log(stores, '<==== stores list array')
    console.log(listArr,'<==== list array' )


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
    const handleDragDrop = (result) => {
        const { source, destination, type } = result;

        if (!destination) return;
        if (source.droppableId === destination.droppableId
            && source.index === destination.index ) return;

        if (type === "group") {
            const reorderStores = [...listArr];
            //find index to remove(splice) the add it back to the store array again
            const sourceIndex = source.index;
            const destinationIndex = destination.index;
            // remove the target from the original array
            const [ removeItem ] = reorderStores.splice(sourceIndex, 1);
            // add it back to the store using splice
            reorderStores.splice(destinationIndex, 0, removeItem);

            console.log('reorder ===>', reorderStores)
            console.log('list after reordered' , listArr)

            listArr = [...reorderStores]
            return listArr;
        }
    }

    return isLoaded && (
        <>
            <Sidebar user={user} />
            <h1 className='heading'>{board?.name}</h1>
            <DragDropContext
                onDragEnd={handleDragDrop}>
            {/* <div className="board-page-main"> */}

                    <Droppable droppableId="board" direction="horizontal" type="COLUMN">
                        {(provided) => (
                            <div
                                className="board-details-container"
                                {...provided.droppableProps}
                                ref={provided.innerRef}>


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
                                {/* </div> */}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
            {/* </div> */}
            </DragDropContext>
        </>

    );
};
