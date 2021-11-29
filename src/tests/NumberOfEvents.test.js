import React from 'react';
import { shallow } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';
let updateEventCount = jest.fn();


describe('<NumberOfEvents /> component', () => {
    let NumberOfEventsWrapper;
    beforeAll(() => {
        NumberOfEventsWrapper = shallow(<NumberOfEvents updateEventCount={updateEventCount}/>)
    });

    //test1
    test('render numberbox', () => {
        expect(NumberOfEventsWrapper.find('.NumberOfEvents')).toHaveLength(1)
    });

    //test2
    test('change state when number input changes', () => {
        NumberOfEventsWrapper.setState({
            NumberOfEvents: 32
        });
        let eventObject = { target: { value: 15 } }; //setting the value in CitySearch.js
        NumberOfEventsWrapper.find('.NumberOfEventsInput').simulate('change', eventObject);
        expect(updateEventCount).toBeCalledWith(15);
    });

});
