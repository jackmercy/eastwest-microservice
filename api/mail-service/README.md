# Mail Service (**_Private service_**)

---

## # Stacks

NodeJS v12.20-alpine
Docker Compose v3.3
Nodemailler

## # Models

- [Mail](src/models/mail.schema.js)

## # APIs

| Method | Url                                | Description     |
| ------ | ---------------------------------- | --------------- |
| POST   | [/mail/send-mail](src/api/mail.js) | Create an email |

## # Structures

```js
- api/                  # our apis
- config/               # config di, ssl, server, ...
- model/                # define db models
- repository/           # abstraction over our db
- server/               # server setup code
- index.js              # main entrypoint of the app
```

## # Environment variables

```
export PORT=3002
export MAILGUN_DOMAIN=MAILGUN_DOMAIN
export MAILGUN_SECRET=MAILGUN_SECRET
```
