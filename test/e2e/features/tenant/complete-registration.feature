Feature: Complete Registration
    In order to complete the user Registration
    As an authenticated user
    I want to complete my Registration

    Scenario: A valid request
        Given I send a POST request to "/tenant/auth/signup" with body:
        """
        {
            "email": "cregister@test.com",
            "password": "Password1",
            "phone": "51999113934",
            "country_code": "PE"
        }
        """
        Then I send a POST request to "/tenant/auth/login" with body:
        """
        {
            "email": "cregister@test.com",
            "password": "Password1"
        }
        """
        And the response body should have an access token
        Then I send an authenticated POST request to "/tenant/auth/complete-registration" with body:
        """
        {
            "store_name": "AceroStore",
            "store_domain": "acerostore",
            "store_category": "Gaming",
            "tenant_name": "Name Test",
            "tenant_surname": "Surname Test"
        }
        """
        And the response status code should be 200
        And the response body should be empty

    Scenario: A valid taken username
        Given I send a POST request to "/tenant/auth/signup" with body:
        """
        {
            "email": "cregister2@test.com",
            "password": "Password1",
            "phone": "51999113934",
            "country_code": "PE"
        }
        """
        Then I send a POST request to "/tenant/auth/login" with body:
        """
        {
            "email": "cregister2@test.com",
            "password": "Password1"
        }
        """
        And the response body should have an access token
        Then I send an authenticated POST request to "/tenant/auth/complete-registration" with body:
        """
        {
            "store_name": "AceroStore2",
            "store_domain": "duplicateddomain",
            "store_category": "Gaming",
            "tenant_name": "Name Test",
            "tenant_surname": "Surname Test"
        }
        """
        And the response status code should be 200
        And the response body should be empty
        Then I send an authenticated POST request to "/tenant/auth/complete-registration" with body:
        """
        {
            "store_name": "AceroStore2",
            "store_domain": "duplicateddomain",
            "store_category": "Gaming",
            "tenant_name": "Name Test",
            "tenant_surname": "Surname Test"
        }
        """
        And the response status code should be 400
        And the response body should have an error message

    Scenario: A unauthenticated request
        Given I send a POST request to "/tenant/auth/complete-registration" with body:
        """
        {
            "store_name": "AceroStore2",
            "store_domain": "duplicateddomain",
            "store_category": "Gaming",
            "tenant_name": "Name Test",
            "tenant_surname": "Surname Test"
        }
        """
        Then the response status code should be 401
        And the response body should have an error message