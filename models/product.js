'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Employed = require ('../models/employed');

const ProductSchema = Schema({
  name: {type: String, required: true},
  picture: String,
  price: { type: Number, required: true },
  employedId: { type: Schema.Types.ObjectId, ref: Employed, required: true},
  description: String
})

module.exports = mongoose.model('Product', ProductSchema)
