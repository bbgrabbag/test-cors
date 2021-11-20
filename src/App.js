import React, { Component } from 'react';

import './css/App.css';
import './css/nprogress.css';

import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';

import { getEvents, extractLocations } from './api';


class App extends Component {

  state={
    events: [],
    locations: [],
    currentLocation: 'all',
    numberOfEvents: 32,
  }

  updateEvents = (location, eventCount) => {
    getEvents().then((events) => {
      let locationEvents = (location === 'all') ?
        events :
        events.filter((event) => event.location === location);
        locationEvents = locationEvents.slice(0, eventCount)
      this.setState({
        events: locationEvents,
      });
    });
  }

  updateEventCount = (eventCount) => {
    this.setState({
      numberOfEvents: eventCount
    });
      let currentLocation = this.state.currentLocation;
      this.updateEvents(currentLocation, eventCount);
  }

  updateLocation = (location) => {
    this.setState({
      currentLocation: location
    });
    this.updateEvents(location, this.state.numberOfEvents)
  }


  componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({ 
          events: events.slice(0, this.state.numberOfEvents), 
          locations: extractLocations(events) });
      }
    });
  }

  componentWillUnmount(){
    this.mounted = false;
  }
  
  render() {

    return (
      <div className="App">
        <CitySearch 
          locations={this.state.locations}
          updateLocation={this.updateLocation}
        />
        <NumberOfEvents
          locations={this.state.locations}
          numberOfEvents={this.state.numberOfEvents}
          updateEventCount={this.updateEventCount}
        />
        <EventList events={this.state.events}/>
      </div>
    );
  }
}

export default App;
