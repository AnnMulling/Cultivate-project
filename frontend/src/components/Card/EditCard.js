import React, { useEffect, useState, useRef } from 'react';
import { useDispatch} from 'react-redux';
import { useHistory } from 'react-router-dom';
import TextareaAutosize from "react-textarea-autosize";
import { fetchABoard } from '../../store/board';
import { fetchEditCard } from '../../store/card';


import './Card.css'


export default function EditCard({ boardId, card,  isLoaded, toggleEditingCard }) {
    //handle edit card
    const ref = useRef();
    const dispatch = useDispatch();
    const history = useHistory();
    const [ editingDes, setEditingDes ] = useState(false);
    const [ description, setDescription ] = useState(card.description);
    const [ errors, setErrors ] = useState({});




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


    }, [ref, description, dispatch]);



    const handleSubmit = async (e) => {
        e.preventDefault();
        setEditingDes(false);

        const cardDetails = {
            description: description
        };

        if (!Object.values(errors).length) {

            await dispatch(fetchEditCard(card.id, cardDetails))
            .then(() => dispatch(fetchABoard(boardId)))
            .then(() => history.push(`/boards/${boardId}`));

        } else {
            setEditingDes(false);
            setDescription(card.description);
        }
    };



    return isLoaded && (
        <div className="card-container" ref={ref}>
                {editingDes  ? (
                    <>
                        <TextareaAutosize
                            autoFocus
                            className="list-edit-Textarea"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <div >{errors.description && <p className="errors">{errors.description}</p>}</div>
                        <div>
                            <button
                                className="create-btn"
                                onClick={handleSubmit}
                            >
                                Save
                            </button>
                            <button
                                className="cancel-btn"
                                onClick={() => setEditingDes(false)}
                            >
                                cancel
                            </button>
                        </div>
                    </>
                ) : (
                    <div
                        onClick={() => setEditingDes(true)}
                    >
                        {card.description}
                    </div>
                )}


        </div>

    );
}
