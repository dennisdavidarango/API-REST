'use strict'

const Product = require('../models/product')
const Employed = require ('../models/employed');

function getProduct (req, res) {
  let productId = req.params.productId

  Product.findById(productId, (err, product) => {
    if (err) return res.status(500).send({message: `Error al realizar la petición : ${err}`})
    if (!product) return res.status(404).send({message: `El producto no existe`})

    return res.status(200).send({ product })
  })
}

function getProducts (req, res) {
  Product.find({}, (err, products) => {
    if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
    if (!products) return res.status(404).send({message: 'No existen productos'})

    Employed.populate(products,{ path: "employedId" }, function(err, employed){
      res.status(200).send({products})
    })

   return res.send(200, { products })
  })
}

function saveProduct (req, res) {
  console.log('POST /api/product')
  console.log(req.body)

  let product = new Product()
  product.name = req.body.name
  product.picture = req.body.picture
  product.price = req.body.price
  product.category = req.body.category
  product.description = req.body.description

  product.save((err, productStored) => {
    if (err) return res.status(500).send({message: `Error al salvar en la base de datos: ${err} `})

    return res.status(200).send({ product: productStored })
  })
}

function updateProduct (req, res) {
  let productId = req.params.productId
  let update = req.body

  Product.findByIdAndUpdate(productId, update, (err, productUpdated) => {
    if (err) res.status(500).send({message: `Error al actualizar el producto: ${err}`})

    return res.status(200).send({ product: productUpdated })
  })
}

function deleteProduct (req, res) {
  let productId = req.params.productId

  Product.findById(productId, (err, product) => {
    if (err) res.status(500).send({message: `Error al borrar el producto: ${err}`})

    product.remove(err => {
      if (err) res.status(500).send({message: `Error al borrar el producto: ${err}`})
      res.status(200).send({message: 'El producto ha sido eliminado'})
    })
  })
}

function getProductsByPrice(req,res)
  {
    let priceRead = req.body.price
    if(priceRead == undefined)
  {
  return res.status(400).send({message: 'Debe enviar el parámetro precio '})
  }
    // consulta de productos por precio
    Product.find({price:{$lte:priceRead}}, (err, products) => {
    if (err) return res.status(500).send({message: `Error al realizar la petición: ${err} `})
    if (!products) return res.status(404).send({message: 'No existen productos'})

    Employed.populate(products, { path: "employedId" }, function (err, employed) {
    return res.status(200).send({ products })
  })
 })
}

function search(req,res)
  {
  let readLyrics = req.body.name
  if(readLyrics==undefined) {
    return res.status(400).send({message: 'Debe Escribir una letra'})
  }
// Search
  Product.find({name:{ $regex: readLyrics + '.*'}}, (err, products) => {
  if (err) return res.status(500).send({message: ` error al  realizar la petición: ${err}`})
  if (!products) return res.status(404).send({message: 'No existen productos'})

  Employed.populate(products, { path: "employedId" }, function (err, employed) {
  return res.status(200).send({ products })
  })
 })
}

function getProductByEmployed(req, res){
  let priceRead = req.body.price
  let readLyrics = req.body.name

  if(priceRead == undefined)
  if(readLyrics==undefined) {
    return res.status(400).send({message: 'Debe Escribir una letra'})
  }

   // consulta de productos por precio
   Product.find({price:{$gte:priceRead}, name:{ $regex: readLyrics + '.*'}}, (err, products) => {
    if (err) return res.status(500).send({message: `Error al realizar la petición: ${err} `})
    if (!products) return res.status(404).send({message: 'No existen productos'})

    Employed.populate(products, { path: "employedId" }, function (err, employed) {
    return res.status(200).send({ products })
  })

    
 })
}

module.exports = {
  getProduct,
  getProducts,
  saveProduct,
  updateProduct,
  deleteProduct,
  getProductsByPrice,
  search,
  getProductByEmployed

}
