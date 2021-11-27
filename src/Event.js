import React, { Component } from 'react';

class Event extends Component {

    state={
      collapsedInfo: true,
    };

    handleClick = () => {
      this.setState({
        collapsedInfo: !this.state.collapsedInfo // '!' inverts the state
      })
    };

    


  render() {

    let event = this.props.event;
    let collapsedInfo = this.state.collapsedInfo;

    let renderInfo = () => {
      if(collapsedInfo === true){
        return <button className='showDetails' onClick={this.handleClick}>Show details</button>
      } else {
        return <div className='event_info'>
        {event.description}
        {/* {event.start.dateTime} */}
        <button className='closeDetails' onClick={this.handleClick}>Close details</button>
      </div>
      }
    }    

    return (
      <div className='event'>

        <h2 className='summary'>{event.summary}</h2>
        <p className='location'>{event.location}</p>
        {renderInfo()}

      </div>
    )
  }
}

export default Event;
