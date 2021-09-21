# Contacts Service (**_Public service_**)

---

## # Stacks

NodeJS v12.20-alpine
Mongoose v5.11.13
Docker Compose v3.3

## # Models

- [Contact](src/models/contact.model.js)
- [Member](src/models/contact.model.js)
- [Activity](src/models/contact.model.js)

## # APIs

| Method | Url                                                                   | Description                     |
| ------ | --------------------------------------------------------------------- | ------------------------------- |
| POST   | [/contacts](src/api/contacts.js)                                      | Create new contact              |
| GET    | [/contacts/?skip=0&limit=100](src/api/contacts.js)                    | Get all contacts                |
| GET    | [/contacts/:id](src/api/contacts.js)                                  | Get a contact by id             |
| DELETE | [/contacts/:id](src/api/contacts.js)                                  | Delete a contact by id          |
| ------ | ---------------------------                                           | ----------------------          |
| POST   | [/community-members](src/api/members.js)                              | Create new community member     |
| GET    | [/community-members/?skip=0&limit=100](src/api/members.js)            | Get all community members       |
| GET    | [/community-members/:id](src/api/members.js)                          | Get a community member by id    |
| DELETE | [/community-members/:id](src/api/members.js)                          | Delete a community member by id |
| ------ | ---------------------------                                           | ----------------------          |
| POST   | [/community-members/activities](src/api/members.js)                   | Create new member activity      |
| GET    | [/community-members/activities/?skip=0&limit=100](src/api/members.js) | Get all member activities       |
| GET    | [/community-members/activities/:id](src/api/members.js)               | Get a member activity by id     |
| DELETE | [/community-members/activities/:id](src/api/members.js)               | Delete a member activity by id  |

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
export NOTIFICATIONS_SERVICE_HOST='localhost'
export NOTIFICATIONS_SERVICE_PORT='3001'
export ROLES_SERVICE_HOST='localhost'
export ROLES_SERVICE_PORT='3002'
```
