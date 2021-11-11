//this is one test suite file

import React from 'react';
import { shallow } from 'enzyme';
import App from '../App'; //need to import the actual file being tested
import EventList from '../EventList';
import CitySearch from '../CitySearch';

// test outline
// test('test description', () => {
//  expect(someFunction()).toBe(somevalue);
// });

//describe(): groups tests into scopes
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
});