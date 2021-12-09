import React, { Component } from 'react';
import { ErrorAlert } from './Alert';


class NumberOfEvents extends Component {

  state={
    errorText: ''
  }



handleNumberChanged = (event) => {
let value = +event.target.value;
if (value > 250) {
  this.setState({
    errorText: 'Please choose a number between 1 and 250',
  })
} else {
  this.props.updateEventCount(value);
  this.setState({
    errorText: ''
  })
}
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
        <ErrorAlert text={this.state.errorText} />
      </div>
    );
  }
}

export default NumberOfEvents