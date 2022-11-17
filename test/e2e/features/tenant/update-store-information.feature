Feature: Update store information
    In order to update the store information in the platform
    As a registered user
    I want to update my store information

    Scenario: A valid request
        Given I send a POST request to "/tenant/auth/signup" with body:
        """
        {
            "email": "updatetenant@test.com",
            "password": "Password1",
            "phone": "999113934",
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
        And the response body should have an access token
        Then I send an authenticated PUT request to "/tenant/store/information" with body:
        """
        {
            "whatsapp": "5188888888",
            "logo_img": "logo_img",
            "banner_img": "banner_img",
            "description": null,
            "category": "Test Category",
            "name": "Test name",
            "category": "Test category",
            "team_img": "team img link",
            "team_description": null,
            "telephone": "5188888888"
        }
        """
        And the response status code should be 200
        And the response body should be empty