Feature: Delete Product
    In order to delete products in the platform
    As an authenticated user
    I want to delete one of my store products

    Scenario: A valid request
        Given I send a POST request to "/tenant/auth/signup" with body:
        """
        {
            "email": "delete-product1@test.com",
            "password": "Password1",
            "phone": "51999113934",
            "country_code": "PE"
        }
        """
        Then I send a POST request to "/tenant/auth/login" with body:
        """
        {
            "email": "delete-product1@test.com",
            "password": "Password1"
        }
        """
        And the response body should have an access token
        Then I send an authenticated POST request to "/product" with body:
        """
        {   
            "id": "096f5fa4-95e7-4675-99eb-a55a449e8040",
            "category_id": null,
            "name": "Delete Product",
            "sku": null,
            "description": null,
            "price": "7.00",
            "offer_price": "8.00",
            "stock": 30,
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
        Then I send an authenticated DELETE request to "/product/096f5fa4-95e7-4675-99eb-a55a449e8040"
        And the response status code should be 200
        And the response body should be empty
        Then I send a GET request to "/product/096f5fa4-95e7-4675-99eb-a55a449e8040"
        And the response status code should be 404