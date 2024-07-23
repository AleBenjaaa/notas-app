import Note from './Nota';


const NotasList = ({
	notes,
	handleDeleteNote,
	handleUpdateNote,
	handleToggleImportant
}) => {
	const sortedNotes = [...notes].sort((a, b) => b.isImportant - a.isImportant);

	return (
		<div className='notes-list'>
			{sortedNotes.map((note) => (
				<Note
					key={note.id}
					id={note.id}
					title={note.title}
					text={note.text}
					date={note.date}
					isImportant={note.isImportant}
					handleDeleteNote={handleDeleteNote}
					handleUpdateNote={handleUpdateNote}
					handleToggleImportant={handleToggleImportant}
				/>
			))}
		</div>
	);
};

export default NotasList;
