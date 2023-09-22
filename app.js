require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');

// const cardRouter = require('./routes/cards');
// const userRouter = require('./routes/users');
// const { createUser, loginUser, logoutUser } = require('./controllers/users');

const auth = require('./middlewares/auth');
const cors = require('./middlewares/cors');
const errorHandler = require('./middlewares/error-handler');
const limiter = require('./middlewares/express-rate-limit');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const NotFoundError = require('./utils/errors/NotFoundError');
// const { validateLoginUser, validateCreateUser } = require('./utils/validation/requestValidation');

const app = express();
app.use(cors);
app.use(cookieParser());

const {
  PORT = 3000,
  DB_URL = 'mongodb://localhost:27017/bitfilmsdb',
} = process.env;

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
}).then(() => {
  console.log('Connected to DB');
});

app.use(limiter);
app.use(helmet());

app.use(express.json());

app.use(requestLogger);

// app.post('/signup', validateCreateUser, createUser);
// app.post('/signin', validateLoginUser, loginUser);
// app.post('/signout', logoutUser);

app.use(auth);

// app.use('/movies', movieRouter);
// app.use('/users', userRouter);

app.use('*', (req, res, next) => {
  next(new NotFoundError('Запрашиваемая страница не найдена'));
});

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
