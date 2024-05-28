module.exports = {
  development: {
    username: 'routelink',
    password: 'routelink',
    database: 'routelink',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
  test: {
    username: 'routelink',
    password: 'routelink',
    database: 'routelink',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
  production: {
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.PPOSTGRES_NAME,
    host: process.env.POSTGRES_HOSTNAME,
    dialect: 'postgres',
  },
};
