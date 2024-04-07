const mongoose = require('mongoose')
const request = require('supertest')

const app = require('../app')
const helper = require('../helpers/product.helper')

let deletedProductId;

require('dotenv').config()

beforeEach(async () => {
    await mongoose.connect(process.env.MONGODB_URI)
    .then(
        () => {
            console.log('Connection to MongoDB established')
        },
        err => console.log('Failed to connect to MongoDB', err)
    )
})

afterEach(async () => {
    mongoose.connection.close()
})

describe('Request GET /api/products', () => {
    it('Returns all products', async () => {
        const res = await request(app).get('/api/products')
        expect(res.statusCode).toBe(200)
        expect(res.body.data.length).toBeGreaterThan(0)
    }, 2000)
})

describe('Request GET /api/products/:id', () => {
    it('Returns a product', async () => {
        const result = await helper.findLastInsertedProduct()

        const res = await request(app).get('/api/products/' + result._id)
        expect(res.statusCode).toBe(200)
        expect(res.body.data.product).toBe(result.product)
        expect(res.body.data.description).toBe(result.description)
    }, 2000)
})

describe('Request POST /api/products', () => {
    it('Creates a product', async () => {
        const newProduct = {
            product: "Test Product",
            cost: 10,
            quantity: 20,
            description: 'Test Description'
        }
        const res = await request(app)
            .post('/api/products')
            .send(newProduct)
        expect(res.statusCode).toBe(200)
        expect(res.body.data).toMatchObject(newProduct)
    }, 2000)
})

describe('Request PATCH /api/products/:id', () => {
    it('Update an existing product', async () => {
        const existingProduct = await helper.findLastInsertedProduct()
        const updatedProduct = {
            product: 'Updated Test product',
            description: 'Updated test description'
        }
        const res = await request(app)
            .patch('/api/products/' + existingProduct._id)
            .send(updatedProduct)
        
        expect(res.statusCode).toBe(200)
        expect(res.body.data.product).toBe(updatedProduct.product)
    }, 2000)
})

describe('DELETE /api/products/:id', () => {
    it('Delete last inserted product', async () => {
        const result = await helper.findLastInsertedProduct()
        const res = await request(app)
            .delete('/api/products/' + result._id)

        deletedProductId = result._id
        expect(res.statusCode).toBe(200)
    }, 3000)

    it('Delete a product that does not exist', async () => {
        const res = await request(app).delete('/api/products/' + deletedProductId)
        expect(res.statusCode).toBe(200)
        expect(res.body.data).toBe(null)
    })
})