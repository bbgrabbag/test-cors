Feature: Show/Hide an event's details

Scenario: User can expand an event to see its details.
Given the main page displays a list of events
When the user clicks on a single event
Then the user should see a view of event details

Scenario: User can collapse an event to hide its details.
Given the screen displays a view of a single event's detials
When the user clicks the x or back button
Then the screen should return to a list of all events