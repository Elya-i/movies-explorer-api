require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const { DB_URL, PORT } = require('./utils/config');
const router = require('./routes/index');
const cors = require('./middlewares/cors');
const errorHandler = require('./middlewares/error-handler');
const limiter = require('./middlewares/express-rate-limit');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();
app.use(cors);
app.use(cookieParser());

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
}).then(() => {
  console.log('Connected to DB');
});

app.use(limiter);
app.use(helmet());
app.use(express.json());
app.use(requestLogger);

app.use(router);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
