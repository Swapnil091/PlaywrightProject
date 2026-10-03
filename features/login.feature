@stockmaster @authentication
Feature: StockMaster authentication
  As a StockMaster administrator
  I want to access the application securely
  So that only authenticated users can manage inventory data

  @smoke
  Scenario: Login page displays sign-in controls
    Given the StockMaster login page is open
    Then the login page should show email, password, and sign-in controls

  @smoke @requires-credentials
  Scenario: Administrator signs in with valid credentials
    Given the StockMaster login page is open
    When I sign in with valid administrator credentials from the test environment
    Then I should see the StockMaster dashboard
    And the dashboard navigation should include products, categories, customers, and suppliers

  Scenario: Invalid credentials are rejected
    Given the StockMaster login page is open
    When I sign in with an invalid email or password
    Then I should remain on the login page
    And I should see an authentication error

  @negative
  Scenario: Failed sign-in does not grant access to protected pages
    Given the StockMaster login page is open
    When I sign in with an invalid email or password
    Then I should see an authentication error
    When I open the StockMaster dashboard directly
    Then I should be redirected to the login page

  @negative
  Scenario Outline: Sign-in is rejected for invalid or incomplete credentials
    Given the StockMaster login page is open
    When I attempt to sign in with email "<email>" and password "<password>"
    Then I should remain on the login page
    And I should not be signed in

    Examples:
      | email                  | password         |
      |                        | unused-password  |
      | unused@example.invalid |                  |
      | not-an-email           | unused-password  |

  Scenario: Password visibility can be toggled
    Given the StockMaster login page is open
    When I enter a password and activate the password visibility control
    Then the password should be visible
    When I activate the password visibility control again
    Then the password should be masked

  @smoke @requires-credentials
  Scenario: Administrator signs out
    Given I am signed in as a StockMaster administrator
    When I sign out
    Then I should see the StockMaster login page
    And opening a protected page should return me to the login page

  Scenario: Protected pages require authentication
    Given I am not signed in
    When I open the StockMaster dashboard directly
    Then I should be redirected to the login page