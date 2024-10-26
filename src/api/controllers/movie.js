const Movie = require('../models/movie')
const Director = require('../models/director')

//*CREATE
const createMovie = async (req, res, next) => {
  try {
    const { title, genre, releaseDate, duration, director, rating } = req.body

    // Check if the director exists
    const directorExists = await Director.findById(director)
    if (!directorExists) {
      return res.status(404).json({ message: 'Director not found' })
    }

    // Create a new movie
    const newMovie = new Movie({
      title,
      genre,
      releaseDate,
      duration,
      director,
      rating
    })

    const savedMovie = await newMovie.save()
    res.status(201).json(savedMovie)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const getAllMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find().populate('director')
    res.status(200).json(movies)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

//*READ
const getMoviesByDirector = async (req, res, next) => {
  try {
    const { directorId } = req.params

    const movies = await Movie.find({ director: directorId }).populate(
      'director'
    )

    if (movies.length === 0) {
      return res
        .status(404)
        .json({ message: 'No movies found for this director' })
    }

    res.status(200).json(movies)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

//*UPDATE
const updateMovie = async (req, res, next) => {
  try {
    const { movieId } = req.params
    const { title, genre, releaseDate, duration, director, rating } = req.body

    // Ensure the director exists if being updated
    if (director) {
      const directorExists = await Director.findById(director)
      if (!directorExists) {
        return res.status(404).json({ message: 'Director not found' })
      }
    }

    // Update movie details
    const updatedMovie = await Movie.findByIdAndUpdate(
      movieId,
      { title, genre, releaseDate, duration, director, rating },
      { new: true }
    )

    if (!updatedMovie) {
      return res.status(404).json({ message: 'Movie not found' })
    }

    res.status(200).json(updatedMovie)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

//*DELETE
const deleteMovie = async (req, res, next) => {
  try {
    const { movieId } = req.params

    const deletedMovie = await Movie.findByIdAndDelete(movieId)

    if (!deletedMovie) {
      return res.status(404).json({ message: 'Movie not found' })
    }

    res.status(200).json({ message: 'Movie deleted successfully' })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

module.exports = {
  createMovie,
  getMoviesByDirector,
  getAllMovies,
  updateMovie,
  deleteMovie
}
