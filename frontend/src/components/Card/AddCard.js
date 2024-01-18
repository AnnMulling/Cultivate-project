import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import TextareaAutosize from "react-textarea-autosize";
import { fetchCreateCard } from '../../store/card';
import { fetchAList } from '../../store/list';
import { fetchABoard } from '../../store/board';
import { useHistory } from 'react-router-dom';

import './Card.css'

export default function AddCard ( { boardId, listId,  toggleAddingCard, isLoaded } ) {
    const ref = useRef();
    const dispatch = useDispatch();
    const history = useHistory();

    const [ description, setDescription ] = useState(" ");
    const [ show, setShow ] = useState(true)
    const [ errors, setErrors ] = useState({});



    useEffect(() => {
        const errors = {};

        if (description === " ") {
            errors.description = "Field is required"
        } else if (description.length < 5) {
            errors.description = "description must be at least 5 characters"
        } else if (description.length > 255) {
            errors.description = "description must be less than 255 characters"
        }
        setErrors(errors);

        const handleOnBlur = (e) => {

            if (ref.current && !ref.current.contains(e.target)){
                setShow(false);
                toggleAddingCard();
            };
        };

        document.addEventListener("click", handleOnBlur);
        return (() => document.removeEventListener("click", handleOnBlur))

    }, [dispatch, show, description])

    const handleSubmit = async (e) => {
        e.preventDefault();
        toggleAddingCard();

        const cardDetails = {
            // board_id: boardId,
            description: description,
        };

        if (!Object.values(errors).length) {
             await dispatch(fetchCreateCard(boardId, listId, cardDetails))
            // .then(() => dispatch(fetchAList(listId)))
            // .then(() => dispatch(fetchABoard(boardId)))
            .then(() => history.push(`/boards/${boardId}`))
        } else {
            toggleAddingCard();
            setDescription(" ")
        }


    }

    return isLoaded && show &&(
        <div className="add-card-container" ref={ref}>
             <TextareaAutosize
                autoFocus
                className="card-edit-Textarea"
                value={description}
                onChange={(e) => setDescription(e.target.value)}

             />
                <div >{errors.description && <p className="errors">{errors.description}</p>}</div>
            <button
                className="create-btn"
                onClick={(e) => handleSubmit(e)}
            >
                Add
            </button>
        </div>
    );
}
