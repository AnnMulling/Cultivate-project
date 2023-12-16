import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import TextareaAutosize from "react-textarea-autosize";
import { fetchCreateList } from "../../store/list";
import { useHistory } from 'react-router-dom';

import './List.css';


export default function AddList({ boardId, toggleAddingList, addingList }) {
    const ref = useRef();
    const dispatch = useDispatch();
    const history = useHistory();
    const [ title, setTitle ] = useState(" ");
    const [ errors, setErrors ] = useState({});
    const [ show, setShow ] = useState(true);



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

    }, [title, dispatch]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        toggleAddingList();

        const listDetails = {
            title: title,
        };

        if (!Object.values(errors).length) {
            console.log('add fetching...')

            dispatch(fetchCreateList(boardId, listDetails))
            .then(() => history.push(`/boards/${boardId}`))

        } else {
            toggleAddingList();
            setTitle(" ")
        }
    };


    return  (

            <div className="add-list-container" onBlur={toggleAddingList}>

                <TextareaAutosize
                    autoFocus
                    className="list-add-Textarea"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}

                />
                <div >{errors.title && <p className="errors">{errors.title}</p>}</div>
            <button
                className="create-btn"
                onClick={handleSubmit}
            >
                Add List
            </button>

        </div>

    );
}
