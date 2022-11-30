Feature: Get Product Information
    In order access product information in the platform
    As anon user
    I want to get the product information

    Scenario: A valid request
        Given I send a POST request to "/tenant/auth/signup" with body:
        """
        {
            "email": "get-product1@test.com",
            "password": "Password1",
            "phone": "51999113934",
            "country_code": "PE"
        }
        """
        Then I send a POST request to "/tenant/auth/login" with body:
        """
        {
            "email": "get-product1@test.com",
            "password": "Password1"
        }
        """
        And the response body should have an access token
        Then I send an authenticated POST request to "/product" with body:
        """
        {   
            "id": "bca6a974-e1df-4f9f-9946-722a4330abe8",
            "category_id": null,
            "name": "Test Product 2",
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
        Then I send a GET request to "/product/bca6a974-e1df-4f9f-9946-722a4330abe8"
        And the response status code should be 200
        And the response body should have the property "product" 

    Scenario: A invalid product id
        Given I send a GET request to "/product/asdassadasd"
        Then the response status code should be 400
        And the response body should have an error message