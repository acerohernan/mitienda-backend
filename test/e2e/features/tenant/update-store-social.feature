Feature: Update Store Social Media
    In order to update the store social media
    As an authenticated user
    I want to update my social media information

    Scenario: A valid request
        Given I send a POST request to "/tenant/auth/signup" with body:
        """
        {
            "email": "updatestoresocial@test.com",
            "password": "Password1",
            "phone": "999113934",
            "country_code": "PE"
        }
        """
        Then I send a POST request to "/tenant/auth/login" with body:
        """
        {
            "email": "updatestoresocial@test.com",
            "password": "Password1"
        }
        """
        And the response body should have an access token
        Then I send an authenticated PUT request to "/tenant/store/social" with body:
        """
        {
            "facebook": null,
            "instagram": null,
            "pinterest": null,
            "twitter": null,
            "tiktok": null,
            "youtube": "youtube.com/acerostore"
        }
        """
        And the response status code should be 200
        And the response body should be empty