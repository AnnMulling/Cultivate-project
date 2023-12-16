import React, { useState, useEffect } from "react";
import { useModal } from "../../context/Modal";
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { fetchDeleteList } from "../../store/list";

import './ModalDelete.css'

function DeleteListModal ({ boardId , list }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();
    const user = useSelector((state) => state.session.user);


    console.log('delete list from board', boardId)

    const deleteList= async(e) => {
        e.preventDefault();

        dispatch(fetchDeleteList(list.id))
        .then(() => history.push(`/boards/${boardId}`) )


        closeModal();

    };

    if(!user) {
        history.push("/")
    };

    return (
        <>
            <div className="modal-popup">
                <h2>Confirm Delete</h2>
                 <h3>
                        Are you sure you want to delete this list?
                </h3>
                <div>
                    <button onClick={deleteList} className="delete-btn">
                        Yes (Delete List)
                    </button>
                    <button id="keep-btn" onClick={closeModal} className="keep-btn">
                        No (Keep List)
                    </button>
                </div>
            </div>
        </>
    );
}

export default DeleteListModal;
