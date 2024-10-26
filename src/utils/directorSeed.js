const directors = require('../data/directors')
const Director = require('../api/models/director')
const mongoose = require('mongoose')
require('dotenv').config()

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(async () => {
    const allDirectors = await Director.find()

    // If there are existing directors, the collection will be dropped
    if (allDirectors.length) {
      await Director.collection.drop()
    }
  })
  .catch((err) => console.log(`Error deleting data: ${err}`))
  .then(async () => {
    // Insert the directors array into the database
    await Director.insertMany(directors)
    console.log('Directors successfully seeded to the database 🎬')
  })
  .catch((err) => console.log(`Error creating data: ${err}`))
  .finally(() => mongoose.disconnect())
