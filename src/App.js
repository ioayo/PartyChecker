import React, { Component } from 'react';
import GuestList from './components/guestList';
import Counter from './components/counter';
import './index.css';

class App extends Component {

  state = {
  	isFiltered: false,
    pendingGuest: "",
    guests: []
  }
  
	lastGuestId = 0;

	newGuestId = () => {
		const localStorageRef = localStorage.getItem('RSVP');
		const id = localStorageRef ? JSON.parse(localStorageRef).length+1 : 0;
		console.log('local', id)
		this.lastGuestId += 1;
		return id;
	}

  toggleGuestProperty = (property, id) => {
    this.setState({
      guests: this.state.guests.map((guest) => {
        if (id === guest.id) {
          return {
            ...guest,
            [property]: !guest[property]
          }
        }
        return guest;
      })
    })
  }

  toggleConfirmation = id => this.toggleGuestProperty("isConfirmed", id);
  
  removeGuest = id => this.setState({
		guests: this.state.guests.filter(guest => id !== guest.id)
  })

	toggleEditing = id => this.toggleGuestProperty("isEditing", id);

	setName = (name, id) => {
    this.setState({
      guests: this.state.guests.map((guest, index) => {
        if (id === guest.id) {
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
    const id = this.newGuestId();
    this.setState({
      guests: [
        {
          name: this.state.pendingGuest,
          isConfirmed: false,
          isEditing: false,
          id
        },
        ...this.state.guests
      ],
      pendingGuest: ""
    })
  }
  getTotalInvited = () => this.state.guests.length;

  getAttendingGuests = () => this.state.guests.reduce(
  	(total, guest) => guest.isConfirmed ? total + 1 : total, 0);
  
	componentWillMount() {
		//check if there is any invitees in localstorage
		
		const localStorageRef = localStorage.getItem('RSVP');

		if (localStorageRef) 
			{
				this.setState({
					guests: JSON.parse(localStorageRef)
				})
			}
	}

	componentWillUpdate(nextProps, nextState) {
		localStorage.setItem('RSVP', JSON.stringify(nextState.guests))
	}
 
  render() {
  	const totalInvited = this.getTotalInvited();
  	const numberAttending = this.getAttendingGuests();
  	const numberUnconfirmed = totalInvited - numberAttending;
    return (
      <div className="App">
        <header>
          <h1>Gonna Drink</h1>
          <p>Кого зовем на вечеринку?</p>
          <form onSubmit={this.addUserToList}>
              <input 
                type="text" 
                onChange={this.handleNameInput}
                value={this.state.pendingGuest}
                placeholder="Кого позвать?" />
              <button type="submit" name="submit" value="submit">Пригласить!</button>
          </form>
        </header>
        <div className="main">
          <div>
            <h2>Приглашенные</h2>
            <label>
              <input type="checkbox" 
              	onChange = {this.toggleFilter}
								checked = {this.state.isFiltered}
								/> 
              	Спрятать тех, кто отказался
            </label>
          </div>
          <Counter 
						totalInvited={totalInvited}
						numberAttending={numberAttending}
						numberUnconfirmed={numberUnconfirmed}
          />
          <GuestList 
            guests={this.state.guests} 
            toggleConfirmation={this.toggleConfirmation} 
            toggleEditing={this.toggleEditing} 
						setName={this.setName}
						isFiltered={this.state.isFiltered}
            removeGuest={this.removeGuest}
            pendingGuest={this.state.pendingGuest}
            />
        </div>
    </div>
    );
  }
}

export default App;
