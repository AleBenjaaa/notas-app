import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import NotesList from './components/NotasList';
import Search from './components/Buscar';
import Header from './components/Header';
import NuevaNota from './components/NuevaNota';
import Modal from './components/Modal';
import ModalEliminar from './components/ModalEliminar';

const App = () => {
	const [notes, setNotes] = useState([]);
	const [searchText, setSearchText] = useState('');
	const [darkMode, setDarkMode] = useState(false);
	const [showImportant, setShowImportant] = useState(false);
	const [showAddNote, setShowAddNote] = useState(false);
	const [showConfirmation, setShowConfirmation] = useState(false);
	const [noteToDelete, setNoteToDelete] = useState(null);

	/* Notas y modo oscuro guardados en local memory */

	useEffect(() => {
		const savedNotes = JSON.parse(localStorage.getItem('notas-app-data'));
		const savedDarkMode = JSON.parse(localStorage.getItem('notas-app-dark-mode'));

		if (savedNotes) {
			setNotes(savedNotes);
		}

		if (savedDarkMode !== null) {
			setDarkMode(savedDarkMode);
		}
	}, []);

	useEffect(() => {
		localStorage.setItem('notas-app-data', JSON.stringify(notes));
	}, [notes]);

	useEffect(() => {
		localStorage.setItem('notas-app-dark-mode', JSON.stringify(darkMode));
	}, [darkMode]);

	const addNote = (title, text, isImportant) => {
		const date = new Date();
		const newNote = {
			id: nanoid(),
			title: title,
			text: text,
			date: date.toLocaleDateString(),
			isImportant: isImportant || false,
		};
		const newNotes = [...notes, newNote];
		setNotes(newNotes);
		setShowAddNote(false);
	};


	const confirmDeleteNote = (id) => {
		const noteToDelete = notes.find((note) => note.id === id);
		if (noteToDelete.isImportant) {
			setNoteToDelete(id);
			setShowConfirmation(true);
		} else {
			deleteNoteById(id);
		}
	};

	const deleteNoteById = (id) => {
		const newNotes = notes.filter((note) => note.id !== id);
		setNotes(newNotes);
		setShowConfirmation(false);
		setNoteToDelete(null);
	};

	const updateNote = (id, newTitle, newText) => {
		const updatedNotes = notes.map((note) =>
			note.id === id ? { ...note, title: newTitle, text: newText } : note
		);
		setNotes(updatedNotes);
	};

	const toggleImportant = (id) => {
		const updatedNotes = notes.map((note) =>
			note.id === id ? { ...note, isImportant: !note.isImportant } : note
		);
		setNotes(updatedNotes);
	};

	const toggleShowImportant = () => {
		setShowImportant(!showImportant);
	};

	const getFilteredNotes = () => {
		return notes.filter((note) => {
			const matchesSearchText = note.text.toLowerCase().includes(searchText.toLowerCase()) ||
				note.title.toLowerCase().includes(searchText.toLowerCase());
			const matchesImportantFilter = !showImportant || note.isImportant;
			return matchesSearchText && matchesImportantFilter;
		});
	};

	return (
		<div className={`${darkMode && 'dark-mode'}`}>
			<div className='container'>
				<Header
					handleToggleDarkMode={setDarkMode}
					toggleShowImportant={toggleShowImportant}
					showImportant={showImportant} />

				<Search handleSearchNote={setSearchText} />
				<NotesList
					notes={getFilteredNotes()}
					handleDeleteNote={confirmDeleteNote}
					handleUpdateNote={updateNote}
					handleToggleImportant={toggleImportant}
				/>
				<Modal show={showAddNote} handleClose={() => setShowAddNote(false)}>
					<NuevaNota handleAddNote={addNote} />
				</Modal>
				<ModalEliminar
					isOpen={showConfirmation}
					closeModal={() => setShowConfirmation(false)}
					onConfirm={() => deleteNoteById(noteToDelete)}
					title="Nota importante"
					message="¿Eliminar esta nota?"
				/>

				<button className='fixed-button' onClick={() => setShowAddNote(true)}>+</button>
			</div>
		</div>
	);
};

export default App;
