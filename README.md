# REST API CRUD.

## About it.

The repository contains a simple REST API CRUD(Create, Read, Update, Delete) operations. Postman: info/postman . 


### Project structure.

```
config
└── local
    └── .env.example
migrations
├── 1716226525518_init.js
└── sql
    ├── 0000000000000_init.down.sql
    └── 0000000000000_init.up.sql
info
├── photo
│   └── image.png
└── postman
    └── REST API basics- CRUD.postman_collection.json
src
├── app.js
├── config
│   └── config.js
├── controllers
│   ├── car.controller.js
│   └── user.controller.js
├── database
│   ├── mongo
│   │   └── user.db.js
│   └── postgres
│       ├── car.db.js
│       └── user.db.js
├── index.js
├── middlewares
│   └── validation
│       ├── car.validation.js
│       └── user.validation.js
├── models
│   └── user.models.js
├── pkg
│   ├── clients
│   │   ├── mongo
│   │   │   └── client.js
│   │   └── postgres
│   │       └── client.js
│   ├── error.js
│   └── logger.js
├── services
│   ├── car.service.js
│   └── user.service.js
├── swagger
│   └── options.js
└── v1
    └── routes
        ├── car.routes.js
        └── user.routes.js
tests
├── docker-compose.yaml
├── Dockerfile
├── .dockerignore
├── fixtures
│   ├── car.fixture.js
│   └── user.fixture.js
├── integration
│   ├── fail.test.js
│   └── happy.test.js
└── unit
    └── connections.test.js
.dockerignore
.gitignore
docker-compose.yaml
Dockerfile
package.json
package-lock.json
README.md
```
### Database structure.
![alt text](info/photo/image.png)

## Technologies.

> [NodeJS](https://nodejs.org/en)
>
> [ExpressJS](https://expressjs.com/)
>
> [Docker & Docker-compose](https://www.docker.com/)
>
> [PostgreSQL](https://www.postgresql.org/)
>
> [Migrations node-pg-migrate](https://www.npmjs.com/package/node-pg-migrate)
>
> [Swagger](https://swagger.io)
>
> [Jest](https://jestjs.io/)


## Usage.
### Local.
Edit .env file from ./config/local:
```
DATABASE_URL=postgres://user:password@host:port/db_name
```

Install dependencies:
```
npm install
```

Migrate:
```
# migrate upgrade.
npm run migrate up

# migrate down.
npm run migrate down
```

Run app:
```
npm run dev
```
### Docker.

Run docker-compose:
```
docker-compose up -d --build
```

Run migrations
```
# upgrade.
docker exec -it crud npm run migrate up

# down.
docker exec -it crud npm run migrate down
```

### Testing.

Run docker-compose:
```
cd tests

docker-compose up -d --build
```

Run migrations:
```
docker exec -it crud-test npm run migrate up
```

Run tests:
```
docker exec -it crud-test npm run test
```