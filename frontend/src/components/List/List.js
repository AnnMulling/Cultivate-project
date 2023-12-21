import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import TextareaAutosize from "react-textarea-autosize";
import { fetchAllLists, fetchEditList } from "../../store/list";
import { fetchABoard } from '../../store/board';
import DeleteListModal from '../ModalDelete/DeleteList';
import OpenModalButton from '../OpenModalButton';
import Card from '../Card/Card';

import './List.css'


export default function List({ boardId, list, index, isLoaded }) {
    //handle add card and edit list
    const ref = useRef(null);
    const dispatch = useDispatch();
    const history = useHistory();
    const [editingTitle, setEditingTitle] = useState(false);
    const [title, setTitle] = useState(list.title);
    const [showDelete, setShowDelete] = useState(false);
    const [errors, setErrors] = useState({});


    // console.log('Cards', list.Cards)
    // console.log('delete btn', showDelete)

    useEffect(() => {


        const errors = {};

        if (title === "") {
            errors.title = "Field is required"
        } else if (title.length < 5) {
            errors.title = "Title must be at least 5 characters"
        } else if (title.length > 30) {
            errors.title = "Title must be less than 30 characters"
        }
        setErrors(errors);



    }, [ref, title, dispatch]);



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


    const handleClick = () => {
        setEditingTitle(true)
        setShowDelete(true)
    }

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
                        onMouseUp={() => setShowDelete(false)}
                    />
                    <div >{errors.title && <p className="errors">{errors.title}</p>}</div>
                </div>

            ) : (

                <div
                    className='list-title'
                    onClick={handleClick}

                >
                    {list.title}

                </div>

            )}
            <div>
                {showDelete && editingTitle && (
                    <OpenModalButton
                        modalComponent={<DeleteListModal boardId={boardId} list={list} setShowDelete={setShowDelete}/>}
                        buttonText={<i class="fa-solid fa-trash"></i>}
                        modalClasses={["list-btn-delete"]}
                    />
                )}
            </div>

            <div className="cards-container">
                <Card list={list} boardId={boardId} cards={list?.Cards} isLoaded={isLoaded} />
            </div>


        </div>

    );
}
