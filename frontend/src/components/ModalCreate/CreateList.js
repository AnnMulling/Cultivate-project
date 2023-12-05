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

    const listDetails = {
        title: title,
    };

    console.log('board', board)
    console.log(listDetails)

    const handleSubmit = async (e) => {
         e.preventDefault();

        if (formType === "Create List") {
            console.log('create list ', 'form', formType)
             dispatch(fetchCreateList(board.id, listDetails))
             .then(() => history.push(`/boards/${board.id}`) )


        };

        if (formType === "Edit List") {
            console.log('edit modal')
            dispatch(fetchEditList(list.id, listDetails))
            .then(() => history.push(`/boards/${board.id}`) )
        };

        closeModal()
    };


    return(
        <>
            <h1>Create/Edit list</h1>
            <form onSubmit={handleSubmit}>
                <label>Title</label>
                <input
                        className=""
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)} />
                        {errors.title && <p className="errors">{errors.title}</p>}

                <button type="submit">{formType === "Create List" ? "Create New List" : "Save"}</button>
            </form>
        </>
    );
};

export default CreateListModal;
