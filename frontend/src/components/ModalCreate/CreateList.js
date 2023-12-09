import React, { useState, useEffect } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import { fetchCreateList, fetchEditList } from "../../store/list";
import { fetchABoard } from "../../store/board"

import './ModalCreate.css'

function CreateListModal({ board, list, formType }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const history = useHistory();
    const [ title, setTitle ] = useState(formType === "Edit List" ? list.title : " ");
    const [ errors, setErrors ] = useState({});

    const disabled = Object.values(errors).length > 0;
    const className = disabled ? "disabled-btn" : "create-btn";

    const listDetails = {
        title: title,
    };

    console.log('board', board)
    console.log(listDetails)

    useEffect(() => {
        const errors = {};

        if (title === "") {
            errors.title = "Field is required"
        }else if (title.length < 5 ) {
            errors.title = "Title must be at least 5 characters"
        }else if (title.length > 30) {
            errors.title = "Title must be less than 30 characters"
        }

        setErrors(errors);

    }, [title]);


    const handleSubmit = async (e) => {
         e.preventDefault();

        if (formType === "Create List"  && !Object.values(errors).length) {
            console.log('create list ', 'form', formType)
             dispatch(fetchCreateList(board.id, listDetails))
             .then(() => history.push(`/boards/${board.id}`) )

        };

        if (formType === "Edit List"  && !Object.values(errors).length) {
            console.log('edit modal')
            dispatch(fetchEditList(list.id, listDetails))
            .then(() => history.push(`/boards/${board.id}`) )
        };

        closeModal()
    };


    return(
        <div className="modal-popup">
            <h1>{formType === "Create List" ? "Create New List" : "Edit List"}</h1>
            <form onSubmit={handleSubmit} className="form-create">
                <label>Title</label>
                <input
                    type="text"
                    className=""
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)} />
                <div>{errors.title && <p className="errors">{errors.title}</p>}</div>

                <button type="submit" className={className}>{formType === "Create List" ? "Create New List" : "Save"}</button>
            </form>
        </div>
    );
};

export default CreateListModal;
