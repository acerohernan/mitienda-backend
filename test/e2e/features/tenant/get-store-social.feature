Feature: Get the social of a store
    In order to have the social information of a store
    As an authenticated user
    I want to see the social media of a store

    Scenario: A valid request
        Given I send an authenticated GET request to "/tenant/store/social"
        Then the response status code should be 200
        And the response body should have the property "social" 
