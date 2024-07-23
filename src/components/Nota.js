import React, { useState, useEffect } from 'react';
import { FaEdit } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

const NotaNormal = ({ id, title, text, date, handleEditClick, handleDeleteNote, handleToggleImportant, isImportant }) => (
    <div className={`note ${isImportant ? 'important' : ''}`}>
        <div className='note-important' onClick={() => handleToggleImportant(id)}>
            {isImportant ? <AiFillStar className='important-icon' /> : <AiOutlineStar className='important-icon' />}
        </div>
        <div className='note-title'>
            <h2>{title}</h2>

        </div>
        <div className='note-content'>
            <span>{text}</span>
        </div>
        <div className='note-footer'>
            <small>{date}</small>
            <div className='note-edit'>
                <FaEdit
                    onClick={handleEditClick}
                    className='edit-icon'
                    size='1.3em'
                />
            </div>
            <MdDeleteForever
                onClick={() => handleDeleteNote(id)}
                className='delete-icon'
                size='1.3em'
            />
        </div>
    </div>
);

const NotaEditable = ({ id, initialTitle, initialText, date, handleSaveClick, handleCancelClick, isImportant }) => {
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
        <div className={`nota-edicion ${isImportant ? 'important' : ''}`}>
            <textarea id='titulo'
                placeholder='Titulo'
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
            />
            <textarea
                rows='9'
                cols='10'
                placeholder='Escribe algo...'
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
            />
            <div className='btn-edit'>
                <button id='guardar' onClick={save}>Guardar</button>
                <button id='cancelar' onClick={handleCancelClick}>Cancelar</button>
            </div>
        </div>
    );
};

const Nota = (props) => {
    const [isEditing, setIsEditing] = useState(false);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = (id, newTitle, newText) => {
        props.handleUpdateNote(id, newTitle, newText);
        setIsEditing(false);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
    };

    if (isEditing) {
        return (
            <NotaEditable
                id={props.id}
                initialTitle={props.title}
                initialText={props.text}
                date={props.date}
                handleSaveClick={handleSaveClick}
                handleCancelClick={handleCancelClick}
                isImportant={props.isImportant}
            />
        );
    } else {
        return (
            <NotaNormal
                id={props.id}
                title={props.title}
                text={props.text}
                date={props.date}
                handleEditClick={handleEditClick}
                handleDeleteNote={props.handleDeleteNote}
                handleToggleImportant={props.handleToggleImportant}
                isImportant={props.isImportant}
            />
        );
    }
};

export default Nota;
