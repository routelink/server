module.exports = {
  development: {
    username: 'routelink',
    password: 'routelink',
    database: 'routelink',
    host: '127.0.0.1',
    dialect: 'postgres',
    seederStorage: 'sequelize',
  },
  test: {
    username: 'routelink',
    password: 'routelink',
    database: 'routelink',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
  production: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_HOST,
    dialect: 'postgres',
    seederStorage: 'sequelize',
  },
};
