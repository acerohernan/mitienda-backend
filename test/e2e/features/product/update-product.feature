Feature: Update Product
    In order to update the product information in the platform
    As a authenticated user
    I want to update one of my products

    Scenario: A valid request
        Given I send a POST request to "/tenant/auth/signup" with body:
        """
        {
            "email": "create-product1@test.com",
            "password": "Password1",
            "phone": "51999113934",
            "country_code": "PE"
        }
        """
        Then I send a POST request to "/tenant/auth/login" with body:
        """
        {
            "email": "create-product1@test.com",
            "password": "Password1"
        }
        """
        And the response body should have an access token
        Then I send an authenticated POST request to "/product" with body:
        """
        {   
            "id": "afefb176-d806-4d7d-8fb7-c52a77ef3337",
            "category_id": null,
            "name": "Test Product",
            "sku": null,
            "description": null,
            "price": "7.00",
            "offer_price": "8.00",
            "stock": 30,
            "images": [],
            "variants": [
                {
                    "name": "Test Variant",
                    "mandatory": false,
                    "options_to_choose": 1,
                    "options": [{
                        "name": "Option 1",
                        "price": "7.00"
                    }]
                }
            ]
        }
        """
        Then I send an authenticated PATCH request to "/product/afefb176-d806-4d7d-8fb7-c52a77ef3337" with body:
        """
        {
            "name": "Updated Test Name"
        }
        """
        And the response status code should be 200
        And the response body should be empty