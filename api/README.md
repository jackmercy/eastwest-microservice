# # Welcome to microservices

## # How to run multiple services on your local?

Please consider using docker and docker-compose to run those services
To start those services, lets make some steps below:

### Step 1: Edit file `docker-compose.yml`

1. Replace service `image`'s name
2. Disable traefik by comment `labels`
3. Export service port by uncomment `ports`. Default `ports` is disabled with private services, so nobody can access to those private services via internet.
4. Export variables for services

```js

# ENV VARIABLES
export MONGO_DB=admin
export MONGO_HOST=e2w-mongo
export MONGO_PORT=27017
export MONGO_USER=admin
export MONGO_PASSWORD=123
export MAILGUN_DOMAIN=MAILGUN_DOMAIN
export MAILGUN_SECRET=MAILGUN_SECRET
export ADMIN_EMAIL=ADMIN_EMAIL
export SYSTEM_EMAIL=SYSTEM_EMAIL
export SUPPORT_EMAIL=SUPPORT_EMAIL
export LANDING_PAGE_DOMAIN=dev.eastwest.live
export GG_DRIVE_CLIENT_ID=GG_DRIVE_CLIENT_ID
export GG_DRIVE_CLIENT_SECRET=GG_DRIVE_CLIENT_SECRET
export GG_DRIVE_REFRESH_TOKEN=GG_DRIVE_REFRESH_TOKEN
```

### # Step 2: Start services

```js
# Start all services by running command
> docker-compose up -d

# Start special services by running command
> docker-compose up -d <service-1> <service-2>
```

\***_Note_**: `Services` run **INDEPENDENT**, so you can perhap see all services run success but they will throw error inside. By checking error, you can check service's logs by running command `docker logs -f --tail=50 <container-name>`

### # Step 3: Seed data

1. Seed roles and permission

```js
    cd /api/roles-service
    export MONGO_DB=admin
    export MONGO_HOST=localhost
    export MONGO_PORT=27017
    export MONGO_USER=admin
    export MONGO_PASSWORD=123
    npm run seed
```

2. Seed users

```js
    cd /api/users-service
    export MONGO_DB=admin
    export MONGO_HOST=localhost
    export MONGO_PORT=27017
    export MONGO_USER=admin
    export MONGO_PASSWORD=123
    npm run seed
```

## # Where I can find service's documentations?

Currently you can find service's documentations inside service folder - `README.md` file

## # How can I test service's APIs?

1. You can use [Postman](https://www.postman.com/) to test apis
2. Easier, we have a Postman collections for all services with testable samples. You can ask request to join by sending an email to `tester@eastwest.live`

## # How can I see structure of this microservices?

We have an diagram for this microservices. It's still being updated but you can find it in [haibuieastwest repo](https://github.com/haibuieastwest/eastwest-microservices-diagram). Download `.drawio` file and open it in [draw.io](https://app.diagrams.net/)

## # References
[How to build a NodeJS cinema microservice and deploy it with docker](https://medium.com/@cramirez92/build-a-nodejs-cinema-microservice-and-deploying-it-with-docker-part-1-7e28e25bfa8b)

[Best Practices for Better RESTful API](https://medium.com/@mwaysolutions/10-best-practices-for-better-restful-api-cbe81b06f291)

## # TODO LIST

- [ ] Improve permissions flows
- [ ] User cannot update, delete another user who has higher role's priority
- [ ] User cannot update, delete role of a user who has higher role's priority
- [ ] User cannot update, delete permission of a user who has higher role's priority
- [ ] Implement activity logs service
- [ ] Implement swagger
- [ ] Implement migration service
