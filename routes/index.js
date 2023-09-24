const router = require('express').Router();

const movieRouter = require('./movies');
const userRouter = require('./users');
const auth = require('../middlewares/auth');
const { createUser, loginUser, logoutUser } = require('../controllers/users');
const { validateLoginUser, validateCreateUser } = require('../utils/validation/requestValidation');
const NotFoundError = require('../errors/NotFoundError');
const { PAGE_NOT_FOUND_MESSAGE } = require('../utils/constants');

router.post('/signup', validateCreateUser, createUser);
router.post('/signin', validateLoginUser, loginUser);
router.post('/signout', logoutUser);

router.use(auth);

router.use('/movies', movieRouter);
router.use('/users', userRouter);

router.use('*', (req, res, next) => {
  next(new NotFoundError(PAGE_NOT_FOUND_MESSAGE));
});

module.exports = router;
