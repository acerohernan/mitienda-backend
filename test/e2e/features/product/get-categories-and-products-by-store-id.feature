Feature: Get categories and their products by Store ID
    In order to get the categories with their products in the platform
    As a anon user
    I want to get the categories and their products of a Store

    Scenario: A valid request
        Given I send a GET request to "/product/category/store/b2d7ba76-338b-4dbd-9c9e-626e3f52dc95?page=0&size=4&products=4"
        And the response should be visible in the console
        Then the response status code should be 200
        And the response body should have the property "categories"