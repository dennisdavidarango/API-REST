'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const EmployedSchema = Schema({
  name: {type: String, require: true},
  photo: String,
  rol: { type: String, enum: ['engineer', 'worker', 'architect'] },
  description: {type: String, require: true}
})

module.exports = mongoose.model('Employed', EmployedSchema)
