# Auth Service (**_Private service_**)

---

## # Stacks

NodeJS v12.20-alpine
Mongoose v5.11.13
Docker Compose v3.3

## # Model schemas

- [Claims](src/models/claims.schema.js)

## # APIs

| Method | Url                                    | Description             |
| ------ | -------------------------------------- | ----------------------- |
| POST   | [/generate-token](src/api/auth.js)     | Sign JWT                |
| POST   | [/verify-token](src/api/auth.js)       | verify JWT              |
| POST   | [/verify-permissions](src/api/auth.js) | verify Roles permission |

## # Structures

```js
- api/                  # our apis
- config/               # config di, ssl, mongo, server, ...
- constants/            # define errorCodes,...
- model/                # define db models
- repository/           # abstraction over our db
- server/               # server setup code
- index.js              # main entrypoint of the app
```

## # Environment variableds

```
export PORT=3000
export MONGO_DB='admin'
export MONGO_USER='admin'
export MONGO_PASSWORD='123'
export MONGO_HOST='localhost'
export MONGO_PORT='27017'
```
