const mongoose = require('mongoose')

const directorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  birthDate: {
    type: Date
  },
  nationality: {
    type: String
  },
  awards: {
    type: [String] // Array of award names
  }
})

module.exports = mongoose.model('Director', directorSchema)
