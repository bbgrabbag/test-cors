import {loadFeature, defineFeature} from 'jest-cucumber';
//loadFeature() is used to load a gherkin file
//defineFeature() os used to define a code for the feature file

import React from 'react';
import { mount, shallow } from 'enzyme';
import App from '../App';
import {mockData} from '../mock-data';
import CitySearch from '../CitySearch';

import {extractLocations} from '../api';



let feature = loadFeature('./src/features/filterEventsByCity.feature');
//here is where the loadFeature() is used to load my gherkin file


defineFeature(feature, test => {

    //test1
    test('When user hasn’t searched for a city, show upcoming events from all cities.', ({ given, when, 
        then }) => {
                given('user hasn’t searched for any city', () => {
        
                });
        
                let AppWrapper;
                when('the user opens the app', () => {
                    AppWrapper = mount(<App />);
                    //rendering the app is equivalent to the app just opened
                });
        
                then('the user should see the list of upcoming events.', () => {
                    AppWrapper.update();
                    expect(AppWrapper.find('.event')).toHaveLength(32);
                });
            });
    
    //test2
    test('User should see a list of suggestions when they search for a city', ({ given, when, then }) => {
        
        let CitySearchWrapper;
        let locations = extractLocations(mockData);
        given('the main page is open', () => {
            CitySearchWrapper = shallow(
                <CitySearch
                    updateEvents={()=>{}}
                    locations={locations} />);
        });

        when('the user starts typing in the city textbox', () => {
            CitySearchWrapper.find('.city').simulate('change', {target: {value: 'Berlin'} });
        });

        then('the user should receive a list of cities (suggestions) that match what they’ve typed', () => {
            expect(CitySearchWrapper.find('.suggestions li')).toHaveLength(2);
        });
    });

    //test3
    test('User can select a city from the suggested list', ({ given, and, when, then }) => {
        let AppWrapper;
        given('user was typing “Berlin” in the city textbox', async () => {
          AppWrapper = await mount(<App />);
          AppWrapper.find('.city').simulate('change', { target: { value: 'Berlin' } });
        });
    
        and('the list of suggested cities is showing', () => {
          AppWrapper.update();
          expect(AppWrapper.find('.suggestions li')).toHaveLength(2);
        });
        when('the user selects a city (e.g., “Berlin, Germany”) from the list', () => {
          AppWrapper.find('.suggestions li').at(0).simulate('click');
        });
    
        then('their city should be changed to that city (i.e., “Berlin, Germany”)', () => {
          let CitySearchWrapper = AppWrapper.find(CitySearch);
          expect(CitySearchWrapper.state('query')).toBe('Berlin, Germany');
        });
    
        and('the user should receive a list of upcoming events in that city', () => {
          expect(AppWrapper.find('.event')).toHaveLength(32);
        });
    });
    });