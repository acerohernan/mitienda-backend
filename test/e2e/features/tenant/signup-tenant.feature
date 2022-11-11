Feature: Tenant Sign up
    In order to create accounts in the paltform
    As anon user
    I want to create my account

    Scenario: A valid non existing user
        Given I send a POST request to "/tenant/auth/signup" with body:
        """
        {
            "email": "signup1@test.com",
            "password": "Password1",
            "phone": "999113934"
        }
        """
        Then the response status code should be 201
        And the response body should be empty

    Scenario: A registered email
        Given I send a POST request to "/tenant/auth/signup" with body:
        """
        {
            "email": "signup2@test.com",
            "password": "Password1",
            "phone": "999113934"
        }
        """
        Then I send a POST request to "/tenant/auth/signup" with body:
        """
        {
            "email": "signup2@test.com",
            "password": "Password1",
            "phone": "999113934"
        }
        """
        And the response status code should be 400
        And the response body should have an error message
    
    Scenario: An invalid request
        Given I send a POST request to "/tenant/auth/signup" with body:
        """
        {}
        """
        Then the response status code should be 400
        And the response body should have an error message


