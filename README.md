# RocktheCode_P07 

# Movie Rental API 🎞
This project is a Node.js-based RESTful API for a movie rental service. It supports user authentication, role-based permissions, and basic CRUD operations for movies and users. 

## Features
- User registration and login (JWT Authentication)
- Role-based access control (Admin and Regular User roles)
- CRUD operations for movies
- CRUD operations for directors
- User account management
- Users can add/remove movies to/from their favorites
- Admin can change user roles
- Admin can delete any user; regular users can only delete themselves

## Tech Stack 🚀
- **Backend**: Node.js, Express.js
- **Database**: MongoDB 
- **Authentication**: JSON Web Tokens (JWT)
- **Authorization**: Middleware for role-based permissions

## Prerequisites
- **Node.js** (v14 or later)
- **MongoDB**
- **Insomnia or Postman** (for testing API endpoints, optional)

## Environment Variables
The environment variables are set up in a .env file 

## Project structure 📁
![ProjectStructure](https://github.com/user-attachments/assets/25342a5c-1cee-45f4-aa1f-f939443e2666)


## Usage
1.	Start the server in development mode with nodemon: *npm run dev*
2.	Or start the server in production mode: *npm start*
3.	Server will be deployed at *http://localhost:3000*

## API Endpoints

**User Management**
- POST	/users/register	→ Register a new user	Public
- POST	/users/login	→ Login and get a JWT token	Public
- GET	/users	→ Get all users	Admin
- PUT	/users/:id	→ Update a user's details	User/Admin
- DELETE	/users/:id	→ Delete a user (Admin or self-delete)	User/Admin
- PUT	/users/:id/role	→ Change the role of a user	Admin

**Movie Management**
- POST	/movies	→ Add a new movie	Admin
- GET	/movies	→ Get all movies	Public
- GET	/movies/:id	→ Get a specific movie by ID	Public
- PUT	/movies/:id	→ Update a movie's details	Admin
- DELETE	/movies/:id	→ Delete a movie	Admin

**User Favorites Management**
- POST	/users/:userId/favorite/:movieId	→ Add a movie to a user's favorite list	User
- DELETE	/users/:userId/favorite/:movieId	→ Remove a movie from a user's favorite list	User

## Seed Data
To seed initial data (like default admin user and example movies):
- Run the seed script: *npm run seed*

## Role-Based Permissions 👩‍🦰👦
- Admin: Full access to user and movie management. Can delete any user, add/edit/delete movies, and change user roles.
- User: Can register, login, edit their own profile, delete their own account, and manage their favorite movies.

### Example Roles:
- ADMIN - Full permissions on all routes
- USER - Limited permissions to manage own profile and favorite movies

## Middleware
- isAuth: Verifies JWT token for all protected routes.
- checkRole: Ensures that the user has the appropriate role to access the resource.

## Technologies
- Node.js: JavaScript runtime for building server-side applications
- Express.js: Web framework for Node.js to handle routing
- MongoDB: Database for storing the buildings and architects data
- Mongoose: Defining schemas and interacting with the database
- dotenv: Environment variable management
- nodemon: Development tool to automatically restart the server on file changes

### ENJOY 💚


