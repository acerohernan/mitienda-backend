Feature: User Login
    In order to have authentification in our paltform
    As a registered user
    I want to authenticate me

    Scenario: An registered user
        Given I send a POST request to "/tenant/auth/login" with body:
        """
        {
            "email": "login@test.com",
            "password": "Password1"
        }
        """
        And the response status code should be 200
        And the response should be visible in the console