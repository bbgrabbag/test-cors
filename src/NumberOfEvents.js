import React, { Component } from 'react';

class NumberOfEvents extends Component {

    state = {
        inputValue: 32
    }

    handleNumberChanged = (event) => {
    let value = event.target.value;
    this.setState({
      inputValue:value,
    });
  };

    // }
  render() {
    return (
      <div className="NumberOfEvents">
        <p>Number of Items per Page</p>
        <input 
            type='text'
            className='NumberOfEventsInput'
            value={this.state.inputValue}
            onChange={this.handleNumberChanged}
        />
      </div>
    );
  }
}

export default NumberOfEvents