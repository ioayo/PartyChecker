import React, { Component } from 'react';
import GuestList from './components/guestList';
import './index.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.toggleConfirmationAt = this.toggleConfirmationAt.bind(this);
  };

  state = {
  	isFiltered: false,
    pendingGuest: "",
    guests: [
      {
        name: 'Treasure',
        isConfirmed: false,
        isEditing: false
      },
      {
        name: 'Nick',
        isConfirmed: false,
        isEditing: false
      },
      {
        name: 'Bulat',
        isConfirmed: false,
        isEditing: true
      },
    ]
  }
  
	lastGuestId = 0;

	newGuestId = () => {
		const id = this.lastGuestId;
		this.lastGuestId += 1;
		return id;
	}

  toggleGuestPropertyAt = (property, indexToChange) => {
    this.setState({
      guests: this.state.guests.map((guest, index) => {
        if (index === indexToChange) {
          return {
            ...guest,
            [property]: !guest[property]
          }
        }
        return guest;
      })
    })
  }

  toggleConfirmationAt = index => this.toggleGuestPropertyAt("isConfirmed", index);
  
  removeGuestAt = index => this.setState({
    guests: [
      ...this.state.guests.slice(0, index),
      ...this.state.guests.slice(index + 1)
    ]
  })

	toggleEditingAt = index => this.toggleGuestPropertyAt("isEditing", index);

	setNameAt = (name, indexToChange) => {
    this.setState({
      guests: this.state.guests.map((guest, index) => {
        if (index === indexToChange) {
          return {
            ...guest,
            name: name
          }
        }
        return guest;
      })
    })
  }
	
	toggleFilter = () => this.setState({
		isFiltered: !this.state.isFiltered
	})

  handleNameInput = (e) => {
    this.setState({
      pendingGuest: e.target.value
    })
  }

  addUserToList = (e) => {
    e.preventDefault();
    this.setState({
      guests: [
        {
          name: this.state.pendingGuest,
          isConfirmed: false,
          isEditing: false
        },
        ...this.state.guests
      ],
      pendingGuest: ""
    })
  }
  getTotalInvited = () => this.state.guest.length;
  // getAttendingGuests = () =>
  // getUnconfirmedGuests = () =>
  // 
  


  render() {
    return (
      <div className="App">
        <header>
          <h1>RSVP</h1>
          <p>A Treehouse App</p>
          <form onSubmit={this.addUserToList}>
              <input 
                type="text" 
                onChange={this.handleNameInput}
                value={this.state.pendingGuest}
                placeholder="Invite Someone" />
              <button type="submit" name="submit" value="submit">Submit</button>
          </form>
        </header>
        <div className="main">
          <div>
            <h2>Invitees</h2>
            <label>
              <input type="checkbox" 
              	onChange = {this.toggleFilter}
								checked = {this.state.isFiltered}
								/> 
              	Hide those who haven't responded 
            </label>
          </div>
          <table className="counter">
            <tbody>
              <tr>
                <td>Attending:</td>
                <td>2</td>
              </tr>
              <tr>
                <td>Unconfirmed:</td>
                <td>1</td>
              </tr>
              <tr>
                <td>Total:</td>
                <td>3</td>
              </tr>
            </tbody>
          </table>
          <GuestList 
            guests={this.state.guests} 
            toggleConfirmationAt={this.toggleConfirmationAt} 
            toggleEditingAt={this.toggleEditingAt} 
						setNameAt={this.setNameAt}
						isFiltered={this.state.isFiltered}
            removeGuestAt={this.removeGuestAt}
            pendingGuest={this.state.pendingGuest}
            />
        </div>
    </div>
    );
  }
}

export default App;
