import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import TextareaAutosize from "react-textarea-autosize";
import {  fetchEditList } from "../../store/list";
import { fetchABoard } from '../../store/board';
import DeleteListModal from '../ModalDelete/DeleteList';
import OpenModalButton from '../OpenModalButton';
import Card from '../Card/Card';

import './List.css'
import { DragDropContext, Droppable } from 'react-beautiful-dnd';


export default function List({ boardId, list, index, isLoaded }) {
    //handle add card and edit list
    const ref = useRef();
    const dispatch = useDispatch();
    const history = useHistory();
    const [editingTitle, setEditingTitle] = useState(false);
    const [title, setTitle] = useState(list.title);
    const [showMenu, setShowMenu] = useState(false);
    const [errors, setErrors] = useState({});

    // console.log('Cards', list.Cards)
    // console.log('delete btn', showDelete)


    useEffect(() => {

        // const closeMenu = (e) => {
        //     if (!ref.current.contains(e.target)) {
        //         setShowMenu(false);
        //     }
        // };

        const errors = {};

        if (title === "") {
            errors.title = "Field is required"
        } else if (title.length < 5) {
            errors.title = "Title must be at least 5 characters"
        } else if (title.length > 30) {
            errors.title = "Title must be less than 30 characters"
        }
        setErrors(errors);

        // document.addEventListener('click', closeMenu);

        // return () => document.removeEventListener('click', closeMenu);

    }, [ title, dispatch]);


    const handleOnBlur = async (e) => {
        e.preventDefault();

        setEditingTitle(false);

        const listDetails = {
            title: title,
        };

        if (!Object.values(errors).length) {
            await dispatch(fetchEditList(list.id, listDetails))
            .then(() => dispatch(fetchABoard(boardId)))
            .then(() => history.push(`/boards/${boardId}`))


        } else {
            setEditingTitle(false);
            setTitle(list.title);
        }
    };




    return isLoaded && (
        <div className="list-container" >
            {editingTitle ? (

                <div className="list-Textarea" >
                    <TextareaAutosize
                        autoFocus
                        className="list-edit-Textarea"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        onKeyDown={e => e.key === "Enter" && e.currentTarget.blur()}
                        onBlur={handleOnBlur}

                    />
                    <div >{errors.title && <p className="errors">{errors.title}</p>}</div>
                </div>

            ) : (

                <div
                    className='list-title'
                    onClick={() => setEditingTitle(true)}
                    onMouseDown={() => setShowMenu(!showMenu)}

                >
                    {list.title}


                 </div>

                )}
            <DragDropContext>
                <Droppable droppableId={list?.id}>
                    {(provided) => (
                        <div className="cards-container" {...provided.draggableProps} ref={provided.innerRef} {...provided.dragHandleProps}>

                            <Card list={list} boardId={boardId} cards={list?.Cards} isLoaded={isLoaded} />

                            {provided.placeholder}
                        </div>
                    )}

                </Droppable>
            </DragDropContext>
            <div className="list-del-container">
                <OpenModalButton
                    modalComponent={<DeleteListModal boardId={boardId} list={list} />}
                    buttonText={<i className="fa-solid fa-trash"></i>}
                    modalClasses={["list-btn-delete"]}
                />
            </div>
        </div>

    );
}
