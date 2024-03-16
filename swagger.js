const m2s = require('mongoose-to-swagger')
const User = require('./models/user.model')
const Product = require('./models/product.model')

exports.options = {
    "components": {
        "schemas": {
            User: m2s(User),
            Product: m2s(Product)
        }
    },
    "openapi": "3.1.0",
    "info": {
        "version": "1.0.0",
        "title": "Products CRUD API",
        "description": "Products project application",
        "contact": {
            "name": "API Support",
            "url": "http://www.example.com",
            "email": "support@example.com"
        }
    },
    "servers": [
        {
            url: 'http://localhost:3000',
            description: "Local Server"
        },
        {
            url: 'http://www.example.com',
            description: 'Testing server'
        }
    ],
    'tags': [
        {
            'name': 'Users',
            'description': 'API endpoints for Users'
        },
        {
            'name': 'Products',
            'description': 'API endpoints for products'
        },
        {
            'name': 'Users and Products',
            'description': 'API endpoints for Users and their products'
        }
    ],
    'paths': {
        '/api/users': {
            'get': {
                'tags': ['Users'],
                'description': 'Returns all users',
                'responses': {
                    '200': {
                        'description': 'A list of users',
                        'content': {
                            'application/json': {
                                'schema': {
                                    'type': 'array',
                                    'items': {
                                        '$ref': '#/components/schemas/User'
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        '/api/users/{username}': {
            'get': {
                'tags': ['Users'],
                'parameters': [
                    {
                        'name': 'username',
                        'in': 'path',
                        'required': true,
                        'description': 'Username of user that we want to find',
                        'type': 'string'
                    }
                ],
                'description': 'Get user with specific username',
                'responses': {
                    '200': {
                        'description': 'User to find',
                        'schema': {
                            '$ref': '#/components/schemas/User'
                        }
                    }
                }
            }
        } 
    }
}