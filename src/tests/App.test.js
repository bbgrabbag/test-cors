//this is one test suite file

import React from 'react';
import { shallow, mount } from 'enzyme';
import App from '../App'; //need to import the actual file being tested
import EventList from '../EventList';
import CitySearch from '../CitySearch';
import NumberOfEvents from '../NumberOfEvents';

import {mockData} from '../mock-data';
import {extractLocations, getEvents} from '../api';

// test outline
// test('test description', () => {
//  expect(someFunction()).toBe(somevalue);
// });

//describe(): groups tests into scopes
//grouping all unit tests
describe('<App /> component', () => {
    let AppWrapper;
    //beforeAll() function will be executed before all of the tests
    beforeAll(() => {
        // shallow() allows a search within a component, instead of a react component that renders to the dom. Meaning it only renders the specific react component.
        AppWrapper = shallow(<App />); //call the shallow() function using App as its parameter, then set it to variable AppWrapper
    })
    //test1
    test('render list of events', () => {
        expect(AppWrapper.find(EventList)).toHaveLength(1) //how many EventList components exist within AppWrapper (the react component; <App />)
    });

    //test2
    test('render CitySearch', () => {
        expect(AppWrapper.find(CitySearch)).toHaveLength(1)
    })

    //test3
    test('render NumberOfEvents', () => {
        expect(AppWrapper.find(NumberOfEvents)).toHaveLength(1)
    })
});


//grouping all integrartion tests
describe('<App /> integration', () => {

    
    //test1
    test('App passes "events" state as a prop to EventList', ()=> {
        //because of needing to render the componenet's children, you need to use the full rendering Api, mount instead of shallow. EventList is a child component is of App compnent
        let AppWrapper = mount(<App />);
        let AppEventsState = AppWrapper.state('events'); //state of events is saved in a variable
        expect(AppEventsState).not.toEqual(undefined); //checks whether the state of events isnt undefined
        //checking that the state isn't undefined is necessary; otherwise, this comparison could still pass because undefined does equal undefined (meaning that both the state of events and the props of events could both not exist and the test would still pass
        //test below will compare the state of App’s events with EventList's events prop to ensure it’s been passed correctly
        expect(AppWrapper.find(EventList).props().events).toEqual(AppEventsState);
        AppWrapper.unmount();
        //Tests that use the same DOM will affect each other, so you need to “clean up” your DOM after each test using a function called unmount()
    })


    //test2
    test('App passes "locations" state as a prop to CitySearch', ()=> {
        let AppWrapper = mount(<App />);
        let AppLocationsState = AppWrapper.state('locations');
        expect(AppLocationsState).not.toEqual(undefined);
        expect(AppWrapper.find(CitySearch).props().locations).toEqual(AppLocationsState);
        AppWrapper.unmount();
    })


    //test3
    test('get list of events matching the city selected by the user', async () => {
        let AppWrapper = mount(<App />);
        let CitySearchWrapper = AppWrapper.find(CitySearch);
        let locations = extractLocations(mockData);
        CitySearchWrapper.setState({
            suggestions: locations //locations is extracted from the locations array on app.js which is extracted from the actual events
        });
        let suggestions = CitySearchWrapper.state('suggestions'); //variable holds the state of suggestions from line above
        let selectedIndex = Math.floor(Math.random() * (suggestions.length)); // will hold the index of the selected suggestion from the suggestions array
        let selectedCity = suggestions[selectedIndex]; //returns the actual suggestion; suggestions[1] fro example
        await CitySearchWrapper.instance().handleItemClicked(selectedCity); //async operation of calling the function from CitySearch.js
        let allEvents = await getEvents(); //this calls the function from api.js, gets all the events from mockData  async
        let eventsToShow = allEvents.filter(event => event.location === selectedCity); // filters the events by location then by the selected city variable
        expect(AppWrapper.state('events')).toEqual(eventsToShow);
        AppWrapper.unmount();
    })


    //test4
    test('get list of all events when user selects "See all cities"', async () => {
        let AppWrapper = mount(<App />);
        let suggestionItems = AppWrapper.find(CitySearch).find('.suggestions li');
        await suggestionItems.at(suggestionItems.length - 1).simulate('click');
        let allEvents = await getEvents();
        expect(AppWrapper.state('events')).toEqual(allEvents);
        AppWrapper.unmount();
    });
});