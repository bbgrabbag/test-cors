Feature: Specify Number oF Events

Scenario: When user hasn’t specified a number, 32 is the default number
Given the user has not specified a number
When the user is on the home page
Then the screen will automatically return 32 events per page

Scenario: User can change the number of events they want to see 
Given the user has specified a number
When the user is on the home page
Then the screenwill return the indicated number of events per page