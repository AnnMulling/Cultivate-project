import React, { useEffect, useState, useRef } from 'react';
import { useDispatch} from 'react-redux';
import { useHistory } from 'react-router-dom';
import TextareaAutosize from "react-textarea-autosize";
import { fetchABoard } from '../../store/board';
import { fetchEditCard, fetchDeleteCard } from '../../store/card';
import { Draggable } from 'react-beautiful-dnd';

import './Card.css'


export default function EditCard({ card, index, boardId,  isLoaded }) {
    //handle edit card
    const ref = useRef();
    const dispatch = useDispatch();
    const history = useHistory();
    const [ editingDes, setEditingDes ] = useState(false);
    const [ description, setDescription ] = useState(card.description);
    const [ errors, setErrors ] = useState({});

    //drag and drop



    useEffect(() => {

        const errors = {};

        if (description === "") {
            errors.description = "Field is required"
        } else if (description.length < 5) {
            errors.description = "Must be at least 5 characters"
        } else if (description.length > 255) {
            errors.description = "Description must be less than 255 characters"
        }
        setErrors(errors);


    }, [ description, dispatch]);



    const handleSubmit = async (e) => {
        e.preventDefault();

        const cardDetails = {
            description: description
        };

        setEditingDes(false);


        if (!Object.values(errors).length) {

            await dispatch(fetchEditCard(card.id, cardDetails))
            .then(() => dispatch(fetchABoard(boardId)))
            .then(() => history.push(`/boards/${boardId}`))


        } else {
            setEditingDes(false);
            setDescription(card.description);
        }
    };

    const deleteCard = async (e) => {
        e.preventDefault();
        setEditingDes(false);

       await dispatch(fetchDeleteCard(card.id))
        .then(() => dispatch(fetchABoard(boardId)))
        .then(() => history.push(`/boards/${boardId}`))
    };



    return isLoaded && (

            <div className="card-container" >
                    {editingDes  ? (
                        <div>
                            <TextareaAutosize
                                autoFocus
                                className="card-edit-Textarea"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            <div >{errors.description && <p className="errors">{errors.description}</p>}</div>
                        <div className="card-btns">
                            <div
                                className="card-create-btn"
                                onClick={handleSubmit}
                            >
                                <i class="fa-solid fa-floppy-disk"></i>  save
                            </div>
                            <div
                                className="cancel-btn"
                                onClick={() => setEditingDes(false)}
                            >
                                <i class="fa-solid fa-circle-xmark"></i> cancel
                            </div>
                            <div
                                className="card-delete-btn"
                                onClick={(deleteCard)}
                            >
                                <i class="fa-solid fa-trash"></i> delete
                            </div>
                        </div>

                        </div>
                    ) : (
                        <Draggable draggableId={card?.id} index={index}>
                            {(provided) => (

                                <div
                                    onClick={() => setEditingDes(true)}
                                    className="card-description"
                                    ref={provided.innerRef}
                                    {...provided.dragHandleProps}
                                    {...provided.draggableProps}

                                > {card.description}

                                </div>
                            )}
                        </Draggable>
                    )}


            </div>


    );
}
