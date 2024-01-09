import React  from "react";

const EditButtons = ({ handleSave, saveLabel, handleDelete, handleCancel }) => (

    <div className="edit-btns">
        <div
            tabIndex="0"
            className="edit-btn"
            onClick={handleSave}
        >
            {saveLabel}
        </div>
        {handleDelete && (
            <div
             tabIndex="0"
             className="edit-btn"
             onClick={handleDelete}
            >
                Delete
            </div>
        )}
        <div
            tabIndex="0"
            onClick={handleCancel}
            className="edi-btn-cancel"
        >
            Cancel
        </div>
    </div>
)


export default EditButtons
