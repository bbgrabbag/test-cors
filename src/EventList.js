import Event from './Event';

import React, { Component } from 'react';

class EventList extends Component {
  render() {
    let events = this.props.events //passing the events prop from the EventList.test.js
    return (
      <ul className='EventList'>
          {events.map(event =>
            <li key={event.id}>
                <Event 
                  event={event}
                />
            </li>
        )}
      </ul>
    );
  }
}

export default EventList;
