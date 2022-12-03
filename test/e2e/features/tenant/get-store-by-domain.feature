Feature: Get Store Information By Domain
    In order to show the store information in the platform
    As anon user
    I want to see the public information of an specific store

    Scenario: A existing domain
        Given I send a POST request to "/tenant/auth/signup" with body:
        """
        {
            "email": "storebydomain@test.com",
            "password": "Password1",
            "phone": "51999113934",
            "country_code": "PE"
        }
        """
        Then I send a POST request to "/tenant/auth/login" with body:
        """
        {
            "email": "storebydomain@test.com",
            "password": "Password1"
        }
        """
        And the response body should have an access token
        Then I send an authenticated POST request to "/tenant/auth/complete-registration" with body:
        """
        {
            "store_name": "AceroStore",
            "store_domain": "newdomain",
            "store_category": "Gaming",
            "tenant_name": "Name Test",
            "tenant_surname": "Surname Test"
        }
        """
        Then I send a GET request to "/tenant/store/domain/newdomain"
        And the response status code should be 200

     Scenario: A non existing domain
        Given I send a GET request to "/tenant/store/domain/domainthatnotexists"
        Then the response status code should be 404
        And the response body should have an error message