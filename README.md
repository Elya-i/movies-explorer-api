# movies-explorer-api
 Бэкенд дипломной работы курса "Веб-разработчик" от Яндекс.Практикум

 ### Краткое описание:

Сервис, в котором можно найти фильмы по запросу и сохранить в личном кабинете.

 ### Функциональность проекта

- Созданы схемы и модели пользователей и cохраненных фильмов:
  `user`, `movie` 
- Созданы следующие роуты:

#### Создание пользователя с переданными в теле email, password и name
`POST /signup`

#### Проверка переданных в теле email и password, возврат JWT
`POST /signin`

#### Удаление JWT из куков пользователя
`POST /signout`

#### Возврат информации о пользователе (email и name)
`GET /users/me`

#### Обновление информацим о пользователе (email и name)
`PATCH /users/me`

#### Возврат всех сохранённых текущим пользователем фильмов
`GET /movies`

#### Создание фильма с переданными в теле country, director, duration, year, description, image, trailer, nameRU, nameEN и thumbnail, movieId 
`POST /movies`

#### Удаление сохранённого фильма по id
`DELETE /movies/_id`

### Директории

`/errors` — директория с файлами кастомных ошибок
`/controllers` — директория с файлами контроллеров пользователя и фильма 
`/models` — директория с файлами описания схем пользователя и фильма 
`/middlewares` - директория с функциями промежуточной обработки
`/routes` — директория с файлами роутера 
`/utils` — директория со вспомогательными файлами

### Запуск проекта

`npm run start` — запускает сервер   
`npm run dev` — запускает сервер с hot-reload
`npm lint` — запускает проверку линтером

### Рассмотренные технологии:

- ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
- ![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)
- ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
- ![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)
- ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
- ![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)
- ![Nginx](https://img.shields.io/badge/nginx-%23009639.svg?style=for-the-badge&logo=nginx&logoColor=white)
- ![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)
- ![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)

## Ссылки на проект

https://github.com/Elya-i/movies-explorer-api

IP 51.250.85.133

Backend https://api.movies-explorer.ei.nomoredomainsrocks.ru
