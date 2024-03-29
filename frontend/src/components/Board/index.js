import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link, useParams } from 'react-router-dom';
import { fetchABoard, fetchMoveList } from '../../store/board';
import Sidebar from '../Navigation/Sidebar_';
import List from '../List/List';
import AddList from '../List/AddList';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Select, { components } from 'react-select';

import './Board.css'

export default function BoardDetails() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { boardId } = useParams();

    const board = useSelector((state) => state.boards[boardId]);
    const user = useSelector((state) => state.session.user);
    // const allLists = useSelector((state) => state.lists);
    let listArr = board?.Lists;
    const [isLoaded, setIsLoaded] = useState(false);
    //toggle adding list
    const [addingList, setAddingList] = useState(false);
    const [show, setShow] = useState(false);
    //task priority
    const selections = [
        { value: "#7ECFFA", label: "Low" },
        { value: "#38CF86", label: "Medium" },
        { value: "#FA7B28", label: "High" },
        { value: "#E13A3A", label: "Urgent" },
    ];

    const savedColor = JSON.parse(localStorage.getItem(boardId))?.value
    const savedLabel = JSON.parse(localStorage.getItem(boardId))?.label
    const [label, setLabel] = useState(savedLabel ? savedLabel : null);
    const [color, setColor] = useState(savedColor ? savedColor : null);



    useEffect(() => {

        localStorage.getItem(boardId)
        
        dispatch(fetchABoard(boardId))
            .then(() => setIsLoaded(true));

    }, [dispatch, color, label]);


    const customStyles = {

        singleValue: (base) => ({
            ...base,
            display: "none",
        }),
        control: (base) => ({
            ...base,
            border: "none",
            boxShadow: "none",
        }),

    };

    const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    };

    // handle task priority
    const handleChange = (selected, id) => {
        //save value to local storage
        //if not exists, create
        if (!localStorage.getItem(selected.label)) {
            localStorage.setItem(id, JSON.stringify(selected));
            setLabel(selected.label);
            setColor(selected.value);
        }

    };

    //change style selection

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

        const newListOrder = [...listArr]
        const oldListIndex = source.index;
        const newListIndex = destination.index;

        if (!destination || !source) return;

        if (type === "LIST") {
            // Prevent update if nothing has changed
            if (source.index !== destination.index) {

                const [removedList] = newListOrder.splice(oldListIndex, 1);
                newListOrder.splice(newListIndex, 0, removedList);

                dispatch(fetchMoveList(newListOrder, boardId))

            };
        };
        return
    }

    const Control = ({ children, ...props }) => (
        <components.Control {...props}>

            Task Priority:
            <span
                className="show-selection"
                style={{ background: color ? color : "#B3B8C8" }}>{label} </span>
            {children}
        </components.Control>
    );

    return isLoaded && (
        <DragDropContext
            onDragEnd={handleDragDrop}>
            <div className="board-page-main">

                <Sidebar user={user} />

                <div className="board-heading">
                    <h1 >{board?.name}</h1>
                    <span style={{ marginRight: 10 }}>Created on: {new Date(board.createdAt).toLocaleDateString('en-US', options)} </span>
                    <div className="selection">

                        <Select
                            onChange={(selected) => handleChange(selected, board.id)}
                            styles={customStyles}
                            options={selections}
                            components={{ Control }}
                            isSearchable={false}
                        />
                    </div>
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
                                            key={list.id}
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
