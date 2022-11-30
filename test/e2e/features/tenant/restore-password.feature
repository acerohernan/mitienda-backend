Feature: Restore password   
    In order to restore the tenant password in the platform
    As a registred tenant with a forgot password request created
    I want to restore my password

    Scenario: A valid code
        Given I send a POST request to "/tenant/auth/signup" with body:
        """
        {
            "email": "restore1@test.com",
            "password": "Password1",
            "phone": "51999113934",
            "country_code": "PE"
        }
        """
        Then I send a POST request to "/tenant/auth/password/forgot" with body:
        """
        {
            "email": "restore1@test.com",
            "code": "9a7a11f1-816a-4d1d-b2e4-dce2bf274c58"
        }
        """
        And I send a POST request to "/tenant/auth/password/restore" with body:
        """
        {
            "password": "Password2",
            "re_password": "Password2",
            "code": "9a7a11f1-816a-4d1d-b2e4-dce2bf274c58"
        }
        """
        And the response status code should be 200
        And the response body should be empty
        Then I send a POST request to "/tenant/auth/login" with body:
        """
        {
            "email": "restore1@test.com",
            "password": "Password2"
        }
        """
        And the response status code should be 200

    Scenario: A invalid code   
        Given I send a POST request to "/tenant/auth/password/restore" with body:
        """
        {
            "password": "Password2",
            "re_password": "Password2",
            "code": "53df9d3d-b713-479d-a134-e7f7ddd33994"
        }
        """
        Then the response status code should be 400
        And the response body should have an error message