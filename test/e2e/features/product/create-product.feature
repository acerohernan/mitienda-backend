Feature: Create Product
    In order to have products in the stores
    As a registered user
    I want to create a product for my stores

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
            "id": "cd0d7c2b-fb4d-415a-b6a8-04bd7a2b2b72",
            "category_id": null,
            "name": "Test Product",
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
        And the response status code should be 201
        And the response body should be empty
    
    Scenario: A unathorized request
        Given I send a POST request to "/product" with body:
        """
        {   
            "id": "cd0d7c2b-fb4d-415a-b6a8-04bd7a2b2b72",
            "category_id": null,
            "name": "Test Product",
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
        And the response status code should be 401
        And the response body should have an error message