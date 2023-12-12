import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from 'react-router-dom';

function DeleteTime ({ gaveUp }) {
    const { closeModal } = useModal();
    const historoy = useHistory();
    const user = useSelector((state) => state.session.user);

    const handleTime = (e) => {
        gaveUp();
        closeModal();
    };

    if (!user) {
        historoy.push("/");
    };
    return(
        <>
        <div className="modal-popup">
            <h2>Leaving ? </h2>
                <h3>
                    Are you sure you want to give up?
            </h3>
            <div>
                <button onClick={handleTime} className="delete-btn">
                    Yes, let's wrap it up!
                </button>
                <button id="keep-btn" onClick={closeModal} className="keep-btn">
                    Nah, I'll keep working.
                </button>
            </div>
        </div>
        </>
    );
}

export default DeleteTime;
