const movieRouter = require('express').Router();

const { validateCreateMovie, validateDeleteMovie } = require('../utils/validation/requestValidation');
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');

movieRouter.post('/', validateCreateMovie, createMovie);
movieRouter.get('/', getMovies);
movieRouter.delete('/:movieId', validateDeleteMovie, deleteMovie);

module.exports = movieRouter;
