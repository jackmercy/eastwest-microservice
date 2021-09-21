# Users Service (**_Public service_**)

---

## # Stacks

NodeJS v12.20-alpine
Mongoose v5.11.13
Docker Compose v3.3

## # Models

- [User](src/models/user.model.js)

## # APIs

| Method | Url                                                                     | Description                |
| ------ | ----------------------------------------------------------------------- | -------------------------- |
| POST   | [/users](src/api/users.js)                                              | Create new user            |
| GET    | [/users/?skip=0&limit=100](src/api/users.js)                            | Get all users with paging  |
| GET    | [/users/?sort={ "emailAddress": -1, "firstName": 1 }](src/api/users.js) | Get all users with sorting |
| GET    | [/users/role/:id?skip=0&limit=100](src/api/users.js)                    | Get all users by role id   |
| GET    | [/users/email/:email](src/api/users.js)                                 | Get user by email address  |
| GET    | [/users/:id](src/api/users.js)                                          | Get a user by id           |
| DELETE | [/users/:id](src/api/users.js)                                          | Delete a user by id        |
| POST   | [/users/login](src/api/users.js)                                        | Login with user account    |

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
export ROLES_SERVICE_HOST='localhost'
export ROLES_SERVICE_PORT='3001'
export AUTH_SERVICE_HOST='localhost'
export AUTH_SERVICE_PORT='3002'
```

## # How to run seed data

1. First, adjust and export variables above
2. Run command
   ```js
   npm run seed
   ```
