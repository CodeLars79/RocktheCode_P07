const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  genre: {
    type: [String] // Array of genres (Action, Drama etc.)
  },
  releaseDate: {
    type: Date
  },
  duration: {
    type: Number // Duration in minutes
  },
  director: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Director', // Reference to the Director model
    required: true
  },
  rating: {
    type: Number
  }
})

module.exports = mongoose.model('Movie', movieSchema)
