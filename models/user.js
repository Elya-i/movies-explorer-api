const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const UnauthorizedError = require('../errors/UnauthorizedError');
const {
  INCORRECT_EMAIL_MESSAGE,
  INCORRECT_AUTHORIZATION_DATA_MESSAGE,
} = require('../utils/constants');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: [true, 'Поле "email" должно быть заполнено'],
    validate: {
      validator: (v) => validator.isEmail(v),
      message: INCORRECT_EMAIL_MESSAGE,
    },
  },
  password: {
    type: String,
    required: [true, 'Поле "password" должно быть заполнено'],
    select: false,
  },
  name: {
    type: String,
    required: [true, 'Поле "name" должно быть заполнено'],
    minlength: [2, 'Минимальная длина поля "name" - 2 символа'],
    maxlength: [30, 'Максимальная длина поля "name" - 30 символов'],
  },
}, {
  versionKey: false,

  statics: {
    findUserByCredentials(email, password) {
      return this.findOne({ email }).select('+password')
        .then((user) => {
          if (!user) {
            return Promise.reject(new UnauthorizedError(INCORRECT_AUTHORIZATION_DATA_MESSAGE));
          }
          return bcrypt.compare(password, user.password)
            .then((matched) => {
              if (!matched) {
                return Promise.reject(new UnauthorizedError(INCORRECT_AUTHORIZATION_DATA_MESSAGE));
              }
              return user;
            });
        });
    },
  },
});

module.exports = mongoose.model('user', userSchema);
