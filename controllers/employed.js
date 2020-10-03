'use strict'

const Employed = require('../models/employed')

function getEmployed (req, res) {
  let employedId = req.params.employedId

  Employed.findById(employedId, (err, employed) => {
    if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
    if (!employed) return res.status(404).send({message: `El Empleado no existe`})

    res.status(200).send({ employed })
  })
}

function getEmployeds (req, res) {
    Employed.find({}, (err, employed) => {
    if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
    if (!employed) return res.status(404).send({message: 'No existen empleados'})

    res.send(200, { employed })
  })
}

function saveEmployed (req, res) {
  console.log('POST /api/employed')
  console.log(req.body)

  let employed = new Employed()
  employed.name = req.body.name
  employed.photo = req.body.photo
  employed.rol = req.body.rol
  employed.description = req.body.description

  employed.save((err, employedStored) => {
    if (err) res.status(500).send({message: `Error al salvar en la base de datos: ${err} `})

    res.status(200).send({ employed: employedStored })
  })
}

function updateEmployed (req, res) {
  let employedId = req.params.employedId
  let update = req.body

  Employed.findByIdAndUpdate(employedId, update, (err, employedUpdated) => {
    if (err) res.status(500).send({message: `Error al actualizar el Empleado: ${err}`})

    res.status(200).send({ employed: employedUpdated})
  })
}

function deleteEmployed (req, res) {
  let employedId = req.params.employedId

  Employed.findById(employedId , (err, employed) => {
    if (err) res.status(500).send({message: `Error al borrar el Empleado: ${err}`})

    employed.remove(err => {
      if (err) res.status(500).send({message: `Error al borrar el Empleado: ${err}`})
      res.status(200).send({message: 'El Empleado ha sido eliminado'})
    })
  })
}

module.exports = {
  getEmployed,
  getEmployeds,
  saveEmployed,
  updateEmployed,
  deleteEmployed
}
