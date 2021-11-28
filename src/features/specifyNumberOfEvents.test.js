import { loadFeature, defineFeature } from 'jest-cucumber';
import App from '../App'
import { mount, shallow} from 'enzyme';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {

    //test1
    test('When user hasn’t specified a number, 32 is the default number', ({ given, 
        when, then }) => {

                let AppWrapper;
                given('the user has not specified a number', () => {
                    AppWrapper=mount(<App />)
                });
        
                when('the user is on the home page', () => {
                    expect(AppWrapper.state('numberOfEvents')).toBe(32);
                });
        
                then(/^the screen will automatically return (\d+) events per page$/, (arg0) => {
                    AppWrapper.update();
                    expect(AppWrapper.find('.event')).toHaveLength(32);
                });
            });

    //test2
    test('User can change the number of events they want to see', ({ given, when, then }) => {

        let AppWrapper
        given('the user has specified a number', () => {
            AppWrapper = shallow(<App />);
            AppWrapper.setState({numberOfEvents: 21})
        });

        when('the user is on the home page', () => {
            
        });

        then('the screenwill return the indicated number of events per page', () => {
            expect(AppWrapper.state('numberOfEvents')).toBe(21);
        });
    });

});