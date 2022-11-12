Feature: Tenant Forgot Password
    In order to restore the password in the palform
    As a registred user
    I want to create a new forgot password request

    Scenario: A registered user
        Given I send a POST request to "/tenant/auth/signup" with body:
        """
        {
            "email": "forgot1@test.com",
            "password": "Password1",
            "phone": "999113934",
            "country_code": "PE"
        }
        """
        Then I send a POST request to "/tenant/auth/password/forgot" with body:
        """
        {
            "email": "forgot1@test.com"
        }
        """
        Then the response status code should be 200
        And the response body should be empty

    Scenario: A non registered user
        Given I send a POST request to "/tenant/auth/password/forgot" with body:
        """
        {
            "email": "not-registered@test.com"
        }
        """
        Then the response status code should be 200
        And the response body should be empty