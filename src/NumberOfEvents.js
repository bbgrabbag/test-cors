import React, { Component } from 'react';


class NumberOfEvents extends Component {



handleNumberChanged = (event) => {
let value = +event.target.value;
this.props.updateEventCount(value)
};

  render() {
    return (
      <div className="NumberOfEvents">
        <p>Number of Items per Page</p>
        <input 
            type='text'
            className='NumberOfEventsInput'
            value={this.props.numberOfEvents}
            onChange={this.handleNumberChanged}
        />
      </div>
    );
  }
}

export default NumberOfEvents