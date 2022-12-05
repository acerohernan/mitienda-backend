Feature: Create a Product category
    In order to have product categories in the platform
    As a authenticated user 
    I want to create a product category

    Scenario: A valid request
        Given I send a POST request to "/tenant/auth/signup" with body:
        """
        {
            "email": "create-category1@test.com",
            "password": "Password1",
            "phone": "51999113934",
            "country_code": "PE"
        }
        """
        Then I send a POST request to "/tenant/auth/login" with body:
        """
        {
            "email": "create-category1@test.com",
            "password": "Password1"
        }
        """
        And the response body should have an access token
        Then I send an authenticated POST request to "/product/category" with body:
        """
        {
            "id": "67fb7f8d-d1c2-4ed4-90df-49c543983417",
            "name": "Category Test",
            "img_url": "link"
        }
        """
        And the response status code should be 201
        And the response body should be empty