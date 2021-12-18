import React, { Component } from 'react';

import './css/App.css';
import './css/nprogress.css';

import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import WelcomeScreen from './WelcomeScreen';

import { getEvents, extractLocations, checkToken, getAccessToken } from './api';

import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import EventGenre from './EventGenre';
// all these in combo draw up the chart
//ScatterChart is imported as the indicated graph of choice
//Scatter is imported top draw the points
//XAxis and YAxis are imported for the horizontal and vertical axes respectively
//CartesianGrid is importrd to draw the rectangular coordinate system
//tooltip is impprted to reveal information about the chart on hover


class App extends Component {

  state = {
    events: [],
    locations: [],
    currentLocation: 'all',
    numberOfEvents: 32,
    showWelcomeScreen: true
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
    let accessToken = localStorage.getItem("access_token");
    let searchParams = new URLSearchParams(window.location.search);
    let code = searchParams.get("code");
    //the checkToken() checks whether the 'accessToken' is true or false and assign it to this variable
    // checkToken(accessToken)
    if (code || accessToken) {
      this.setState({ showWelcomeScreen: false });
      getEvents().then((events) => {
        if (this.mounted) {
          this.setState({
            events: events.slice(0, this.state.numberOfEvents),
            locations: extractLocations(events),
          });
        }
      });
    }
  }

  getData = () => {
    let { locations, events } = this.state;
    let data = locations.map((location) => {
      let number = events.filter((event) => event.location === location).length
      let city = location.split(', ').shift()
      return { city, number };
    })
    return data;
  };

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {

    let showWelcomeScreen = this.state.showWelcomeScreen;

    if (showWelcomeScreen)
      return <div className='App'>
        <WelcomeScreen
          getAccessToken={() => { getAccessToken() }}
        />
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
        <div className='data-vis-wrapper'>
          <EventGenre events={this.state.events} />
          <h4>Events in Each City</h4>
          <ResponsiveContainer height={200}>
            <ScatterChart
              //dont need a width and height if 
              // width={400}
              // height={400}
              margin={{
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
              }}
            >
              <CartesianGrid />
              <XAxis type="category" dataKey="city" name="city" />
              <YAxis type="number" dataKey="number" name="number of events" allowDecimals={false} />
              <Tooltip cursor={{ strokeDasharray: '2 2' }} />
              <Scatter data={this.getData()} fill="#8884d8" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
        <EventList events={this.state.events} />
      </div>
    );
  }
}

export default App;
