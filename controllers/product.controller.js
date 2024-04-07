const Product = require('../models/product.model')
const logger = require('../logger/logger')

exports.findAll = async(req, res) => {
    console.log('Find all products')

    try {
        const result = await Product.find()
        res.status(200).json({status: true, data: result})
        logger.info('Success in reading all products')
    } catch (err) {
        res.status(400).json({status: false, data: err})
        console.log(`Problem in reading all products`)
        logger.error(`Problem in reading all products, ${err}`)
    }
}

exports.findOne = async(req, res) => {
    console.log('Find a product')
    const id = req.params.id
    try {
        const result = await Product.findOne({_id: id})
        res.status(200).json({data: result})
        logger.info('Success in finding product: ', result)
    } catch(err) {
        res.status(404).json({data: err})
        console.log(`Problem in reading product with id: ${id}`)
        logger.error(`Problem in reading product, ${err}`)
    }
}

exports.create = async(req, res) => {
    console.log('Insert a product')

    const newProduct = new Product({
        product: req.body.product,
        cost: req.body.cost,
        description: req.body.description,
        quantity: req.body.quantity
    })
    
    try {
        const result = await newProduct.save()
        res.status(200).json({data: result})
        logger.info(`Product: ${newProduct} was inserted`)
    } catch(err) {
        res.status(400).body({data: err})
        console.log('Problem in saving product', err)
        logger.error('Problem in saving product', err)
    }
}

exports.update = async(req, res) => {
    const id = req.params.id

    console.log('Update product with id:', id)

    const updatedProduct = {
        product: req.body.product,
        cost: req.body.cost,
        description: req.body.description,
        quantity: req.body.quantity
    }

    try {
        const result = await Product.findByIdAndUpdate(
            id, updatedProduct, {new: true}
        )
        res.status(200).json({data: result})
        logger.info('Success in updating product with id: ' + id)
    } catch(err) {
        res.status(400).json({data: err})
        logger.error('Problem in updating product with id:', id)
    }
}

exports.delete = async(req, res) => {
    const id = req.params.id

    console.log('Delete product with id:', id)
    try {
        const result = await Product.findByIdAndDelete(id)
        res.status(200).json({data: result})
        logger.info('Success in deleting product with id:', id)
    } catch(err) {
        res.status(400).json({data: err})
        logger.error('Problem in deleting product with id:', id)
    }
}