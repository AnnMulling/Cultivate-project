import React, { useState, useEffect } from "react";
import { useModal } from "../../context/Modal";
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { fetchDeleteBoard } from "../../store/board";

import './ModalDelete.css'

function DeleteBoardModal({ board }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();
    const user = useSelector((state) => state.session.user);


    const deleteBoard = (e) => {
        e.preventDefault();
        
        dispatch(fetchDeleteBoard(board.id));
        closeModal();
        history.push('/workspace')
    };

    if(!user) {
        history.push("/")
    };

    return (
        <>
            <div className="modal-popup">
                <h2>Confirm Delete</h2>

                <p>Lists associated with the board will also be deleted </p>
                    Are you sure you want to delete this Board?
                <div>
                    <button onClick={deleteBoard} className="delete-btn">
                        Yes (Delete Board)
                    </button>
                    <button onClick={closeModal} className="keep-btn">
                        No (Keep Board)
                    </button>
                </div>
            </div>
        </>
    );
}

export default DeleteBoardModal
