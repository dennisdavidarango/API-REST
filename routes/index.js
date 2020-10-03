'use strict'

const express = require('express')
const productCtrl = require('../controllers/product')
const employedCtrl = require('../controllers/employed')
const userCtrl = require('../controllers/user')
const auth = require('../middlewares/auth')
const api = express.Router()

api.get('/product', auth, productCtrl.getProducts)
api.get('/product/:productId', auth, productCtrl.getProduct)
api.post('/product', auth, productCtrl.saveProduct)
api.put('/product/:productId', auth, productCtrl.updateProduct)
api.delete('/product/:productId', auth, productCtrl.deleteProduct)

api.post('/product/productsbyprice',auth, productCtrl.getProductsByPrice)
api.post('/product/search',auth, productCtrl.search)
api.get('/product/productbyemployed',auth, productCtrl.getProductByEmployed)



api.get('/employed', auth, employedCtrl.getEmployeds)
api.get('/employed/:employedId',auth, employedCtrl.getEmployed)
api.post('/employed', auth, employedCtrl.saveEmployed)
api.put('/employed/:employedId', auth, employedCtrl.updateEmployed)
api.delete('/employed/:employedId', auth, employedCtrl.deleteEmployed)


api.post('/signup', userCtrl.signUp)
api.post('/signin', userCtrl.signIn)
api.get('/private', auth, (req, res) => {
  res.status(200).send({ message: 'Tienes acceso' })
})

module.exports = api
