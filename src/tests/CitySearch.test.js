import React from 'react';
import { shallow } from 'enzyme';
import CitySearch from '../CitySearch';
import { mockData } from '../mock-data';
import { extractLocations } from '../api';


// test outline
// test('test description', () => {
//  expect(someFunction()).toBe(somevalue);
// });

//describe(): groups tests into scopes
describe('<CitySearch /> component', () => {
    let CitySearchWrapper;
    let locations;
    beforeAll(() => {
        locations = extractLocations(mockData);
        CitySearchWrapper = shallow(<CitySearch locations={locations} updateEvents={() => {}}/>)
    });

    //test1
    test('render textbox', () => {
        expect(CitySearchWrapper.find('.city')).toHaveLength(1)
    });


    //test2
    test('renders a list of suggestions', () => {
        expect(CitySearchWrapper.find('.suggestions')).toHaveLength(1);
    })


    //test3
    test('renders text input correctly', () => {
        //it sets it to the query that the user types into the textbox
        let query = CitySearchWrapper.state('query');
        //It then compares the value prop of each element that has the class city found within the CitySearch component
        expect(CitySearchWrapper.find('.city').prop('value')).toBe(query)
    })


    //test4
    test('change state when text input changes', () => {
        CitySearchWrapper.setState({
            query: 'Munich'
        });
        let eventObject = { target: { value: 'San Jose' } }; //setting the value in CitySearch.js
        CitySearchWrapper.find('.city').simulate('change', eventObject);
        expect(CitySearchWrapper.state('query')).toBe('San Jose');
    });


    //test5
    test('render list of suggestions correctly', () => {
        let locations = extractLocations(mockData); //This variable will contain the set of distinct locations from the mockData events list
        CitySearchWrapper.setState({ suggestions: locations });
        let suggestions = CitySearchWrapper.state('suggestions'); //setting the entire list of suggestions div under a variable
        expect(CitySearchWrapper.find('.suggestions li')).toHaveLength(suggestions.length + 1); //plus one, because you’ll be manually adding a “See all cities” suggestion at the end of the list, which expands the list even if its empty
        for (let i = 0; i < suggestions.length; i += 1) {
            expect(CitySearchWrapper.find('.suggestions li').at(i).text()).toBe(suggestions[i]);
        }
    });


    //test6
    test('suggestion list match the query when changed', () => {
        CitySearchWrapper.setState({
            query: '',
            suggestions: []
        });
        CitySearchWrapper.find('.city').simulate('change', {
            target: { value: 'Berlin' },
        });
        let query = CitySearchWrapper.state('query');
        let filteredLocations = locations.filter((location) => {
            return location.toUpperCase().indexOf(query.toUpperCase()) > -1;
        });
        expect(CitySearchWrapper.state("suggestions")).toEqual(filteredLocations);
    })


    //test7
    test('Selecting a suggestion should change query state', () =>
    {
        CitySearchWrapper.setState({
            query: 'Berlin'
        });
        let suggestions = CitySearchWrapper.state('suggestions');
        CitySearchWrapper.find('.suggestions li').at(0).simulate('click');
        expect(CitySearchWrapper.state('query')).toBe(suggestions[0]);
    });


    //test8
    test('selecting CitySearch input reveals the suggestions list', () => {
        CitySearchWrapper.find('.city').simulate('focus');
        expect(CitySearchWrapper.state('showSuggestions')).toBe(true);
        expect(CitySearchWrapper.find('.suggestions').prop('style')).not.toEqual({display:'none'});
    });


    //test9
    test('selecting a suggestion should hide the suggestions list', () => {
        CitySearchWrapper.setState({
            query: 'Berlin',
            showSuggestions: undefined
        });
        CitySearchWrapper.find('.suggestions li').at(0).simulate('click');
        expect(CitySearchWrapper.state('showSuggestions')).toBe(false);
        expect(CitySearchWrapper.find('.suggestions').prop('style')).toEqual({display: 'none'})
    })
});
