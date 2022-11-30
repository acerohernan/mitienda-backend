Feature: Update Tenant Information
    In order to have the option to update the tenant information in the platform
    As an autenticated user
    I want to update my information

    Scenario: A valid request
        Given I send a POST request to "/tenant/auth/signup" with body:
        """
        {
            "email": "updatetenant@test.com",
            "password": "Password1",
            "phone": "51999113934",
            "country_code": "PE"
        }
        """
        Then I send a POST request to "/tenant/auth/login" with body:
        """
        {
            "email": "updatetenant@test.com",
            "password": "Password1"
        }
        """
        Then I send an authenticated PUT request to "/tenant/information" with body:
        """
        {
            "name": null,
            "surname": "Acero Guerrero",
            "phone": "999113934"
        }
        """
        And the response status code should be 200
        And the response body should be empty
