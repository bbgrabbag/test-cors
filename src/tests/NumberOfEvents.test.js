import React from 'react';
import { shallow } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';


describe('<NumberOfEvents /> component', () => {
    let NumberOfEventsWrapper;
    beforeAll(() => {
        NumberOfEventsWrapper = shallow(<NumberOfEvents />)
    });

    //test1
    test('render numberbox', () => {
        expect(NumberOfEventsWrapper.find('.NumberOfEvents')).toHaveLength(1)
    });

    //test2
    test('change state when number input changes', () => {
        NumberOfEventsWrapper.setState({
            inputValue: 32
        });
        let eventObject = { target: { value: 15 } }; //setting the value in CitySearch.js
        NumberOfEventsWrapper.find('.NumberOfEventsInput').simulate('change', eventObject);
        expect(NumberOfEventsWrapper.state('inputValue')).toBe(15);
    });

});
