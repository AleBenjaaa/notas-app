import React, { useState, useEffect } from 'react';

const NotaEditable = ({ id, initialTitle, initialText, date, handleSaveClick, handleCancelClick }) => {
    const [editedTitle, setEditedTitle] = useState(initialTitle);
    const [editedText, setEditedText] = useState(initialText);

    useEffect(() => {
        setEditedTitle(initialTitle);
        setEditedText(initialText);
    }, [initialTitle, initialText]);

    const save = () => {
        handleSaveClick(id, editedTitle, editedText);
    };

    return (
        <div className='note-editable'>
            <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
            />
            <textarea
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
            />
            <button onClick={save}>Guardar</button>
            <button onClick={handleCancelClick}>Cancelar</button>
            <small>{date}</small>
        </div>
    );
};

export default NotaEditable;
