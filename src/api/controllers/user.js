const { generateSign } = require('../../config/jwt')
const User = require('../models/user')
const Movie = require('../models/movie')
const bcrypt = require('bcrypt')

//postUser CREATE
const register = async (req, res, next) => {
  try {
    const { userName, password, role } = req.body

    if (role && !['USER', 'ADMIN'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' })
    }

    const newUser = new User({
      userName,
      password,
      role: role || 'USER' // Default to 'USER' if not specified
    })

    await newUser.save()
    return res.status(201).json(newUser)
  } catch (error) {
    return res.status(400).json(error)
  }
}

const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ userName: req.body.userName })

    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        const token = generateSign(user._id)
        return res.status(200).json({ user, token })
      } else {
        return res.status(400).json('Username or password incorrect')
      }
    } else {
      return res.status(400).json('Username or password incorrect')
    }
  } catch (error) {
    return res.status(400).json(error)
  }
}

const changeUserRole = async (req, res, next) => {
  try {
    const { id } = req.params // The ID of the user whose role is to be changed
    const { role } = req.body // The new role to be assigned ('USER' or 'ADMIN')

    if (req.user.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Forbidden: Admins only' })
    }

    // Check if the provided role is valid
    if (!['USER', 'ADMIN'].includes(role)) {
      return res
        .status(400)
        .json({ message: 'Invalid role. Valid roles are "USER" and "ADMIN".' })
    }

    // Find and update the user's role
    const user = await User.findById(id)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    user.role = role
    await user.save()

    return res
      .status(200)
      .json({ message: `User role updated to ${role}`, user })
  } catch (error) {
    return res.status(400).json(error)
  }
}

//getUser READ
const getUsers = async (req, res, next) => {
  try {
    const users = await User.find()
    return res.status(200).json(users)
  } catch (error) {
    return res.status(400).json(error)
  }
}

//UpdateUser UPDATE
const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params
    const { userName, password } = req.body

    const updatedData = { userName }
    if (password) {
      updatedData.password = await bcrypt.hash(password, 10)
    }

    const userUpdated = await User.findByIdAndUpdate(id, updatedData, {
      new: true
    })

    if (!userUpdated) {
      return res.status(404).json({ error: 'User not found' })
    }

    return res.status(200).json(userUpdated)
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}

//deleteUser DELETE
const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params // The ID of the user to be deleted

    // Check if the requesting user is an admin or if they are deleting their own account
    if (req.user.role !== 'ADMIN' && req.user._id.toString() !== id) {
      return res
        .status(403)
        .json({ message: 'Forbidden: You can only delete your own account' })
    }

    // Attempt to delete the user
    const user = await User.findByIdAndDelete(id)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    return res
      .status(200)
      .json({ message: 'User account deleted successfully' })
  } catch (error) {
    return res.status(400).json(error)
  }
}

// Add a favorite movie to user
const addFavoriteMovie = async (req, res, next) => {
  try {
    const { userId, movieId } = req.params

    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json('User not found')
    }

    const movie = await Movie.findById(movieId)
    if (!movie) {
      return res.status(404).json('Movie not found')
    }

    if (!user.favoriteMovies.includes(movieId)) {
      user.favoriteMovies.push(movieId)
      await user.save()
    }

    return res.status(200).json(user)
  } catch (error) {
    return res.status(400).json(error)
  }
}

// Remove a favorite movie from user
const removeFavoriteMovie = async (req, res, next) => {
  try {
    const { userId, movieId } = req.params

    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json('User not found')
    }

    user.favoriteMovies = user.favoriteMovies.filter(
      (favMovie) => favMovie.toString() !== movieId
    )
    await user.save()

    return res.status(200).json(user)
  } catch (error) {
    return res.status(400).json(error)
  }
}

module.exports = {
  register,
  login,
  changeUserRole,
  getUsers,
  updateUser,
  deleteUser,
  addFavoriteMovie,
  removeFavoriteMovie
}
