Feature: All User Registrationn Scenarios

@userReg
Scenario: Verify the button functionality for valid data
Given I am on the user Registration Page
When I enter the below details
|Swapnil | swapnil@gmail.com | 9090909090 | Pune | Pune |
And Iclick on the Submit button
Then user should be added

    Feature Description