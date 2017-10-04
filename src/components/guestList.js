import React from 'react';
import Guest from './guest';
import PropTypes from 'prop-types';

const GuestList = props => {
	return (
			<ul>
				{props.guests.map((guest, index) => 
						<Guest 
							key={index} 
							name={guest.name} 
							isConfirmed={guest.isConfirmed}
							handleConfirmation={() => props.toggleConfirmationAt(index)} />
					)}
			</ul>
		)
}

GuestList.proptypes = {
	guest: PropTypes.array.isRequired,
	toggleConfirmationAt: PropTypes.func.isRequired
}

export default GuestList;