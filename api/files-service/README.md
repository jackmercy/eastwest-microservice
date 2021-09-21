# Files Service (**_Public service_**)

---

## # Stacks

NodeJS v12.20-alpine
Mongoose v5.11.13
Docker Compose v3.3

## # Models

- [File](src/models/file.model.js)

## # APIs

| Method | Url                                   | Description                                          |
| ------ | ------------------------------------- | ---------------------------------------------------- |
| POST   | [/files](src/api/files.js)            | Upload files                                         |
| POST   | [/files/public](src/api/files.js)     | Upload files without authentication (limit requests) |
| GET    | [/files/:id](src/api/files.js)        | Download file                                        |
| GET    | [/files/public/:id](src/api/files.js) | Download file without authentication                 |
| DELETE | [/files/:id](src/api/files.js)        | Delete a file by id                                  |

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
export AUTH_SERVICE_PORT='3001'
export GG_DRIVE_CLIENT_ID='KEY'
export GG_DRIVE_CLIENT_SECRET='SECRET'
export GG_DRIVE_REFRESH_TOKEN='TOKEN'
```

## # References

- [How to set up google drive account?](https://blog.tericcabrel.com/upload-file-to-google-drive-with-nodejs/)
