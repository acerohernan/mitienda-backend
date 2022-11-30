Feature: Get Store Information
    In order to get the store information in the platform
    As an authenticated user
    I want to get my store information

    Scenario: An authenticated user
        Given I send a POST request to "/tenant/auth/signup" with body:
        """
        {
            "email": "getstoreinfo@test.com",
            "password": "Password1",
            "phone": "51999113934",
            "country_code": "PE"
        }
        """
        Then I send a POST request to "/tenant/auth/login" with body:
        """
        {
            "email": "getstoreinfo@test.com",
            "password": "Password1"
        }
        """
        And the response body should have an access token
        Then I send an authenticated GET request to "/tenant/store/information"
        And the response status code should be 200
        And the response body should have the property "store"
    
    Scenario: An unathenticated tenant
        Given I send a GET request to "/tenant/store/information"
        And the response status code should be 401
        And the response body should have an error message