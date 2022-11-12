Feature: Check if a store domain is taken
    In order to know if a store domain is taken in the platfom
    As anon user
    I want to see the avaibility of my store domain

    Scenario: A valid store domain
        Given I send a GET request to "/tenant/store/domain/check?domain=domainexample2"
        Then the response status code should be 200
        And the response body should be empty
    
    Scenario: A taken store domain
        Given I send a POST request to "/tenant/auth/signup" with body:
        """
        {
            "email": "check-domain@test.com",
            "password": "Password1",
            "phone": "999113934",
            "country_code": "PE"
        }
        """
        Then I send a POST request to "/tenant/auth/login" with body:
        """
        {
            "email": "check-domain@test.com",
            "password": "Password1"
        }
        """
        And the response body should have an access token
        Then I send an authenticated POST request to "/tenant/auth/complete-registration" with body:
        """
        {
            "store_name": "TestStore",
            "store_domain": "checkdomain",
            "store_category": "Gaming",
            "tenant_name": "Name Test",
            "tenant_surname": "Surname Test"
        }
        """
        And I send a GET request to "/tenant/store/domain/check?domain=checkdomain"
        And the response status code should be 400
        And the response body should have an error message