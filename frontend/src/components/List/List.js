import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import TextareaAutosize from "react-textarea-autosize";
import { fetchEditList } from "../../store/list";
import DeleteListModal from '../ModalDelete/DeleteList';
import OpenModalButton from '../OpenModalButton';
import Card from '../Card/Card';

import './List.css'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import EditListModal from './EditList';


export default function List({ boardId, list, isLoaded }) {
    //handle add card and edit list
    const ref = useRef();
    const dispatch = useDispatch();
    const history = useHistory();
    const [editingTitle, setEditingTitle] = useState(false);
    const [title, setTitle] = useState(list.title);
    const [showDelete, setShowDelete] = useState(false);
    const [errors, setErrors] = useState({});


    useEffect(() => {

        const errors = {};

        if (title.length < 5) {
            errors.title = "Title must be at least 5 characters"
        } else if (title.length > 30) {
            errors.title = "Title must be less than 30 characters"
        }
        setErrors(errors);


    }, [title, dispatch]);


    const handleOnBlur = async (e) => {
        e.preventDefault();

        setEditingTitle(false);

        const listDetails = {
            title: title,
        };

        if (!Object.values(errors).length) {
            await dispatch(fetchEditList(boardId, list.id, listDetails))
                // .then(() => dispatch(fetchABoard(boardId)))
             .then(() => history.push(`/boards/${boardId}`))


        } else {
            setEditingTitle(false);
            setTitle(list.title);
        }
    };



    return isLoaded && (
        <div
            key={list.id}
            className="list-container"
            onMouseEnter={() => setShowDelete((prev) => true)}
            onMouseLeave={() => setShowDelete((prev) => false)}
            onHover
        >
            {editingTitle ? (

                <div className="list-Textarea" >
                    <TextareaAutosize
                        autoFocus
                        className="list-edit-Textarea"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && e.currentTarget.blur()}
                        onBlur={handleOnBlur}

                    />
                    <div>{errors.title && <p className="errors">{errors.title}</p>}</div>
                </div>

            ) : (

                <div
                    className='list-title'
                    onClick={() => setEditingTitle(true)}
                >
                    {list.title}

                </div>

            )}

            <div className="cards-container" >
                <Card list={list} boardId={boardId} cards={list?.Cards} isLoaded={isLoaded} />
            </div>

            <div className="list-del-container">
                {showDelete && (
                        <>
                            <OpenModalButton
                                modalComponent={<DeleteListModal boardId={boardId} list={list} />}
                                buttonText={<i className="fa-solid fa-trash"></i>}
                                modalClasses={["list-btn-delete"]}
                            />
                            {/* <OpenModalButton
                                modalComponent={<EditListModal boardId={boardId} list={list} />}
                                buttonText={<i class="fa-solid fa-pen-to-square"></i>}
                                modalClasses={["list-btn-edit"]}
                            /> */}
                        </>
                )}
            </div>
        </div>


    );
}
