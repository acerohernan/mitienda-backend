Feature: Get all the products from Store
    In order to get the products from a store in the platform
    As a anon user
    I want to get all the product from a store

    Scenario: A valid request
        Given I send a GET request to "/product/store/47d4de83-a17c-4e99-8f52-35e539bf5ed7?page=1&limit=10"
        And the response status code should be 200
        And the response body should have the property "products"
        And the response body should have the property "meta"