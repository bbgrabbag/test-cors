import {loadFeature, defineFeature} from 'jest-cucumber';
import { mockData } from '../mock-data';
import { mount, shallow } from 'enzyme';
import Event from '../Event';

let feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {

    //test1
    test('User can expand an event to see its details.', ({ given, when, then }) => 
{
        let EventWrapper;
        given('the main page displays a list of events', () => {
            EventWrapper= mount(<Event event={mockData}/>);
        });
        
        when('the user clicks on a single event', () => {
           EventWrapper.find('.showDetails').simulate('click');
           EventWrapper.setState({collapsed: false});
        });

        then('the user should see a view of event details', () => {
            expect(EventWrapper.state('collapsed')).toEqual(false);
        });
    });



    //test2
    test('User can collapse an event to hide its details.', ({ given, when, then }) => {

        let EventWrapper
        given('the screen displays a view of a single event\'s detials', () => {    
            EventWrapper = shallow(<Event event={mockData} />);
            EventWrapper.setState({collapsed: true})
        });

        when('the user clicks the x or back button', () => {
            EventWrapper.update();
            let Event = EventWrapper.find('.event .event_info');
            Event.find('.closeDetails').simulate('click');
        });

        then('the screen should return to a list of all events', () => {
            expect(EventWrapper.state('collapsed')).toBe(true);
        });
    });
});

