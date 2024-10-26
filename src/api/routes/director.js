const express = require('express')
const {
  createDirector,
  getDirectorById,
  getAllDirectors,
  updateDirector,
  deleteDirector
} = require('../controllers/director')

const directorRoutes = express.Router()

directorRoutes.get('/', getAllDirectors)
directorRoutes.get('/:directorId', getDirectorById)
directorRoutes.post('/', createDirector)
directorRoutes.put('/:directorId', updateDirector)
directorRoutes.delete('/:directorId', deleteDirector)

module.exports = directorRoutes
