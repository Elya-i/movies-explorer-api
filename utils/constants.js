const HTTP_STATUS_CREATED = 201;
const HTTP_STATUS_BAD_REQUEST = 400;
const HTTP_STATUS_UNAUTHORIZED = 401;
const HTTP_STATUS_FORBIDDEN = 403;
const HTTP_STATUS_NOT_FOUND = 404;
const HTTP_STATUS_CONFLICT = 409;
const HTTP_STATUS_INTERNAL_SERVER_ERROR = 500;

const INTERNAL_SERVER_ERROR_MESSAGE = 'На сервере произошла ошибка!';
const PAGE_NOT_FOUND_MESSAGE = 'Запрашиваемый ресурc не найден';
const REQUIRED_AUTHORIZATION_MESSAGE = 'Необходима авторизация';
const INCORRECT_AUTHORIZATION_DATA_MESSAGE = 'Неправильные почта или пароль';
const CONFLICT_MESSAGE = 'Пользователь с указанным email уже зарегистрирован';
const LOGIN_SUCCES_MESSAGE = 'Авторизация прошла успешно';
const LOGOUT_SUCCES_MESSAGE = 'Успешный выход из системы';
const INCORRECT_USER_ID_MESSAGE = 'Передан некорректный _id пользователя';
const INCORRECT_CREATE_USER_DATA_MESSAGE = 'Переданы некорректные данные при создании профиля';
const INCORRECT_UPDATE_USER_DATA_MESSAGE = 'Переданы некорректные данные при обновлении профиля';
const USER_NOT_FOUND_MESSAGE = 'Пользователь по указанному _id не найден';
const INCORRECT_CREATE_MOVIE_DATA_MESSAGE = 'Переданы некорректные данные при создании фильма';
const MOVIE_NOT_FOUND_MESSAGE = 'Фильм с указанным _id не найден';
const FORBIDDEN_MESSAGE = 'Отсутствуют права доступа на удаление фильма';
const INCORRECT_MOVIE_ID_MESSAGE = 'Передан некорректный _id фильма';
const SUCCESS_MOVIE_DELETE_MESSAGE = 'Фильм успешно удален c сервера';
const LIMITER_MESSAGE = 'Превышен лимит запросов. Повторите попытку позже';
const INCORRECT_EMAIL_MESSAGE = 'Неправильный формат email';
const INCORRECT_URL_MESSAGE = 'Неправильный формат url';
const CRASH_SERVER_MESSAGE = 'Сервер сейчас упадет';

module.exports = {
  HTTP_STATUS_CREATED,
  HTTP_STATUS_BAD_REQUEST,
  HTTP_STATUS_UNAUTHORIZED,
  HTTP_STATUS_FORBIDDEN,
  HTTP_STATUS_NOT_FOUND,
  HTTP_STATUS_CONFLICT,
  HTTP_STATUS_INTERNAL_SERVER_ERROR,
  INTERNAL_SERVER_ERROR_MESSAGE,
  PAGE_NOT_FOUND_MESSAGE,
  REQUIRED_AUTHORIZATION_MESSAGE,
  INCORRECT_AUTHORIZATION_DATA_MESSAGE,
  CONFLICT_MESSAGE,
  LOGIN_SUCCES_MESSAGE,
  LOGOUT_SUCCES_MESSAGE,
  INCORRECT_USER_ID_MESSAGE,
  INCORRECT_CREATE_USER_DATA_MESSAGE,
  INCORRECT_UPDATE_USER_DATA_MESSAGE,
  USER_NOT_FOUND_MESSAGE,
  INCORRECT_CREATE_MOVIE_DATA_MESSAGE,
  MOVIE_NOT_FOUND_MESSAGE,
  FORBIDDEN_MESSAGE,
  INCORRECT_MOVIE_ID_MESSAGE,
  SUCCESS_MOVIE_DELETE_MESSAGE,
  LIMITER_MESSAGE,
  INCORRECT_EMAIL_MESSAGE,
  INCORRECT_URL_MESSAGE,
  CRASH_SERVER_MESSAGE,
};
