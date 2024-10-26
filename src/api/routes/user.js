const { isAuth, checkRole } = require('../../middlewares/role')
const {
  register,
  login,
  deleteUser,
  getUsers,
  updateUser,
  addFavoriteMovie,
  removeFavoriteMovie,
  changeUserRole
} = require('../controllers/user')

const usersRoutes = require('express').Router()

usersRoutes.post('/register', register)
usersRoutes.post('/login', login)
usersRoutes.get('/', [isAuth, checkRole('ADMIN')], getUsers)
usersRoutes.put('/:id', [isAuth], updateUser)
usersRoutes.delete('/:id', [isAuth], deleteUser)
usersRoutes.put('/:id/role', [isAuth, checkRole('ADMIN')], changeUserRole)
usersRoutes.post('/:userId/favorite/:movieId', [isAuth], addFavoriteMovie)
usersRoutes.delete('/:userId/favorite/:movieId', [isAuth], removeFavoriteMovie)

module.exports = usersRoutes
