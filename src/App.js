import React, { Component } from 'react';

import './css/App.css';
import './css/nprogress.css';

import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import WelcomeScreen from './WelcomeScreen';

import { getEvents, extractLocations, checkToken, getAccessToken } from './api';


class App extends Component {

  state={
    events: [],
    locations: [],
    currentLocation: 'all',
    numberOfEvents: 32,
    showWelcomeScreen: undefined
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
    let accessToken = localStorage.getItem('access_token');

    //the checkToken() checks whether the 'accessToken' is true or false and assign it to this variable
    let isTokenValid = (checkToken(accessToken)).error ? false : true; 
    let searchParams = new URLSearchParams(window.location.search);
    let code = searchParams.get('code');
    this.setState({showWelcomeScreen: !(code || isTokenValid)});
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

    let showWelcomeScreen = this.state.showWelcomeScreen;

    if(showWelcomeScreen === undefined) 
      return <div className='App'>
          <WelcomeScreen />
        </div>
    

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
        <WelcomeScreen 
          showWelcomeScreen={showWelcomeScreen}
          getAccessToken={() => {getAccessToken()}}
        />
      </div>
    );
  }
}

export default App;
