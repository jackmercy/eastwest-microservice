# News Service (**_Public service_**)

---

## # Stacks

NodeJS v12.20-alpine
Mongoose v5.11.13
Docker Compose v3.3

## # Models

- [News](src/models/news.model.js)
- [Category](src/models/category.model.js)
- [Author](src/models/author.model.js)
- [Comment](src/models/comment.model.js)

## # APIs

| Method | Url                                                                                                          | Description                                   |
| ------ | ------------------------------------------------------------------------------------------------------------ | --------------------------------------------- |
| POST   | [/news-categories ](src/api/categories.js)                                                                   | Create new category                           |
| GET    | [/news-categories/?skip=0&limit=100 ](src/api/categories.js)                                                 | Get all news/categories with paging           |
| GET    | [/news-categories/?sort={ "emailAddress": -1, "firstName": 1 }](src/api/categories.js)                       | Get all news/categories with sorting          |
| GET    | [/news-categories/:id ](src/api/categories.js)                                                               | Get a category by id                          |
| PUT    | [/news-categories/:id ](src/api/categories.js)                                                               | Update a category by id                       |
| DELETE | [/news-categories/:id ](src/api/categories.js)                                                               | Delete a category by id                       |
| ------ | ------------------------------------------------------------------                                           | -----------------------------------------     |
| POST   | [/news ](src/api/news.js)                                                                                    | Create new news                               |
| GET    | [/news/?skip=0&limit=100 ](src/api/news.js)                                                                  | Get all news with paging                      |
| GET    | [/news/?sort={ "emailAddress": -1, "firstName": 1 } ](src/api/news.js)                                       | Get all news with sorting                     |
| GET    | [/news/slug/:slug ](src/api/news.js)                                                                         | Get a news by slug                            |
| GET    | [/news/:id ](src/api/news.js)                                                                                | Get a news by id                              |
| PUT    | [/news/:id ](src/api/news.js)                                                                                | Update a news by id                           |
| PUT    | [/news/public/:id ](src/api/news.js)                                                                         | Update a news by id with limit updated fields |
| DELETE | [/news/:id ](src/api/news.js)                                                                                | Delete a news by id                           |
| ------ | ------------------------------------------------------------------                                           | -----------------------------------------     |
| POST   | [/news-authors ](src/api/authors.js)                                                                         | Create new author                             |
| GET    | [/news-authors/?skip=0&limit=100&sort={ "emailAddress": -1, "firstName": 1 } ](src/api/authors.js)           | Get all authors with sorting and paging       |
| GET    | [/news-authors/:id ](src/api/authors.js)                                                                     | Get a author by id                            |
| DELETE | [/news-authors/:id ](src/api/authors.js)                                                                     | Delete a author by id                         |
| ------ | ------------------------------------------------------------------                                           | -----------------------------------------     |
| POST   | [/news/:newsId/comments ](src/api/comments.js)                                                               | Create new comment                            |
| GET    | [/news/:newsId/comments/?skip=0&limit=100&sort={ "emailAddress": -1, "firstName": 1 } ](src/api/comments.js) | Get all comments with sorting and paging      |
| GET    | [/news/:newsId/comments/:id ](src/api/comments.js)                                                           | Get a comment by id                           |
| DELETE | [/news/:newsId/comments/:id ](src/api/comments.js)                                                           | Delete a comment by id                        |

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
