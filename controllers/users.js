const { HTTP_STATUS_CREATED } = require('http2').constants;

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = require('../utils/config');

const User = require('../models/user');

const { ValidationError } = mongoose.Error;

const NotFoundError = require('../errors/NotFoundError'); // 404
const BadRequestError = require('../errors/BadRequestError'); // 400
const ConflictError = require('../errors/ConflictError'); // 409

const {
  USER_NOT_FOUND_MESSAGE,
  CONFLICT_MESSAGE,
  INCORRECT_CREATE_USER_DATA_MESSAGE,
  INCORRECT_UPDATE_USER_DATA_MESSAGE,
  LOGIN_SUCCES_MESSAGE,
  LOGOUT_SUCCES_MESSAGE,
} = require('../utils/constants');

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err instanceof NotFoundError) {
        next(new NotFoundError(USER_NOT_FOUND_MESSAGE));
      } else next(err);
    });
};

module.exports.createUser = (req, res, next) => {
  const { email, password, name } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email, password: hash, name,
    }))
    .then((user) => res.status(HTTP_STATUS_CREATED).send({
      data: {
        email: user.email, name: user.name,
      },
    }))
    .catch((err) => {
      if (err instanceof ValidationError) {
        next(new BadRequestError(INCORRECT_CREATE_USER_DATA_MESSAGE));
      } else if (err.code === 11000) {
        next(new ConflictError(CONFLICT_MESSAGE));
      } else next(err);
    });
};

module.exports.updateUser = (req, res, next) => {
  const { email, name } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(userId, { email, name }, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err instanceof ValidationError) {
        next(new BadRequestError(INCORRECT_UPDATE_USER_DATA_MESSAGE));
      } else next(err);
    });
};

module.exports.loginUser = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: 'none',
        secure: true,
      });
      res.send({ message: LOGIN_SUCCES_MESSAGE });
    })
    .catch(next);
};

module.exports.logoutUser = (req, res) => {
  res.clearCookie('jwt', {
    sameSite: 'none',
    secure: true,
  });
  res.send({ message: LOGOUT_SUCCES_MESSAGE });
};
