import React from 'react';
import PropTypes from 'prop-types';

const Counter = props => {
	return (
		<table className="counter">
      <tbody>
        <tr>
          <td>Идут:</td>
          <td>{props.numberAttending}</td>
        </tr>
        <tr>
          <td>Unconfirmed:</td>
          <td>{props.numberUnconfirmed}</td>
        </tr>
        <tr>
          <td>Total:</td>
          <td>{props.totalInvited}</td>
        </tr>
      </tbody>
  	</table>
  	)
}

Counter.PropTypes = {
	numberAttending: PropTypes.number,
	numberUnconfirmed: PropTypes.number,
	totalInvited: PropTypes.number
}

export default Counter;