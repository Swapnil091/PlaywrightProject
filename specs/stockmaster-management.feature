@stockmaster @management @test-data-required
Feature: StockMaster inventory and contact management
  As a StockMaster administrator
  I want to manage inventory and business contacts
  So that dashboard and directory data stay accurate

  Background:
    Given I am signed in as a StockMaster administrator

  @smoke
  Scenario: Dashboard shows inventory and contact summaries
    When I open the StockMaster dashboard
    Then I should see summary counts for products, customers, suppliers, and categories
    And I should see the recent products and low stock alerts sections

  Scenario: Create a product with valid details
    Given an active category and supplier exist for this test
    When I add a product with a unique name and SKU, unit, prices, and stock quantity
    Then the product should appear in the products list with the submitted details

  Scenario Outline: Product requires each mandatory field
    When I submit a product without the <field>
    Then the product should not be saved
    And I should see validation feedback for the missing <field>

    Examples:
      | field |
      | name  |
      | SKU   |
      | unit  |

  Scenario: Product SKU accepts only supported characters
    When I submit a product with a SKU containing unsupported characters
    Then the product should not be saved
    And I should see validation feedback for the SKU

  Scenario: Product below its minimum quantity appears as a low stock alert
    Given an active product exists with its quantity below its minimum quantity
    When I open the StockMaster dashboard
    Then the product should appear in the low stock alerts section

  Scenario: Update a product
    Given a product exists for this test
    When I update its selling price, stock quantity, and status
    Then the products list should show the updated values

  Scenario: Search products by name or SKU
    Given a product exists for this test
    When I search products using its name or SKU
    Then the matching product should appear in the results

  Scenario: Create and update a category
    When I create a category with a unique name and description
    Then the category should appear in the categories list
    When I update the category name, description, and status
    Then the categories list should show the updated category

  Scenario: Category requires a name
    When I submit a category without a name
    Then the category should not be saved
    And I should see validation feedback for the missing category name

  Scenario: Create a customer and find it by search
    When I add a customer with a unique name, email, and contact details
    Then the customer should appear in the customers list
    When I search customers by the new customer's name or email
    Then the matching customer should appear in the results

  Scenario: Customer requires a name
    When I submit a customer without a name
    Then the customer should not be saved
    And I should see validation feedback for the missing customer name

  Scenario: Update a customer
    Given a customer exists for this test
    When I update the customer's credit limit and status
    Then the customers list should show the updated values

  Scenario: Create a supplier and find it by search
    When I add a supplier with a unique name, email, city, and payment terms
    Then the supplier should appear in the suppliers list
    When I search suppliers by the new supplier's name, email, or city
    Then the matching supplier should appear in the results

  Scenario: Supplier requires a name
    When I submit a supplier without a name
    Then the supplier should not be saved
    And I should see validation feedback for the missing supplier name

  Scenario: Update a supplier
    Given a supplier exists for this test
    When I update the supplier's payment terms and status
    Then the suppliers list should show the updated values