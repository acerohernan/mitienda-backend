Feature: Update a Product category
    In order to have product categories in the platform
    As a authenticated user 
    I want to create a product category

    Scenario: A valid request
        Given I send a POST request to "/tenant/auth/signup" with body:
        """
        {
            "email": "update-category1@test.com",
            "password": "Password1",
            "phone": "51999113934",
            "country_code": "PE"
        }
        """
        Then I send a POST request to "/tenant/auth/login" with body:
        """
        {
            "email": "update-category1@test.com",
            "password": "Password1"
        }
        """
        And the response body should have an access token
        Then I send an authenticated POST request to "/product/category" with body:
        """
        {
            "id": "d5bd2b47-956e-4f8b-90ec-d8775cfb4a76",
            "name": "Category Test 1",
            "img_url": "link"
        }
        """
        Then I send an authenticated PATCH request to "/product/category/d5bd2b47-956e-4f8b-90ec-d8775cfb4a76" with body:
        """
        {
            "name": "Updated Name"
        }
        """
        And the response status code should be 200
        And the response body should be empty