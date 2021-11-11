import React from 'react';
import { shallow } from 'enzyme';
import CitySearch from '../CitySearch';

// test outline
// test('test description', () => {
//  expect(someFunction()).toBe(somevalue);
// });

//describe(): groups tests into scopes
describe('<CitySearch /> component', () => {
    let CitySearchWrapper;
    beforeAll(() => {
        CitySearchWrapper = shallow(<CitySearch />); //call the shallow() function using App as its parameter, then set it to variable AppWrapper
    })

    //test1
    test('render textbox', () => {
        expect(CitySearchWrapper.find('.city')).toHaveLength(1) 
    });

    //test2
    test('renders a list of suggestions', () => {
        expect(CitySearchWrapper.find('.suggestions')).toHaveLength(1);
    })
});
 