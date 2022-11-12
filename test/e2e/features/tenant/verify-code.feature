Feature: Verify forgot password code
    In order to check if the forgot password code is valid
    I want to check if my code is valid

    Scenario: A valid code
        Given I send a POST request to "/tenant/auth/signup" with body:
        """
        {
            "email": "verify-code1@test.com",
            "password": "Password1",
            "phone": "999113934",
            "country_code": "PE"
        }
        """
        Given I send a POST request to "/tenant/auth/password/forgot" with body:
        """
        {
            "email": "verify-code1@test.com",
            "code": "a6918e4e-872c-4de7-934a-e6c76237a217"
        }
        """
        Then I send a GET request to "/tenant/auth/password/verify-code/a6918e4e-872c-4de7-934a-e6c76237a217"
        And the response status code should be 200
        And the response body should be empty
    
    Scenario: A invalid code
        Given I send a GET request to "/tenant/auth/password/verify-code/4571993b-dd9b-4423-974d-3b082cc86225"
        And the response status code should be 400
        And the response body should have an error message