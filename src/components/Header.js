import React from 'react';
import { MdDarkMode } from "react-icons/md";

const Header = ({ handleToggleDarkMode, toggleShowImportant, showImportant }) => {
	return (
		<div className='header'>

			<h1>Notas</h1>
			<button id='btn-filtro' onClick={toggleShowImportant} className='save'>
				{showImportant ? 'Todas las notas' : 'Solo importantes'}
			</button>
			<button
				onClick={() =>
					handleToggleDarkMode(
						(previousDarkMode) => !previousDarkMode
					)
				}
				className='save'
			>
				<MdDarkMode />
			</button>
		</div>
	);
};

export default Header;
