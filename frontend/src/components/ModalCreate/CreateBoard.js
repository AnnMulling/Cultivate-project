import React, { useState } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from 'react-router-dom';
import { fetchCreateBoard, fetchEditBoard } from "../../store/board";

import './ModalCreate.css'

function CreateBoardModal({ board, formType }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const history = useHistory();
    const [ name, setName ] = useState(formType === "Edit Board" ? board.name : "");
    const [ isPublic, setIsPublic ] = useState(formType === "Edit Board" ? board.is_public : null);
    const [ error, setError ] = useState({});


    const disabled = name.length < 1 || !isPublic;
    const className = disabled ? "disabled" : "creat-board-btn"

    console.log('radio', isPublic)



    const onRadioChange = (e) => {
        let selected;
        switch (e.target.value) {
            case "true":
                selected = true;
                break;
            case "false":
                selected = false;
                break;
            default:
                selected = null;
        }
        setIsPublic(selected);
    };



    const handleSubmit = async (e)  => {
        e.preventDefault();

        const boardDetails = {
            name: name,
            is_public: isPublic
        };
        
        if (formType === "Create Board") {
            const res = await dispatch(fetchCreateBoard(boardDetails));
            history.push(`/boards/${res.id}`);

        };

        if (formType === "Edit Board") {
            const res = await dispatch(fetchEditBoard(board.id, boardDetails));
            history.push(`/boards/${res.id}`)
        };

        closeModal();
    };




    return (
        <>
            <h1>Modal create</h1>
            <form onSubmit={handleSubmit}>
                <label>Name</label>
                <input
                    className=""
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)} />
                    {error.name && <p className="errors">{error.name}</p>}
                <div>

                    <p>Is this a public board?</p>
                    <input
                        type="radio"
                        id="Yes"
                        value={true}
                        checked={isPublic === true}
                        onChange={onRadioChange}
                    />
                    <label htmlFor="Yes">Yes</label>
                    <input
                        type="radio"
                        id="No"
                        value={false}
                        checked={isPublic === false}
                        onChange={onRadioChange}
                    />
                    <label htmlFor="No">No</label>
                </div>
                <button type="submit">{formType === "Create Board" ? "Create New Board" : "Save"}</button>
            </form>
        </>
    );
}

export default CreateBoardModal;
