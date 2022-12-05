Feature: Get all the categories
    In order to see the categories in the platform
    As an authenticated user
    I want to get all my products categories
     
     Scenario: A valid request
        Given I send a POST request to "/tenant/auth/signup" with body:
        """
        {
            "email": "get-category-all1@test.com",
            "password": "Password1",
            "phone": "51999113934",
            "country_code": "PE"
        }
        """
        Then I send a POST request to "/tenant/auth/login" with body:
        """
        {
            "email": "get-category-all1@test.com",
            "password": "Password1"
        }
        """
        And the response body should have an access token
        Then I send an authenticated POST request to "/product/category" with body:
        """
        {
            "id": "7cfd23ac-0663-49e6-924c-2396e84ac258",
            "name": "Category Test",
            "img_url": "link"
        }
        """
        Then I send an authenticated GET request to "/product/category/store"
        And the response status code should be 200
        And the response body should have the property "categories"