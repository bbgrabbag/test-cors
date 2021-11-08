Meet-up-app
FEATURE 1: FILTER EVENTS BY CITY
As a user I should be able to “filter events by city” So that I can see the list of events that take place in that city
    
Scenario 1: When user hasn’t searched for a city, show upcoming events from all cities.     
    Given user hasn’t searched for any city When the user opens the app Then the user should see a list of all upcoming events

Scenario 2: User should see a list of suggestions when they search for a city.
     Given the main page is open When user starts typing in the city textbox Then the user should see a list of cities (suggestions) that match what they’ve typed

Scenario 3: User can select a city from the suggested list. 
    Given the user was typing “Berlin” in the city textbox And the list of suggested cities is showing When the user selects a city (e.g., “Berlin, Germany”) from the list Then their city should be changed to that city (i.e., “Berlin, Germany”) And the user should receive a list of upcoming events in that city

Ex. 1 Start FEATURE 2: SHOW/HIDE AN EVENT'S DETAILS
    As a user 
    I should be able to show and hide an event's details 
    So that I can view details of a single event one at a time and move on to another specific event conventiently

Scenario 1: User can expand an event to see its details 
    Given the main page displays a list of events 
    When the user clicks on a single event
    Then the user should see a view of event details

Scenario 2: User can collapse an event to hide its details 
    Given the screen displays a view of a single event's detials. 
    When the user clicks the x or back button Then the screen should return to a list of all events


FEATURE 3: SPECIFY NUMBER OF EVENTS
    As a user 
    I should be able to display a certain number of events page by page 
    So I can see more of fewer events in the ecents list at once

Scenario 1: When user hasn’t specified a number, 32 is the default number 
    Given the user has not specified a number When the user is on the home page
    Then the screen will automatically return 32 events per page

Scenario 2: User can change the number of events they want to see 
    Given the user has specified a number
    When the user is on the home page
    Then the screenwill return the indicated number of events per page


FEATURE 4: USE THE APP WHEN OFFLINE
    As a user
    I should be able to use the app offline
    So that I can see events I viewed the last time i was online
Scenario 1: Show cached data when there’s no internet connection 
    Given the user is offline
    When the information is stored on the computer or device
    Then the screenwill display the saved data

Scenario 2: Show error when user changes the settings (city, time range) 
    Given the user input a city and time range When the information does not match with any of the data 
    Then the screen will display an error


FEATURE 5: DATA VISUALIZATION
    As a user 
    I should be able see a chart of upcoming events in a respective city 
    So that the events can be organized city by city for good user experience
Scenario 1: Show a chart with the number of upcoming events in each city 
    Given the user opens the main page 
    When the user scrolls to the bottom 
    Then they will see a chart with the number of upcoming events in each city