import { useState } from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';


const NuevaNota = ({ handleAddNote }) => {
	const [noteTitle, setNoteTitle] = useState('');
	const [noteText, setNoteText] = useState('');
	const [isImportant, setIsImportant] = useState(false);
	const characterLimit = 216;
	const characterLimit1 = 50;

	const handleChange1 = (event) => {
		if (characterLimit1 - event.target.value.length >= 0) {
			setNoteTitle(event.target.value);
		}
	};

	const handleToggleImportant = () => {
		setIsImportant(!isImportant);
	};

	const handleChange = (event) => {
		if (characterLimit - event.target.value.length >= 0) {
			setNoteText(event.target.value);
		}
	};

	const handleSaveClick = () => {
		if (noteText.trim().length > 0) {
			handleAddNote(noteTitle, noteText, isImportant);
			setNoteTitle('');
			setNoteText('');
			setIsImportant(false);
		}
	};

	return (
		<div className='note new'>
			<div className='note-important' onClick={handleToggleImportant}>
				{isImportant ? (
					<AiFillStar className='important-icon' />
				) : (
					<AiOutlineStar className='important-icon' />
				)}
			</div>
			<textarea id='titulo'
				rows='3'
				cols='10'
				placeholder='Titulo'
				value={noteTitle}
				onChange={handleChange1}

			></textarea>
			<textarea
				rows='9'
				cols='10'
				placeholder='Escribe algo...'
				value={noteText}
				onChange={handleChange}
			></textarea>
			<div className='note-footer'>
				<small>
					{characterLimit - noteText.length} Letras restantes
				</small>
				<button className='save' onClick={handleSaveClick}>
					Guardar
				</button>
			</div>
		</div>
	);
};

export default NuevaNota;
