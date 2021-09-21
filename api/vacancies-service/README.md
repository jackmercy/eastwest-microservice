# Vacancies Service (**_Public service_**)

---

## # Stacks

NodeJS v12.20-alpine
Mongoose v5.11.13
Docker Compose v3.3

## # Models

- [Vacancy](src/models/vacancy.model.js)
- [Category](src/models/category.model.js)
- [Application](src/models/application.model.js)

## # APIs

| Method | Url                                                                                                            | Description                                  |
| ------ | -------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| POST   | [/vacancy-categories](src/api/categories.js)                                                                   | Create new category                          |
| GET    | [/vacancy-categories/?skip=0&limit=100](src/api/categories.js)                                                 | Get all vacancies/categories with paging     |
| GET    | [/vacancy-categories/?sort={ "emailAddress": -1, "firstName": 1 }](src/api/categories.js)                      | Get all vacancies/categories with sorting    |
| GET    | [/vacancy-categories/:id](src/api/categories.js)                                                               | Get a category by id                         |
| PUT    | [/vacancy-categories/:id](src/api/categories.js)                                                               | Update a category by id                      |
| DELETE | [/vacancy-categories/:id](src/api/categories.js)                                                               | Delete a category by id                      |
| ------ | ------------------------------------------------------------------                                             | -----------------------------------------    |
| POST   | [/vacancies](src/api/vacancies.js)                                                                             | Create new vacancy                           |
| GET    | [/vacancies/?skip=0&limit=100](src/api/vacancies.js)                                                           | Get all vacancies with paging                |
| GET    | [/vacancies/?sort={ "emailAddress": -1, "firstName": 1 }](src/api/vacancies.js)                                | Get all vacancies with sorting               |
| GET    | [/vacancies/slug/:slug](src/api/vacancies.js)                                                                  | Get a vacancy by slug                        |
| GET    | [/vacancies/:id](src/api/vacancies.js)                                                                         | Get a vacancy by id                          |
| PUT    | [/vacancies/:id](src/api/vacancies.js)                                                                         | Updatee a vacancy by id                      |
| DELETE | [/vacancies/:id](src/api/vacancies.js)                                                                         | Delete a vacancy by id                       |
| ------ | ------------------------------------------------------------------                                             | -----------------------------------------    |
| POST   | [/vacancy-applications](src/api/applications.js)                                                               | Create new application                       |
| GET    | [/vacancy-applications/?skip=0&limit=100&sort={ "emailAddress": -1, "firstName": 1 }](src/api/applications.js) | Get all applications with sorting and paging |
| GET    | [/vacancy-applications/:id](src/api/applications.js)                                                           | Get a application by id                      |
| DELETE | [/vacancy-applications/:id](src/api/applications.js)                                                           | Delete a application by id                   |

## # Structures

```js
- api/                  # our apis
- config/               # config di, ssl, mongo, server, ...
- model/                # define db models
- repository/           # abstraction over our db
- server/               # server setup code
- services/             # services injected
- index.js              # main entrypoint of the app
```

## # Environment variables

```
export PORT=3000
export MONGO_DB='admin'
export MONGO_USER='admin'
export MONGO_PASSWORD='123'
export MONGO_HOST='localhost'
export MONGO_PORT='27017'
export AUTH_SERVICE_HOST='localhost'
export AUTH_SERVICE_PORT='3002'
export FILES_SERVICE_HOST='localhost'
export FILES_SERVICE_PORT='3003'
```
