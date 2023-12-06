import React, { useState, useEffect } from "react";
import { useModal } from "../../context/Modal";
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { fetchDeleteBoard } from "../../store/board";

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
            <div>
                <h2>Confirm Delete</h2>
                 <h3>
                     <p>Lists associated with the board will also be deleted</p>
                        Are you sure you want to delete this Board?
                </h3>
                <div>
                    <button onClick={deleteBoard}>
                        Yes (Delete Board)
                    </button>
                    <button onClick={closeModal}>
                        No (Keep Board)
                    </button>
                </div>
            </div>
        </>
    );
}

export default DeleteBoardModal
