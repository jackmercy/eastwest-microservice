# Roles Service (**_Public service_**)

---

## # Stacks

NodeJS v12.20-alpine
Mongoose v5.11.13
Docker Compose v3.3
[Accesscontrol](https://www.npmjs.com/package/accesscontrol) - Using to build RBAC & ABAC

## # Models

- [Role](src/models/role.model.js)
- [Permission](src/models/permission.model.js)

## # APIs

| Method | Url                                                                    | Description                     |
| ------ | ---------------------------------------------------------------------- | ------------------------------- |
| POST   | [/roles](src/api/roles.js)                                             | Create a new role               |
| GET    | [/roles/?skip=0&limit=100](src/api/roles.js)                           | Get all roles                   |
| GET    | [/roles/:id](src/api/roles.js)                                         | Get a role by id                |
| GET    | [/roles/alias/:alias](src/api/roles.js)                                | Get a role by alias             |
| DELETE | [/roles/:id](src/api/roles.js)                                         | Delete a role by id             |
| POST   | [/roles/:roleId/permissions](src/api/roles.js)                         | Create a permission for role id |
| GET    | [/roles/:roleId/permissions](src/api/roles.js)                         | Get all permissions by role id  |
| GET    | [/roles/:roleId/permissions/?skip=0&limit=100](src/api/permissions.js) | Get all permissions             |
| GET    | [/roles/:roleId/permissions/:id](src/api/permissions.js)               | Get a permission by id          |
| DELETE | [/roles/:roleId/permissions/:id](src/api/permissions.js)               | Delete a permission by id       |

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
```

## # How to run seed data

1. First, adjust and export variables above
2. Run command
   ```js
   npm run seed
   ```
