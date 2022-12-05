Feature: Create a Product category
    In order to have product categories in the platform
    As a authenticated user 
    I want to create a product category

    Scenario: A valid request
        Given I send a POST request to "/tenant/auth/signup" with body:
        """
        {
            "email": "delete-category1@test.com",
            "password": "Password1",
            "phone": "51999113934",
            "country_code": "PE"
        }
        """
        Then I send a POST request to "/tenant/auth/login" with body:
        """
        {
            "email": "delete-category1@test.com",
            "password": "Password1"
        }
        """
        And the response body should have an access token
        Then I send an authenticated POST request to "/product/category" with body:
        """
        {
            "id": "257a6df2-fbb1-4eeb-828a-bf6e5b85c9a4",
            "name": "Category Test",
            "img_url": "link"
        }
        """
        Then I send an authenticated DELETE request to "/product/category/257a6df2-fbb1-4eeb-828a-bf6e5b85c9a4"
        And the response status code should be 200
        And the response body should be empty