import React from 'react';
import { MdSearch } from 'react-icons/md';

const Buscar = ({ handleSearchNote }) => {
	return (
		<div className='search'>
			<MdSearch className='search-icons' size='1.3em' />
			<input
				onChange={(event) =>
					handleSearchNote(event.target.value)
				}
				type='text'
				placeholder='Buscar nota...'
			/>
		</div>
	);
};

export default Buscar;