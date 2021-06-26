# koa-postgres
Clean code Api with postgres native driver and running migrations and Koa as micro http framework.

## Installation and setup

Requires Node.Js and npm or yarn installed.

```
yarn
```
or
```
npm install
```

## Migrations

To run all migrations, create a local database or modify database connection file and simple run:

```
yarn migration:run
```
or
```
npm run migration:run
```

### Web server

To start the Koa server, simply run:

```
yarn dev:server
```
or
```
npm run dev:server
```
