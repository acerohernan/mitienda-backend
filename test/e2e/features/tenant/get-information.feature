Feature: Get Tenant Information
    In order to have the tenant information in the platform
    As an authenticated tenant
    I want to get my information

    Scenario: An authenticated use
        Given I send a POST request to "/tenant/auth/signup" with body:
        """
        {
            "email": "getinfo@test.com",
            "password": "Password1",
            "phone": "999113934",
            "country_code": "PE"
        }
        """
        Then I send a POST request to "/tenant/auth/login" with body:
        """
        {
            "email": "getinfo@test.com",
            "password": "Password1"
        }
        """
        And the response body should have an access token
        Then I send an authenticated GET request to "/tenant/information"
        And the response status code should be 200
        And the response body should have the property "tenant"

    Scenario: An unathenticated tenant
        Given I send a GET request to "/tenant/information"
        And the response status code should be 401
        And the response body should have an error message