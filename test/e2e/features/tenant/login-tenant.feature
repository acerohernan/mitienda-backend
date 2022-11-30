Feature: User Login
    In order to have authentification in our paltform
    As a registered user
    I want to authenticate me

    Scenario: An registered user
        Given I send a POST request to "/tenant/auth/signup" with body:
        """
        {
            "email": "login1@test.com",
            "password": "Password1",
            "phone": "51999113934",
            "country_code": "PE"
        }
        """
        Then I send a POST request to "/tenant/auth/login" with body:
        """
        {
            "email": "login1@test.com",
            "password": "Password1"
        }
        """
        And the response status code should be 200
        And the response body should have the property "token"