import React, { useState, useEffect } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import { fetchCreateBoard, fetchEditBoard } from "../../store/board";

import './ModalCreate.css'

function CreateBoardModal({ board, formType }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const history = useHistory();
    const user = useSelector((state) => state.session.user);

    const [ name, setName ] = useState(formType === "Edit Board" ? board.name : "");
    const [ isPublic, setIsPublic ] = useState(formType === "Edit Board" ? board.is_public : null);
    const [ errors, setErrors ] = useState({});

    const disabled = Object.values(errors).length > 0;
    const className = disabled ? "disabled-btn" : "create-btn";


    useEffect(() => {
        const errors = {}

        if (name === "") {
            errors.name = "Field is required"
        }else if (name.length < 5 ) {
            errors.name = "Name must be at least 5 characters"
        }else if (name.length > 30) {
            errors.name = "Name must be less than 30 characters"
        }

        if (isPublic === null) {
            errors.radio = "Field is required"
        }

        setErrors(errors);


    }, [name, isPublic])


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

    const boardDetails = {
        name: name,
        is_public: isPublic
    };


    const handleSubmit = async (e)  => {
        e.preventDefault();

        if (formType === "Create Board" && !Object.values(errors).length) {
            const res = await dispatch(fetchCreateBoard(boardDetails));
            console.log('after creaete', res)
            history.push(`/boards/${res.id}`);

        };

        if (formType === "Edit Board" && !Object.values(errors).length) {
            console.log('detail', boardDetails)
            dispatch(fetchEditBoard(board.id, boardDetails));
            history.push(`/boards/${board.id}`)
        };

        closeModal();
    };

    if(!user) {
        history.push("/")
    };


    return (
        <div className="modal-popup">
            <h1 style={{fontFamily:'Montserrat'}}>{formType === "Create Board" ? "Create New Board" : "Edit Board"}</h1>
            <form onSubmit={handleSubmit} className="form-create">
                <label htmlFor="name">Name
                <input
                    type="text"
                    className=""
                    name="name"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}

                 />
                <div>{errors.name && <p className="errors">{errors.name}</p>}</div>
                </label>
                <div>
                    <p>Is this a public board?</p>
                    <label htmlFor="Yes">
                        <span>Yes</span>
                        <input
                            type="radio"
                            id="Yes"
                            value={true}
                            checked={isPublic === true}
                            onChange={onRadioChange}
                        />
                    </label>

                    <label htmlFor="No">
                        <span>No</span>
                        <input
                            type="radio"
                            id="No"
                            value={false}
                            checked={isPublic === false}
                            onChange={onRadioChange}
                        />
                    </label>
                    <div>{errors.radio && <p className="errors">{errors.radio}</p>}</div>
                </div>
                <button type="submit"  className={className}>{formType === "Create Board" ? "Create New Board" : "Save"}</button>
            </form>
        </div>
    );
}

export default CreateBoardModal;
