import React, { useState, useEffect } from "react";
import { useModal } from "../../context/Modal";
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { fetchDeleteList } from "../../store/list";

function DeleteListModal ({ list }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();
    const user = useSelector((state) => state.session.user);


    const deleteList= (e) => {
        e.preventDefault();

        dispatch(fetchDeleteList(list.id));

        closeModal();

    };

    if(!user) {
        history.push("/")
    };

    return (
        <>
            <div>
                <h2>Confirm Delete</h2>
                 <h3>
                        Are you sure you want to delete this list?
                </h3>
                <div>
                    <button onClick={deleteList}>
                        Yes (Delete List)
                    </button>
                    <button id="keep-btn" onClick={closeModal}>
                        No (Keep List)
                    </button>
                </div>
            </div>
        </>
    );
}

export default DeleteListModal;