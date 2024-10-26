const Director = require('../models/director')

//*CREATE
const createDirector = async (req, res, next) => {
  try {
    const { name, birthDate, nationality, awards } = req.body

    const newDirector = new Director({
      name,
      birthDate,
      nationality,
      awards
    })

    const savedDirector = await newDirector.save()
    res.status(201).json(savedDirector)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

//*READ
const getAllDirectors = async (req, res, next) => {
  try {
    const directors = await Director.find()
    res.status(200).json(directors)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const getDirectorById = async (req, res, next) => {
  try {
    const { directorId } = req.params

    const director = await Director.findById(directorId)

    if (!director) {
      return res.status(404).json({ message: 'Director not found' })
    }

    res.status(200).json(director)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

//*UPDATE
const updateDirector = async (req, res, next) => {
  try {
    const { directorId } = req.params
    const { name, birthDate, nationality, awards } = req.body

    const updatedDirector = await Director.findByIdAndUpdate(
      directorId,
      { name, birthDate, nationality, awards },
      { new: true } // Return the updated document
    )

    if (!updatedDirector) {
      return res.status(404).json({ message: 'Director not found' })
    }

    res.status(200).json(updatedDirector)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

//*DELETE
const deleteDirector = async (req, res, next) => {
  try {
    const { directorId } = req.params

    const deletedDirector = await Director.findByIdAndDelete(directorId)

    if (!deletedDirector) {
      return res.status(404).json({ message: 'Director not found' })
    }

    res.status(200).json({ message: 'Director deleted successfully' })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

module.exports = {
  createDirector,
  getDirectorById,
  getAllDirectors,
  updateDirector,
  deleteDirector
}
