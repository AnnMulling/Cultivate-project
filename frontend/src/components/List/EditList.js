import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TextareaAutosize from "react-textarea-autosize";
import { fetchEditList } from "../../store/list";
import { useHistory } from 'react-router-dom';
import { useModal } from "../../context/Modal";


function EditListModal ({ boardId , list }) {

    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();
    const user = useSelector((state) => state.session.user);

    if(!user) {
        history.push("/")
    };

    return(

        <div>
        <div className="modal-popup">
            <h1>Edit List</h1>
            <button id="keep-btn" onClick={closeModal} className="keep-btn">
               Submit
            </button>
        </div>
    </div>

    )
}


export default EditListModal
