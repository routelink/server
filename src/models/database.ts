import { Sequelize } from 'sequelize-typescript';

import { config } from '@app/models';

export const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.dbhost,
    dialect: 'postgres',
    models: [
      process.env.NODE_ENV === 'test'
        ? `${__dirname}/models/*.model.{js,ts}`
        : process.env.NODE_ENV === 'production'
          ? `${__dirname}/*.model.js`
          : `${__dirname}/../models/*.model.ts`,
    ],
    modelMatch: (filename, member) => {
      return (
        filename
          .substring(0, filename.indexOf('.model'))
          .replace('-', '')
          .toLowerCase() === member.toLowerCase()
      );
    },
  },
);
