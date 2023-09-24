const { HTTP_STATUS_CREATED } = require('http2').constants;

const mongoose = require('mongoose');

const Movie = require('../models/movie');

const { ValidationError, CastError } = mongoose.Error;

const NotFoundError = require('../errors/NotFoundError'); // 404
const BadRequestError = require('../errors/BadRequestError'); // 400
const ForbiddenError = require('../errors/ForbiddenError'); // 403
const {
  INCORRECT_CREATE_MOVIE_DATA_MESSAGE,
  MOVIE_NOT_FOUND_MESSAGE,
  FORBIDDEN_MESSAGE,
  SUCCESS_MOVIE_DELETE_MESSAGE,
  INCORRECT_MOVIE_ID_MESSAGE,
} = require('../utils/constants');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  const ownerId = req.user._id;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: ownerId,
  })
    .then((movie) => res.status(HTTP_STATUS_CREATED).send(movie))
    .catch((err) => {
      if (err instanceof ValidationError) {
        next(new BadRequestError(INCORRECT_CREATE_MOVIE_DATA_MESSAGE));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        next(new NotFoundError(MOVIE_NOT_FOUND_MESSAGE));
      }
      if (movie.owner.toString() !== req.user._id) {
        next(new ForbiddenError(FORBIDDEN_MESSAGE));
      }
      return Movie.findByIdAndDelete(req.params.movieId)
        .orFail(() => new NotFoundError(MOVIE_NOT_FOUND_MESSAGE))
        .then(() => {
          res.send({ message: SUCCESS_MOVIE_DELETE_MESSAGE });
        });
    })
    .catch((err) => {
      if (err instanceof CastError) {
        next(new BadRequestError(INCORRECT_MOVIE_ID_MESSAGE));
      } else {
        next(err);
      }
    });
};
