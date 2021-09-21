# Prospects Service (**_Public service_**)

---

## # Stacks

NodeJS v12.20-alpine
Mongoose v5.11.13
Docker Compose v3.3

## # Models

- [Prospect](src/models/prospect.model.js)

## # APIs

| Method | Url                                                  | Description             |
| ------ | ---------------------------------------------------- | ----------------------- |
| POST   | [/prospects](src/api/prospects.js)                   | Create new prospect     |
| GET    | [/prospects/?skip=0&limit=100](src/api/prospects.js) | Get all prospects       |
| GET    | [/prospects/:id](src/api/prospects.js)               | Get a prospect by id    |
| DELETE | [/prospects/:id](src/api/prospects.js)               | Delete a prospect by id |

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
export NOTIFICATIONS_SERVICE_HOST='localhost'
export NOTIFICATIONS_SERVICE_PORT='3001'
```
