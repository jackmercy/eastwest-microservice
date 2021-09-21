# Admins Service (**_Public service_**)

---

## # Stacks

NodeJS v12.20-alpine
Mongoose v5.11.13
Docker Compose v3.3

## # APIs

| Method | Url                                            | Description              |
| ------ | ---------------------------------------------- | ------------------------ |
| POST   | [/admins](src/api/admins.js)                   | Create new admin         |
| GET    | [/admins/?skip=0&limit=100](src/api/admins.js) | Get all admins           |
| GET    | [/admins/:id](src/api/admins.js)               | Get a admin by id        |
| DELETE | [/admins/:id](src/api/admins.js)               | Delete a admin by id     |
| POST   | [/admins/login](src/api/admins.js)             | Login with admin account |

## # Structures

```js
- api/                  # our apis
- config/               # config di, ssl, mongo, server, ...
- middlewares/          # express route middlewares
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
export ROLES_SERVICE_HOST='localhost'
export ROLES_SERVICE_PORT='3001'
export USERS_SERVICE_HOST='localhost'
export USERS_SERVICE_PORT='3002'
export AUTH_SERVICE_HOST='localhost'
export AUTH_SERVICE_PORT='3003'
```
