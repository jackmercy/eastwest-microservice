# Notifications Service (**_Private service_**)

---

## # Stacks

NodeJS v12.20-alpine
Docker Compose v3.3

## # APIs

| Method | Url                                         | Description                                                    |
| ------ | ------------------------------------------- | -------------------------------------------------------------- |
| POST   | /notifications/prospect/new-request         | Create new notification when have a new prospect request       |
| POST   | /notifications/contact/new-request          | Create new notification when have a new contact request        |
| POST   | /notifications/vacancies/new-application    | Create new notification when have a new vacancy application    |
| POST   | /notifications/vacancies/resend-application | Resend notification when already submmited vacancy application |

## # Structures

```js
- api/                  # our apis
- config/               # config di, ssl, server, ...
- model/                # define db models
- repository/           # abstraction over our db
- server/               # server setup code
- services/             # services injected
- index.js              # main entrypoint of the app
```

## # Environment variables

```
export PORT=3001
export CMS_DOMAIN=dev-cms.eastwest.live
export SYSTEM_EMAIL=abc@gmail.com
export SUPPORT_EMAIL=support@eastwest.live
export LANDING_PAGE_DOMAIN=dev.eastwest.live
export MAIL_SERVICE_HOST=localhost
export MAIL_SERVICE_PORT=3002
```
