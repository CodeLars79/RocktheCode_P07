const express = require('express')
const {
  createMovie,
  getMoviesByDirector,
  getAllMovies,
  updateMovie,
  deleteMovie
} = require('../controllers/movie')

const movieRoutes = express.Router()

movieRoutes.get('/', getAllMovies)
movieRoutes.get('/:directorId', getMoviesByDirector)
movieRoutes.post('/', createMovie)
movieRoutes.put('/:movieId', updateMovie)
movieRoutes.delete('/:movieId', deleteMovie)

module.exports = movieRoutes
